import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import '../App.css'; // Tailwind should be imported here

function Compiler({ problemId }) {
  // DSA starter boilerplates
  const defaultCodeTemplates = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}
`,
    python: `def main():
    # Write your code here
    pass

if __name__ == "__main__":
    main()
`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Write your code here
        sc.close();
    }
}
`
  };

  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(defaultCodeTemplates.cpp);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [aiReview, setAiReview] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [problemIdError, setProblemIdError] = useState('');
  const [problemData, setProblemData] = useState(null);

  // Ref to track if language changed after initial mount
  const languageChanged = useRef(false);

  // Fetch problem details and set first sample input
  useEffect(() => {
    async function fetchProblem() {
      if (!problemId) return;
      try {
        const resp = await axios.get(`${import.meta.env.VITE_BACKENDURL}/admin/problems/${problemId}`, { withCredentials: true });
        setProblemData(resp.data);
        // Auto-fill input with the first sample test case
        const firstSample = resp.data.testCases?.find(tc => !tc.isHidden);
        if (firstSample) setInput(firstSample.input);
      } catch (err) {
        // Optionally set an error message
      }
    }
    fetchProblem();
    // eslint-disable-next-line
  }, [problemId]);

  useEffect(() => {
    if (languageChanged.current) {
      setCode(defaultCodeTemplates[language]);
    } else {
      languageChanged.current = true;
    }
  }, [language]);

  const handleRun = async () => {
    setTestResults([]);
    const payload = { language, code, input };
    try {
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL, payload);
      setOutput(data.output);
    } catch (error) {
      setOutput('Error executing code, error: ' + error.message);
    }
  };

  const handleAiReview = async () => {
    const payload = { code };
    try {
      const { data } = await axios.post(import.meta.env.VITE_GOOGLE_GEMINI_API_URL, payload);
      setAiReview(data.review);
    } catch (error) {
      setAiReview('Error in AI review, error: ' + error.message);
    }
  };

  const handleSubmit = async () => {
    setProblemIdError('');
    setIsSubmitting(true);
    setTestResults([]);

    if (!problemId) {
      setProblemIdError("No problem selected or problemId is missing.");
      setIsSubmitting(false);
      return;
    }
    try {
      // 1. Run code with current input
      const runPayload = { language, code, input };
      const runResp = await axios.post(import.meta.env.VITE_BACKEND_URL, runPayload);
      setOutput(runResp.data.output);

      // 2. Judge all backend test cases
      const submitPayload = { language, code, problemId };
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_TESTCASES_URL, submitPayload, { withCredentials: true });
      setTestResults(data.testResults || []);
    } catch (error) {
      setOutput('');
      setTestResults([{ passed: false, error: error.message }]);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="py-6 px-2 md:px-6 pb-8"
      style={{ background: 'linear-gradient(120deg, #f0f4ff 0%, #eaf6fb 40%, #faf3ff 100%)' }}
    >
      <div className="text-center mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">
          {/* Input */}
          <div className="backdrop-blur-md bg-white/70 border border-indigo-100 shadow-xl rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-indigo-800 mb-2 flex items-center gap-2">
              <span>Input</span>
            </h2>
            <textarea
              rows="4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter custom input here..."
              className="w-full p-3 text-sm border border-gray-200 rounded-xl outline-none bg-indigo-50 focus:bg-indigo-100 focus:border-indigo-400 transition"
            />
          </div>
          {/* Output */}
          <div className="backdrop-blur-md bg-white/80 border border-purple-100 shadow-lg rounded-2xl p-5 overflow-y-auto" style={{ height: '130px' }}>
            <h2 className="text-lg font-semibold text-purple-800 mb-2">Output</h2>
            <div className="text-sm font-mono whitespace-pre-wrap text-gray-800">{output}</div>
          </div>
          {/* AI Review */}
          <div className="backdrop-blur-md bg-white/85 border border-pink-100 shadow-lg rounded-2xl p-5" style={{ minHeight: '150px' }}>
            <h2 className="text-lg font-semibold text-pink-700 mb-2">AI Review</h2>
            <div className="prose prose-sm text-gray-700 overflow-y-auto" style={{ minHeight: '140px', maxHeight: '160px' }}>
              {aiReview === '' ? <div className="text-3xl text-center animate-pulse">🤖</div> : <ReactMarkdown>{aiReview}</ReactMarkdown>}
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-4 mt-1">
            <button
              onClick={handleRun}
              className="w-1/2 py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-purple-600 transition duration-200"
            >
              Run
            </button>
            <button
              onClick={handleAiReview}
              className="w-1/2 py-2 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-400 text-white font-bold shadow-lg hover:scale-105 hover:from-pink-600 hover:to-purple-500 transition duration-200"
            >
              AI Review
            </button>
          </div>
          {/* Submit Button */}
          <div className="mt-3">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !problemId}
              className={`w-full py-2 px-4 rounded-xl bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold shadow-lg hover:scale-105 hover:from-green-600 hover:to-lime-600 transition duration-200 ${isSubmitting || !problemId ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {problemIdError && (
              <div className="mt-2 text-red-600 text-sm font-semibold">{problemIdError}</div>
            )}
          </div>
          {/* Test Case Verdicts */}
          <div className="mt-4">
            {testResults.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-2 text-green-800">Test Case Verdicts</h2>
                {testResults.map((result, idx) => (
                  <div
                    key={idx}
                    className={
                      result.passed
                        ? "bg-green-50 border border-green-400 text-green-700 rounded-md p-2 mb-1"
                        : "bg-red-50 border border-red-400 text-red-700 rounded-md p-2 mb-1"
                    }
                  >
                    <span>Test Case {idx + 1}:</span>
                    {result.passed ? " Passed ✅" : " Failed ❌"}
                    {result.error && <div className="text-red-500">{result.error}</div>}
                  </div>
                ))}
                <div className="font-bold mt-3">
                  {testResults.filter(r => r.passed).length} / {testResults.length} test cases passed
                </div>
              </div>
            )}
          </div>
        </div>
        {/* RIGHT SIDE — Monaco */}
        <div className="backdrop-blur-lg bg-white/90 border border-gray-200 shadow-2xl rounded-2xl p-0 flex flex-col h-[570px]">
          <div className="flex justify-end items-center px-4 pt-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-1 text-md bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold shadow"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div className="flex-1 px-2 pb-2">
            <MonacoEditor
              height="500px"
              language={language}
              value={code}
              onChange={value => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 15,
                minimap: { enabled: false },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                roundedSelection: false,
                scrollbar: { verticalScrollbarSize: 6 },
                renderLineHighlight: 'all'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compiler;

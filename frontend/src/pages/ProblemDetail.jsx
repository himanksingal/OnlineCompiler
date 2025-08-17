import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Compiler from "../components/Compiler"; // <== YOUR integrated compiler component

// Optional placeholder for the AI panel


export default function ProblemDetail() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProblem() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/admin/problems/${problemId}`, {
          credentials: "include"
        });
        if (!response.ok) {
          throw new Error(`Problem not found (Status: ${response.status})`);
        }
        const data = await response.json();
        setProblem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProblem();
  }, [problemId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!problem) return <div>No problem data found.</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Left/Main Panel: Problem details and compiler */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Problem description box */}
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
          <div className="text-sm mb-1 text-gray-500 flex flex-row gap-3">
            <span className="font-semibold">Difficulty:</span>
            <span
              className={
                problem.difficulty === 'Easy'
                  ? 'text-green-600'
                  : problem.difficulty === 'Medium'
                    ? 'text-yellow-700'
                    : 'text-red-600'
              }
            >
              {problem.difficulty}
            </span>

            <span className="ml-6 font-semibold">Tags:</span>
            <span>
              {problem.tags && problem.tags.length > 0 ? (
                problem.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-block mr-2 bg-gray-200 text-xs px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No tags</span>
              )}
            </span>
          </div>

          <div className="mt-3 text-gray-700 whitespace-pre-line">{problem.description || problem.statement}</div>

          {/* Sample Test Cases - Smaller & Uniform */}
          <h2 className="mt-4 text-base font-semibold">Sample Test Cases</h2>
          <div className="mt-2 space-y-2 bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-40 overflow-y-auto">
            {problem.testCases && problem.testCases.length > 0 ? (
              problem.testCases
                .filter((tc) => !tc.isHidden)
                .map((tc, idx) => (
                  <div key={tc._id || idx} className="bg-gray-50 border rounded p-2">
                    <div>
                      <strong>Input:</strong>{' '}
                      <pre className="inline font-mono text-sm">{tc.input}</pre>
                    </div>
                    <div>
                      <strong>Output:</strong>{' '}
                      <pre className="inline font-mono text-sm">{tc.output}</pre>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-gray-500 italic">No sample test cases available.</div>
            )}
          </div>
        </div>

        {/* Compiler - drop in the integrated component */}
        <Compiler problemId={problemId} />
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function TestCaseManager({ testCases, onAdd, onEdit, onDelete, onClose }) {
  const [newTestCase, setNewTestCase] = useState({ input: '', output: '', isHidden: false });

  const handleAdd = () => {
    if (!newTestCase.input.trim() || !newTestCase.output.trim()) {
      alert('Input and Output are required');
      return;
    }
    onAdd(newTestCase);
    setNewTestCase({ input: '', output: '', isHidden: false });
  };

  return (
    <div className="max-h-[70vh] overflow-auto space-y-6">
      <h3 className="text-xl font-semibold mb-4">Manage Test Cases</h3>

      <div className="space-y-3">
        {testCases.length === 0 && <p className="text-gray-500">No test cases available.</p>}
        {testCases.map(tc => (
          <div key={tc._id ?? tc.input} className="border rounded p-3 bg-gray-50">
            <div><strong>Input:</strong><pre className="whitespace-pre-wrap">{tc.input}</pre></div>
            <div><strong>Output:</strong><pre className="whitespace-pre-wrap">{tc.output}</pre></div>
            <div className="italic text-sm mt-1 text-gray-600">Type: {tc.isHidden ? 'Hidden' : 'Sample'}</div>
            <div className="mt-2 space-x-3">
              <button onClick={() => onEdit(tc)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => onDelete(tc)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Add New Test Case</h4>
        <textarea
          rows={3}
          placeholder="Input"
          className="w-full p-2 border rounded mb-2 resize-none"
          value={newTestCase.input}
          onChange={e => setNewTestCase({ ...newTestCase, input: e.target.value })}
        />
        <textarea
          rows={3}
          placeholder="Output"
          className="w-full p-2 border rounded mb-2 resize-none"
          value={newTestCase.output}
          onChange={e => setNewTestCase({ ...newTestCase, output: e.target.value })}
        />
        <label className="inline-flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={newTestCase.isHidden}
            onChange={e => setNewTestCase({ ...newTestCase, isHidden: e.target.checked })}
            className="form-checkbox"
          />
          <span>Hidden Test Case (not visible to users)</span>
        </label>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Close</button>
          <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add</button>
        </div>
      </div>
    </div>
  );
}

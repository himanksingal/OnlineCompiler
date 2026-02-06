import React, { useState } from 'react';

export default function TestCaseManager({ testCases, onAdd, onEdit, onDelete, onClose }) {
  const [newTestCase, setNewTestCase] = useState({ input: '', output: '', isHidden: false });
  
  // State for editing existing test case
  const [editingTestCase, setEditingTestCase] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [editOutput, setEditOutput] = useState('');
  const [editIsHidden, setEditIsHidden] = useState(false);


  const handleAdd = () => {
    if (!newTestCase.input.trim() || !newTestCase.output.trim()) {
      alert('Input and Output are required');
      return;
    }
    onAdd(newTestCase);
    setNewTestCase({ input: '', output: '', isHidden: false });
  };

  const openEditModal = (testCase) => {
    setEditingTestCase(testCase);
    setEditInput(testCase.input);
    setEditOutput(testCase.output);
    setEditIsHidden(testCase.isHidden);
  };

  const handleEditSave = () => {
    if (!editInput.trim() || !editOutput.trim()) {
      alert('Input and Output are required');
      return;
    }
    onEdit({
      ...editingTestCase,
      input: editInput,
      output: editOutput,
      isHidden: editIsHidden,
    });
    setEditingTestCase(null);
  };

  const handleEditCancel = () => {
    setEditingTestCase(null);
  };

  return (
    <div className="max-h-[70vh] overflow-auto space-y-6">
      <h3 className="text-xl font-semibold mb-4">Manage Test Cases</h3>

      <div className="space-y-3">
        {testCases.length === 0 && <p className="text-gray-500">No test cases available.</p>}
        {testCases.map((tc) => (
          <div key={tc._id} className="border rounded p-3 bg-gray-50">
            <div><strong>Input:</strong><pre className="whitespace-pre-wrap">{tc.input}</pre></div>
            <div><strong>Output:</strong><pre className="whitespace-pre-wrap">{tc.output}</pre></div>
            <div className="italic text-sm mt-1 text-gray-600">Type: {tc.isHidden ? 'Hidden' : 'Sample'}</div>
            <div className="mt-2 space-x-3">
              <button onClick={() => openEditModal(tc)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => onDelete(tc)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Test Case Section */}
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

      {/* Edit Test Case Modal */}
      {editingTestCase && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded shadow-lg max-w-lg w-full p-6 relative">
            <h3 className="text-xl font-semibold mb-4">Edit Test Case</h3>

            <label className="block font-medium mb-1">Input</label>
            <textarea
              rows={3}
              className="w-full p-2 border rounded mb-3 resize-none"
              value={editInput}
              onChange={e => setEditInput(e.target.value)}
            />

            <label className="block font-medium mb-1">Output</label>
            <textarea
              rows={3}
              className="w-full p-2 border rounded mb-3 resize-none"
              value={editOutput}
              onChange={e => setEditOutput(e.target.value)}
            />

            <label className="inline-flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={editIsHidden}
                onChange={e => setEditIsHidden(e.target.checked)}
                className="form-checkbox"
              />
              <span>Hidden Test Case (not visible to users)</span>
            </label>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleEditCancel}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

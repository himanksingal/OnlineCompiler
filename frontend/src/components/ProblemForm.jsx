import React, { useState, useEffect } from 'react';

export default function ProblemForm({ problem, onSave, onCancel }) {
  const [problemId, setProblemId] = useState(problem?.problemId || '');
  const [title, setTitle] = useState(problem?.title || '');
  const [description, setDescription] = useState(problem?.description || '');
  const [tags, setTags] = useState(problem?.tags?.join(', ') || '');
  const [difficulty, setDifficulty] = useState(problem?.difficulty || 'Easy');
  const [targetedTimeComplexity, setTargetedTimeComplexity] = useState(problem?.targetedTimeComplexity || '');

  // On problem change (edit mode)
  useEffect(() => {
    if (problem) {
      setProblemId(problem.problemId);
      setTitle(problem.title);
      setDescription(problem.description);
      setTags(problem.tags.join(', '));
      setDifficulty(problem.difficulty);
      setTargetedTimeComplexity(problem.targetedTimeComplexity);
    }
  }, [problem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      problemId,
      title,
      description,
      tags: tags.split(',').map(t => t.trim()),
      difficulty,
      targetedTimeComplexity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Problem ID</label>
        <input 
          type="text"
          className="w-full p-2 border rounded"
          value={problemId}
          onChange={e => setProblemId(e.target.value)}
          disabled={Boolean(problem)} // Disable if editing
          required 
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input 
          type="text"
          className="w-full p-2 border rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea 
          rows={6}
          className="w-full p-2 border rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Tags (comma separated)</label>
        <input 
          type="text"
          className="w-full p-2 border rounded"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Difficulty</label>
        <select
          className="w-full p-2 border rounded"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          required
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Targeted Time Complexity</label>
        <input 
          type="text"
          className="w-full p-2 border rounded"
          value={targetedTimeComplexity}
          onChange={e => setTargetedTimeComplexity(e.target.value)}
          placeholder="e.g. O(N log N)"
          required
        />
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button 
          type="button"
          className="px-4 py-2 border rounded hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}

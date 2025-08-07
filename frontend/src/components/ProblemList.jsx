import React from 'react';

export default function ProblemList({ problems, onEdit, onDelete, onManageTestCases }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Problem ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Difficulty
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {problems.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                No problems found.
              </td>
            </tr>
          )}
          {problems.map(problem => (
            <tr key={problem._id}>
              <td className="px-6 py-4 whitespace-nowrap">{problem.problemId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{problem.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{problem.difficulty}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button 
                  onClick={() => onEdit(problem)}
                  className="text-blue-600 hover:underline mr-3"
                >Edit</button>

                <button 
                  onClick={() => onDelete(problem)}
                  className="text-red-600 hover:underline mr-3"
                >Delete</button>

                <button
                  onClick={() => onManageTestCases(problem)}
                  className="text-green-600 hover:underline"
                >Test Cases</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function ProblemList({ problems, onEdit, onDelete, onManageTestCases }) {
  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold";
      case "Hard":
        return "bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold";
      default:
        return "";
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
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
              <td colSpan="3" className="px-6 py-4 text-center text-gray-400">
                No problems found.
              </td>
            </tr>
          )}
          {problems.map((problem) => (
            <tr key={problem._id} className="hover:bg-gray-50 cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap text-blue-700 hover:underline">
                <Link to={`/problems/${problem.problemId}`}>{problem.title}</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={getDifficultyClass(problem.difficulty)}>{problem.difficulty}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap space-x-1">
                {/* Edit Button */}
                <button
                  onClick={() => onEdit(problem)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out text-sm"
                  aria-label={`Edit ${problem.title}`}
                  type="button"
                >
                  {/* Pencil Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" />
                  </svg>
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => onDelete(problem)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 text-red-600 bg-red-50 rounded hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-150 ease-in-out text-sm"
                  aria-label={`Delete ${problem.title}`}
                  type="button"
                >
                  {/* Trash Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                    />
                  </svg>
                  <span>Delete</span>
                </button>

                <button
                  onClick={() => onManageTestCases(problem)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 text-green-600 bg-green-50 rounded hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-150 ease-in-out text-sm"
                  aria-label={`Manage test cases for ${problem.title}`}
                  type="button"
                >
                  {/* Clipboard List Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 0H7a2 2 0 01-2-2V7a2 2 0 012-2h2l2-2h4l2 2h2a2 2 0 012 2v7a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Test Cases</span>
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

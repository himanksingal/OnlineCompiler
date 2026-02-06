import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// You may want to move this logic to a separate API util if you have one
async function fetchProblems() {
  // Change endpoint if your backend is different
  const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/problems`, {
    credentials: "include", // Only needed if /problems is protected
  });

  if (!res.ok) throw new Error("Failed to load problems");
  return await res.json();   // expects array of problem objects
}

export default function UserProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProblems()
      .then(setProblems)
      .catch(() => setError("Could not load problems. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-5rem)] bg-gray-50">
      <h1 className="text-3xl font-semibold mb-7 text-indigo-800">Problems</h1>

      {loading && <div className="text-center text-lg">Loading problems...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Title</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Difficulty</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Tags</th>
              </tr>
            </thead>
            <tbody>
              {problems.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500 py-6">No problems available.</td>
                </tr>
              ) : (
                problems.map((p) => (
                  <tr
                    key={p._id || p.problemId}
                    className="hover:bg-indigo-50 transition group"
                  >
                    {/* Problem clickable title */}
                    <td className="px-4 py-3 font-medium">
                      <Link
                        to={`/problems/${p.problemId || p._id}`}
                        className="text-indigo-600 hover:underline font-semibold group-hover:text-indigo-800"
                      >
                        {p.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={
                        p.difficulty === "Easy"
                          ? "text-green-600"
                          : p.difficulty === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }>
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {p.tags && p.tags.length
                        ? p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-indigo-100 text-indigo-700 rounded px-2 py-0.5 mr-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))
                        : <span className="text-gray-400">—</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

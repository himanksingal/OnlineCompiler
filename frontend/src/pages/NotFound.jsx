// src/pages/NotFound.jsx

import React from 'react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-white p-8 rounded shadow max-w-lg mx-auto">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 text-center mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <a href="/admin/dashboard" className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
        Go back to Dashboard
      </a>
    </div>
  );
}

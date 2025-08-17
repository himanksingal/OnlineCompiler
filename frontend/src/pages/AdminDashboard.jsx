// src/pages/AdminDashboard.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 pt-8 min-h-[calc(100vh-5rem)]">
      <h1 className="text-3xl font-bold mb-7 text-center bg-gradient-to-r from-blue-700 via-fuchsia-600 to-orange-500 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>

      {/* Quick Navigation Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mb-16">
        <DashboardCard
          to="/admin/problems"
          label="Manage Problems"
          gradient="from-blue-500 to-blue-700"
          icon={
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          }
        />
        <DashboardCard
          to="/admin/users"
          label="Manage Users"
          gradient="from-green-500 to-green-700"
          icon={
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <DashboardCard
          to="/admin/submissions"
          label="View Submissions"
          gradient="from-purple-500 to-pink-600"
          icon={
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          }
        />
      </section>

      {/* Minimal welcome and hint for future features */}
      {/* <div className="w-full flex flex-col items-center mt-6">
        <div className="bg-white/80 shadow rounded-lg p-6 max-w-md w-full flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Welcome, Admin! 🎉</h2>
          <p className="text-gray-600 text-center">
            Use the cards above to quickly navigate to problems, users, and submissions management.<br />
            More analytics and graphs coming soon!
          </p>
        </div>
      </div> */}
    </div>
  );
}

function DashboardCard({ to, label, gradient, icon }) {
  return (
    <Link
      to={to}
      className={`rounded-xl h-44 flex items-center justify-center flex-col shadow-lg bg-gradient-to-br ${gradient}
                  hover:scale-105 focus:scale-105 transition-all duration-200 group`}
    >
      <div className="mb-2">{icon}</div>
      <div className="text-white text-lg md:text-xl font-bold group-hover:underline">{label}</div>
    </Link>
  );
}

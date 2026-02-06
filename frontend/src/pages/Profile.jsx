import React, { useEffect, useState } from "react";
import { fetchMe } from "../services/auth";

// Helper to fetch user submissions – replace with your actual API call if needed
// async function fetchUserSubmissions() {
//   // This request assumes your backend returns all submissions for the logged-in user
//   // Update the endpoint if your backend is different
//   const res = await fetch("http://localhost:3000/submissions", {
//     credentials: "include",
//   });
//   if (!res.ok) throw new Error("Failed to fetch submissions");
//   return await res.json(); // Expects array of submissions
// }

export default function Profile() {
  const [user, setUser] = useState(null);
  // const [submissionCount, setSubmissionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        setLoading(true);
        // Fetch user info (name, email)
        const userInfo = await fetchMe();
        if (!cancelled) setUser(userInfo);

        // // Fetch submissions, count distinct problems
        // const allSubs = await fetchUserSubmissions();
        // // Each submission should have a problemId (adapt as needed)
        // const problemsSet = new Set(
        //   (allSubs || []).map((sub) => sub.problemId)
        // );
        // if (!cancelled) setSubmissionCount(problemsSet.size);
      } catch (error) {
        // Optionally handle error or redirect to login if unauthenticated
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="animate-spin mr-2 h-5 w-5 border-2 border-indigo-600 border-l-transparent rounded-full inline-block" />
        <span className="text-indigo-700 text-lg">Loading profile...</span>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center text-red-600 text-lg mt-10">You must be logged in to view your profile.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-16">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow">
          {user.firstname?.[0] || "U"}
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800 mb-1">
          {user.firstname} {user.lastname}
        </h1>
        <div className="text-gray-500 text-md">{user.email}</div>
      </div>

      {/* 
      <div className="flex flex-col items-center gap-6">
        <div className="bg-indigo-50 rounded-lg p-4 w-full flex flex-row items-center justify-between shadow-inner">
          <div className="font-medium text-indigo-700">
            Problems Attempted / Submitted:
          </div>
          <div className="text-2xl font-extrabold text-indigo-600">{submissionCount}</div>
        </div>
      </div>
      */}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import ProblemList from "../components/ProblemList.jsx";
import ProblemForm from "../components/ProblemForm.jsx";
import TestCaseManager from "../components/TestCaseManager.jsx";
import Modal from "../components/Modal.jsx";

import {
  fetchProblems,
  createProblem,
  updateProblem,
  deleteProblem,
  addTestCase,
  updateTestCase,
  deleteTestCase,
} from "../utils/AdminApi.js";

export default function AdminDashboard() {
  // State for list of problems
  const [problems, setProblems] = useState([]);
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal visibility & currently editing problem
  const [showProblemForm, setShowProblemForm] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);

  // Test Case Manager state
  const [showTestCaseManager, setShowTestCaseManager] = useState(false);
  const [testCaseProblem, setTestCaseProblem] = useState(null);

  // Fetch problems on mount
  useEffect(() => {
    loadProblems();
  }, []);

  // Load problems with loading and error handling
  async function loadProblems() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProblems();
      setProblems(data);
    } catch (err) {
      setError("Failed to load problems. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Handle Add Problem button click
  function onAddProblemClick() {
    setEditingProblem(null);
    setShowProblemForm(true);
  }

  // Save problem (create or update)
  async function onSaveProblem(problemData) {
    try {
      if (editingProblem) {
        await updateProblem(editingProblem._id, problemData);
        alert("Problem updated successfully");
      } else {
        await createProblem(problemData);
        alert("Problem created successfully");
      }
      setShowProblemForm(false);
      loadProblems();
    } catch (e) {
      alert("Failed to save problem: " + e.message);
    }
  }

  // Delete problem handler with confirmation
  async function onDeleteProblem(problem) {
    if (window.confirm(`Are you sure you want to delete problem "${problem.title}"?`)) {
      try {
        await deleteProblem(problem._id);
        alert("Problem deleted successfully");
        loadProblems();
      } catch (e) {
        alert("Failed to delete problem: " + e.message);
      }
    }
  }

  // Edit problem handler (open modal and prefill form)
  function onEditProblem(problem) {
    setEditingProblem(problem);
    setShowProblemForm(true);
  }

  // Open test case manager modal
  function onManageTestCases(problem) {
    setTestCaseProblem(problem);
    setShowTestCaseManager(true);
  }

  // Add test case handler
  async function onAddTestCase(testCase) {
    try {
      const updatedProblem = await addTestCase(testCaseProblem._id, testCase);
      setTestCaseProblem(updatedProblem);
      loadProblems();
      alert("Test case added successfully");
    } catch (e) {
      alert("Failed to add test case: " + e.message);
    }
  }

  // Edit test case placeholder
  function onEditTestCase(testcase) {
    alert("Edit test case feature not implemented yet");
  }

  // Delete test case handler
  async function onDeleteTestCase(testcase) {
    if (window.confirm("Delete this test case?")) {
      try {
        const updatedProblem = await deleteTestCase(testCaseProblem._id, testcase._id);
        setTestCaseProblem(updatedProblem);
        loadProblems();
        alert("Test case deleted successfully");
      } catch (e) {
        alert("Failed to delete test case: " + e.message);
      }
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6 min-h-[calc(100vh-5rem)] bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={onAddProblemClick}
            className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
          >
            Add New Problem
          </button>
        </div>

        {loading && <div className="text-center text-lg">Loading problems...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        {!loading && !error && (
          <ProblemList
            problems={problems}
            onEdit={onEditProblem}
            onDelete={onDeleteProblem}
            onManageTestCases={onManageTestCases}
          />
        )}

        <Modal isOpen={showProblemForm} onClose={() => setShowProblemForm(false)}>
          <h2 className="text-2xl font-semibold mb-4">
            {editingProblem ? "Edit Problem" : "Add New Problem"}
          </h2>
          <ProblemForm
            problem={editingProblem}
            onSave={onSaveProblem}
            onCancel={() => setShowProblemForm(false)}
          />
        </Modal>

        <Modal isOpen={showTestCaseManager} onClose={() => setShowTestCaseManager(false)}>
          {testCaseProblem && (
            <TestCaseManager
              testCases={testCaseProblem.testCases || []}
              onAdd={onAddTestCase}
              onEdit={onEditTestCase}
              onDelete={onDeleteTestCase}
              onClose={() => setShowTestCaseManager(false)}
            />
          )}
        </Modal>
      </div>
    </>
  );
}

// src/utils/AdminApi.js

const API_BASE = `${import.meta.env.VITE_BACKENDURL}/admin`; // Adjust if your backend base path is different

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken'); // adjust or remove if you use cookies only
  return {
    'Content-Type': 'application/json',
    // Include the Authorization header if you use Bearer token auth (optional)
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

async function handleResponse(res) {
  if (res.ok) return res.json();
  let errorText = 'Unknown error';
  try {
    const errData = await res.json();
    errorText = errData.message || errData.error || JSON.stringify(errData);
  } catch {
    errorText = await res.text();
  }
  throw new Error(errorText);
}

export async function fetchProblems() {
  const res = await fetch(`${API_BASE}/problems`, {
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function createProblem(problem) {
  const res = await fetch(`${API_BASE}/problems`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(problem),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function updateProblem(id, problem) {
  const res = await fetch(`${API_BASE}/problems/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(problem),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function deleteProblem(id) {
  const res = await fetch(`${API_BASE}/problems/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function addTestCase(problemId, testCase) {
  const res = await fetch(`${API_BASE}/problems/${problemId}/testcases`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(testCase),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function deleteTestCase(problemId, testcaseId) {
  const res = await fetch(`${API_BASE}/problems/${problemId}/testcases/${testcaseId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  return handleResponse(res);
}

// Optional: implement updateTestCase, fetch single problem, etc., as needed.
export async function updateTestCase(problemId, testcaseId, testCase) {
  const res = await fetch(`${API_BASE}/problems/${problemId}/testcases/${testcaseId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(testCase),
    credentials: 'include',
  });
  return handleResponse(res);
}
export async function fetchProblemById(problemId) {
  const res = await fetch(`${API_BASE}/problems/${problemId}`, {
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function fetchTestCases(problemId) {
  const res = await fetch(`${API_BASE}/problems/${problemId}/testcases`, {
    headers: getAuthHeaders(),
    credentials: 'include',
  });
  return handleResponse(res);
}

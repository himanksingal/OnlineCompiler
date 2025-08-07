const API_BASE = '/admin'; // Replace with your actual admin API base URL

const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken'); // your token storage mechanism
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export async function fetchProblems() {
  const res = await fetch(`${API_BASE}/problems`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch problems');
  return res.json();
}

export async function createProblem(problem) {
  const res = await fetch(`${API_BASE}/problems`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(problem),
  });
  if (!res.ok) throw new Error('Failed to create problem');
  return res.json();
}

export async function updateProblem(id, problem) {
  const res = await fetch(`${API_BASE}/problems/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(problem),
  });
  if (!res.ok) throw new Error('Failed to update problem');
  return res.json();
}

export async function deleteProblem(id) {
  const res = await fetch(`${API_BASE}/problems/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete problem');
  return res.json();
}

export async function addTestCase(problemId, testCase) {
  const res = await fetch(`${API_BASE}/problems/${problemId}/testcases`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(testCase),
  });
  if (!res.ok) throw new Error('Failed to add test case');
  return res.json();
}

export async function updateTestCase(problemId, testcaseId, testCaseData) {
  const res = await fetch(`${API_BASE}/problems/${problemId}/testcases/${testcaseId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(testCaseData),
  });
  if (!res.ok) throw new Error('Failed to update test case');
  return res.json();
}

export async function deleteTestCase(problemId, testcaseId) {
  const res = await fetch(`${API_BASE}/problems/${problemId}/testcases/${testcaseId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete test case');
  return res.json();
}

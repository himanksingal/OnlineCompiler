import React, { useEffect, useState } from "react";
// If using Heroicons: npm install @heroicons/react
import { PencilIcon, TrashIcon, UserPlusIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roleUpdating, setRoleUpdating] = useState(""); // holds userId being updated
  const [deletingId, setDeletingId] = useState("");     // holds userId being deleted

  // Find logged-in user's id—edit as per your login flow
  const loggedInUserId = JSON.parse(localStorage.getItem("user") || "{}")?._id;

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/admin/users", {
        credentials: "include"  // Send cookies for authentication
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Error loading users");
    }
    setLoading(false);
  }

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this user? This cannot be undone.") ||
      id === loggedInUserId
    )
      return;
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:3000/admin/users/${id}`, {
        method: "DELETE",
        credentials: "include"  // Send cookies for authentication
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      setError(err.message || "Delete failed");
    }
    setDeletingId("");
  };

  const handleRoleChange = async (id, targetRole) => {
    if (id === loggedInUserId) {
      alert("You cannot change your own role.");
      return;
    }
    setRoleUpdating(id);
    try {
      const response = await fetch(`http://localhost:3000/admin/users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ role: targetRole }),
        credentials: "include" // Send cookies for authentication
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Role update failed");
      }
      // Update role locally for UI refresh
      setUsers((users) =>
        users.map((u) =>
          u._id === id ? { ...u, role: targetRole } : u
        )
      );
    } catch (err) {
      setError(err.message || "Role update failed");
    }
    setRoleUpdating("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-3 border-b font-semibold">First Name</th>
                  <th className="p-3 border-b font-semibold">Last Name</th>
                  <th className="p-3 border-b font-semibold">Email</th>
                  <th className="p-3 border-b font-semibold">Role</th>
                  <th className="p-3 border-b font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{user.firstname}</td>
                      <td className="p-3 border-b">{user.lastname}</td>
                      <td className="p-3 border-b">{user.email}</td>
                      <td className="p-3 border-b">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${user.role === "admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                          }`}>
                          {user.role === "admin" && (
                            <ShieldCheckIcon className="w-4 h-4 mr-1 text-green-500" />
                          )}
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3 border-b">
                        <div className="flex flex-wrap gap-2">
                          {/* Role change buttons. Hide if self */}
                          {user._id !== loggedInUserId && (
                            user.role === "user" ? (
                              <button
                                disabled={roleUpdating === user._id}
                                onClick={() => handleRoleChange(user._id, "admin")}
                                className={`flex items-center gap-1 px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs ${roleUpdating === user._id ? "opacity-70 cursor-not-allowed" : ""}`}
                              >
                                <ShieldCheckIcon className="w-4 h-4" />
                                Promote to Admin
                              </button>
                            ) : (
                              <button
                                disabled={roleUpdating === user._id}
                                onClick={() => handleRoleChange(user._id, "user")}
                                className={`flex items-center gap-1 px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white transition shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs ${roleUpdating === user._id ? "opacity-70 cursor-not-allowed" : ""}`}
                              >
                                <UserPlusIcon className="w-4 h-4" />
                                Demote to User
                              </button>
                            )
                          )}

                          {/* Delete user, hide if self */}
                          {user._id !== loggedInUserId && (
                            <button
                              disabled={deletingId === user._id}
                              onClick={() => handleDelete(user._id)}
                              className={`flex items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition shadow focus:outline-none focus:ring-2 focus:ring-red-400 text-xs ${deletingId === user._id ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                              <TrashIcon className="w-4 h-4" />
                              {deletingId === user._id ? "Deleting..." : "Delete"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Users;

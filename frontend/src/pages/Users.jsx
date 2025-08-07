import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For creating/editing users
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users.");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || "An error occurred.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed.");
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.message || "Error deleting user.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "" });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Save failed.");
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      alert(err.message || "Error saving user.");
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <button onClick={handleCreate}>Add User</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading && users?.length === 0 && (
            <tr><td colSpan={5}>No users found.</td></tr>
          )}
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td><td>{user.name}</td>
              <td>{user.email}</td><td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>{" "}
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Form Modal (Basic Example) */}
      {showForm && (
        <div style={{
          position: "fixed", top: "20%", left: "40%", padding: "2rem",
          background: "#fff", border: "1px solid #ccc", borderRadius: "6px", zIndex: 10
        }}>
          <h3>{editingUser ? "Edit User" : "Add User"}</h3>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Name:</label><br />
              <input name="name" value={formData.name} onChange={handleFormChange} required />
            </div>
            <div>
              <label>Email:</label><br />
              <input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
            </div>
            <div>
              <label>Role:</label><br />
              <input name="role" value={formData.role} onChange={handleFormChange} required />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <button type="submit">Save</button>{" "}
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Users;

import React from 'react';
import './app.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import AdminDashboard from './pages/AdminDashboard.jsx';
import Problems from './pages/Problems.jsx';
import Submissions from './pages/Submissions.jsx';
import Users from './pages/Users.jsx';
import Profile from './pages/Profile.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import ProblemDetail from './pages/ProblemDetail';
import UserProblems from './pages/UserProblems.jsx';

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import Homepage from './pages/Homepage.jsx';
import ProtectedRoute from './router/ProtectedRoute.jsx';

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-5rem)] container mx-auto px-4 py-6">
<Routes>
  {/* PUBLIC ROUTES */}
  <Route path="/" element={<Homepage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/problems" element={<UserProblems />} />

  {/* USER-PROTECTED ROUTES */}
  <Route
    path="/problems/:problemId"
    element={<ProtectedRoute><ProblemDetail /></ProtectedRoute>}
  />
  <Route
    path="/submissions"
    element={<ProtectedRoute><Submissions /></ProtectedRoute>}
  />
  <Route
    path="/profile"
    element={<ProtectedRoute><Profile /></ProtectedRoute>}
  />

  {/* ADMIN-ONLY ROUTES */}
  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/problems"
    element={
      <ProtectedRoute requiredRole="admin">
        <Problems />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/submissions"
    element={
      <ProtectedRoute requiredRole="admin">
        <Submissions />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/users"
    element={
      <ProtectedRoute requiredRole="admin">
        <Users />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/profile"
    element={
      <ProtectedRoute requiredRole="admin">
        <Profile />
      </ProtectedRoute>
    }
  />

  {/* NOT FOUND */}
  <Route path="*" element={<NotFound />} />
</Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

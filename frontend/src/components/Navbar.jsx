import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchMe, logoutUser } from '../services/auth';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Reload user (and thus RBAC) on route change or mount
  useEffect(() => {
    fetchMe().then(setUser).catch(() => setUser(null));
  }, [location.pathname]);

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  const toggleUserMenu = () => setIsUserMenuOpen(open => !open);
  const toggleMobileMenu = () => setIsMobileMenuOpen(open => !open);

  const isActive = (path) => location.pathname === path;

  // Logout with redirect
  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          to={isAdmin ? "/admin/dashboard" : "/"}
          className="text-indigo-300 font-black text-2xl tracking-tight hover:text-indigo-200 transition"
        >
          TidyBit
        </Link>
        <div className="flex items-center md:order-2 space-x-3 relative">
          {/* Profile & Logout if logged in */}
          {
            user ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-indigo-700 rounded-full"
                  onClick={toggleUserMenu}
                  aria-expanded={isUserMenuOpen}
                >
                  <span className="sr-only">Open user menu</span>
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xl">
                    {user.firstname?.charAt(0) || "U"}
                  </span>
                </button>
                {/* Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute z-50 top-12 right-0 w-56 my-4 text-base bg-white text-gray-800 rounded shadow-lg dark:bg-gray-900 dark:text-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <span className="block text-base font-semibold">{user.firstname}</span>
                      <span className="block text-xs">{user.email}</span>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link
                          to={isAdmin ? "/admin/profile" : "/profile"}
                          className="block px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-gray-800"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
              >
                Login
              </Link>
            )
          }

          {/* Hamburger for mobile */}
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-indigo-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* Main nav links - RBAC */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} items-center w-full md:flex md:w-auto md:order-1`} id="navbar-default">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 bg-transparent">
            {isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/problems"
                    className={`block py-2 px-3 rounded ${isActive('/admin/problems') ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-gray-800'} font-semibold`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >Problems</Link>
                </li>
                <li>
                  <Link
                    to="/admin/submissions"
                    className={`block py-2 px-3 rounded ${isActive('/admin/submissions') ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-gray-800'} font-semibold`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >Submissions</Link>
                </li>
                <li>
                  <Link
                    to="/admin/users"
                    className={`block py-2 px-3 rounded ${isActive('/admin/users') ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-gray-800'} font-semibold`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >Users</Link>
                </li>
                <li>
                  <Link
                    to="/admin/leaderboard"
                    className={`block py-2 px-3 rounded ${isActive('/admin/leaderboard') ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-gray-800'} font-semibold`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >Leaderboard</Link>
                </li>
              </>
            )}
            {isUser && (
              <>
                <li>
                  <Link
                    to="/problems"
                    className={`block py-2 px-3 rounded ${isActive('/problems') ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-gray-800'} font-semibold`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >Problems</Link>
                </li>
                <li>
                  <Link
                    to="/submissions"
                    className={`block py-2 px-3 rounded ${isActive('/submissions') ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-gray-800'} font-semibold`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >Submissions</Link>
                </li>
                <li>
                  <Link
                    to="/leaderboard"
                    className={`block py-2 px-3 rounded ${isActive('/leaderboard') ? 'bg-indigo-700 text-white' : 'text-indigo-300 hover:bg-gray-800'} font-semibold`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >Leaderboard</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

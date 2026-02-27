import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SharedNavbar from './components/SharedNavbar'; 
import Home from './pages/Home';
import Learn from './pages/Learn'; 
import Playground from './pages/Playground'; 
import News from './pages/News'; 
import Portfolio from './pages/Portfolio'; 
import AIAdvisor from './pages/AIAdvisor'; 
import PointsAndRewards from './pages/PointsAndRewards'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

// 🔒 Component to wrap private routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      {/* 🟢 AuthProvider must wrap EVERYTHING that uses auth data, including the Navbar */}
      <AuthProvider>
        <div className="bg-[#080808] min-h-screen flex flex-col">
          {/* 🧭 Shared Navbar now correctly sits inside the Provider */}
          <SharedNavbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Landing Page */}
              <Route path="/" element={<Home />} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* 🔒 Protected application routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/learn"
                element={
                  <ProtectedRoute>
                    <Learn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/playground"
                element={
                  <ProtectedRoute>
                    <Playground />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news"
                element={
                  <ProtectedRoute>
                    <News />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <ProtectedRoute>
                    <Portfolio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advisor"
                element={
                  <ProtectedRoute>
                    <AIAdvisor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/rewards"
                element={
                  <ProtectedRoute>
                    <PointsAndRewards />
                  </ProtectedRoute>
                }
              />

              {/* 404 Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
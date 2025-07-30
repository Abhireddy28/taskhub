import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './components/auth/Login';
import StudentDashboard from './components/dashboards/StudentDashboard';
import ProfessorDashboard from './components/dashboards/ProfessorDashboard';
import MentorDashboard from './components/dashboards/MentorDashboard';
import AssignmentView from './components/assignments/AssignmentView';
import CollaborationHub from './components/collaboration/CollaborationHub';
import { AuthProvider } from './contexts/AuthContext';
import { PlatformProvider } from './contexts/PlatformContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-semibold">Loading EduCollabHub...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <PlatformProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/student/*" element={<StudentDashboard />} />
              <Route path="/professor/*" element={<ProfessorDashboard />} />
              <Route path="/mentor/*" element={<MentorDashboard />} />
              <Route path="/assignment/:id" element={<AssignmentView />} />
              <Route path="/collaboration/:id" element={<CollaborationHub />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </PlatformProvider>
    </AuthProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../layout/Layout';
import StudentOverview from './student/StudentOverview';
import AssignmentList from '../assignments/AssignmentList';
import CollaborationRooms from '../collaboration/CollaborationRooms';
import StudentProfile from './student/StudentProfile';
import Leaderboard from '../gamification/Leaderboard';

const StudentDashboard = () => {
  return (
    <Layout userRole="student">
      <Routes>
        <Route path="/" element={<StudentOverview />} />
        <Route path="/assignments" element={<AssignmentList />} />
        <Route path="/collaboration" element={<CollaborationRooms />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Routes>
    </Layout>
  );
};

export default StudentDashboard;
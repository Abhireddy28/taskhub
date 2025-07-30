import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import ProfessorOverview from './professor/ProfessorOverview';
import CreateAssignment from '../assignments/CreateAssignment';
import ManageAssignments from '../assignments/ManageAssignments';
import StudentAnalytics from './professor/StudentAnalytics';
import ProfessorProfile from './professor/ProfessorProfile';

const ProfessorDashboard = () => {
  return (
    <Layout userRole="professor">
      <Routes>
        <Route path="/" element={<ProfessorOverview />} />
        <Route path="/create-assignment" element={<CreateAssignment />} />
        <Route path="/manage-assignments" element={<ManageAssignments />} />
        <Route path="/analytics" element={<StudentAnalytics />} />
        <Route path="/profile" element={<ProfessorProfile />} />
      </Routes>
    </Layout>
  );
};

export default ProfessorDashboard;
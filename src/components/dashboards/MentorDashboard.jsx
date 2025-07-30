import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import MentorOverview from './mentor/MentorOverview';
import PostProject from './mentor/PostProject';
import ManageMentees from './mentor/ManageMentees';
import IssueCertificates from './mentor/IssueCertificates';
import MentorProfile from './mentor/MentorProfile';

const MentorDashboard = () => {
  return (
    <Layout userRole="mentor">
      <Routes>
        <Route path="/" element={<MentorOverview />} />
        <Route path="/post-project" element={<PostProject />} />
        <Route path="/mentees" element={<ManageMentees />} />
        <Route path="/certificates" element={<IssueCertificates />} />
        <Route path="/profile" element={<MentorProfile />} />
      </Routes>
    </Layout>
  );
};

export default MentorDashboard;
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { usePlatform } from '../../../contexts/PlatformContext';
import {
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const ProfessorOverview = () => {
  const { user } = useAuth();
  const { assignments } = usePlatform();

  const stats = [
    { name: 'Active Assignments', value: assignments.length, icon: DocumentTextIcon, color: 'text-blue-600' },
    { name: 'Total Students', value: '156', icon: UserGroupIcon, color: 'text-green-600' },
    { name: 'Submissions Today', value: '23', icon: CheckCircleIcon, color: 'text-purple-600' },
    { name: 'Avg. Grade', value: '87%', icon: ChartBarIcon, color: 'text-orange-600' }
  ];

  const recentSubmissions = [
    { student: 'Alex Johnson', assignment: 'React Component Development', time: '5 min ago', grade: null },
    { student: 'Sarah Chen', assignment: 'Database Design Project', time: '1 hour ago', grade: 95 },
    { student: 'Mike Rodriguez', assignment: 'ML Algorithm Implementation', time: '2 hours ago', grade: null },
    { student: 'Emma Wilson', assignment: 'React Component Development', time: '3 hours ago', grade: 88 }
  ];

  const upcomingDeadlines = assignments.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Prof. {user?.name}!</h1>
            <p className="text-purple-100 text-lg">Ready to inspire and educate today?</p>
          </div>
          <div className="hidden md:block">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full border-4 border-white/20"
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Submissions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Submissions</h2>
            <Link
              to="/professor/manage-assignments"
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentSubmissions.map((submission, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{submission.student}</h3>
                    <p className="text-sm text-gray-600 mt-1">{submission.assignment}</p>
                    <p className="text-xs text-gray-500 mt-1">{submission.time}</p>
                  </div>
                  <div className="text-right">
                    {submission.grade ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {submission.grade}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending Review
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {upcomingDeadlines.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{assignment.submissions}/{assignment.totalStudents} submitted</span>
                      <span>{assignment.points} points</span>
                    </div>
                  </div>
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/professor/create-assignment"
            className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center group"
          >
            <PlusIcon className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-purple-900">Create Assignment</p>
          </Link>
          <Link
            to="/professor/manage-assignments"
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center group"
          >
            <DocumentTextIcon className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-blue-900">Manage Assignments</p>
          </Link>
          <Link
            to="/professor/analytics"
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center group"
          >
            <ChartBarIcon className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-green-900">View Analytics</p>
          </Link>
          <Link
            to="/professor/profile"
            className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center group"
          >
            <UserGroupIcon className="w-8 h-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-orange-900">Student Management</p>
          </Link>
        </div>
      </motion.div>

      {/* Class Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Class Performance Overview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
            <div className="text-sm text-gray-600">Average Grade</div>
            <div className="text-xs text-green-600 mt-1">+3% from last week</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
            <div className="text-sm text-gray-600">Submission Rate</div>
            <div className="text-xs text-blue-600 mt-1">+5% from last week</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.2</div>
            <div className="text-sm text-gray-600">Avg. Days Early</div>
            <div className="text-xs text-purple-600 mt-1">Students submit early</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfessorOverview;
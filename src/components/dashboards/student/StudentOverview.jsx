import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { usePlatform } from '../../../contexts/PlatformContext';
import {
  DocumentTextIcon,
  UserGroupIcon,
  TrophyIcon,
  ClockIcon,
  FireIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const StudentOverview = () => {
  const { user } = useAuth();
  const { assignments } = usePlatform();

  const upcomingAssignments = assignments.slice(0, 3);
  const stats = [
    { name: 'Active Assignments', value: '8', icon: DocumentTextIcon, color: 'text-blue-600' },
    { name: 'Collaborations', value: '3', icon: UserGroupIcon, color: 'text-green-600' },
    { name: 'Badges Earned', value: user?.badges?.length || 0, icon: TrophyIcon, color: 'text-yellow-600' },
    { name: 'Current Level', value: user?.level || 1, icon: FireIcon, color: 'text-red-600' }
  ];

  const recentActivity = [
    { type: 'submission', text: 'Submitted React Component Assignment', time: '2 hours ago' },
    { type: 'collaboration', text: 'Joined Database Design team chat', time: '4 hours ago' },
    { type: 'badge', text: 'Earned "Early Bird" badge', time: '1 day ago' },
    { type: 'grade', text: 'Received grade for ML Algorithm project', time: '2 days ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100 text-lg">Ready to tackle your assignments today?</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <FireIcon className="w-5 h-5" />
                <span>Level {user?.level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrophyIcon className="w-5 h-5" />
                <span>{user?.xp} XP</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>{user?.badges?.length || 0} Badges</span>
              </div>
            </div>
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
        {/* Upcoming Assignments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Assignments</h2>
            <Link
              to="/student/assignments"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
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
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        assignment.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        assignment.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {assignment.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{assignment.points} points</span>
                    </div>
                  </div>
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'submission' ? 'bg-blue-500' :
                  activity.type === 'collaboration' ? 'bg-green-500' :
                  activity.type === 'badge' ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
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
            to="/student/assignments"
            className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
          >
            <DocumentTextIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-900">View Assignments</p>
          </Link>
          <Link
            to="/student/collaboration"
            className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
          >
            <UserGroupIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-900">Join Collaboration</p>
          </Link>
          <Link
            to="/student/leaderboard"
            className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-center"
          >
            <TrophyIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-yellow-900">View Leaderboard</p>
          </Link>
          <Link
            to="/student/profile"
            className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
          >
            <CalendarIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-purple-900">Schedule & Calendar</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentOverview;
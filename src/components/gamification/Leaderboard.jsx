import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  TrophyIcon,
  FireIcon,
  StarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Leaderboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overall');

  // Mock leaderboard data
  const leaderboardData = {
    overall: [
      { id: 1, name: 'Alex Johnson', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff', xp: 4850, level: 12, badges: 8 },
      { id: 2, name: 'Sarah Chen', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=10b981&color=fff', xp: 4720, level: 11, badges: 7 },
      { id: 3, name: 'Mike Rodriguez', avatar: 'https://ui-avatars.com/api/?name=Mike+Rodriguez&background=f59e0b&color=fff', xp: 4580, level: 11, badges: 6 },
      { id: 4, name: user?.name, avatar: user?.avatar, xp: user?.xp, level: user?.level, badges: user?.badges?.length },
      { id: 5, name: 'Emma Wilson', avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=ef4444&color=fff', xp: 4320, level: 10, badges: 5 },
    ],
    weekly: [
      { id: 1, name: 'Sarah Chen', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=10b981&color=fff', xp: 520, level: 11, badges: 2 },
      { id: 2, name: 'Alex Johnson', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff', xp: 485, level: 12, badges: 1 },
      { id: 3, name: user?.name, avatar: user?.avatar, xp: 420, level: user?.level, badges: 1 },
      { id: 4, name: 'Mike Rodriguez', avatar: 'https://ui-avatars.com/api/?name=Mike+Rodriguez&background=f59e0b&color=fff', xp: 380, level: 11, badges: 1 },
      { id: 5, name: 'Emma Wilson', avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=ef4444&color=fff', xp: 350, level: 10, badges: 0 },
    ]
  };

  const badges = [
    { name: 'Early Bird', description: 'Submit assignments early', icon: '🌅', earned: true },
    { name: 'Collaborator', description: 'Active in team projects', icon: '🤝', earned: true },
    { name: 'Achiever', description: 'Complete all assignments', icon: '🎯', earned: true },
    { name: 'Code Master', description: 'Excel in programming tasks', icon: '💻', earned: false },
    { name: 'Team Player', description: 'Help teammates succeed', icon: '👥', earned: false },
    { name: 'Innovation', description: 'Creative problem solving', icon: '💡', earned: false },
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return rank;
    }
  };

  const currentData = leaderboardData[activeTab];
  const userRank = currentData.findIndex(student => student.name === user?.name) + 1;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">Compete with your peers and track your progress</p>
      </div>

      {/* User Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-full border-4 border-white/20"
            />
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-purple-200">Current Rank: #{userRank}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{user?.xp} XP</div>
            <div className="text-purple-200">Level {user?.level}</div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          {Object.keys(leaderboardData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab} Rankings
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Leaderboard */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrophyIcon className="w-5 h-5 mr-2" />
                {activeTab === 'overall' ? 'Overall Rankings' : 'Weekly Rankings'}
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {currentData.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 flex items-center justify-between ${
                    student.name === user?.name ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold w-8 text-center">
                      {getRankIcon(index + 1)}
                    </div>
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {student.name}
                        {student.name === user?.name && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-500">Level {student.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{student.xp} XP</div>
                    <div className="text-sm text-gray-500">{student.badges} badges</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Badges and Achievements */}
        <div className="space-y-6">
          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FireIcon className="w-5 h-5 mr-2" />
              Level Progress
            </h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-blue-600">Level {user?.level}</div>
              <div className="text-sm text-gray-500">
                {user?.xp % 500} / 500 XP to next level
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${((user?.xp % 500) / 500) * 100}%` }}
              ></div>
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <StarIcon className="w-5 h-5 mr-2" />
              Badges & Achievements
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-center transition-all ${
                    badge.earned
                      ? 'bg-yellow-50 border-2 border-yellow-200'
                      : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium text-gray-900">{badge.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{badge.description}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Challenge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl p-6 text-white"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Weekly Challenge
            </h3>
            <p className="text-sm text-green-100 mb-4">
              Complete 5 assignments this week to earn the "Weekly Warrior" badge!
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm">Progress: 3/5</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">2 days left</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
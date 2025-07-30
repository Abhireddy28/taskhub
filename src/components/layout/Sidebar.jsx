import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import {
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  TrophyIcon,
  UserIcon,
  PlusIcon,
  ChartBarIcon,
  BriefcaseIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, setIsOpen, userRole }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: `/${userRole}`, icon: HomeIcon }
    ];

    switch (userRole) {
      case 'student':
        return [
          ...baseItems,
          { name: 'Assignments', href: '/student/assignments', icon: DocumentTextIcon },
          { name: 'Collaboration', href: '/student/collaboration', icon: UserGroupIcon },
          { name: 'Leaderboard', href: '/student/leaderboard', icon: TrophyIcon },
          { name: 'Profile', href: '/student/profile', icon: UserIcon }
        ];
      case 'professor':
        return [
          ...baseItems,
          { name: 'Create Assignment', href: '/professor/create-assignment', icon: PlusIcon },
          { name: 'Manage Assignments', href: '/professor/manage-assignments', icon: DocumentTextIcon },
          { name: 'Analytics', href: '/professor/analytics', icon: ChartBarIcon },
          { name: 'Profile', href: '/professor/profile', icon: UserIcon }
        ];
      case 'mentor':
        return [
          ...baseItems,
          { name: 'Post Project', href: '/mentor/post-project', icon: PlusIcon },
          { name: 'Mentees', href: '/mentor/mentees', icon: UserGroupIcon },
          { name: 'Certificates', href: '/mentor/certificates', icon: AcademicCapIcon },
          { name: 'Profile', href: '/mentor/profile', icon: UserIcon }
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const getRoleColor = () => {
    switch (userRole) {
      case 'student': return 'from-blue-600 to-cyan-600';
      case 'professor': return 'from-purple-600 to-pink-600';
      case 'mentor': return 'from-emerald-600 to-teal-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`p-6 bg-gradient-to-r ${getRoleColor()}`}>
            <h1 className="text-xl font-bold text-white">EduCollabHub</h1>
            <p className="text-sm text-white/80 capitalize">{userRole} Portal</p>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            {userRole === 'student' && (
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-xs font-medium text-gray-600">
                    Level {user?.level}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.xp} XP
                  </div>
                </div>
                <div className="flex space-x-1">
                  {user?.badges?.slice(0, 3).map((badge, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 bg-yellow-400 rounded-full text-xs flex items-center justify-center"
                      title={badge}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
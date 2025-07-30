import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePlatform } from '../../contexts/PlatformContext';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const AssignmentList = () => {
  const { assignments } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const filteredAssignments = assignments
    .filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || assignment.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'points') {
        return b.points - a.points;
      }
      return a.title.localeCompare(b.title);
    });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'group' ? UserGroupIcon : DocumentTextIcon;
  };

  const getDaysUntilDue = (dueDate) => {
    const days = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `${days} days left`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-1">Manage and track your assignments</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <span className="text-sm text-gray-500">
            {filteredAssignments.length} assignment{filteredAssignments.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="individual">Individual</option>
                <option value="group">Group</option>
              </select>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="points">Sort by Points</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assignment Cards */}
      <div className="grid gap-6">
        {filteredAssignments.map((assignment, index) => {
          const TypeIcon = getTypeIcon(assignment.type);
          const daysLeft = getDaysUntilDue(assignment.dueDate);
          const isUrgent = daysLeft.includes('today') || daysLeft.includes('tomorrow') || daysLeft.includes('Overdue');

          return (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-all cursor-pointer ${
                isUrgent ? 'border-l-4 border-l-red-500' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <TypeIcon className="w-5 h-5 text-gray-500" />
                    <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(assignment.difficulty)}`}>
                      {assignment.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{assignment.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span className={isUrgent ? 'text-red-600 font-medium' : ''}>
                        {daysLeft}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>👨‍🏫 {assignment.professor}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🎯 {assignment.points} points</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {assignment.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="ml-6 text-right">
                  <div className="text-sm text-gray-500 mb-2">
                    {assignment.submissions}/{assignment.totalStudents} submitted
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(assignment.submissions / assignment.totalStudents) * 100}%`
                      }}
                    ></div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default AssignmentList;
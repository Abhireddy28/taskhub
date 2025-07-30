import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePlatform } from '../../contexts/PlatformContext';
import {
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
  TagIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const CreateAssignment = () => {
  const navigate = useNavigate();
  const { addAssignment } = usePlatform();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    type: 'individual',
    points: 100,
    difficulty: 'intermediate',
    tags: [],
    allowedFileTypes: ['pdf', 'doc', 'txt'],
    maxFileSize: 10,
    instructions: '',
    resources: []
  });

  const [currentTag, setCurrentTag] = useState('');
  const [currentResource, setCurrentResource] = useState({ title: '', url: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignment = {
      ...formData,
      dueDate: new Date(formData.dueDate).toISOString(),
      totalStudents: 45 // Mock value
    };
    
    addAssignment(assignment);
    navigate('/professor/manage-assignments');
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addResource = () => {
    if (currentResource.title.trim() && currentResource.url.trim()) {
      setFormData(prev => ({
        ...prev,
        resources: [...prev.resources, { ...currentResource }]
      }));
      setCurrentResource({ title: '', url: '' });
    }
  };

  const removeResource = (index) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Assignment</h1>
        <p className="text-gray-600 mt-2">Design and configure a new assignment for your students</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            Basic Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter assignment title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="individual">Individual</option>
                <option value="group">Group</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Provide a detailed description of the assignment"
            />
          </div>
        </motion.div>

        {/* Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" />
            Configuration
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.points}
                onChange={(e) => setFormData(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TagIcon className="w-5 h-5 mr-2" />
            Tags & Categories
          </h2>
          
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Add tags (e.g., react, frontend, programming)"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <TrashIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Detailed Instructions
          </h2>
          
          <textarea
            rows={6}
            value={formData.instructions}
            onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Provide detailed instructions, requirements, and submission guidelines..."
          />
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Reference Materials & Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={currentResource.title}
              onChange={(e) => setCurrentResource(prev => ({ ...prev, title: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Resource title"
            />
            <div className="flex space-x-2">
              <input
                type="url"
                value={currentResource.url}
                onChange={(e) => setCurrentResource(prev => ({ ...prev, url: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Resource URL"
              />
              <button
                type="button"
                onClick={addResource}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            {formData.resources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{resource.title}</h4>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {resource.url}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => removeResource(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end space-x-4"
        >
          <button
            type="button"
            onClick={() => navigate('/professor/manage-assignments')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Assignment
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default CreateAssignment;
import React, { createContext, useContext, useState, useEffect } from 'react';

const PlatformContext = createContext();

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};

export const PlatformProvider = ({ children }) => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize with mock data
    initializeMockData();
  }, []);

  const initializeMockData = () => {
    const mockAssignments = [
      {
        id: 1,
        title: 'React Component Development',
        description: 'Build a responsive dashboard component using React and Tailwind CSS',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'individual',
        points: 100,
        difficulty: 'intermediate',
        tags: ['react', 'frontend', 'ui/ux'],
        professor: 'Dr. Sarah Johnson',
        submissions: 23,
        totalStudents: 45,
        status: 'active'
      },
      {
        id: 2,
        title: 'Database Design Project',
        description: 'Design and implement a normalized database schema for an e-commerce platform',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'group',
        points: 150,
        difficulty: 'advanced',
        tags: ['database', 'sql', 'backend'],
        professor: 'Prof. Michael Chen',
        submissions: 8,
        totalStudents: 45,
        status: 'active'
      },
      {
        id: 3,
        title: 'Machine Learning Algorithm Implementation',
        description: 'Implement and compare different classification algorithms on a real dataset',
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'individual',
        points: 200,
        difficulty: 'expert',
        tags: ['ml', 'python', 'data-science'],
        professor: 'Dr. Emily Rodriguez',
        submissions: 12,
        totalStudents: 45,
        status: 'active'
      }
    ];

    const mockNotifications = [
      {
        id: 1,
        type: 'assignment',
        title: 'New Assignment Posted',
        message: 'React Component Development assignment has been posted',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false
      },
      {
        id: 2,
        type: 'grade',
        title: 'Grade Available',
        message: 'Your submission for Database Design has been graded',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: false
      },
      {
        id: 3,
        type: 'collaboration',
        title: 'Team Message',
        message: 'New message in Project Alpha collaboration room',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ];

    setAssignments(mockAssignments);
    setNotifications(mockNotifications);
  };

  const addAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      id: Date.now(),
      submissions: 0,
      status: 'active'
    };
    setAssignments(prev => [newAssignment, ...prev]);
  };

  const updateAssignment = (id, updates) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === id ? { ...assignment, ...updates } : assignment
      )
    );
  };

  const addSubmission = (submission) => {
    const newSubmission = {
      ...submission,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'submitted'
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const value = {
    assignments,
    submissions,
    collaborations,
    notifications,
    addAssignment,
    updateAssignment,
    addSubmission,
    addNotification,
    markNotificationRead
  };

  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  );
};
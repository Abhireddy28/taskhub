import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationPanel from './NotificationPanel';

const Layout = ({ children, userRole }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        userRole={userRole} 
      />
      
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <Header 
          setSidebarOpen={setSidebarOpen}
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
        />
        
        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={notificationOpen}
        setIsOpen={setNotificationOpen}
      />
    </div>
  );
};

export default Layout;
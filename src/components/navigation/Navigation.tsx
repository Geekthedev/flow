import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Camera, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'chats', label: 'Chats', icon: MessageCircle, path: '/chats' },
  { id: 'stories', label: 'Stories', icon: Camera, path: '/stories' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

export function Navigation() {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Flow
          </h1>
        </div>
        
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.id} to={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-2 py-2 z-50">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.id} to={item.path} className="flex-1">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center p-2 rounded-lg ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
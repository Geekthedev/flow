import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCheck, Filter } from 'lucide-react';
import { NotificationItem } from '../components/notifications/NotificationItem';
import { Button } from '../components/shared/Button';
import { notifications as mockNotifications } from '../data/mockData';

export function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(notification =>
    filter === 'all' || !notification.isRead
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
          >
            <Filter size={18} className="mr-2" />
            {filter === 'all' ? 'Show Unread' : 'Show All'}
          </Button>
          
          {unreadCount > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleMarkAllAsRead}
            >
              <CheckCheck size={18} className="mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NotificationItem
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCheck size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              All caught up!
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter === 'unread' 
                ? 'No unread notifications'
                : 'No notifications yet'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
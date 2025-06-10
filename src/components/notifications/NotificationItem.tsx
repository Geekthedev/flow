import React from 'react';
import { Heart, MessageCircle, UserPlus, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Notification } from '../../types';
import { Avatar } from '../shared/Avatar';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const iconMap = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  mention: MessageCircle,
  story_view: Eye,
  message: MessageCircle,
};

const colorMap = {
  like: 'text-red-500',
  comment: 'text-blue-500',
  follow: 'text-green-500',
  mention: 'text-purple-500',
  story_view: 'text-orange-500',
  message: 'text-blue-500',
};

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const Icon = iconMap[notification.type];
  const iconColor = colorMap[notification.type];

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
      className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
        !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <Avatar user={notification.fromUser} size="md" />
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center`}>
            <Icon size={12} className={iconColor} />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                <span className="font-semibold">{notification.fromUser.name}</span>
                {' '}
                <span className="text-gray-600 dark:text-gray-400">
                  {notification.message}
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatTime(notification.timestamp)}
              </p>
            </div>
            
            {!notification.isRead && (
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-2" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
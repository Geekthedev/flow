import React from 'react';
import { User } from '../../types';

interface AvatarProps {
  user: User;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showOnline?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const onlineDotSizes = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-3.5 h-3.5',
};

export function Avatar({ user, size = 'md', showOnline = false, className = '' }: AvatarProps) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white dark:ring-gray-800`}
      />
      {showOnline && user.isOnline && (
        <div
          className={`absolute bottom-0 right-0 ${onlineDotSizes[size]} bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800`}
        />
      )}
    </div>
  );
}
import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Story } from '../../types';
import { Avatar } from '../shared/Avatar';

interface StoriesBarProps {
  stories: Story[];
  onStoryClick: (story: Story) => void;
}

export function StoriesBar({ stories, onStoryClick }: StoriesBarProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {/* Add Story Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Plus size={24} className="text-white" />
            </div>
          </div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Your Story
          </span>
        </motion.div>

        {/* Stories */}
        {stories.map((story) => (
          <motion.div
            key={story.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStoryClick(story)}
            className="flex-shrink-0 flex flex-col items-center space-y-2 cursor-pointer"
          >
            <div className="relative">
              <div
                className={`w-16 h-16 rounded-full p-0.5 ${
                  story.hasViewed
                    ? 'bg-gray-300 dark:bg-gray-600'
                    : 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500'
                }`}
              >
                <img
                  src={story.user.avatar}
                  alt={story.user.name}
                  className="w-full h-full rounded-full object-cover ring-2 ring-white dark:ring-gray-900"
                />
              </div>
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 max-w-[64px] truncate">
              {story.user.name.split(' ')[0]}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Plus, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { stories } from '../data/mockData';
import { StoryViewer } from '../components/stories/StoryViewer';
import { Avatar } from '../components/shared/Avatar';
import { Button } from '../components/shared/Button';
import { Story } from '../types';

export function Stories() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);

  const handleStoryClick = (story: Story) => {
    const index = stories.findIndex(s => s.id === story.id);
    setStoryIndex(index);
    setSelectedStory(story);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Stories
        </h1>
        <Button variant="primary">
          <Plus size={18} className="mr-2" />
          Create Story
        </Button>
      </div>

      {/* Your Story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Your Story
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Plus size={24} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Add to your story
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Share a photo or video
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recent Stories */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Stories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleStoryClick(story)}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={story.media}
                  alt="Story preview"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3">
                    <Avatar user={story.user} size="sm" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">
                        {story.user.name}
                      </h3>
                      <p className="text-xs text-gray-300">
                        {formatTime(story.timestamp)}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Play size={16} className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                {!story.hasViewed && (
                  <div className="absolute top-3 left-3 w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Viewer */}
      {selectedStory && (
        <StoryViewer
          stories={stories}
          initialStoryIndex={storyIndex}
          onClose={handleCloseStory}
        />
      )}
    </div>
  );
}
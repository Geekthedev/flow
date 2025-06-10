import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Story } from '../../types';
import { Avatar } from '../shared/Avatar';

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
}

export function StoryViewer({ stories, initialStoryIndex, onClose }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const currentStory = stories[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (currentStory.duration / 100);
        if (prev >= 100) {
          nextStory();
          return 0;
        }
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex, currentStory.duration]);

  const nextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      >
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
          {stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: `${
                    index < currentIndex
                      ? 100
                      : index === currentIndex
                      ? progress
                      : 0
                  }%`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <Avatar user={currentStory.user} size="md" />
            <div>
              <h3 className="text-white font-semibold">{currentStory.user.name}</h3>
              <p className="text-gray-300 text-sm">
                {formatTime(currentStory.timestamp)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-black/20 rounded-full p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Story Content */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={currentStory.media}
            alt="Story"
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>

        {/* Navigation */}
        <button
          onClick={prevStory}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/20 rounded-full p-2"
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextStory}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/20 rounded-full p-2"
        >
          <ChevronRight size={24} />
        </button>

        {/* Tap Areas */}
        <button
          onClick={prevStory}
          className="absolute left-0 top-0 w-1/3 h-full"
          disabled={currentIndex === 0}
        />
        <button
          onClick={nextStory}
          className="absolute right-0 top-0 w-1/3 h-full"
        />
      </motion.div>
    </AnimatePresence>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PostCard } from '../components/feed/PostCard';
import { StoriesBar } from '../components/stories/StoriesBar';
import { StoryViewer } from '../components/stories/StoryViewer';
import { posts, stories } from '../data/mockData';
import { Story } from '../types';

export function Home() {
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

  return (
    <div className="space-y-6">
      {/* Stories */}
      <StoriesBar stories={stories} onStoryClick={handleStoryClick} />

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
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
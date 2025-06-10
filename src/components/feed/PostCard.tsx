import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post } from '../../types';
import { Avatar } from '../shared/Avatar';
import { Button } from '../shared/Button';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
  onShare?: (postId: string) => void;
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike?.(post.id);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      onComment?.(post.id, newComment);
      setNewComment('');
      setShowComments(true);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar user={post.user} size="md" showOnline />
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {post.user.name}
              </h3>
              {post.user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{post.user.username} · {formatTime(post.timestamp)}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal size={18} />
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p className="text-gray-900 dark:text-gray-100 mb-3 leading-relaxed">
          {post.content}
        </p>
        
        {post.image && (
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-lg overflow-hidden cursor-pointer"
          >
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`flex items-center space-x-2 ${
                isLiked ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Heart
                size={20}
                fill={isLiked ? 'currentColor' : 'none'}
                className="transition-colors"
              />
              <span className="text-sm font-medium">{likesCount}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
            >
              <MessageCircle size={20} />
              <span className="text-sm font-medium">{post.comments}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onShare?.(post.id)}
              className="flex items-center space-x-2 text-gray-500 dark:text-gray-400"
            >
              <Share size={20} />
              <span className="text-sm font-medium">{post.shares}</span>
            </motion.button>
          </div>
        </div>

        {/* Comment Input */}
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="flex space-x-3">
              <Avatar user={post.user} size="sm" />
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
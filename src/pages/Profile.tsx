import React, { useState } from 'react';
import { Camera, Edit, MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { currentUser, posts } from '../data/mockData';
import { Avatar } from '../components/shared/Avatar';
import { Button } from '../components/shared/Button';
import { PostCard } from '../components/feed/PostCard';

type TabType = 'posts' | 'about' | 'photos';

export function Profile() {
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  
  const userPosts = posts.filter(post => post.userId === currentUser.id);

  const tabs = [
    { id: 'posts', label: 'Posts', count: userPosts.length },
    { id: 'about', label: 'About', count: null },
    { id: 'photos', label: 'Photos', count: 12 },
  ];

  return (
    <div className="space-y-6">
      {/* Cover Photo & Profile Info */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-48 md:h-64">
          <img
            src={currentUser.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border-white/30"
          >
            <Camera size={16} className="mr-2" />
            Edit Cover
          </Button>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full ring-4 ring-white dark:ring-gray-900 overflow-hidden">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2 w-8 h-8 p-0 rounded-full"
              >
                <Camera size={14} />
              </Button>
            </div>

            {/* Info */}
            <div className="flex-1 mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {currentUser.name}
                    </h1>
                    {currentUser.verified && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">@{currentUser.username}</p>
                </div>
                
                <Button variant="primary" className="mt-4 md:mt-0">
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Stats */}
              <div className="flex space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {currentUser.posts}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {currentUser.followers.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {currentUser.following}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-900 dark:text-gray-100 mt-4 leading-relaxed">
                {currentUser.bio}
              </p>

              {/* Additional Info */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  San Francisco, CA
                </div>
                <div className="flex items-center">
                  <LinkIcon size={16} className="mr-1" />
                  alexjohnson.dev
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Joined March 2023
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="border-b border-gray-200 dark:border-gray-800">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {userPosts.length > 0 ? (
                userPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No posts yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Share your first post to get started
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  About
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentUser.bio}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin size={18} className="text-gray-400 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center">
                    <LinkIcon size={18} className="text-gray-400 mr-3" />
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                      alexjohnson.dev
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={18} className="text-gray-400 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">Joined March 2023</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={`https://images.pexels.com/photos/${1194420 + index}/pexels-photo-${1194420 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
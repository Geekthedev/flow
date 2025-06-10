import React from 'react';
import { Search, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { Chat } from '../../types';
import { Avatar } from '../shared/Avatar';
import { Button } from '../shared/Button';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ChatList({
  chats,
  selectedChatId,
  onChatSelect,
  searchQuery,
  onSearchChange,
}: ChatListProps) {
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'now';
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const filteredChats = chats.filter((chat) =>
    chat.participants.some((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Chats
          </h2>
          <Button variant="ghost" size="sm">
            <Edit size={18} />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => {
          const otherUser = chat.participants.find((user) => user.id !== '1');
          if (!otherUser) return null;

          return (
            <motion.div
              key={chat.id}
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
              onClick={() => onChatSelect(chat.id)}
              className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-800 ${
                selectedChatId === chat.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar user={otherUser} size="lg" showOnline />
                  {chat.isPinned && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {otherUser.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(chat.lastMessage.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {chat.lastMessage.content}
                    </p>
                    {chat.unreadCount > 0 && (
                      <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
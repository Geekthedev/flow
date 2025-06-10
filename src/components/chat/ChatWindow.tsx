import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, MoreVertical, Smile, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import { Chat, Message } from '../../types';
import { Avatar } from '../shared/Avatar';
import { Button } from '../shared/Button';

interface ChatWindowProps {
  chat: Chat | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatWindow({ chat, messages, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Select a chat to start messaging
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Choose from your existing conversations or start a new one
          </p>
        </div>
      </div>
    );
  }

  const otherUser = chat.participants.find((user) => user.id !== '1');
  if (!otherUser) return null;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar user={otherUser} size="md" showOnline />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {otherUser.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {otherUser.isOnline ? 'Online' : `Last seen ${otherUser.lastSeen?.toLocaleTimeString()}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone size={18} />
            </Button>
            <Button variant="ghost" size="sm">
              <Video size={18} />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwn = message.senderId === '1';
          
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  isOwn
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className={`flex items-center justify-end mt-1 space-x-1 ${
                  isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  <span className="text-xs">{formatTime(message.timestamp)}</span>
                  {isOwn && (
                    <div className="flex space-x-0.5">
                      <div
                        className={`w-1 h-1 rounded-full ${
                          message.status === 'read' ? 'bg-blue-200' : 'bg-blue-300'
                        }`}
                      />
                      <div
                        className={`w-1 h-1 rounded-full ${
                          message.status === 'read' ? 'bg-blue-200' : 'bg-blue-400'
                        }`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Paperclip size={18} />
          </Button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Smile size={18} />
            </Button>
          </div>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { ChatList } from '../components/chat/ChatList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { chats, messages } from '../data/mockData';

export function Chats() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedChat = chats.find(chat => chat.id === selectedChatId) || null;
  const chatMessages = messages.filter(msg => msg.chatId === selectedChatId);

  const handleSendMessage = (content: string) => {
    // In a real app, this would send the message to the backend
    console.log('Sending message:', content);
  };

  return (
    <div className="h-full flex">
      {/* Chat List - Hidden on mobile when chat is selected */}
      <div className={`w-full lg:w-80 lg:flex-shrink-0 ${
        selectedChatId ? 'hidden lg:block' : 'block'
      }`}>
        <ChatList
          chats={chats}
          selectedChatId={selectedChatId}
          onChatSelect={setSelectedChatId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Chat Window */}
      <div className={`flex-1 ${
        selectedChatId ? 'block' : 'hidden lg:block'
      }`}>
        <ChatWindow
          chat={selectedChat}
          messages={chatMessages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
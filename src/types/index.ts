export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  coverPhoto: string;
  verified: boolean;
  followers: number;
  following: number;
  posts: number;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  image?: string;
  video?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  type: 'text' | 'image' | 'video';
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'voice' | 'emoji';
  status: 'sent' | 'delivered' | 'read';
  replyTo?: string;
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isArchived: boolean;
  type: 'direct' | 'group';
  name?: string;
  avatar?: string;
}

export interface Story {
  id: string;
  userId: string;
  user: User;
  media: string;
  type: 'image' | 'video';
  timestamp: Date;
  views: number;
  hasViewed: boolean;
  duration: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'story_view' | 'message';
  fromUser: User;
  postId?: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export interface AppState {
  currentUser: User;
  theme: 'light' | 'dark';
  accentColor: string;
  notifications: Notification[];
  chats: Chat[];
  posts: Post[];
  stories: Story[];
}
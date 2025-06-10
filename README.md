# Flow - Social Platform

<div align="center">
  <h1>🌊 Flow</h1>
  <p><strong>Where stories flow and connections grow</strong></p>
  <p>A beautiful social platform combining the best of Facebook's social feed with WhatsApp's messaging experience</p>
  
  ![Flow Preview](https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1200)
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## ✨ Features

### 🏠 Social Feed
- **Beautiful Post Cards** - Rich content display with images, text, and engagement metrics
- **Interactive Reactions** - Like, comment, and share functionality with smooth animations
- **Stories Integration** - Instagram-style stories at the top of the feed
- **Infinite Scroll** - Seamless content loading experience
- **Real-time Updates** - Live engagement counters and notifications

### 💬 Advanced Messaging
- **WhatsApp-style Interface** - Familiar chat experience with modern design
- **Real-time Messaging** - Instant message delivery with read receipts
- **Rich Media Support** - Send images, emojis, and voice notes (UI ready)
- **Chat Management** - Pin, mute, archive, and search conversations
- **Typing Indicators** - See when others are composing messages
- **Unread Counters** - Never miss important messages

### 📸 Stories Experience
- **Fullscreen Viewer** - Immersive story viewing with tap navigation
- **Progress Indicators** - Visual progress bars for story sequences
- **Auto-advance** - Automatic story progression with customizable timing
- **Story Creation** - Upload and share your moments (UI ready)
- **View Analytics** - See who viewed your stories

### 🔔 Smart Notifications
- **Comprehensive System** - Likes, comments, follows, mentions, and messages
- **Interactive Actions** - Mark as read, delete, or respond directly
- **Real-time Updates** - Instant notification delivery
- **Filtering Options** - View all or unread notifications
- **Batch Operations** - Mark all as read functionality

### 👤 Rich Profiles
- **Customizable Profiles** - Cover photos, avatars, and detailed bios
- **Content Tabs** - Posts, About, and Photos sections
- **Social Stats** - Followers, following, and post counts
- **Profile Editing** - Complete profile management (UI ready)
- **Verification System** - Verified user badges

### 🎨 Theming & Customization
- **Dark/Light Modes** - System-aware theme switching
- **Accent Colors** - 5 beautiful color schemes (Ocean, Lavender, Forest, Sunset, Rose)
- **Persistent Preferences** - Settings saved across sessions
- **Smooth Transitions** - Animated theme changes
- **Accessibility** - High contrast ratios and readable fonts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flow-social-app.git
   cd flow-social-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🏗️ Architecture

### Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Routing**: React Router DOM for SPA navigation
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **State Management**: React hooks with localStorage persistence

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── chat/            # Chat-related components
│   ├── feed/            # Social feed components
│   ├── navigation/      # Navigation components
│   ├── notifications/   # Notification components
│   ├── shared/          # Common UI components
│   └── stories/         # Stories components
├── data/                # Mock data and constants
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── types/               # TypeScript type definitions
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

### Component Architecture
- **Atomic Design** - Components built from small, reusable pieces
- **TypeScript First** - Full type safety throughout the application
- **Responsive Design** - Mobile-first approach with desktop enhancements
- **Accessibility** - ARIA labels, keyboard navigation, and focus management
- **Performance** - Optimized rendering with React best practices

## 📱 Responsive Design

Flow is built with a mobile-first approach and provides optimal experiences across all devices:

### Mobile (320px - 768px)
- Bottom navigation bar for easy thumb access
- Single-column layout for focused content consumption
- Touch-optimized interactions and gesture support
- Collapsible chat interface for space efficiency

### Tablet (768px - 1024px)
- Adaptive navigation that transitions to sidebar
- Two-column chat layout (list + conversation)
- Enhanced story viewer with larger preview
- Optimized touch targets for tablet interaction

### Desktop (1024px+)
- Full sidebar navigation with labels
- Multi-column layouts for efficient space usage
- Hover states and desktop-specific interactions
- Keyboard shortcuts and accessibility features

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient system (blue-500 to blue-600)
- **Accent Options**: Purple, Green, Orange, Pink variants
- **Neutrals**: Comprehensive gray scale (50-900)
- **Semantic**: Success, warning, and error colors
- **Dark Mode**: Carefully crafted dark theme variants

### Typography
- **Font Stack**: System fonts for optimal performance
- **Hierarchy**: 6 heading levels with consistent spacing
- **Body Text**: Optimized line height (150%) for readability
- **Weights**: Light, regular, medium, semibold, bold

### Spacing System
- **Base Unit**: 8px grid system
- **Consistent Margins**: Predictable spacing throughout
- **Component Padding**: Harmonious internal spacing
- **Responsive Scaling**: Adaptive spacing for different screen sizes

### Animation Principles
- **Smooth Transitions**: 200ms duration for most interactions
- **Easing Functions**: Natural motion curves
- **Micro-interactions**: Hover states, button presses, loading states
- **Page Transitions**: Smooth navigation between sections

## 🔧 Configuration

### Environment Variables
No environment variables required - the app runs entirely in the browser with mock data.

### Customization Options
- **Theme Colors**: Modify `src/hooks/useTheme.ts` for custom accent colors
- **Mock Data**: Update `src/data/mockData.ts` for different sample content
- **Component Styling**: Extend Tailwind config in `tailwind.config.js`
- **Animation Settings**: Adjust Framer Motion configs in components

## 🧪 Testing & Quality

### Browser Support
- **Chrome**: 90+ ✅
- **Firefox**: 88+ ✅
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅

### Performance Targets
- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Accessibility Features
- **WCAG 2.1 AA Compliance**: High contrast ratios and readable fonts
- **Keyboard Navigation**: Full app navigation without mouse
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order

## 🚀 Deployment

### Static Hosting (Recommended)
Flow is a client-side application that can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the built-in Actions workflow
- **AWS S3**: Upload to S3 bucket with static website hosting

### Build Command
```bash
npm run build
```

### Deployment Checklist
- [ ] Run production build
- [ ] Test in multiple browsers
- [ ] Verify responsive design
- [ ] Check accessibility compliance
- [ ] Validate performance metrics

## 🤝 Contributing

We welcome contributions to Flow! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contribution Guidelines
- **Code Style**: Follow the existing TypeScript and React patterns
- **Testing**: Ensure your changes don't break existing functionality
- **Documentation**: Update README and comments for significant changes
- **Responsive**: Test your changes across different screen sizes
- **Accessibility**: Maintain WCAG compliance in new features

### Areas for Contribution
- 🎨 **UI/UX Improvements**: Enhanced animations, better layouts
- 🔧 **New Features**: Voice messages, group chats, advanced search
- 🐛 **Bug Fixes**: Report and fix issues you encounter
- 📚 **Documentation**: Improve guides and code comments
- ♿ **Accessibility**: Enhance screen reader support and keyboard navigation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Facebook, WhatsApp, Instagram, and Twitter
- **Icons**: [Lucide React](https://lucide.dev/) for beautiful, consistent icons
- **Images**: [Pexels](https://pexels.com/) for high-quality stock photography
- **Animations**: [Framer Motion](https://framer.com/motion/) for smooth interactions
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions
- **Email**: Contact the maintainers at flow-support@example.com

---

<div align="center">
  <p>Built with ❤️ by the Flow team</p>
  <p>© 2025 Flow Social Platform. All rights reserved.</p>
</div>

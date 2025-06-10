import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { Chats } from './pages/Chats';
import { Stories } from './pages/Stories';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Navigation } from './components/navigation/Navigation';
import { useTheme } from './hooks/useTheme';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    // Check if user has previously entered the app
    const entered = localStorage.getItem('flow-entered');
    if (entered) {
      setHasEntered(true);
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem('flow-entered', 'true');
    setHasEntered(true);
  };

  if (!hasEntered) {
    return <Welcome onEnter={handleEnter} />;
  }

  return (
    <BrowserRouter>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors ${theme}`}>
        <Navigation />
        
        {/* Main Content */}
        <main className="lg:ml-64 pb-16 lg:pb-0">
          <div className="max-w-4xl mx-auto p-4 lg:p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Users, MessageCircle } from 'lucide-react';
import { Button } from '../components/shared/Button';
import { useTheme, AccentColor, accentColors } from '../hooks/useTheme';

interface WelcomeProps {
  onEnter: () => void;
}

const accents: { color: AccentColor; name: string }[] = [
  { color: 'blue', name: 'Ocean' },
  { color: 'purple', name: 'Lavender' },
  { color: 'green', name: 'Forest' },
  { color: 'orange', name: 'Sunset' },
  { color: 'pink', name: 'Rose' },
];

export function Welcome({ onEnter }: WelcomeProps) {
  const { theme, accentColor, toggleTheme, changeAccentColor } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${accentColors[accentColor]} p-8 text-center`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Users size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Flow</h1>
          <p className="text-white/90 text-sm">
            Where stories flow and connections grow
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Features */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Social Feed</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Share moments with friends</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <MessageCircle size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Instant Messaging</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Chat in real-time</p>
                </div>
              </motion.div>
            </div>

            {/* Theme Customization */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <Palette size={18} className="mr-2" />
                Customize Your Experience
              </h3>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Dark Mode</span>
                <button
                  onClick={toggleTheme}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                      theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Accent Color</span>
                <div className="flex space-x-2">
                  {accents.map(({ color, name }) => (
                    <button
                      key={color}
                      onClick={() => changeAccentColor(color)}
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${accentColors[color]} ${
                        accentColor === color ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''
                      }`}
                      title={name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={onEnter}
                variant="primary"
                size="lg"
                fullWidth
                className={`bg-gradient-to-r ${accentColors[accentColor]}`}
              >
                Enter Flow
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" size="md" fullWidth>
                  Demo Account
                </Button>
                <Button variant="ghost" size="md" fullWidth>
                  Guest Mode
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
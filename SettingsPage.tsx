import { useState } from 'react';
import { Settings, Moon, Sun, Info, Shield, MessageCircle, Bug, Lightbulb, ExternalLink, ChevronRight, Smartphone } from 'lucide-react';
import { allNicknames } from '../data/nicknames';

interface SettingsPageProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

type SettingsView = 'main' | 'about' | 'privacy';

export default function SettingsPage({ darkMode, onToggleDarkMode }: SettingsPageProps) {
  const [view, setView] = useState<SettingsView>('main');

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/2349024610774?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (view === 'about') {
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setView('main')}
          className="flex items-center gap-2 text-primary mb-6 font-medium text-sm"
        >
          <ChevronRight size={16} className="rotate-180" />
          Back to Settings
        </button>

        <div className="text-center py-6">
          <div className="w-24 h-24 rounded-3xl overflow-hidden mx-auto mb-4 card-shadow-lg">
            <img src="/images/logo.png" alt="KamShat" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-gradient mb-1">KamShat</h1>
          <p className="text-sm text-gray-500 dark:text-dark-muted font-medium">by KamTech</p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">Built by Kamzy</p>
          <div className="mt-4 px-6 py-3 rounded-2xl bg-primary-50 dark:bg-dark-surface inline-block">
            <p className="text-sm font-medium text-primary dark:text-blue-300 italic">
              "Every Name Tells a Story"
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-dark-muted">App Name</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-dark-text">KamShat</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-dark-muted">Version</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-dark-text">1.0.0</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-dark-muted">Developer</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-dark-text">KamTech</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-dark-muted">Creator</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-dark-text">Kamzy</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-dark-muted">Total Nicknames</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-dark-text">{allNicknames.length.toLocaleString()}</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-dark-muted">Database</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-dark-text">Local Storage</span>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-dark-muted">Internet Required</span>
              <span className="text-sm font-semibold text-green-600">No ✅</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'privacy') {
    return (
      <div className="animate-fade-in">
        <button
          onClick={() => setView('main')}
          className="flex items-center gap-2 text-primary mb-6 font-medium text-sm"
        >
          <ChevronRight size={16} className="rotate-180" />
          Back to Settings
        </button>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text mb-4">Privacy Policy</h1>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <h3 className="font-bold text-gray-800 dark:text-dark-text mb-2">Data Collection</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              KamShat does not collect, store, or transmit any personal data. All data is stored locally on your device only.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <h3 className="font-bold text-gray-800 dark:text-dark-text mb-2">Local Storage</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Favorites, settings, and recently viewed nicknames are saved locally on your device using browser local storage. This data never leaves your device.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <h3 className="font-bold text-gray-800 dark:text-dark-text mb-2">Internet Access</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              KamShat works completely offline. No internet connection is required to use any feature of this application.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <h3 className="font-bold text-gray-800 dark:text-dark-text mb-2">Third-Party Services</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              KamShat does not integrate with any third-party analytics, advertising, or tracking services.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
            <h3 className="font-bold text-gray-800 dark:text-dark-text mb-2">Contact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              For any privacy concerns, please contact KamTech via WhatsApp at 09024610774.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Settings size={22} className="text-primary" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-dark-text">Settings</h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-dark-muted">
          Customize your experience
        </p>
      </div>

      {/* Appearance */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider mb-3 px-1">
          Appearance
        </h2>
        <div className="p-4 rounded-2xl bg-white dark:bg-dark-card card-shadow">
          <button
            onClick={onToggleDarkMode}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              {darkMode ? (
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Moon size={20} className="text-indigo-500" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Sun size={20} className="text-yellow-500" />
                </div>
              )}
              <div className="text-left">
                <p className="font-semibold text-gray-800 dark:text-dark-text text-sm">
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </p>
                <p className="text-xs text-gray-500 dark:text-dark-muted">
                  {darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                </p>
              </div>
            </div>
            <div className={`w-12 h-7 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-gray-200'}`}>
              <div className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform" style={{ transform: darkMode ? 'translateX(22px)' : 'translateX(2px)' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Information */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider mb-3 px-1">
          Information
        </h2>
        <div className="rounded-2xl bg-white dark:bg-dark-card card-shadow overflow-hidden">
          <button
            onClick={() => setView('about')}
            className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Info size={20} className="text-blue-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800 dark:text-dark-text text-sm">About</p>
                <p className="text-xs text-gray-500 dark:text-dark-muted">App info & version</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          <div className="h-px bg-gray-100 dark:bg-gray-700/50 mx-4" />

          <button
            onClick={() => setView('privacy')}
            className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Shield size={20} className="text-green-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800 dark:text-dark-text text-sm">Privacy Policy</p>
                <p className="text-xs text-gray-500 dark:text-dark-muted">Data & privacy info</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          <div className="h-px bg-gray-100 dark:bg-gray-700/50 mx-4" />

          <div className="flex items-center justify-between w-full p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Smartphone size={20} className="text-purple-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800 dark:text-dark-text text-sm">Version</p>
                <p className="text-xs text-gray-500 dark:text-dark-muted">Current app version</p>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-dark-muted">1.0.0</span>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider mb-3 px-1">
          Support & Feedback
        </h2>
        <div className="rounded-2xl bg-white dark:bg-dark-card card-shadow overflow-hidden">
          <button
            onClick={() => openWhatsApp('Hi KamTech! I need support with KamShat app.')}
            className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <MessageCircle size={20} className="text-green-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800 dark:text-dark-text text-sm">WhatsApp Support</p>
                <p className="text-xs text-gray-500 dark:text-dark-muted">Chat with us on WhatsApp</p>
              </div>
            </div>
            <ExternalLink size={16} className="text-gray-400" />
          </button>

          <div className="h-px bg-gray-100 dark:bg-gray-700/50 mx-4" />

          <button
            onClick={() => openWhatsApp('Hi KamTech! I have a feature suggestion for KamShat: ')}
            className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Lightbulb size={20} className="text-yellow-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800 dark:text-dark-text text-sm">Feature Suggestion</p>
                <p className="text-xs text-gray-500 dark:text-dark-muted">Suggest a new feature</p>
              </div>
            </div>
            <ExternalLink size={16} className="text-gray-400" />
          </button>

          <div className="h-px bg-gray-100 dark:bg-gray-700/50 mx-4" />

          <button
            onClick={() => openWhatsApp('Hi KamTech! I found a bug in KamShat: ')}
            className="flex items-center justify-between w-full p-4 hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Bug size={20} className="text-red-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800 dark:text-dark-text text-sm">Bug Report</p>
                <p className="text-xs text-gray-500 dark:text-dark-muted">Report an issue</p>
              </div>
            </div>
            <ExternalLink size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-2xl overflow-hidden mx-auto mb-3">
          <img src="/images/logo.png" alt="KamShat" className="w-full h-full object-cover" />
        </div>
        <p className="text-sm font-bold text-gradient">KamShat</p>
        <p className="text-xs text-gray-500 dark:text-dark-muted mt-0.5">by KamTech · Built by Kamzy</p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1 italic">"Every Name Tells a Story"</p>
      </div>
    </div>
  );
}

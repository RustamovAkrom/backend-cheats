import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true" {...props}>
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="11" cy="11" r="5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export default function Header({ lang, setLang }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#071026] border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            <a href="/">Backend Cheats</a>

          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">Docs</span>
            <span className="px-2 py-0.5 rounded text-xs text-gray-500 dark:text-gray-400">v1</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setLang('EN')}
              className={`px-2 py-1 rounded text-sm ${lang === 'EN' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-200'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('RU')}
              className={`px-2 py-1 rounded text-sm ${lang === 'RU' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-200'}`}
            >
              RU
            </button>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Search placeholder (real search lives inside MarkdownPage) */}
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Search in document">
            <IconSearch className="text-gray-600 dark:text-gray-200" />
          </button>
        </div>
      </div>
    </header>
  );
}

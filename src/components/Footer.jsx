import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 bg-white dark:bg-[#071026] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} Backend Cheats — built with ❤️
      </div>
    </footer>
  );
}

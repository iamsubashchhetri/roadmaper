
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-7xl mx-auto mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} AI Roadmap Generator. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from "react";
import CommunityDecoration from "./CommunityDecoration";

const CommunitySection: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-indigo-100/50 dark:border-indigo-800/50 shadow-lg mt-10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side: Community info */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400 mb-3">
              Join the Community
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              AI roadmap generator is the 65th most starred project on GitHub
              and is visited by hundreds of thousands of developers every month.
            </p>
          </div>
          
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* GitHub stats */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 p-4 rounded-xl border border-blue-100 dark:border-blue-800/50 hover:shadow-md transition-all duration-300">
              <div className="mb-1">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Rank</span>
                <h5 className="text-lg font-bold text-blue-700 dark:text-blue-400 stat-number">65th</h5>
                <span className="text-xs text-gray-500 dark:text-gray-400">out of 2000</span>
              </div>
              
              <div className="mt-3">
                <h5 className="text-lg font-bold text-blue-700 dark:text-blue-400 stat-number">3K</h5>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">GitHub Stars</p>
              </div>
              
              <div className="mt-2">
                <a href="#" className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                  Star us on GitHub
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Help us reach #1</p>
                <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">+9000 every month</p>
              </div>
            </div>
            
            {/* Registered Users */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/40 dark:to-indigo-900/40 p-4 rounded-xl border border-purple-100 dark:border-purple-800/50 hover:shadow-md transition-all duration-300">
              <div className="mb-1">
                <h5 className="text-lg font-bold text-purple-700 dark:text-purple-400 stat-number">+10K</h5>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">Developers</p>
              </div>
              
              <div className="mt-2">
                <a href="#" className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
                  Register yourself
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Commit to your growth</p>
                <p className="text-xs text-purple-500 dark:text-purple-400 mt-1">+2k every month</p>
              </div>
            </div>
          </div>
          
          {/* Discord stats */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/40 dark:to-violet-900/40 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 stat-number">34K</h5>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm">Community Members</p>
              </div>
              
              <div>
                <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  Join on Discord
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Join the community</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side: Decoration */}
        <div className="hidden md:flex items-center justify-center">
          <CommunityDecoration />
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;

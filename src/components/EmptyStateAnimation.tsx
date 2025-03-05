
import React from 'react';

const EmptyStateAnimation: React.FC = () => {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Main animated container */}
        <div className="relative h-64 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-1 opacity-30">
            {Array.from({ length: 72 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-blue-500 dark:bg-blue-600 rounded-sm" 
                style={{
                  opacity: Math.random() * 0.5 + 0.2,
                  animation: `pulse ${Math.random() * 4 + 2}s infinite alternate`
                }}
              />
            ))}
          </div>
          
          {/* Floating elements */}
          <div className="absolute left-1/4 top-1/3 w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg shadow-lg animate-float">
            <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          
          <div className="absolute right-1/4 top-1/2 w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg animate-float-slow">
            <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <div className="absolute left-1/3 bottom-1/4 w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-lg animate-bounce-slow">
            <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          
          {/* Central info element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md px-6 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg">
              <div className="mb-2 flex justify-center">
                <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ready to Explore</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Click on any node in the roadmap above to view detailed information and start your learning journey.
              </p>
            </div>
          </div>
          
          {/* Decorative lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g stroke="currentColor" className="text-blue-200 dark:text-blue-900" strokeWidth="1" strokeDasharray="5,5" fill="none">
              <path d="M0,0 L100,100" />
              <path d="M100,0 L0,100" />
              <path d="M50,0 L50,100" />
              <path d="M0,50 L100,50" />
            </g>
          </svg>
        </div>
      </div>
      
      {/* Additional text */}
      <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm max-w-lg mx-auto">
        <p>Create personalized learning roadmaps for any skill or technology.</p>
        <p className="mt-2">Each node on the roadmap contains detailed information to guide your learning process.</p>
      </div>
    </div>
  );
};

export default EmptyStateAnimation;

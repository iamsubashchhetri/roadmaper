
import React, { useEffect, useRef } from 'react';

const AIFeatureShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all elements with animation-on-scroll class
    if (containerRef.current) {
      const animatedElements = containerRef.current.querySelectorAll('.animation-on-scroll');
      animatedElements.forEach(el => observer.observe(el));
    }
    
    return () => {
      if (containerRef.current) {
        const animatedElements = containerRef.current.querySelectorAll('.animation-on-scroll');
        animatedElements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="w-full py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 rounded-xl overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-300 dark:bg-blue-600 opacity-20"
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 8 + 4}s infinite ease-in-out ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-14 animation-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
            Learn Smarter with AI
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform adapts to your learning style and guides you through personalized roadmaps
          </p>
        </div>
        
        {/* Featured AI Functions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="animation-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-100 dark:border-blue-900 h-full transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="w-14 h-14 mb-4 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Personalized Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI analyzes your knowledge gaps and learning style to create custom pathways optimized for your unique needs.
              </p>
            </div>
          </div>
          
          <div className="animation-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-purple-100 dark:border-purple-900 h-full transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="w-14 h-14 mb-4 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Interactive Challenges</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practice with dynamic coding exercises that adapt in difficulty based on your progress and performance.
              </p>
            </div>
          </div>
          
          <div className="animation-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-indigo-100 dark:border-indigo-900 h-full transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="w-14 h-14 mb-4 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get real-time feedback on your code with smart suggestions for improvements and best practices.
              </p>
            </div>
          </div>
        </div>
        
        {/* Animated Learning Progress Section */}
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl p-8 animation-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-400">
          <div className="absolute -top-6 -left-6">
            <div className="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white animate-float-slow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Track Your Progress</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Front-End Development</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">85%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full animate-width" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Back-End Development</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">70%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2.5 rounded-full animate-width" style={{width: '70%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Machine Learning</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">60%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 rounded-full animate-width" style={{width: '60%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="text-gray-700 dark:text-gray-300">
                <p className="mb-4">Your personalized dashboard shows real-time progress across different technology stacks.</p>
                <p>AI analyzes your learning patterns to recommend topics that will maximize your skill growth.</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 mr-2 animate-bounce-slow">
                    HTML/CSS
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 mr-2 animate-bounce-slow" style={{animationDelay: '0.5s'}}>
                    JavaScript
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 animate-bounce-slow" style={{animationDelay: '1s'}}>
                    React
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeatureShowcase;

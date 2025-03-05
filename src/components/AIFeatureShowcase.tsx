import React, { useRef, useEffect } from "react";

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
    <div ref={containerRef} className="w-full py-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 rounded-xl overflow-hidden relative">
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
        <div className="text-center mb-10 animation-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
            Interactive Learning Paths
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Visualize personalized roadmaps that adapt to your learning journey
          </p>
        </div>

        {/* Feature Cards - 3 cards in a grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { title: "AI-Powered", icon: "🧠", description: "Smart recommendations based on your progress" },
            { title: "Personalized", icon: "👤", description: "Tailored learning paths for your goals" },
            { title: "Interactive", icon: "🔄", description: "Engaging visualizations and exercises" }
          ].map((feature, index) => (
            <div 
              key={index}
              className="animation-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-900 h-full text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="text-3xl mb-3 animate-bounce-slow">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Journey Visualization */}
        <div className="animation-on-scroll opacity-0 translate-y-10 transition-all duration-1000 mt-6">
          <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/40 p-6 rounded-xl shadow-md">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800 dark:text-white">Accelerate Your Learning</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Master skills in record time</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-800 dark:text-white">Expert Guidance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learn best practices & patterns</p>
                </div>
              </div>
            </div>
            
            {/* Journey Path Visualization */}
            <div className="relative h-20 mb-6">
              <div className="absolute inset-0">
                <div className="absolute left-0 right-0 h-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                
                {/* Milestone dots */}
                {[0, 25, 50, 75, 100].map((position, i) => (
                  <div key={i} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${position}%` }}>
                    <div className={`h-4 w-4 rounded-full ${i < 3 ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                    <div className={`text-xs mt-2 ${i < 3 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
                      {['Start', 'Skills', 'Projects', 'Advanced', 'Expert'][i]}
                    </div>
                  </div>
                ))}
                
                {/* Progress line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-1/2 bg-indigo-600 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeatureShowcase;
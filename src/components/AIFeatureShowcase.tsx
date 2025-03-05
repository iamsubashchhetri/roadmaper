import React, { useRef, useEffect } from "react";

const AIFeatureShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 },
    );

    // Observe all elements with animation-on-scroll class
    if (containerRef.current) {
      const animatedElements = containerRef.current.querySelectorAll(
        ".animation-on-scroll",
      );
      animatedElements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (containerRef.current) {
        const animatedElements = containerRef.current.querySelectorAll(
          ".animation-on-scroll",
        );
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full py-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 rounded-xl overflow-hidden relative"
    >
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
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            {
              title: "AI-Powered",
              icon: "🧠",
              description: "Smart recommend based on your progress",
            },
            {
              title: "Personalized",
              icon: "👤",
              description: "Tailored learning paths for your goals",
            },
            {
              title: "Interactive",
              icon: "🔄",
              description: "Engaging visualizations and exercises",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="animation-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border border-blue-100 dark:border-blue-900 h-full text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="text-xl mb-1 animate-bounce-slow">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-0.5 text-[10px]">
                  {feature.title}
                </h3>
                <p className="text-[9px] text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIFeatureShowcase;

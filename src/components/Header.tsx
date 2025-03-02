import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../store/themeStore";

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center">
        <div className="flex items-center">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <rect width="40" height="40" rx="8" fill="url(#gradient)" />
            {/* Brain shape */}
            <path 
              d="M20 10C15 10 12 13 12 17C12 20 14 22 14 24C14 26 12 28 12 30C12 32 14 34 18 34C22 34 24 30 24 28C24 26 22 24 22 22C22 20 24 18 24 16C24 12 23 10 20 10Z" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            {/* Neural network nodes */}
            <circle cx="20" cy="14" r="2" fill="white" />
            <circle cx="16" cy="18" r="2" fill="white" />
            <circle cx="24" cy="18" r="2" fill="white" />
            <circle cx="18" cy="22" r="2" fill="white" />
            <circle cx="22" cy="26" r="2" fill="white" />
            <circle cx="20" cy="30" r="2" fill="white" />
            
            {/* Neural network connections */}
            <path d="M20 16L16 18" stroke="white" strokeWidth="0.75" />
            <path d="M20 16L24 18" stroke="white" strokeWidth="0.75" />
            <path d="M16 20L18 22" stroke="white" strokeWidth="0.75" />
            <path d="M24 20L18 22" stroke="white" strokeWidth="0.75" />
            <path d="M18 24L22 26" stroke="white" strokeWidth="0.75" />
            <path d="M22 28L20 30" stroke="white" strokeWidth="0.75" />
            
            {/* Sparks of intelligence */}
            <path d="M30 13L32 11" stroke="white" strokeWidth="1" strokeLinecap="round" />
            <path d="M28 16L31 15" stroke="white" strokeWidth="1" strokeLinecap="round" />
            <path d="M29 19L32 20" stroke="white" strokeWidth="1" strokeLinecap="round" />
            
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="0.5" stopColor="#6366F1" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            AI Roadmap Generator
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;

const TopicDetail: React.FC<{ topic: string }> = ({ topic }) => {
  const [notes, setNotes] = React.useState('');
  const [selectedLanguage, setSelectedLanguage] = React.useState('english');
  const { setLanguage } = useRoadmapStore();


  const generateNotes = async () => {
    // Placeholder for AI note generation
    const generatedNotes = await fetch(`/api/notes?topic=${topic}&language=${selectedLanguage}`).then(res => res.text());
    setNotes(generatedNotes);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    generateNotes();
    setLanguage(e.target.value as Language); // Update global language state
  };

  return (
    <div>
      <h2>{topic}</h2>
      <div className="notes-container">
        <p>{notes}</p>
        <select value={selectedLanguage} onChange={handleLanguageChange} className="language-select">
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Placeholder CSS
const styles = `
.notes-container {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}

.language-select {
  margin-top: 10px;
  padding: 5px;
}
`;

const styleSheet = document.createElement('style');
styleSheet.innerHTML = styles;
document.head.appendChild(styleSheet);

export { TopicDetail };

//Missing type definition needs to be added for compilation.
type Language = string;
const languages = [{value: 'english', label: 'English'}]; //Example data, needs to be fetched or defined elsewhere.
const useRoadmapStore = () => ({setLanguage: (lang: Language) => {}}); // Placeholder for useRoadmapStore
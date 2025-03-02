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
            <path 
              d="M10 20C10 14.477 14.477 10 20 10C25.523 10 30 14.477 30 20C30 25.523 25.523 30 20 30" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <circle cx="30" cy="30" r="3" fill="white" />
            <circle cx="20" cy="20" r="3" fill="white" />
            <circle cx="10" cy="10" r="3" fill="white" />
            <path 
              d="M10 10L20 20L30 30" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
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
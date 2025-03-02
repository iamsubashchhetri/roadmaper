import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../store/themeStore";

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Tech Roadmap Generator
        </h1>
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
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRoadmapStore } from '../store/roadmapStore';
import { Language } from '../types';

const TopicDetail: React.FC = () => {
  const { selectedTopic, language, setLanguage } = useRoadmapStore();
  const [aiNotes, setAiNotes] = useState<string | null>(null);
  const [isGeneratingAiNotes, setIsGeneratingAiNotes] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previousTopic, setPreviousTopic] = useState<string | null>(null);

  // Effect to generate notes when a new topic is selected
  useEffect(() => {
    if (selectedTopic && 
        selectedTopic.data && 
        selectedTopic.data.label && 
        selectedTopic.data.label !== previousTopic) {
      console.log("Generating notes for new topic:", selectedTopic.data.label);
      generateAiNotes(selectedTopic.data.label);
      setPreviousTopic(selectedTopic.data.label);
    }
  }, [selectedTopic]);

  const generateAiNotes = async (topicLabel: string | undefined) => {
    if (!topicLabel || topicLabel.trim() === '') {
      console.warn("Cannot generate notes: Topic label is undefined or empty");
      setError("Please select a specific topic from the roadmap to generate notes.");
      return;
    }

    console.log("Generating notes for topic:", topicLabel);

    setIsGeneratingAiNotes(true);
    setError(null);
    setAiNotes(null); // Clear previous notes to ensure user sees new content

    try {
      // Import the generateNotesWithGemini function from geminiService
      const { generateNotesWithGemini } = await import('../services/geminiService');

      // Add a random string to ensure we're not getting cached results
      const uniqueId = Math.random().toString(36).substring(2, 15);

      console.log(`Generating AI notes for topic: ${topicLabel} (${uniqueId})`);

      const aiGeneratedNotes = await generateNotesWithGemini(
        topicLabel,
        language
      );

      if (!aiGeneratedNotes || aiGeneratedNotes.trim() === '') {
        throw new Error('Received empty notes from AI service');
      }

      setAiNotes(aiGeneratedNotes);
    } catch (error) {
      console.error("Error generating AI notes:", error);
      setAiNotes("Error generating notes. Please try again later.");
      setError("Failed to generate notes. Please try again.");
    } finally {
      setIsGeneratingAiNotes(false);
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    if (language !== newLanguage) {
      // First update the language in the store
      setLanguage(newLanguage);

      // Immediately re-generate notes for the same topic with the new language
      if (selectedTopic && selectedTopic.data && selectedTopic.data.label) {
        console.log("Regenerating notes for language change:", newLanguage);
        // Force regeneration by clearing previous state
        setAiNotes(null);
        setIsGeneratingAiNotes(true);

        // Use the new language directly in the API call to ensure correct language is used
        import('../services/geminiService').then(({ generateNotesWithGemini }) => {
          generateNotesWithGemini(selectedTopic.data.label, newLanguage)
            .then(notes => {
              setAiNotes(notes);
              setPreviousTopic(selectedTopic.data.label); // Update previous topic
            })
            .catch(error => {
              console.error("Error generating notes with new language:", error);
              setError("Failed to generate notes in the selected language. Please try again.");
            })
            .finally(() => {
              setIsGeneratingAiNotes(false);
            });
        });
      }
    }
  };

  const languages: { key: Language; label: string }[] = [
    { key: "english", label: "English" },
    { key: "spanish", label: "Español" },
    { key: "french", label: "Français" },
    { key: "nepali", label: "नेपाली" },
  ];

  if (!selectedTopic) {
    return null;
  }

  // Extract topic name even if data property is missing
  const topicName = selectedTopic 
    ? (selectedTopic.data?.label || selectedTopic.id || "Unknown Topic") 
    : "No Topic Selected";

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        {topicName}
      </h2>

      <div className="space-y-6">
        {/* Topic details section */}
        {selectedTopic.data && selectedTopic.data.description && (
          <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <p className="text-gray-700 dark:text-gray-300">
              {selectedTopic.data.description}
            </p>
          </div>
        )}

        {/* AI-Generated Notes section with language selector */}
        {selectedTopic && selectedTopic.data && selectedTopic.data.label && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 border-b pb-3 border-gray-200 dark:border-gray-700 gap-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white text-center md:text-left w-full">
                AI-Generated Learning Notes for: {selectedTopic.data.label || 'No Topic Selected'}
              </h3>
              <div className="flex items-center space-x-2 md:space-x-3">
                <label htmlFor="language-select" className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                  Language:
                </label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-1 md:py-2 px-2 md:px-3 text-sm md:text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.key} value={lang.key}>
                      {lang.label} + English Mix
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isGeneratingAiNotes ? (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg mx-auto max-w-4xl">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-6"></div>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-center text-lg">
                  Generating in-depth learning notes for<br />
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-xl">"{selectedTopic.data.label}"</span><br />
                  in a mix of English and {language}...
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  This may take 15-30 seconds for detailed content
                </p>
              </div>
            ) : aiNotes ? (
              <div className="prose dark:prose-invert max-w-4xl mx-auto p-8 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
                <ReactMarkdown>{aiNotes}</ReactMarkdown>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center mx-auto max-w-4xl p-4">{error}</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;
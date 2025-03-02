import React, { useState, useEffect } from "react";
import { useRoadmapStore } from "../store/roadmapStore";
import ReactMarkdown from "react-markdown";
import { Language } from "../types";


const TopicDetail: React.FC = () => {
  const { selectedTopic, fetchTopicContent, language, setLanguage } =
    useRoadmapStore();
  const [content, setContent] = useState<string | null>(null);
  const [aiNotes, setAiNotes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingAiNotes, setIsGeneratingAiNotes] = useState(false);
  const [error, setError] = useState<string | null>(null); // Added error state

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);

      if (!selectedTopic) {
        // Nothing selected
        setIsLoading(false);
      } else if (!selectedTopic.data) {
        // Try to recover with topic ID if available
        if (selectedTopic.id) {
          try {
            // Extract a meaningful topic name from the ID if possible
            let topicName = selectedTopic.id;
            // If ID is like "topic-1740879314840", try to clean it up
            if (topicName.includes('-')) {
              // For auto-generated IDs, use a generic but more meaningful name
              if (/topic-\d+/.test(topicName)) {
                topicName = "Programming Concept"; // Default generic topic name
              } else {
                // For other IDs that might contain meaningful info, clean them up
                topicName = topicName
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
              }
            }

            // Create fallback data structure with better label
            const fallbackTopic = {
              ...selectedTopic,
              data: {
                label: topicName,
                description: ""
              }
            };

            try {
              const updatedTopic = await fetchTopicContent(fallbackTopic, language);
              setContent(updatedTopic.content || `Content for ${topicName}`);
              // Generate AI notes with the more meaningful name
              generateAiNotes(topicName);
              setIsLoading(false);
            } catch (err) {
              console.error("Error with fallback topic:", err);
              setError(`Could not load topic: ${err.message}`);
              setIsLoading(false);
            }
          } catch (err) {
            setError(`Topic data structure is incomplete, but attempted recovery`);
            setIsLoading(false);
          }
        } else {
          setError("Selected topic has incomplete data structure");
          setIsLoading(false);
        }
      } else {
        // Normal case - topic has data with label
        try {
          const updatedTopic = await fetchTopicContent(selectedTopic, language);
          setContent(updatedTopic.content || "");
          // Pass the topic label to generate AI notes
          generateAiNotes(selectedTopic.data.label);
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching topic content:", err);
          setError(`Error fetching topic content: ${err.message}`);
          setIsLoading(false);
        }
      }
    };

    fetchContent();
  }, [selectedTopic, language, fetchTopicContent]);

  const generateAiNotes = async (topicLabel: string | undefined) => {
    if (!topicLabel) {
      console.warn("Cannot generate notes: Topic label is undefined");
      setError("Cannot generate notes: Topic label is undefined");
      return;
    }

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
    setLanguage(newLanguage);
    if (selectedTopic && selectedTopic.data && selectedTopic.data.label) {
      generateAiNotes(selectedTopic.data.label);
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

      <div className="topic-notes">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Loading...
            </p>
          </div>
        ) : content ? (
          <div className="prose dark:prose-invert max-w-none markdown-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Select a topic from the roadmap to view detailed notes.
            </p>
          </div>
        )}

        {/* AI-Generated Notes section with language selector */}
        {selectedTopic && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4 border-b pb-3 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                AI-Generated Learning Notes
              </h3>

              {/* Language selector */}
              <div className="flex items-center space-x-2">
                {/* import('react-globe.gl').then(module => module.default) component needs to be imported and rendered here */}
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.key}
                      onClick={() => handleLanguageChange(lang.key)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        language === lang.key
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isGeneratingAiNotes ? (
              <div className="flex flex-col items-center justify-center py-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mb-3"></div>
                <p className="text-gray-500 dark:text-gray-400">
                  Generating comprehensive notes in {language}...
                </p>
              </div>
            ) : aiNotes ? (
              <div className="prose dark:prose-invert max-w-none p-5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <ReactMarkdown>{aiNotes}</ReactMarkdown>
              </div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetail;
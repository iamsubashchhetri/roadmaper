
import React, { useState, useEffect } from "react";
import { useRoadmapStore } from "../store/roadmapStore";
import { marked } from "marked";
import { generateNotesWithGemini } from "../services/geminiService";
import { Language } from "../types/language";
import { Loader2 } from "lucide-react";

const TopicDetail = () => {
  const { selectedTopic, language, setLanguage, notesByTopic } = useRoadmapStore();
  const [isLoading, setIsLoading] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [followUpResponses, setFollowUpResponses] = useState<string[]>([]);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false);

  useEffect(() => {
    // Reset follow-up responses when topic changes
    setFollowUpResponses([]);
    setFollowUpQuestion("");
  }, [selectedTopic]);

  const fetchNotes = async () => {
    if (!selectedTopic) return;
    
    try {
      setIsLoading(true);
      const notes = await generateNotesWithGemini(selectedTopic, language);
      useRoadmapStore.getState().setNotes(selectedTopic, notes);
    } catch (error) {
      console.error("Error generating notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTopic && !notesByTopic[selectedTopic]) {
      fetchNotes();
    }
  }, [selectedTopic, language]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as Language;
    setLanguage(newLanguage);
  };

  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuestion.trim() || !selectedTopic) return;

    try {
      setIsFollowUpLoading(true);
      
      // Generate follow-up content based on the question and original topic
      const response = await generateNotesWithGemini(
        `${selectedTopic} - Specifically about: ${followUpQuestion}`, 
        language
      );
      
      // Add the new response to the list
      setFollowUpResponses([...followUpResponses, response]);
      
      // Clear the question input
      setFollowUpQuestion("");
    } catch (error) {
      console.error("Error generating follow-up response:", error);
    } finally {
      setIsFollowUpLoading(false);
    }
  };

  if (!selectedTopic) {
    return (
      <div className="bg-white/95 dark:bg-gray-800/95 rounded-xl shadow-lg p-6 h-full">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Select a topic from the roadmap to view detailed notes
        </p>
      </div>
    );
  }

  // Clean the topic string to remove any ID prefixes like "topic-1234567890"
  const displayTopic = selectedTopic.replace(/^topic-\d+\s*/, "").trim();

  return (
    <div className="bg-white/95 dark:bg-gray-800/95 rounded-xl shadow-lg p-6 overflow-auto h-[calc(100vh-12rem)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {displayTopic}
        </h2>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="px-3 py-1 rounded-md text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="japanese">Japanese</option>
          <option value="chinese">Chinese</option>
        </select>
      </div>

      <div className="topic-notes">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              Generating comprehensive notes...
            </span>
          </div>
        ) : notesByTopic[selectedTopic] ? (
          <div
            className="markdown-content prose prose-indigo dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: marked(notesByTopic[selectedTopic]),
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 dark:text-gray-400">
              No notes available for this topic yet
            </p>
          </div>
        )}
      </div>

      {/* Follow-up responses section */}
      {followUpResponses.length > 0 && (
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Follow-up Information
          </h3>
          {followUpResponses.map((response, index) => (
            <div 
              key={index} 
              className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div
                className="markdown-content prose prose-indigo dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: marked(response),
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Follow-up question form */}
      {notesByTopic[selectedTopic] && (
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Ask a Follow-up Question
          </h3>
          <form onSubmit={handleFollowUpSubmit} className="flex flex-col space-y-3">
            <textarea
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              placeholder="Ask a specific question about this topic..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              rows={3}
            />
            <button
              type="submit"
              disabled={isFollowUpLoading || !followUpQuestion.trim()}
              className={`px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center ${
                isFollowUpLoading || !followUpQuestion.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-700"
              }`}
            >
              {isFollowUpLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                "Submit Question"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TopicDetail;

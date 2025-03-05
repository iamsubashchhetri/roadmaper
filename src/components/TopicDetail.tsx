import React, { useState, useEffect } from "react";
import { useRoadmapStore } from "../store/roadmapStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { generateNotesWithGemini } from "../services/geminiService";
import { Loader2 } from "lucide-react";

const TopicDetail: React.FC = () => {
  const { selectedTopic, language, fetchTopicContent, setNotes, notesByTopic } = useRoadmapStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followUpQuestion, setFollowUpQuestion] = useState<string>("");
  const [conversations, setConversations] = useState<{ type: "note" | "question" | "answer", content: string }[]>([]);

  useEffect(() => {
    if (selectedTopic) {
      generateNotes();
    }
  }, [selectedTopic, language]);

  const generateNotes = async () => {
    if (!selectedTopic || !selectedTopic.data || !selectedTopic.data.label) {
      return;
    }

    setIsLoading(true);
    try {
      // Check if we already have notes for this topic
      if (notesByTopic[selectedTopic.id]) {
        setConversations([{ type: "note", content: notesByTopic[selectedTopic.id] }]);
        setIsLoading(false);
        return;
      }

      // Generate new notes using Gemini API
      const topicLabel = selectedTopic.data.label;
      const result = await fetchTopicContent(selectedTopic);

      if (result && result.content) {
        // Store notes in the store
        setNotes(selectedTopic.id, result.content);

        // Update local state
        setConversations([{ type: "note", content: result.content }]);
      } else {
        throw new Error("Failed to fetch topic content");
      }
    } catch (error) {
      console.error("Error generating notes:", error);
      setConversations([{ 
        type: "note", 
        content: "# Error\nFailed to generate notes for this topic. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUpQuestion = async () => {
    if (!followUpQuestion.trim() || !selectedTopic) return;

    // Add user question to conversations
    setConversations([...conversations, { type: "question", content: followUpQuestion }]);

    const question = followUpQuestion;
    setFollowUpQuestion(""); // Clear input
    setIsLoading(true);

    try {
      // Get the previous content to provide context for the follow-up question
      const previousContent = conversations.length > 0 
        ? conversations.filter(conv => conv.type === "note" || conv.type === "answer")
          .map(conv => conv.content)
          .join("\n\n")
        : "";

      // Make sure we have a valid topic label
      const topicLabel = selectedTopic?.data?.label || "the selected topic";

      // Call the Gemini API to generate an answer using the service
      const answer = await generateFollowUpResponse(
        topicLabel, 
        previousContent,
        question
      );

      // Add AI answer to conversations
      setConversations(prev => [...prev, { type: "answer", content: answer }]);
    } catch (error) {
      console.error("Error generating answer:", error);
      setConversations(prev => [...prev, { 
        type: "answer", 
        content: "Failed to generate an answer. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedTopic) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Select a topic from the roadmap to view detailed notes
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        {selectedTopic.data.label}
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Generating content...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {conversations.map((item, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg ${
                item.type === "question" 
                  ? "bg-blue-50 dark:bg-blue-900/20" 
                  : "bg-gray-50 dark:bg-gray-700/30"
              }`}
            >
              {item.type === "question" && (
                <div className="font-medium text-indigo-600 dark:text-indigo-400 mb-1">Your question:</div>
              )}
              <div className="markdown-content">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {item.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
              Ask a follow-up question
            </h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleFollowUpQuestion();
                  }
                }}
              />
              <button
                onClick={handleFollowUpQuestion}
                disabled={isLoading || !followUpQuestion.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicDetail;

import React, { useState, useEffect } from "react";
import { useRoadmapStore } from "../store/roadmapStore";
import { marked } from "marked";
import { Language } from "../types/language";
import { Loader2, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const TopicDetail: React.FC = () => {
  const { selectedTopic, selectedTopicLabel, language, setLanguage } = useRoadmapStore();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followUpQuestion, setFollowUpQuestion] = useState<string>("");
  const [conversations, setConversations] = useState<{ type: "note" | "question" | "answer", content: string }[]>([]);

  useEffect(() => {
    if (selectedTopic) {
      generateNotes(selectedTopic);
    }
  }, [selectedTopic, language]);

  const generateNotes = async (topic: string) => {
    setIsLoading(true);
    try {
      // This is a placeholder - replace with your actual implementation
      // const notes = await generateNotesWithGemini(topic, language);
      
      // Placeholder for demo
      const notes = `# ${selectedTopicLabel || topic}
      
Here are some key points about this topic:

- This is an important concept in the field
- Understanding this will help you master related topics
- Practice is essential for mastering this skill

## Getting Started

Begin by familiarizing yourself with the fundamentals...`;
      
      setTimeout(() => {
        setContent(notes);
        setConversations([{ type: "note", content: notes }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error generating notes:", error);
      setContent("Failed to generate notes. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleFollowUpQuestion = async () => {
    if (!followUpQuestion.trim()) return;
    
    const question = followUpQuestion.trim();
    setConversations([...conversations, { type: "question", content: question }]);
    setFollowUpQuestion("");
    setIsLoading(true);
    
    try {
      // This is a placeholder - replace with your actual implementation
      // const answer = await generateAnswerWithGemini(question, selectedTopic, language);
      
      // Placeholder for demo
      const answer = `Here's additional information on your question about ${selectedTopicLabel || selectedTopic}:

1. This relates to the core concepts we discussed earlier
2. Many experienced professionals recommend focusing on practical applications
3. You might want to look into related areas as well for a comprehensive understanding`;
      
      setTimeout(() => {
        setConversations([...conversations, { type: "question", content: question }, { type: "answer", content: answer }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error generating answer:", error);
      setConversations([...conversations, { type: "question", content: question }, { type: "answer", content: "Failed to generate an answer. Please try again later." }]);
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
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-auto topic-notes">
      {isLoading && conversations.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">Generating notes...</span>
        </div>
      ) : (
        <>
          <div className="prose dark:prose-invert w-full max-w-none mb-6">
            {conversations.map((item, index) => (
              <div key={index} className={`mb-4 ${item.type === "question" ? "bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg" : ""}`}>
                {item.type === "question" && (
                  <div className="font-medium text-indigo-600 dark:text-indigo-400 mb-1">Your question:</div>
                )}
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  className="markdown-content"
                >
                  {item.content}
                </ReactMarkdown>
              </div>
            ))}
          </div>
          
          <div className="mt-6 border-t dark:border-gray-700 pt-4">
            <div className="flex items-center">
              <input
                type="text"
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                placeholder="Ask a follow-up question about this topic..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleFollowUpQuestion()}
                disabled={isLoading}
              />
              <button
                onClick={handleFollowUpQuestion}
                disabled={isLoading || !followUpQuestion.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Language: 
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="ml-2 bg-gray-100 dark:bg-gray-700 border-none rounded p-1"
            disabled={isLoading}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
            <option value="chinese">Chinese</option>
            <option value="japanese">Japanese</option>
            <option value="korean">Korean</option>
            <option value="arabic">Arabic</option>
            <option value="russian">Russian</option>
            <option value="portuguese">Portuguese</option>
            <option value="italian">Italian</option>
            <option value="dutch">Dutch</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;

import React, { useState, useEffect } from "react";
import { useRoadmapStore } from "../store/roadmapStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { generateNotesWithGemini } from "../services/geminiService";
import { Loader2, Copy } from "lucide-react"; 
import EmptyStateAnimation from './EmptyStateAnimation';
import ProjectFeatureShowcase from "./ProjectFeatureShowcase"; 
import AIFeatureShowcase from "./AIFeatureShowcase"; 

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-mono text-gray-600 dark:text-gray-400`}>
          {language ? `${language}` : "Code"}
        </span>
        <button onClick={handleCopy} className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
          <Copy className="h-4 w-4" />
          {copied && <span className="ml-1 text-xs">Copied!</span>}
        </button>
      </div>
      <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800 dark:text-gray-200">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const TopicDetail: React.FC = () => {
  const { selectedTopic, language, fetchTopicContent, setNotes, notesByTopic } = useRoadmapStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followUpQuestion, setFollowUpQuestion] = useState<string>("");
  const [conversations, setConversations] = useState<{ type: "note" | "question" | "answer", content: string }[]>([]);
  const [showToast, setShowToast] = useState(false); // Added toast state


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
      if (notesByTopic[selectedTopic.id]) {
        setConversations([{ type: "note", content: notesByTopic[selectedTopic.id] }]);
        setIsLoading(false);
        return;
      }

      const topicLabel = selectedTopic.data.label;
      const result = await fetchTopicContent(selectedTopic);

      if (result && result.content) {
        setNotes(selectedTopic.id, result.content);
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

    const question = followUpQuestion;
    setFollowUpQuestion(""); 
    setIsLoading(true);

    try {
      const previousContent = conversations.length > 0 
        ? conversations[0].content 
        : "";

      const topicLabel = selectedTopic?.data?.label || "the selected topic";
      const { generateFollowUpResponse } = await import('../services/geminiService');

      const answer = await generateFollowUpResponse(
        topicLabel, 
        previousContent,
        question
      );

      if (conversations.length > 0) {
        const updatedContent = `${conversations[0].content}\n\n## Your question: ${question}\n\n${answer}`;
        setConversations([{ type: "note", content: updatedContent }]);
      }
    } catch (error) {
      console.error("Error generating answer:", error);
      if (conversations.length > 0) {
        const updatedContent = `${conversations[0].content}\n\n## Your question: ${question}\n\n**Error:** Failed to generate an answer. Please try again later.`;
        setConversations([{ type: "note", content: updatedContent }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setShowToast(true); // Show toast on successful copy
        setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
      })
      .catch(err => console.error("Failed to copy: ", err));
  };

  // Function to process content and wrap code blocks with our CodeBlock component
  const processContent = (content: string) => {
    // Simple regex to detect code blocks (this is a basic implementation)
    const codeBlockRegex = /```([a-z]*)\n([\s\S]*?)```/g;

    // Split content by code blocks
    const parts = content.split(codeBlockRegex);

    if (parts.length === 1) {
      // No code blocks found
      return <p>{content}</p>;
    }

    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < parts.length) {
      if (i % 3 === 0) {
        // Regular text
        if (parts[i]) {
          elements.push(<p key={`text-${i}`}>{parts[i]}</p>);
        }
      } else if (i % 3 === 1) {
        // Language identifier (might be empty)
        const language = parts[i];
        const code = parts[i + 1];
        elements.push(
          <CodeBlock 
            key={`code-${i}`} 
            code={code} 
            language={language || undefined} 
          />
        );
        i++; // Skip the code part as we've already used it
      }
      i++;
    }

    return <>{elements}</>;
  };

  if (!selectedTopic) {
    return (
      <div className="flex-1 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-calc-100vh-8rem overflow-y-auto p-6">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center mb-8">
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-4">
                Select a topic from the roadmap to view detailed notes
              </p>
              <div className="w-40 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
            </div>
            <div className="w-full max-w-4xl">
              <ProjectFeatureShowcase />
              <div className="mt-8"> 
                <AIFeatureShowcase />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md relative"> {/* Added relative for toast */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded shadow-md">
          Content copied to clipboard!
        </div>
      )}
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
              <div className="flex justify-between items-center mb-2"> 
                {item.type === "question" && (
                  <div className="font-medium text-indigo-600 dark:text-indigo-400 mb-1">Your question:</div>
                )}
                <button onClick={() => copyToClipboard(item.content, "Content copied to clipboard!")} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"> 
                  <Copy className="h-4 w-4"/>
                </button>
              </div>
              <div className="markdown-content relative"> {/*Added relative for button*/}
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    p: processContent
                  }}
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
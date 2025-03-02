export type Language = 'english' | 'nepali' | 'spanish' | 'french';

export interface Node {
  id: string;
  type?: string;
  data: {
    label: string;
    description?: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

export interface Topic {
  id: string;
  data: {
    label: string;
    description?: string;
  };
  type?: string;
  content?: string;
}

export interface RoadmapGenerationRequest {
  role: string;
  level?: string; 
  language: Language; 
}

import React, { useState, useEffect } from 'react';

const TopicDetail = ({ topicId, selectedLanguage }: { topicId: string; selectedLanguage: Language }) => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/topic/${topicId}?language=${selectedLanguage}`);
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent("Error loading content.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [topicId, selectedLanguage]);

  return (
    <div>
      {isLoading ? <p>Content is being generated...</p> : (
        content ? <p>{content}</p> : <p>No content found.</p>
      )}
    </div>
  );
};

const RoadmapSelector = ({ selectedLanguage }: { selectedLanguage: Language}) => {
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const generateRoadmap = async () => {
        const response = await fetch('/api/roadmap', {
            method: 'POST',
            body: JSON.stringify({ language: selectedLanguage }),
            headers: { 'Content-Type': 'application/json' }
          });
        const data = await response.json();
        setRoadmap(data);
    }

    return (
        <div>
            <button onClick={generateRoadmap}>Generate Roadmap</button>
            {roadmap && <div>Generated Roadmap: {JSON.stringify(roadmap)}</div>}
        </div>
    )
}

const geminiService = {
  generateRoadmap: async (request: RoadmapGenerationRequest): Promise<Roadmap> => {
    console.log('Generating roadmap with language:', request.language);
    return { id: '1', title: 'Example Roadmap', description: 'Generated roadmap', nodes: [], edges: [] };
  },
  generateTopicContent: async (topicId: string, language: Language): Promise<string> => {
    console.log('Generating content for topic', topicId, 'in language:', language);
    return "This is sample content.";
  },
};

export { TopicDetail, RoadmapSelector, geminiService };
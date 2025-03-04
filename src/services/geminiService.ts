import { Roadmap, RoadmapGenerationRequest, Topic, Language } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyApHWVU-ozOdkE-zllCXuBR_m9kioHK5Wg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const languageInstructions: Record<Language, string> = {
  english: 'Provide the content entirely in English',
  nepali: 'Create a truly integrated bilingual learning experience by naturally mixing Nepali and English throughout the content. Do not create separate sections for each language. Instead, weave both languages together, with approximately 60% Nepali and 40% English. Include English terms for all technical concepts and code examples, but explain concepts in a flowing mix of both languages. This natural language mix will help Nepali-speaking developers learn in a more intuitive way.',
  spanish: 'Create a truly integrated bilingual learning experience by naturally mixing Spanish and English throughout the content. Do not create separate sections for each language. Instead, weave both languages together, with approximately 60% Spanish and 40% English. Include English terms for all technical concepts and code examples, but explain concepts in a flowing mix of both languages. This natural language mix will help Spanish-speaking developers learn in a more intuitive way.',
  french: 'Create a truly integrated bilingual learning experience by naturally mixing French and English throughout the content. Do not create separate sections for each language. Instead, weave both languages together, with approximately 60% French and 40% English. Include English terms for all technical concepts and code examples, but explain concepts in a flowing mix of both languages. This natural language mix will help French-speaking developers learn in a more intuitive way.'
};

export const generateNotesWithGemini = async (topic: string, language: Language): Promise<string> => {
  try {
    // Here you would make an actual API call to Gemini
    // For demo purposes, we'll create some structured content

    return `# ${topic}

## Overview
${topic} is a critical concept in modern development. Understanding this topic thoroughly will help you build more robust applications.

## Key Points
- ${topic} provides essential functionality for application development
- Learning ${topic} thoroughly will improve your overall skills
- Best practices for ${topic} include proper structuring and optimization

## Next Steps
After mastering ${topic}, you should explore related concepts to deepen your knowledge.

## Resources
- Official documentation for ${topic}
- Community guides and tutorials
- Practice exercises to reinforce learning
`;
  } catch (error) {
    console.error("Error generating notes with Gemini:", error);
    throw error;
  }
};

// Default roadmap data when API fails
const getDefaultRoadmap = (role: string): Roadmap => {
  return {
    id: 'default',
    title: `${role} Roadmap (Default)`,
    description: 'Could not generate a custom roadmap. Using default instead.',
    nodes: [
      {
        id: '1',
        type: 'input',
        data: { label: 'Start Here', description: 'Beginning of your learning journey' },
        position: { x: 0, y: 0 }
      },
      {
        id: '2',
        data: { label: 'Basic Concepts', description: 'Learn fundamental concepts' },
        position: { x: 0, y: 100 }
      },
      {
        id: '3',
        data: { label: 'Advanced Topics', description: 'Explore advanced topics' },
        position: { x: 0, y: 200 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' }
    ]
  };
};

export const generateRoadmapWithGemini = async ({ role }: RoadmapGenerationRequest): Promise<Roadmap> => {
  console.log('Generating roadmap for role:', role);

  const prompt = `Create a comprehensive learning roadmap for someone who wants to become a ${role}. 
  Format your response as a JSON object with the following structure:
  {
    "nodes": [
      { 
        "id": "1", 
        "type": "input", 
        "data": { 
          "label": "Start Here: ${role}", 
          "description": "Beginning of your journey to become a ${role}"
        },
        "position": { "x": 0, "y": 0 } 
      },
      ...more nodes
    ],
    "edges": [
      { "id": "e1-2", "source": "1", "target": "2" },
      ...more edges
    ]
  }

  Include 10-15 nodes covering the most important topics, skills, and technologies that need to be learned.
  Make each node's label concise (2-5 words) and provide a brief description (1-2 sentences) for each.
  Arrange nodes in a logical learning sequence with proper edges connecting prerequisites to advanced topics.
  Position nodes in a way that would create a visually pleasing flow chart (varying x and y coordinates).`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Gemini API error:', data.error);
      // Return dummy data if there's an error
      return getDefaultRoadmap(role);
    }

    try {
      const rawContent = data.candidates[0].content.parts[0].text;
      // Extract JSON from the response
      const jsonStr = rawContent.replace(/```json|```/g, '').trim();
      const roadmapData = JSON.parse(jsonStr);

      return {
        id: Date.now().toString(),
        title: `${role} Roadmap`,
        description: `A learning roadmap for becoming a ${role}`,
        nodes: roadmapData.nodes || [],
        edges: roadmapData.edges || [],
      };
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      return getDefaultRoadmap(role);
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return getDefaultRoadmap(role);
  }
};
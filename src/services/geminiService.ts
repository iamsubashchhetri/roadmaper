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
  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is missing");
    return "# Error\n\nAPI key is missing. Please set the VITE_GEMINI_API_KEY environment variable.";
  }

  // Clean the topic string to remove any ID prefixes like "topic-1234567890"
  const cleanedTopic = topic.replace(/^topic-\d+\s*/, '').trim();

  console.log("Generating notes for cleaned topic:", cleanedTopic);

  const prompt = `Generate comprehensive, in-depth learning notes for the topic: "${cleanedTopic}" in ${language}.
  ${languageInstructions[language]}

Format the notes with the following structure:
    1. Topic introduction and its importance in the field (150-200 words)
    2. Key concepts and fundamentals (300-400 words with clear explanations)
    3. Prerequisites or related topics that should be understood first (with brief explanation of how they connect)
    4. Practical applications with 4-6 detailed code examples (ensure examples are properly formatted with markdown code blocks and include thorough comments explaining each part)
    5. Advanced concepts with real-world scenarios (300-400 words)
    6. Resources for further learning (specific books, courses, documentation, projects, and GitHub repositories)
    7. Common challenges with detailed solutions and workarounds (150-200 words)
    8. End with a summary of key takeaways and next steps for learning

  Important notes:
    - This is for a roadmap learning application where users select specific topics from a flowchart
    - The selected topic is: "${cleanedTopic}" - focus ONLY on this exact topic in depth
    - If the topic appears generic or unclear, focus on the most relevant interpretation in programming/tech context
    - The notes will be displayed directly in the application, so ensure they're well-formatted with markdown
    - Include at least 1500-2000 words of content to ensure comprehensive coverage
    - Provide detailed code examples that are practical, realistic, and directly applicable to real development scenarios
    - Include diagrams or visual explanations using ASCII art or markdown tables where appropriate
    - Make sure examples show both basic and advanced usage patterns
    - Include best practices, common pitfalls to avoid, and optimization techniques
    - When applicable, mention differences between versions/frameworks/approaches
    - Each time this prompt is called, generate UNIQUE content specific to this topic

  Generate completely new content for this specific request timestamp: ${Date.now()}`;

  const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
          temperature: 0.9,  // Slightly higher for more creativity
          topK: 40,          // Increase variety of responses
          topP: 0.95,        // Slightly reduced for more focused results
          maxOutputTokens: 4096 // Ensure we get substantial content
        }
      })
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        return `# ${topic}\n\nError generating content: ${errorData.error?.message || 'Unknown error'}`;
      } catch (e) {
        console.error('Error parsing error response:', e);
        return `# ${topic}\n\nError generating content: Status ${response.status}`;
      }
    }

    try {
      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return generatedText || `# ${topic}\n\nNo content was generated. Please try again.`;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return `# ${topic}\n\nError processing response: ${error.message || 'Unknown error'}`;
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return `# ${topic}\n\nError generating content: ${error instanceof Error ? error.message : 'Unknown error'}`;
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
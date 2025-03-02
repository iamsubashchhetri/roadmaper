import { Roadmap, RoadmapGenerationRequest, RoadmapNode, RoadmapEdge } from '../types';

// This is a mock implementation. In a real application, this would call an AI API
export const generateRoadmap = async (request: RoadmapGenerationRequest): Promise<Roadmap> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { role, level } = request;
  const sanitizedRole = role.toLowerCase().replace(/[^a-z0-9]/g, '-');

  // Generate a unique ID for the roadmap
  const id = `${sanitizedRole}-${level}-${Date.now()}`;

  // Create nodes based on the role
  const nodes: RoadmapNode[] = [];
  const edges: RoadmapEdge[] = [];

  // Root node
  nodes.push({
    id: '1',
    type: 'input',
    data: { 
      label: `${role} Fundamentals`,
      description: `Core concepts and principles of ${role}`
    },
    position: { x: 0, y: 0 } // Initial position, adjusted later for vertical layout
  });

  // Generate different nodes based on the role
  if (role.toLowerCase().includes('developer') || role.toLowerCase().includes('engineer')) {
    // Programming path
    nodes.push(
      {
        id: '2',
        type: 'default',
        data: { 
          label: 'Programming Fundamentals',
          description: 'Core programming concepts and data structures'
        },
        position: { x: 0, y: 100 }
      },
      {
        id: '3',
        type: 'default',
        data: { 
          label: 'Tools & Environment',
          description: 'Development tools, IDEs, and version control'
        },
        position: { x: 0, y: 200 }
      },
      {
        id: '4',
        type: 'default',
        data: { 
          label: 'Frameworks & Libraries',
          description: 'Popular frameworks and libraries for the role'
        },
        position: { x: 0, y: 300 }
      },
      {
        id: '5',
        type: 'default',
        data: { 
          label: 'Best Practices',
          description: 'Coding standards, testing, and documentation'
        },
        position: { x: 0, y: 400 }
      },
      {
        id: '6',
        type: 'default',
        data: { 
          label: 'Architecture & Design',
          description: 'System design, patterns, and architecture'
        },
        position: { x: 0, y: 500 }
      },
      {
        id: '7',
        type: 'output',
        data: { 
          label: 'Advanced Topics',
          description: 'Performance optimization, security, and scalability'
        },
        position: { x: 0, y: 600 }
      }
    );
  } else if (role.toLowerCase().includes('data') || role.toLowerCase().includes('analyst')) {
    // Data path
    nodes.push(
      {
        id: '2',
        type: 'default',
        data: { 
          label: 'Data Collection',
          description: 'Methods for gathering and preprocessing data'
        },
        position: { x: 0, y: 100 }
      },
      {
        id: '3',
        type: 'default',
        data: { 
          label: 'Data Analysis',
          description: 'Techniques for exploring and analyzing data'
        },
        position: { x: 0, y: 200 }
      },
      {
        id: '4',
        type: 'default',
        data: { 
          label: 'Data Visualization',
          description: 'Creating effective visualizations and dashboards'
        },
        position: { x: 0, y: 300 }
      },
      {
        id: '5',
        type: 'default',
        data: { 
          label: 'Statistical Methods',
          description: 'Statistical analysis and hypothesis testing'
        },
        position: { x: 0, y: 400 }
      },
      {
        id: '6',
        type: 'default',
        data: { 
          label: 'Tools & Technologies',
          description: 'Software and platforms for data analysis'
        },
        position: { x: 0, y: 500 }
      },
      {
        id: '7',
        type: 'output',
        data: { 
          label: 'Advanced Analytics',
          description: 'Predictive modeling, machine learning, and big data'
        },
        position: { x: 0, y: 600 }
      }
    );
  } else if (role.toLowerCase().includes('design') || role.toLowerCase().includes('ux')) {
    // Design path
    nodes.push(
      {
        id: '2',
        type: 'default',
        data: { 
          label: 'Design Principles',
          description: 'Fundamental principles of visual design'
        },
        position: { x: 0, y: 100 }
      },
      {
        id: '3',
        type: 'default',
        data: { 
          label: 'User Research',
          description: 'Methods for understanding user needs and behaviors'
        },
        position: { x: 0, y: 200 }
      },
      {
        id: '4',
        type: 'default',
        data: { 
          label: 'Wireframing & Prototyping',
          description: 'Creating low and high-fidelity prototypes'
        },
        position: { x: 0, y: 300 }
      },
      {
        id: '5',
        type: 'default',
        data: { 
          label: 'Design Systems',
          description: 'Creating and maintaining design systems'
        },
        position: { x: 0, y: 400 }
      },
      {
        id: '6',
        type: 'default',
        data: { 
          label: 'Design Tools',
          description: 'Software and tools for design work'
        },
        position: { x: 0, y: 500 }
      },
      {
        id: '7',
        type: 'output',
        data: { 
          label: 'Advanced UX Concepts',
          description: 'Accessibility, internationalization, and emerging trends'
        },
        position: { x: 0, y: 600 }
      }
    );
  } else {
    // Generic path
    nodes.push(
      {
        id: '2',
        type: 'default',
        data: { 
          label: 'Core Skills',
          description: `Essential skills for ${role}`
        },
        position: { x: 0, y: 100 }
      },
      {
        id: '3',
        type: 'default',
        data: { 
          label: 'Tools & Technologies',
          description: `Key tools and technologies for ${role}`
        },
        position: { x: 0, y: 200 }
      },
      {
        id: '4',
        type: 'default',
        data: { 
          label: 'Best Practices',
          description: `Industry standards and best practices for ${role}`
        },
        position: { x: 0, y: 300 }
      },
      {
        id: '5',
        type: 'default',
        data: { 
          label: 'Specializations',
          description: `Different specializations within ${role}`
        },
        position: { x: 0, y: 400 }
      },
      {
        id: '6',
        type: 'default',
        data: { 
          label: 'Career Growth',
          description: `Advancing your career as a ${role}`
        },
        position: { x: 0, y: 500 }
      },
      {
        id: '7',
        type: 'output',
        data: { 
          label: 'Advanced Topics',
          description: `Cutting-edge topics and future trends for ${role}`
        },
        position: { x: 0, y: 600 }
      }
    );
  }

  // Add edges to connect the nodes
  edges.push(
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5' },
    { id: 'e5-6', source: '5', target: '6' },
    { id: 'e6-7', source: '6', target: '7', animated: true }
  );

  // Adjust complexity based on level
  if (level === 'advanced') {
    // Add more advanced nodes
    nodes.push({
      id: '8',
      type: 'default',
      data: { 
        label: 'Research & Innovation',
        description: `Cutting-edge research and innovation in ${role}`
      },
      position: { x: 0, y: 700 }
    });

    edges.push({ id: 'e7-8', source: '7', target: '8', animated: true });
  }

  return {
    id,
    title: `${role} Roadmap (${level.charAt(0).toUpperCase() + level.slice(1)})`,
    description: `AI-generated roadmap for becoming a ${role} at the ${level} level`,
    nodes,
    edges
  };
};

// Mock function to generate content for a topic
export const generateTopicContent = async (topic: string, role: string): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // In a real application, this would call an AI API to generate content
  return `This is AI-generated content about "${topic}" for the role of ${role}. 

In a production environment, this would be a comprehensive explanation generated by an AI model like GPT-4, covering:

1. Key concepts and principles
2. Required skills and knowledge
3. Recommended learning resources
4. Practical exercises and projects
5. Common challenges and solutions
6. Industry best practices
7. Career opportunities and advancement paths

The content would be tailored to the specific role and level of expertise, providing valuable insights and guidance for the learner's journey.`;
};
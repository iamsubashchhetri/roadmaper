import { Roadmap } from '../types';

export const aiRoadmaps: Roadmap[] = [
  {
    id: 'machine-learning',
    title: 'Machine Learning Roadmap',
    description: 'A comprehensive guide to becoming a Machine Learning expert',
    nodes: [
      {
        id: '1',
        type: 'input',
        data: { 
          label: 'Machine Learning Fundamentals',
          description: 'Core concepts and principles of machine learning'
        },
        position: { x: 250, y: 0 }
      },
      {
        id: '2',
        type: 'default',
        data: { 
          label: 'Mathematics for ML',
          description: 'Linear algebra, calculus, probability, and statistics'
        },
        position: { x: 100, y: 100 }
      },
      {
        id: '3',
        type: 'default',
        data: { 
          label: 'Python Programming',
          description: 'Python basics, NumPy, Pandas, and data manipulation'
        },
        position: { x: 400, y: 100 }
      },
      {
        id: '4',
        type: 'default',
        data: { 
          label: 'Supervised Learning',
          description: 'Regression, classification, and evaluation metrics'
        },
        position: { x: 100, y: 200 }
      },
      {
        id: '5',
        type: 'default',
        data: { 
          label: 'Unsupervised Learning',
          description: 'Clustering, dimensionality reduction, and anomaly detection'
        },
        position: { x: 400, y: 200 }
      },
      {
        id: '6',
        type: 'default',
        data: { 
          label: 'Deep Learning',
          description: 'Neural networks, CNNs, RNNs, and transformers'
        },
        position: { x: 250, y: 300 }
      },
      {
        id: '7',
        type: 'output',
        data: { 
          label: 'Advanced ML Topics',
          description: 'Reinforcement learning, GANs, and more'
        },
        position: { x: 250, y: 400 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e6-7', source: '6', target: '7', animated: true }
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science Roadmap',
    description: 'Complete path to becoming a Data Scientist',
    nodes: [
      {
        id: '1',
        type: 'input',
        data: { 
          label: 'Data Science Fundamentals',
          description: 'Introduction to data science and its applications'
        },
        position: { x: 250, y: 0 }
      },
      {
        id: '2',
        type: 'default',
        data: { 
          label: 'Data Collection & Cleaning',
          description: 'Methods for gathering and preprocessing data'
        },
        position: { x: 100, y: 100 }
      },
      {
        id: '3',
        type: 'default',
        data: { 
          label: 'Data Analysis & Visualization',
          description: 'Techniques for exploring and visualizing data'
        },
        position: { x: 400, y: 100 }
      },
      {
        id: '4',
        type: 'default',
        data: { 
          label: 'Statistical Analysis',
          description: 'Hypothesis testing, inference, and statistical modeling'
        },
        position: { x: 100, y: 200 }
      },
      {
        id: '5',
        type: 'default',
        data: { 
          label: 'Machine Learning for DS',
          description: 'Applying ML algorithms to solve data science problems'
        },
        position: { x: 400, y: 200 }
      },
      {
        id: '6',
        type: 'default',
        data: { 
          label: 'Big Data Technologies',
          description: 'Hadoop, Spark, and distributed computing'
        },
        position: { x: 250, y: 300 }
      },
      {
        id: '7',
        type: 'output',
        data: { 
          label: 'Data Science in Production',
          description: 'Deploying models and creating data products'
        },
        position: { x: 250, y: 400 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e6-7', source: '6', target: '7', animated: true }
    ]
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing Roadmap',
    description: 'Guide to mastering Natural Language Processing',
    nodes: [
      {
        id: '1',
        type: 'input',
        data: { 
          label: 'NLP Fundamentals',
          description: 'Basic concepts and applications of NLP'
        },
        position: { x: 250, y: 0 }
      },
      {
        id: '2',
        type: 'default',
        data: { 
          label: 'Text Processing',
          description: 'Tokenization, stemming, lemmatization, and cleaning'
        },
        position: { x: 100, y: 100 }
      },
      {
        id: '3',
        type: 'default',
        data: { 
          label: 'Language Modeling',
          description: 'N-grams, statistical models, and language statistics'
        },
        position: { x: 400, y: 100 }
      },
      {
        id: '4',
        type: 'default',
        data: { 
          label: 'Word Embeddings',
          description: 'Word2Vec, GloVe, and contextual embeddings'
        },
        position: { x: 100, y: 200 }
      },
      {
        id: '5',
        type: 'default',
        data: { 
          label: 'Sequence Models',
          description: 'RNNs, LSTMs, and GRUs for sequential data'
        },
        position: { x: 400, y: 200 }
      },
      {
        id: '6',
        type: 'default',
        data: { 
          label: 'Transformers',
          description: 'BERT, GPT, and other transformer architectures'
        },
        position: { x: 250, y: 300 }
      },
      {
        id: '7',
        type: 'output',
        data: { 
          label: 'Advanced NLP Applications',
          description: 'Machine translation, question answering, and more'
        },
        position: { x: 250, y: 400 }
      }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e6-7', source: '6', target: '7', animated: true }
    ]
  }
];

export const topicsData = {
  'Machine Learning Fundamentals': {
    id: 'ml-fundamentals',
    title: 'Machine Learning Fundamentals',
    description: 'Core concepts and principles of machine learning',
    content: 'Machine Learning is a subset of artificial intelligence that focuses on developing systems that can learn from and make decisions based on data. It involves algorithms that can improve their performance over time as they are exposed to more data. The fundamental concepts include supervised learning, unsupervised learning, and reinforcement learning. Understanding these basics is crucial before diving deeper into specific algorithms and techniques.'
  },
  'Mathematics for ML': {
    id: 'math-ml',
    title: 'Mathematics for ML',
    description: 'Linear algebra, calculus, probability, and statistics',
    content: 'A strong mathematical foundation is essential for understanding machine learning algorithms. Key areas include: Linear Algebra (vectors, matrices, eigenvalues), Calculus (derivatives, gradients, optimization), Probability Theory (random variables, distributions, Bayes theorem), and Statistics (hypothesis testing, regression analysis, confidence intervals). These mathematical tools help in understanding how algorithms work and in developing new approaches.'
  },
  'Python Programming': {
    id: 'python-programming',
    title: 'Python Programming',
    description: 'Python basics, NumPy, Pandas, and data manipulation',
    content: 'Python has become the de facto language for machine learning due to its simplicity and powerful libraries. Essential skills include basic Python syntax, data structures, and object-oriented programming. Libraries like NumPy (for numerical computing), Pandas (for data manipulation), and Matplotlib/Seaborn (for visualization) form the foundation of the ML toolkit. Proficiency in these tools enables efficient data preprocessing, analysis, and model implementation.'
  }
};
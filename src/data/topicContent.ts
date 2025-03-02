import { generateTopicContent } from '../utils/roadmapGenerator';

// Cache for generated topic content
const contentCache: Record<string, string> = {};

export const getTopicContent = async (topic: string, role: string): Promise<string> => {
  const cacheKey = `${topic}-${role}`;
  
  // Check if content is already in cache
  if (contentCache[cacheKey]) {
    return contentCache[cacheKey];
  }
  
  // Generate new content
  const content = await generateTopicContent(topic, role);
  
  // Cache the content
  contentCache[cacheKey] = content;
  
  return content;
};
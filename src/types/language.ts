
export type Language = 
  | 'english'
  | 'spanish'
  | 'french'
  | 'german' 
  | 'japanese'
  | 'chinese';

export const languageInstructions: Record<Language, string> = {
  english: "Use professional English terminology, be detailed and comprehensive.",
  spanish: "Escribe en español con terminología profesional, sé detallado y exhaustivo.",
  french: "Écrivez en français avec une terminologie professionnelle, soyez détaillé et complet.",
  german: "Schreiben Sie auf Deutsch mit professioneller Terminologie, seien Sie detailliert und umfassend.",
  japanese: "プロフェッショナルな日本語の用語を使用し、詳細かつ包括的に記述してください。",
  chinese: "使用专业的中文术语，详细而全面。"
};

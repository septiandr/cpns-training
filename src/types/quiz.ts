export type Category = 'TWK' | 'TIU' | 'TKP' | 'SKB_TI';

export type OptionKey = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Question {
  id: string;
  category: Category;
  subCategory: string;
  difficulty: 'Easy' | 'Medium' | 'HOTS / Hard';
  question: string;
  codeSnippet?: string;
  options: Record<OptionKey, string>;
  // For TWK, TIU, SKB (5 pts for correct, 0 for wrong)
  correctOption?: OptionKey;
  // For TKP (Scores 1 to 5)
  optionScores?: Record<OptionKey, number>;
  explanation: string;
  trapAnalysis: string; // Kenapa opsi pengecoh mematikan
  speedHack: string; // Trik kilat tembus < 30 detik
  sourceNote?: string;
}

export interface QuizAnswer {
  questionId: string;
  selectedOption?: OptionKey;
  isDoubtful: boolean;
  timeSpentSeconds: number;
}

export interface QuizResult {
  id: string;
  timestamp: number;
  mode: 'CAT_FULL_110' | 'MINI_CAT_30' | 'DRILL_TWK' | 'DRILL_TIU' | 'DRILL_TKP' | 'DRILL_SKB';
  totalDurationSeconds: number;
  totalScore: number;
  scoreBreakdown: {
    TWK: number;
    TIU: number;
    TKP: number;
    SKB_TI?: number;
  };
  passingGradeStatus: {
    TWK: boolean; // >= 65
    TIU: boolean; // >= 80
    TKP: boolean; // >= 166
    overall: boolean;
    targetRankingAchieved: boolean; // Score >= 430
  };
  answers: Record<string, QuizAnswer>;
  weakestSubCategories: string[];
}

export interface TacticGuide {
  id: string;
  category: Category;
  title: string;
  subtitle: string;
  summary: string;
  tactics: {
    name: string;
    description: string;
    formulaOrRule?: string;
    mentalModel: string;
    example: {
      question: string;
      normalMethod: string;
      tacticalShortcut: string;
      timeSaved: string;
    };
  }[];
}

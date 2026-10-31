export type SubjectId =
  | 'turkce'
  | 'matematik'
  | 'geometri'
  | 'tarih'
  | 'cografya'
  | 'vatandaslik'
  | 'guncel';

export type DifficultyLevel = 'Kolay' | 'Orta' | 'Zor' | 'ÖSYM Seviyesi' | 'Karma';

export interface TopicConfig {
  id: string;
  name: string;
  percentage: number;
  questionCount: number;
  frequentTopics: string[];
}

export interface SubjectConfig {
  id: SubjectId;
  name: string;
  totalQuestions: number;
  overallPercentage: number;
  recommendedTimeMinutes: number;
  topics: TopicConfig[];
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  topicId: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  difficulty: DifficultyLevel;
  diagramType?: string;
  diagramCaption?: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: 'A' | 'B' | 'C' | 'D' | 'E' | null;
  isCorrect: boolean | null;
}

export interface TopicAnalysis {
  topicId: string;
  topicName: string;
  totalAnswered: number;
  correctCount: number;
  wrongCount: number;
  emptyCount: number;
  successRatePercentage: number;
}

export interface SubjectAnalysis {
  subjectId: SubjectId;
  subjectName: string;
  totalAnswered: number;
  correctCount: number;
  wrongCount: number;
  emptyCount: number;
  netScore: number;
  successRatePercentage: number;
  topicBreakdown: TopicAnalysis[];
}

export interface TestAttempt {
  id: string;
  timestamp: number;
  subjectId: SubjectId;
  topicId?: string;
  difficulty: DifficultyLevel;
  totalQuestions: number;
  timeSpentSeconds: number;
  answers: Record<string, UserAnswer>;
  netScore: number;
  correctCount: number;
  wrongCount: number;
  emptyCount: number;
}

export interface QuestionGenerationRequest {
  subjectId: SubjectId;
  topicId?: string;
  count?: number;
  difficulty?: DifficultyLevel;
  customApiKey?: string;
}

import { Question, QuizResult } from '../types/quiz';
import { generateMegaBank } from '../data/megaBank';

const STORAGE_KEY_QUESTIONS = 'cpns_drill_questions_v7_mega_unique_1500';
const STORAGE_KEY_RESULTS = 'cpns_drill_results_v4';
const STORAGE_KEY_BOOKMARKS = 'cpns_drill_bookmarks_v4';
const STORAGE_KEY_DRILL_HISTORY = 'cpns_drill_history_v1';

export interface DrillHistoryRecord {
  answeredAt: number;
  isCorrect: boolean;
  selectedOption: string;
}

export function getDrillHistory(): Record<string, DrillHistoryRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DRILL_HISTORY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function recordDrillAnswer(questionId: string, isCorrect: boolean, selectedOption: string): Record<string, DrillHistoryRecord> {
  const current = getDrillHistory();
  current[questionId] = {
    answeredAt: Date.now(),
    isCorrect,
    selectedOption
  };
  localStorage.setItem(STORAGE_KEY_DRILL_HISTORY, JSON.stringify(current));
  return current;
}

export function clearDrillHistory(): void {
  localStorage.removeItem(STORAGE_KEY_DRILL_HISTORY);
}

export function getStoredQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUESTIONS);
    if (!raw) {
      const megaBank = generateMegaBank();
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(megaBank));
      return megaBank;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < 1500) {
      const megaBank = generateMegaBank();
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(megaBank));
      return megaBank;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load questions from localStorage', e);
    const megaBank = generateMegaBank();
    return megaBank;
  }
}

export function saveQuestion(newQuestion: Question): Question[] {
  const current = getStoredQuestions();
  const updated = [newQuestion, ...current.filter(q => q.id !== newQuestion.id)];
  localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(updated));
  return updated;
}

export function importQuestions(importedList: Question[]): Question[] {
  const current = getStoredQuestions();
  const currentIds = new Set(current.map(q => q.id));
  const newValid = importedList.filter(q => q && q.id && !currentIds.has(q.id));
  const updated = [...newValid, ...current];
  localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(updated));
  return updated;
}

export function resetToDefaultMegaBank(): Question[] {
  const megaBank = generateMegaBank();
  localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(megaBank));
  return megaBank;
}

export function getStoredResults(): QuizResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RESULTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load results', e);
    return [];
  }
}

export function saveQuizResult(result: QuizResult): QuizResult[] {
  const current = getStoredResults();
  const updated = [result, ...current];
  localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(updated));
  return updated;
}

export function getBookmarkedIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleBookmark(questionId: string): string[] {
  const current = getBookmarkedIds();
  const next = current.includes(questionId)
    ? current.filter(id => id !== questionId)
    : [...current, questionId];
  localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(next));
  return next;
}

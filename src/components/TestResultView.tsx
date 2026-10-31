import React, { useEffect, useState } from 'react';
import { SubjectConfig, Question, UserAnswer } from '../types/kpss';
import { ScoreSummaryCard } from './ScoreSummaryCard';
import { SolutionReviewView } from './SolutionReviewView';
import { saveTestAttempt, calculateNet } from '../utils/kpssCalculators';

interface TestResultViewProps {
  subject: SubjectConfig;
  questions: Question[];
  answers: Record<string, UserAnswer>;
  timeSpentSeconds: number;
  onRetakeTest: () => void;
  onBackToDashboard: () => void;
}

export const TestResultView: React.FC<TestResultViewProps> = ({
  subject,
  questions,
  answers,
  timeSpentSeconds,
  onRetakeTest,
  onBackToDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'review'>('summary');

  let correctCount = 0;
  let wrongCount = 0;
  let emptyCount = 0;

  questions.forEach((q) => {
    const ans = answers[q.id];
    if (!ans || ans.selectedOption === null) {
      emptyCount++;
    } else if (ans.isCorrect) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const totalQuestions = questions.length;
  const netScore = calculateNet(correctCount, wrongCount);

  // Auto-save session metrics into localStorage under key kpss_test_history
  useEffect(() => {
    const attemptRecord = {
      id: `attempt-${Date.now()}`,
      timestamp: Date.now(),
      subjectId: subject.id,
      subjectName: subject.name,
      difficulty: questions[0]?.difficulty || 'ÖSYM Seviyesi',
      totalQuestions,
      correctCount,
      wrongCount,
      emptyCount,
      netScore,
      timeSpentSeconds,
    };

    saveTestAttempt(attemptRecord);
  }, [subject, questions, answers, correctCount, wrongCount, emptyCount, netScore, timeSpentSeconds, totalQuestions]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* View Switcher Tabs (Summary vs Detailed Solution Review) */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-5 py-2 rounded-xl transition-all ${
              activeTab === 'summary'
                ? 'bg-indigo-600 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Özet Rapor
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`px-5 py-2 rounded-xl transition-all ${
              activeTab === 'review'
                ? 'bg-indigo-600 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Detaylı Soru Çözümleri ({questions.length})
          </button>
        </div>
      </div>

      {activeTab === 'summary' ? (
        <ScoreSummaryCard
          subject={subject}
          correctCount={correctCount}
          wrongCount={wrongCount}
          emptyCount={emptyCount}
          totalQuestions={totalQuestions}
          timeSpentSeconds={timeSpentSeconds}
          onReviewSolutions={() => setActiveTab('review')}
          onRetakeTest={onRetakeTest}
          onBackToDashboard={onBackToDashboard}
        />
      ) : (
        <SolutionReviewView
          questions={questions}
          answers={answers}
        />
      )}
    </div>
  );
};

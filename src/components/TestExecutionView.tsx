import React, { useState } from 'react';
import { Question, SubjectConfig, UserAnswer, TopicAnalysis } from '../types/kpss';
import { QuestionCard } from './QuestionCard';
import { ExamTimer } from './ExamTimer';
import { TestResultView } from './TestResultView';
import { 
  ArrowLeft, 
  ArrowRight, 
  ToggleLeft, 
  ToggleRight, 
  Check,
  AlertCircle,
  Home
} from 'lucide-react';

interface TestExecutionViewProps {
  subject: SubjectConfig;
  questions: Question[];
  onExitTest: () => void;
  onFinishTest?: (answers: Record<string, UserAnswer>, timeSpentSeconds: number) => void;
}

export const TestExecutionView: React.FC<TestExecutionViewProps> = ({
  subject,
  questions,
  onExitTest,
  onFinishTest,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [instantMode, setInstantMode] = useState(false);
  const [secondsSpent, setSecondsSpent] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (isFinished) return;

    const isCorrect = option === currentQuestion.correctAnswer;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        selectedOption: option,
        isCorrect,
      },
    }));
  };

  const handleClearOption = () => {
    if (isFinished) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion.id];
      return updated;
    });
  };

  const handleFinishTest = () => {
    setIsFinished(true);
    if (onFinishTest) {
      onFinishTest(answers, secondsSpent);
    }
  };

  // Calculate results statistics
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

  // ÖSYM Net Score Formula: Doğru - (Yanlış / 4)
  const netScore = Math.max(0, parseFloat((correctCount - wrongCount / 4).toFixed(2)));
  const successRate = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Topic performance breakdown calculation
  const topicAnalysisMap: Record<string, TopicAnalysis> = {};
  subject.topics.forEach((topic) => {
    topicAnalysisMap[topic.id] = {
      topicId: topic.id,
      topicName: topic.name,
      totalAnswered: 0,
      correctCount: 0,
      wrongCount: 0,
      emptyCount: 0,
      successRatePercentage: 0,
    };
  });

  questions.forEach((q) => {
    const topicId = q.topicId;
    if (!topicAnalysisMap[topicId]) {
      topicAnalysisMap[topicId] = {
        topicId,
        topicName: 'Genel',
        totalAnswered: 0,
        correctCount: 0,
        wrongCount: 0,
        emptyCount: 0,
        successRatePercentage: 0,
      };
    }

    const t = topicAnalysisMap[topicId];
    const ans = answers[q.id];

    if (!ans || ans.selectedOption === null) {
      t.emptyCount++;
    } else {
      t.totalAnswered++;
      if (ans.isCorrect) {
        t.correctCount++;
      } else {
        t.wrongCount++;
      }
    }
  });

  Object.values(topicAnalysisMap).forEach((t) => {
    const totalInTopic = t.correctCount + t.wrongCount + t.emptyCount;
    t.successRatePercentage = totalInTopic > 0 ? Math.round((t.correctCount / totalInTopic) * 100) : 0;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Bar Header */}
      <div className="glass-panel rounded-2xl p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 border border-slate-800 sticky top-4 z-30">
        {/* Subject Title & Exit */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Testten Çık"
          >
            <Home className="w-5 h-5" />
          </button>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-100">{subject.name} Testi</h2>
            <span className="text-xs text-slate-400 font-medium">
              ÖSYM Formatı • {totalQuestions} Soru
            </span>
          </div>
        </div>

        {/* Center: Timer & Mode Toggle */}
        <div className="flex items-center gap-4">
          {!isFinished && (
            <ExamTimer
              initialMinutes={subject.recommendedTimeMinutes}
              onTimeUp={handleFinishTest}
              onTimerTick={(sec) => setSecondsSpent(subject.recommendedTimeMinutes * 60 - sec)}
              isPausedExternal={showExitConfirm}
            />
          )}

          {/* Instant Feedback Toggle */}
          {!isFinished && (
            <button
              onClick={() => setInstantMode(!instantMode)}
              className="hidden md:flex items-center gap-2 py-1.5 px-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              title="Anlık Cevap Kontrolünü Aç/Kapat"
            >
              {instantMode ? (
                <ToggleRight className="w-5 h-5 text-indigo-400" />
              ) : (
                <ToggleLeft className="w-5 h-5 text-slate-500" />
              )}
              <span>Anlık Çözüm: {instantMode ? 'Açık' : 'Kapalı'}</span>
            </button>
          )}
        </div>

        {/* Action: Finish Test Button */}
        <div>
          {!isFinished ? (
            <button
              onClick={handleFinishTest}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs md:text-sm shadow-md transition-all active:scale-95"
            >
              Testi Bitir
            </button>
          ) : (
            <button
              onClick={onExitTest}
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs md:text-sm border border-slate-700 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
            </button>
          )}
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-slate-700 space-y-4 text-center">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-100">Testten Çıkılsın mı?</h3>
            <p className="text-sm text-slate-300">
              Şu ana kadar verdiğiniz cevaplar kaydedilecektir. Testi şimdi bitirmek mi yoksa tamamen çıkmak mı istersiniz?
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                Devam Et
              </button>
              <button
                onClick={onExitTest}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main View: Active Question OR Test Finished Results */}
      {!isFinished ? (
        <div className="space-y-6">
          {/* Active Question Card */}
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            selectedOption={answers[currentQuestion.id]?.selectedOption || null}
            onSelectOption={handleSelectOption}
            onClearOption={handleClearOption}
            showExplanationAlways={instantMode}
            isExamFinished={isFinished}
          />

          {/* Footer Controls & Jumper Bar */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            {/* Quick Jumper Grid */}
            <div className="flex flex-wrap items-center gap-2 justify-center py-1">
              {questions.map((q, idx) => {
                const ans = answers[q.id];
                const isCurrent = idx === currentIndex;
                const isAnswered = ans && ans.selectedOption !== null;

                let jumperStyle = 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500';
                if (isCurrent) {
                  jumperStyle = 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-500/50 scale-110 font-bold';
                } else if (isAnswered) {
                  jumperStyle = 'bg-indigo-950/80 text-indigo-300 border-indigo-500/50 font-semibold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-9 h-9 rounded-xl border text-xs flex items-center justify-center transition-all duration-150 ${jumperStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-semibold text-xs md:text-sm border border-slate-700 flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Önceki Soru
              </button>

              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                {Object.keys(answers).length} / {totalQuestions} Yanıtlandı
              </span>

              <button
                onClick={() => {
                  if (currentIndex < totalQuestions - 1) {
                    setCurrentIndex((prev) => prev + 1);
                  } else {
                    handleFinishTest();
                  }
                }}
                className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs md:text-sm shadow-md flex items-center gap-2 transition-all active:scale-95"
              >
                {currentIndex === totalQuestions - 1 ? (
                  <>
                    Testi Tamamla <Check className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Sonraki Soru <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Render Master Test Result View */
        <TestResultView
          subject={subject}
          questions={questions}
          answers={answers}
          timeSpentSeconds={secondsSpent}
          onRetakeTest={() => {
            setAnswers({});
            setCurrentIndex(0);
            setIsFinished(false);
          }}
          onBackToDashboard={onExitTest}
        />
      )}
    </div>
  );
};

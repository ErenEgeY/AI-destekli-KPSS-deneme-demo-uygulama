import React, { useState } from 'react';
import { Question, UserAnswer } from '../types/kpss';
import { getSubjectConfig } from '../config/kpssCurriculum';
import { FormattedText } from '../utils/textFormatter';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Filter, 
  BookOpen, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';

interface SolutionReviewViewProps {
  questions: Question[];
  answers: Record<string, UserAnswer>;
}

type FilterType = 'all' | 'wrong' | 'empty' | 'correct';

export const SolutionReviewView: React.FC<SolutionReviewViewProps> = ({
  questions,
  answers,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  const toggleExpandSolution = (qId: string) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // Filter question items based on selected tab
  const filteredQuestions = questions.filter((q) => {
    const ans = answers[q.id];
    if (filter === 'correct') {
      return ans && ans.isCorrect === true;
    }
    if (filter === 'wrong') {
      return ans && ans.selectedOption !== null && ans.isCorrect === false;
    }
    if (filter === 'empty') {
      return !ans || ans.selectedOption === null;
    }
    return true;
  });

  const optionKeys: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="space-y-6">
      {/* Header & Filter Tabs Bar */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-slate-100">Soru Çözüm Analizi</h3>
          <span className="text-xs text-slate-400 font-mono">
            ({filteredQuestions.length} / {questions.length} Soru Gösteriliyor)
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tüm Sorular ({questions.length})
          </button>

          <button
            onClick={() => setFilter('wrong')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'wrong'
                ? 'bg-rose-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Yanlışlar ({questions.filter((q) => answers[q.id]?.selectedOption && !answers[q.id]?.isCorrect).length})
          </button>

          <button
            onClick={() => setFilter('empty')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'empty'
                ? 'bg-amber-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Boş Bırakılanlar ({questions.filter((q) => !answers[q.id] || answers[q.id]?.selectedOption === null).length})
          </button>

          <button
            onClick={() => setFilter('correct')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Doğrular ({questions.filter((q) => answers[q.id]?.isCorrect).length})
          </button>
        </div>
      </div>

      {/* Questions Review List */}
      {filteredQuestions.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 border border-slate-800">
          <p className="text-sm font-semibold">Seçili filtreye uygun soru bulunamadı.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((q, idx) => {
            const originalIndex = questions.findIndex((item) => item.id === q.id);
            const ans = answers[q.id];
            const userSelected = ans?.selectedOption || null;
            const isCorrect = ans?.isCorrect === true;
            const isEmpty = !userSelected;
            const isExpanded = expandedSolutions[q.id] !== false; // Default expanded

            const subjectConfig = getSubjectConfig(q.subjectId);
            const topicConfig = subjectConfig?.topics.find((t) => t.id === q.topicId);

            return (
              <div
                key={q.id}
                className={`glass-panel rounded-2xl p-6 md:p-8 border shadow-lg space-y-5 transition-all ${
                  isCorrect
                    ? 'border-emerald-500/30'
                    : isEmpty
                    ? 'border-slate-800'
                    : 'border-rose-500/30'
                }`}
              >
                {/* Header Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="px-3 py-1 rounded-full font-bold bg-slate-800 text-indigo-300 border border-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      Soru {originalIndex + 1}
                    </span>

                    {topicConfig && (
                      <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                        {topicConfig.name}
                      </span>
                    )}

                    <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                      {q.difficulty}
                    </span>
                  </div>

                  {/* Question Answer Status Pill */}
                  <div className="flex items-center gap-2">
                    {isCorrect && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Doğru Yanıtlandı
                      </span>
                    )}
                    {!isEmpty && !isCorrect && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" /> Yanlış Yanıtlandı (İşaretlenen: {userSelected})
                      </span>
                    )}
                    {isEmpty && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-slate-500" /> Boş Bırakıldı
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Body */}
                <div className="text-slate-100 text-base md:text-lg font-normal leading-relaxed">
                  <FormattedText text={q.questionText} />
                </div>

                {/* Option List Review */}
                <div className="space-y-2.5">
                  {optionKeys.map((key) => {
                    const text = q.options[key];
                    if (!text) return null;

                    const isThisCorrect = q.correctAnswer === key;
                    const isThisUserSelected = userSelected === key;

                    let bubbleClass = 'option-bubble cursor-default opacity-85';
                    if (isThisCorrect) {
                      bubbleClass = 'option-bubble option-bubble-correct opacity-100 font-bold';
                    } else if (isThisUserSelected && !isThisCorrect) {
                      bubbleClass = 'option-bubble option-bubble-wrong opacity-100 font-bold';
                    }

                    return (
                      <div key={key} className={bubbleClass}>
                        <div className="bubble-letter">{key}</div>
                        <div className="ml-4 text-sm md:text-base text-slate-200 flex-1 font-medium leading-snug">
                          <FormattedText text={text} />
                        </div>

                        {isThisCorrect && (
                          <span className="text-xs font-bold text-emerald-400 ml-2 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Doğru Cevap
                          </span>
                        )}
                        {isThisUserSelected && !isThisCorrect && (
                          <span className="text-xs font-bold text-rose-400 ml-2 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Yanlış Seçim
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Toggle Solution Drawer Button */}
                <button
                  onClick={() => toggleExpandSolution(q.id)}
                  className="w-full flex items-center justify-between pt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" /> ÖSYM Komisyonu Çözümü & Çeldirici Analizi
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* AI Solution Drawer */}
                {isExpanded && (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-xs md:text-sm text-slate-300 space-y-2 leading-relaxed">
                    <FormattedText text={q.explanation} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

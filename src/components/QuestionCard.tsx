import React, { useState } from 'react';
import { Question, DifficultyLevel } from '../types/kpss';
import { getSubjectConfig } from '../config/kpssCurriculum';
import { VisualDiagramRenderer } from './VisualDiagramRenderer';
import { FormattedText } from '../utils/textFormatter';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: 'A' | 'B' | 'C' | 'D' | 'E' | null;
  onSelectOption: (option: 'A' | 'B' | 'C' | 'D' | 'E') => void;
  onClearOption?: () => void;
  showExplanationAlways?: boolean;
  isExamFinished?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onClearOption,
  showExplanationAlways = false,
  isExamFinished = false,
}) => {
  const [showExplanationManual, setShowExplanationManual] = useState(false);

  const subjectConfig = getSubjectConfig(question.subjectId);
  const topicConfig = subjectConfig?.topics.find((t) => t.id === question.topicId);

  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctAnswer;

  const shouldShowExplanation =
    showExplanationAlways || isExamFinished || showExplanationManual;

  const getDifficultyBadge = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'Kolay':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Orta':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Zor':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'ÖSYM Seviyesi':
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 font-semibold';
    }
  };

  const optionKeys: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-xl border border-slate-800 flex flex-col space-y-6 relative overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-indigo-300 border border-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            {subjectConfig?.name || question.subjectId}
          </span>

          {topicConfig && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/80">
              {topicConfig.name}
            </span>
          )}

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyBadge(
              question.difficulty
            )}`}
          >
            {question.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            Soru <span className="text-indigo-400 text-sm">{currentIndex + 1}</span> / {totalQuestions}
          </span>

          {isAnswered && onClearOption && !isExamFinished && (
            <button
              onClick={onClearOption}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-slate-800"
              title="İşareti Kaldır"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Temizle</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Text with Rich Underline/Paragraph Formatting */}
      <div className="py-2 text-slate-100 font-normal leading-relaxed text-base md:text-lg tracking-wide">
        <FormattedText text={question.questionText} />
      </div>

      {/* Multi-Subject Visual Diagram Rendering */}
      {question.diagramType ? (
        <VisualDiagramRenderer
          type={question.diagramType}
          caption={question.diagramCaption || 'Şekil 1: ÖSYM Soru Görseli ve Şeması'}
        />
      ) : (question.subjectId === 'geometri' || question.topicId === 'mat-geometri') ? (
        <VisualDiagramRenderer
          type="right-triangle"
          caption="Şekil 1: ÖSYM Geometri Çizimi"
        />
      ) : (question.topicId === 'cog-ekonomik' || question.topicId === 'cog-fiziki') ? (
        <VisualDiagramRenderer
          type="turkey-map-minerals"
          caption="Harita 1: Türkiye Madenler ve Sanayi Konumlandırma Şeması"
        />
      ) : (question.topicId === 'tar-kurtulus-inkilap' || question.topicId === 'tar-milli-mucadele') ? (
        <VisualDiagramRenderer
          type="history-timeline"
          caption="Şema 1: Milli Mücadele Dönemi Kronolojik Zaman Çizelgesi"
        />
      ) : question.topicId === 'tr-sozel-mantik' ? (
        <VisualDiagramRenderer
          type="logic-grid-table"
          caption="Tablo 1: ÖSYM Sözel Mantık Değişken Tablosu"
        />
      ) : null}

      {/* Bubble Options List */}
      <div className="space-y-3 pt-2">
        {optionKeys.map((key) => {
          const optionText = question.options[key];
          if (!optionText) return null;

          const isSelected = selectedOption === key;
          const isThisCorrect = question.correctAnswer === key;

          let bubbleStateClass = 'option-bubble';
          if (isExamFinished || showExplanationAlways) {
            if (isThisCorrect) {
              bubbleStateClass = 'option-bubble option-bubble-correct';
            } else if (isSelected && !isThisCorrect) {
              bubbleStateClass = 'option-bubble option-bubble-wrong';
            }
          } else if (isSelected) {
            bubbleStateClass = 'option-bubble option-bubble-selected';
          }

          return (
            <div
              key={key}
              onClick={() => !isExamFinished && onSelectOption(key)}
              className={`${bubbleStateClass} ${isExamFinished ? 'cursor-default' : ''}`}
            >
              <div className="bubble-letter">{key}</div>
              <div className="ml-4 text-sm md:text-base text-slate-200 flex-1 font-medium leading-snug">
                <FormattedText text={optionText} />
              </div>

              {/* Status Icons */}
              {(isExamFinished || showExplanationAlways) && isThisCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
              )}
              {(isExamFinished || showExplanationAlways) && isSelected && !isThisCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
              )}
            </div>
          );
        })}
      </div>

      {/* Immediate Explanation Trigger (if instant mode toggle is off and not exam finished) */}
      {!showExplanationAlways && !isExamFinished && isAnswered && (
        <div className="pt-2">
          <button
            onClick={() => setShowExplanationManual(!showExplanationManual)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-indigo-300 border border-slate-700 text-xs font-semibold transition-all"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            {showExplanationManual ? 'Çözümü ve Çeldirici Analizini Gizle' : 'Çözümü ve Çeldirici Analizini Gör'}
            {showExplanationManual ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Solution & Explanation Drawer */}
      {shouldShowExplanation && (
        <div className="mt-4 p-5 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-xs md:text-sm text-slate-300 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between text-indigo-400 font-bold text-sm border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              ÖSYM Akademik Çözüm & Çeldirici Analizi
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Doğru Cevap: {question.correctAnswer}
            </span>
          </div>

          <div className="leading-relaxed text-slate-200 font-sans">
            <FormattedText text={question.explanation} />
          </div>
        </div>
      )}
    </div>
  );
};


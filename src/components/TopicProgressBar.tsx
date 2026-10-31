import React from 'react';
import { AggregatedTopicStat } from '../utils/analyticsEngine';
import { CheckCircle2, XCircle, HelpCircle, Layers, Sparkles } from 'lucide-react';

interface TopicProgressBarProps {
  stat: AggregatedTopicStat;
  onStartQuizTopic?: (subjectId: AggregatedTopicStat['subjectId'], topicId: string) => void;
  onResetTopic?: (subjectId: AggregatedTopicStat['subjectId'], topicId: string) => void;
}

export const TopicProgressBar: React.FC<TopicProgressBarProps> = ({
  stat,
  onStartQuizTopic,
  onResetTopic,
}) => {
  const {
    topicId,
    topicName,
    percentageCurriculum,
    questionCountCurriculum,
    totalAttempted,
    correctCount,
    wrongCount,
    emptyCount,
    successRatePercentage,
    statusTag,
    subjectId,
  } = stat;

  // Status color badges
  const getStatusBadge = () => {
    switch (statusTag) {
      case 'Güçlü':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Orta':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Zayıf / Çalışılmalı':
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  // Stacked progress bar percentages
  const correctPct = totalAttempted > 0 ? (correctCount / totalAttempted) * 100 : 0;
  const wrongPct = totalAttempted > 0 ? (wrongCount / totalAttempted) * 100 : 0;
  const emptyPct = totalAttempted > 0 ? (emptyCount / totalAttempted) * 100 : 0;

  return (
    <div className="p-4 md:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition-all space-y-3 shadow-md">
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
            {topicName}
          </h4>
          <span className="text-[11px] text-slate-400 font-medium">
            ÖSYM Müfredat Ağırlığı: <strong className="text-slate-300">%{percentageCurriculum}</strong> ({questionCountCurriculum} Soru)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge()}`}>
            {statusTag}
          </span>
          <span className="text-xs font-mono font-extrabold text-indigo-400 bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
            %{successRatePercentage}
          </span>
        </div>
      </div>

      {/* Multi-colored Stacked Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden flex p-0.5 border border-slate-800">
          {totalAttempted > 0 ? (
            <>
              {correctPct > 0 && (
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 rounded-l-full"
                  style={{ width: `${correctPct}%` }}
                  title={`Doğru: ${correctCount}`}
                />
              )}
              {wrongPct > 0 && (
                <div
                  className="h-full bg-rose-500 transition-all duration-500"
                  style={{ width: `${wrongPct}%` }}
                  title={`Yanlış: ${wrongCount}`}
                />
              )}
              {emptyPct > 0 && (
                <div
                  className="h-full bg-slate-600 transition-all duration-500 rounded-r-full"
                  style={{ width: `${emptyPct}%` }}
                  title={`Boş: ${emptyCount}`}
                />
              )}
            </>
          ) : (
            <div className="h-full w-full bg-slate-800/50 rounded-full" />
          )}
        </div>

        {/* Counters & Detail Row */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3" /> {correctCount} Doğru
            </span>
            <span className="flex items-center gap-1 text-rose-400 font-medium">
              <XCircle className="w-3 h-3" /> {wrongCount} Yanlış
            </span>
            <span className="flex items-center gap-1 text-slate-400 font-medium">
              <HelpCircle className="w-3 h-3 text-slate-500" /> {emptyCount} Boş
            </span>
          </div>

          <span className="font-mono text-slate-400">
            Toplam: <strong className="text-slate-200">{totalAttempted}</strong> Çözüldü
          </span>
        </div>
      </div>

      {/* Quick Quiz Action & Per-Topic Reset Button */}
      <div className="pt-1 flex items-center justify-between gap-2">
        {onResetTopic && totalAttempted > 0 ? (
          <button
            onClick={() => onResetTopic(subjectId, topicId)}
            className="py-1 px-2.5 rounded-lg bg-slate-950 hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 text-[11px] font-medium border border-slate-800 hover:border-rose-500/30 flex items-center gap-1 transition-colors"
            title="Bu konunun istatistik verilerini sıfırla"
          >
            Sıfırla
          </button>
        ) : <div />}

        {onStartQuizTopic && (
          <button
            onClick={() => onStartQuizTopic(subjectId, topicId)}
            className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-indigo-600/20 text-indigo-300 hover:text-indigo-200 text-xs font-semibold border border-slate-700 hover:border-indigo-500/50 flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Bu Konudan Soru Çöz
          </button>
        )}
      </div>
    </div>
  );
};

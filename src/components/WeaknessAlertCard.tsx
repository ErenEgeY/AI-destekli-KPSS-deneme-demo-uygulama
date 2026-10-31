import React from 'react';
import { AggregatedTopicStat } from '../utils/analyticsEngine';
import { AlertTriangle, Sparkles, PlayCircle, Target, ArrowRight } from 'lucide-react';

interface WeaknessAlertCardProps {
  weakTopics: AggregatedTopicStat[];
  onStartQuizTopic: (subjectId: AggregatedTopicStat['subjectId'], topicId: string) => void;
}

export const WeaknessAlertCard: React.FC<WeaknessAlertCardProps> = ({
  weakTopics,
  onStartQuizTopic,
}) => {
  if (!weakTopics || weakTopics.length === 0) {
    return (
      <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">Kritik Eksik Konu Bulunmuyor!</h4>
            <p className="text-xs text-slate-300">
              Şu ana kadar çözdüğünüz testlerdeki tüm konularda %50 başarı eşiğinin üzerindesiniz. Derece hedefinize devam edin!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 border border-rose-500/40 bg-rose-950/20 space-y-4 shadow-xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute right-0 top-0 w-48 h-48 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-rose-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Çalışılması Gereken Öncelikli Konular ({weakTopics.length})
            </h3>
            <p className="text-xs text-slate-300">
              Yapay Zeka Analizi: %50 Başarı eşiğinin altında kalan ve ÖSYM net puanınızı düşüren konular
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 hidden sm:inline">
          Yapay Zeka Önerisi
        </span>
      </div>

      {/* Weak Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {weakTopics.slice(0, 4).map((topic) => (
          <div
            key={topic.topicId}
            className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 hover:border-rose-500/40 transition-all group"
          >
            <div className="space-y-1 overflow-hidden">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                {topic.subjectName}
              </span>
              <h4 className="text-xs font-bold text-slate-100 truncate">{topic.topicName}</h4>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>Başarı: <strong className="text-rose-400">%{topic.successRatePercentage}</strong></span>
                <span>•</span>
                <span>{topic.correctCount} D / {topic.wrongCount} Y</span>
              </div>
            </div>

            <button
              onClick={() => onStartQuizTopic(topic.subjectId, topic.topicId)}
              className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shrink-0 flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <span>Test Çöz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { SubjectConfig } from '../types/kpss';
import { calculateNet, calculateSuccessRate, formatTime } from '../utils/kpssCalculators';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  TrendingUp, 
  RotateCcw, 
  Eye, 
  Home,
  Sparkles,
  Zap
} from 'lucide-react';

interface ScoreSummaryCardProps {
  subject: SubjectConfig;
  correctCount: number;
  wrongCount: number;
  emptyCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  onReviewSolutions: () => void;
  onRetakeTest: () => void;
  onBackToDashboard: () => void;
}

export const ScoreSummaryCard: React.FC<ScoreSummaryCardProps> = ({
  subject,
  correctCount,
  wrongCount,
  emptyCount,
  totalQuestions,
  timeSpentSeconds,
  onReviewSolutions,
  onRetakeTest,
  onBackToDashboard,
}) => {
  const netScore = calculateNet(correctCount, wrongCount);
  const successRate = calculateSuccessRate(netScore, totalQuestions);
  const recommendedTimeSeconds = subject.recommendedTimeMinutes * 60;

  // Determine Performance Status Tier
  const getPerformanceStatus = (rate: number) => {
    if (rate >= 85) {
      return {
        title: 'Mükemmel - Derece Seviyesi',
        color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
        badge: 'bg-emerald-500 text-slate-950',
        description: 'ÖSYM standartlarında üst seviye net oranına ulaştınız!',
      };
    } else if (rate >= 70) {
      return {
        title: 'Başarılı - Yüksek Potansiyel',
        color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
        badge: 'bg-indigo-500 text-white',
        description: 'Güçlü performans. Küçük çeldirici hatalarını azaltarak 90+ banda çıkabilirsiniz.',
      };
    } else if (rate >= 50) {
      return {
        title: 'Orta - Konu Tekrarı Önerilir',
        color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
        badge: 'bg-amber-500 text-slate-950',
        description: 'Kavramsal eksiklerinizi tamamlayarak başarı oranınızı hızla yükseltebilirsiniz.',
      };
    } else {
      return {
        title: 'Geliştirilmeli - Temel Çalışma Gerekli',
        color: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
        badge: 'bg-rose-500 text-white',
        description: 'Bu konudaki temel kavramları ve çeldirici tuzaklarını tekrar gözden geçirin.',
      };
    }
  };

  const status = getPerformanceStatus(successRate);

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl">
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> ÖSYM KPSS Değerlendirme Raporu
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
            {subject.name} Test Sonucu
          </h2>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 ${status.color}`}>
          <Zap className="w-4 h-4" />
          <span className="text-xs font-bold">{status.title}</span>
        </div>
      </div>

      {/* Hero Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-2">
        {/* Total Net */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/40 text-center space-y-1 relative overflow-hidden shadow-lg">
          <span className="text-xs text-indigo-300 font-semibold block">ÖSYM Net Puanı</span>
          <div className="text-3xl font-black text-indigo-400">{netScore}</div>
          <span className="text-[10px] text-slate-400 block pt-1">
            {correctCount} Doğru - ({wrongCount}/4 Yanlış)
          </span>
        </div>

        {/* Correct Count */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
            <CheckCircle2 className="w-4 h-4" /> Doğru
          </div>
          <div className="text-3xl font-black text-emerald-400">{correctCount}</div>
          <span className="text-[10px] text-slate-400 block">Soru</span>
        </div>

        {/* Incorrect Count */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-500/30 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-semibold mb-1">
            <XCircle className="w-4 h-4" /> Yanlış
          </div>
          <div className="text-3xl font-black text-rose-400">{wrongCount}</div>
          <span className="text-[10px] text-slate-400 block">Soru</span>
        </div>

        {/* Empty Count */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
            <HelpCircle className="w-4 h-4 text-slate-500" /> Boş
          </div>
          <div className="text-3xl font-black text-slate-200">{emptyCount}</div>
          <span className="text-[10px] text-slate-400 block">Soru</span>
        </div>

        {/* Time Spent */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-center space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
            <Clock className="w-4 h-4" /> Harcanan Süre
          </div>
          <div className="text-3xl font-black text-amber-400">{formatTime(timeSpentSeconds)}</div>
          <span className="text-[10px] text-slate-400 block">
            Önerilen: {subject.recommendedTimeMinutes} Dk
          </span>
        </div>
      </div>

      {/* Visual Progress Bar Section */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs md:text-sm font-semibold">
          <span className="text-slate-200 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            Başarı Yüzdesi & Performans Seviyesi
          </span>
          <span className="text-indigo-400 font-bold font-mono">%{successRate} Başarı</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-teal-300 transition-all duration-700 shadow-md"
            style={{ width: `${successRate}%` }}
          />
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {status.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          onClick={onBackToDashboard}
          className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs md:text-sm border border-slate-700 flex items-center gap-2 transition-all"
        >
          <Home className="w-4 h-4" /> Dashboard'a Dön
        </button>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onRetakeTest}
            className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold text-xs md:text-sm border border-indigo-500/30 flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Yeniden Test Çöz
          </button>

          <button
            onClick={onReviewSolutions}
            className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs md:text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all active:scale-95"
          >
            <Eye className="w-4 h-4" /> Çözümleri İncele
          </button>
        </div>
      </div>
    </div>
  );
};

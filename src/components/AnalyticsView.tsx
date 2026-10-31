import React from 'react';
import { KPSS_CURRICULUM } from '../config/kpssCurriculum';
import { SubjectId } from '../types/kpss';
import { BarChart3, TrendingUp, CheckCircle, AlertTriangle, BookOpen, Target, Sparkles } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-100">KPSS Konu Bazlı Performans Analizi</h2>
            <p className="text-xs md:text-sm text-slate-400">
              ÖSYM soru ağırlıklarına göre çözdüğünüz testlerin başarı oranları ve eksik konu tespiti
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Toplam Soru Dağılımı</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100">120 Soru / Test</div>
          <p className="text-[11px] text-slate-500">Genel Yetenek (60) + Genel Kültür (60)</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Önerilen Toplam Süre</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">115 Dakika</div>
          <p className="text-[11px] text-slate-500">Ortalama soru başı süre: ~57 saniye</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Hedef KPSS Net Oranı</span>
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">%85+ Başarı</div>
          <p className="text-[11px] text-slate-500">90+ Puan Hedefleyen Derece Öğrencileri İçin</p>
        </div>
      </div>

      {/* Subject-by-Subject Curriculum Breakdown Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Güncel ÖSYM Müfredat Dağılımı ve Konu Ağırlıkları
        </h3>

        <div className="space-y-6">
          {Object.keys(KPSS_CURRICULUM).map((key) => {
            const subject = KPSS_CURRICULUM[key as SubjectId];
            return (
              <div key={subject.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100 text-base">{subject.name}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {subject.totalQuestions} Soru (%{subject.overallPercentage})
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Önerilen Süre: {subject.recommendedTimeMinutes} Dk</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {subject.topics.map((topic) => (
                    <div key={topic.id} className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-800/80 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-slate-200">{topic.name}</span>
                        <span className="text-indigo-400 font-mono">{topic.questionCount} Soru</span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Öne Çıkan: {topic.frequentTopics.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SubjectId } from '../types/kpss';
import { KPSS_CURRICULUM, KPSS_SUBJECTS_LIST } from '../config/kpssCurriculum';
import { 
  getOverallAnalyticsSummary, 
  resetAllAnalyticsData, 
  resetSubjectAnalyticsData, 
  resetTopicAnalyticsData 
} from '../utils/analyticsEngine';
import { TopicProgressBar } from './TopicProgressBar';
import { WeaknessAlertCard } from './WeaknessAlertCard';
import { 
  BarChart3, 
  Award, 
  HelpCircle, 
  TrendingUp, 
  Sparkles, 
  BookOpen, 
  Target, 
  Flame, 
  Zap, 
  RefreshCw,
  Trash2
} from 'lucide-react';

interface AnalyticsDashboardViewProps {
  onStartTestTopic: (subjectId: SubjectId, topicId?: string) => void;
}

export const AnalyticsDashboardView: React.FC<AnalyticsDashboardViewProps> = ({
  onStartTestTopic,
}) => {
  const [selectedSubjectTab, setSelectedSubjectTab] = useState<SubjectId | 'all'>('all');
  const [refreshKey, setRefreshKey] = useState(0);

  const summary = getOverallAnalyticsSummary();

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const activeSubjects = selectedSubjectTab === 'all'
    ? KPSS_SUBJECTS_LIST
    : KPSS_SUBJECTS_LIST.filter((s) => s.id === selectedSubjectTab);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Top Header */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <BarChart3 className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
                KPSS Konu Performans & İstatistik Paneli
              </h2>
              <p className="text-xs md:text-sm text-slate-400">
                Çözdüğünüz tüm testlerin ÖSYM konu ağırlıklarına göre detaylı başarı analizi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="py-2 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Yenile
            </button>

            <button
              onClick={() => {
                if (window.confirm('Tüm konu performans verileri ve test geçmişiniz sıfırlanacaktır. Onaylıyor musunuz?')) {
                  resetAllAnalyticsData();
                  handleRefresh();
                }
              }}
              className="py-2 px-3.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 text-xs font-semibold flex items-center gap-2 transition-colors"
              title="Tüm analiz verilerini tamamen sıfırla"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" /> Tümünü Sıfırla
            </button>
          </div>
        </div>
      </div>

      {/* Global Summary Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Questions Solved */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Çözülen Toplam Soru
          </span>
          <div className="text-2xl md:text-3xl font-black text-slate-100 font-mono">
            {summary.totalQuestionsSolved}
          </div>
          <span className="text-[11px] text-slate-400 block">
            {summary.totalTestsCount} Test Oturumu Tamamlandı
          </span>
        </div>

        {/* Overall Net Score */}
        <div className="glass-panel p-5 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 space-y-1">
          <span className="text-xs text-indigo-300 font-medium flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-indigo-400" /> Toplam Net Puanı
          </span>
          <div className="text-2xl md:text-3xl font-black text-indigo-400 font-mono">
            {summary.overallNetScore} Net
          </div>
          <span className="text-[11px] text-slate-400 block">
            Doğru: {summary.totalCorrect} | Yanlış: {summary.totalWrong}
          </span>
        </div>

        {/* Strongest Subject */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 space-y-1">
          <span className="text-xs text-emerald-300 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> En Başarılı Ders
          </span>
          <div className="text-xl md:text-2xl font-extrabold text-emerald-400 truncate">
            {summary.strongestSubjectName}
          </div>
          <span className="text-[11px] text-slate-400 block">En yüksek başarı yüzdesi</span>
        </div>

        {/* Estimated KPSS P100 Point */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-950/20 space-y-1">
          <span className="text-xs text-amber-300 font-medium flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-amber-400" /> Tahmini KPSS Puanı
          </span>
          <div className="text-2xl md:text-3xl font-black text-amber-400 font-mono">
            {summary.estimatedKPSSPoint} Puan
          </div>
          <span className="text-[11px] text-slate-400 block">P100 ölçeğinde hesaplama</span>
        </div>
      </div>

      {/* AI Weakness Alert Highlights Card */}
      <WeaknessAlertCard
        weakTopics={summary.weakTopicsList}
        onStartQuizTopic={onStartTestTopic}
      />

      {/* Subject Filter Tabs & Topic Breakdown */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Flame className="w-5 h-5 text-indigo-400" />
            ÖSYM Müfredatına Göre Konu Başarı Analizi
          </h3>

          {/* Subject Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setSelectedSubjectTab('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                selectedSubjectTab === 'all'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tüm Dersler
            </button>

            {KPSS_SUBJECTS_LIST.map((subj) => (
              <button
                key={subj.id}
                onClick={() => setSelectedSubjectTab(subj.id)}
                className={`px-3.5 py-1.5 rounded-xl transition-all ${
                  selectedSubjectTab === subj.id
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {subj.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Accordions / Breakdown Lists */}
        <div className="space-y-8">
          {activeSubjects.map((subject) => {
            const subStat = summary.subjectSummaries[subject.id];
            return (
              <div
                key={subject.id}
                className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-5"
              >
                {/* Subject Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h4 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-400" />
                      {subject.name}
                    </h4>
                    <span className="text-xs text-slate-400">
                      Müfredat Soru Dağılımı: {subject.totalQuestions} Soru (%{subject.overallPercentage}) • Önerilen Süre: {subject.recommendedTimeMinutes} Dk
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      Çözülen Soru: <strong className="text-indigo-400">{subStat.totalQuestionsAttempted}</strong>
                    </div>

                    <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      Net Puan: <strong className="text-emerald-400">{subStat.netScore} Net</strong>
                    </div>

                    {subStat.totalQuestionsAttempted > 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm(`"${subject.name}" dersine ait istatistik verileri sıfırlanacaktır. Onaylıyor musunuz?`)) {
                            resetSubjectAnalyticsData(subject.id);
                            handleRefresh();
                          }
                        }}
                        className="py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="Bu dersin verilerini sıfırla"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Dersi Sıfırla
                      </button>
                    )}

                    <button
                      onClick={() => onStartTestTopic(subject.id)}
                      className="py-1.5 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
                    >
                      Dersi Çöz
                    </button>
                  </div>
                </div>

                {/* Sub-Topics Progress Bars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subStat.topics.map((topicStat) => (
                    <TopicProgressBar
                      key={topicStat.topicId}
                      stat={topicStat}
                      onStartQuizTopic={onStartTestTopic}
                      onResetTopic={(subId, topId) => {
                        resetTopicAnalyticsData(subId, topId);
                        handleRefresh();
                      }}
                    />
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

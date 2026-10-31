import React, { useState } from 'react';
import { SubjectId, DifficultyLevel, Question, SubjectConfig } from './types/kpss';
import { KPSS_CURRICULUM, KPSS_SUBJECTS_LIST, getSubjectConfig } from './config/kpssCurriculum';
import { generateKPSSQuestions } from './services/aiService';
import { SubjectCard } from './components/SubjectCard';
import { TestExecutionView } from './components/TestExecutionView';
import { AnalyticsDashboardView } from './components/AnalyticsDashboardView';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  BookOpen, 
  BarChart2, 
  Key, 
  Loader2, 
  Settings, 
  BrainCircuit, 
  Check, 
  Flame, 
  HelpCircle,
  Clock,
  Layers,
  X
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics'>('dashboard');
  const [activeSubject, setActiveSubject] = useState<SubjectConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  // Test options state
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('ÖSYM Seviyesi');
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);

  const handleStartTest = async (subjectId: SubjectId, topicId?: string, customCount?: number) => {
    const subject = getSubjectConfig(subjectId);
    if (!subject) return;

    const countToUse = customCount || questionCount;

    setActiveSubject(subject);
    setIsLoading(true);

    const topicName = topicId
      ? subject.topics.find((t) => t.id === topicId)?.name || 'Konu'
      : 'Tüm Konular';

    setLoadingText(
      `ÖSYM Komisyon Yapay Zekası "${subject.name} - ${topicName}" (${countToUse} Soru) hazırlıyor...`
    );

    try {
      const generated = await generateKPSSQuestions({
        subjectId,
        topicId,
        count: countToUse,
        difficulty,
        customApiKey,
      });

      setQuestions(generated);
    } catch (err) {
      console.error('Soru oluşturulurken hata oluştu:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExitTest = () => {
    setActiveSubject(null);
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 glass-panel bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={handleExitTest}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-100 tracking-tight">KPSS AI Simülatör</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  v2.0 ÖSYM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Vibe Coding Yapay Zeka Soru Üretici
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                handleExitTest();
              }}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'dashboard' && !activeSubject
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Test Çöz
            </button>

            <button
              onClick={() => {
                setActiveTab('analytics');
                handleExitTest();
              }}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" /> Konu Analizi
            </button>
          </div>

          {/* Key / Settings */}
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors relative"
            title="OpenAI API Key Ayarları"
          >
            <Key className="w-4 h-4 text-indigo-400" />
            {customApiKey && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* Loading Overlay State */}
        {isLoading ? (
          <div className="glass-panel rounded-3xl p-12 max-w-xl mx-auto my-12 text-center space-y-6 border border-slate-800">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
              <Sparkles className="w-8 h-8 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Sorular Hazırlanıyor</h3>
              <p className="text-sm text-slate-400">{loadingText}</p>
            </div>

            <div className="py-2 px-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 inline-block">
              ÖSYM müfredat çeldirici mantığı & detaylı akademik açıklama oluşturuluyor
            </div>
          </div>
        ) : activeSubject && questions.length > 0 ? (
          /* Active Test Execution View */
          <TestExecutionView
            subject={activeSubject}
            questions={questions}
            onExitTest={handleExitTest}
          />
        ) : activeTab === 'analytics' ? (
          /* Analytics & Curriculum Dashboard View */
          <AnalyticsDashboardView
            onStartTestTopic={(subjectId, topicId) => {
              setActiveTab('dashboard');
              handleStartTest(subjectId, topicId);
            }}
          />
        ) : (
          /* Main Dashboard: Subject Grid & Test Controls */
          <div className="space-y-8">
            {/* Banner Section */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> ÖSYM 2026 Müfredatı & Yapay Zeka Desteği
                </div>

                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
                  KPSS Sınav Simülatörü ve Akıllı Soru Üretici
                </h2>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  ÖSYM soru komisyonu standartlarında hazırlanan gerçekçi çeldiricilere sahip Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık ve Güncel Bilgiler soruları ile sınava eksiksiz hazırlanın.
                </p>

                {/* Global Custom Test Configuration Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
                  {/* Question Count Picker */}
                  <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Soru Sayısı:</span>
                    {([5, 10, 20, 30, 40] as const).map((cnt) => (
                      <button
                        key={cnt}
                        onClick={() => setQuestionCount(cnt)}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          questionCount === cnt
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'hover:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {cnt} Soru
                      </button>
                    ))}
                  </div>

                  {/* Difficulty Level Picker */}
                  <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Zorluk:</span>
                    {(['Karma', 'Kolay', 'Orta', 'Zor', 'ÖSYM Seviyesi'] as DifficultyLevel[]).map((df) => (
                      <button
                        key={df}
                        onClick={() => setDifficulty(df)}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          difficulty === df
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'hover:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {df}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Cards Grid (6 Main KPSS Subjects) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-indigo-400" />
                  KPSS Lisans Dersleri ({KPSS_SUBJECTS_LIST.length})
                </h3>
                <span className="text-xs text-slate-400">
                  Soru sayısı seçin, ardından teste başlayın
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {KPSS_SUBJECTS_LIST.map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    onStartTest={handleStartTest}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* System Health & Status Footer */}
      <Footer />

      {/* OpenAI API Key Settings Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Key className="w-5 h-5 text-indigo-400" /> OpenAI API Key
              </h3>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Dilerseniz kendi OpenAI API anahtarınızı (sk-...) girebilirsiniz. Anahtar girilmezse dahili ÖSYM komisyon servisi ve hazır mock soru veri seti kullanılır.
            </p>

            <input
              type="password"
              placeholder="sk-..."
              value={customApiKey}
              onChange={(e) => setCustomApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
              >
                Kaydet & Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

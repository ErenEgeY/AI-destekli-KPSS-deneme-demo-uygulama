import React, { useState } from 'react';
import { SubjectConfig, TopicConfig } from '../types/kpss';
import { 
  BookOpen, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PlayCircle, 
  Sparkles,
  Layers
} from 'lucide-react';

interface SubjectCardProps {
  subject: SubjectConfig;
  onStartTest: (subjectId: SubjectConfig['id'], topicId?: string, count?: number) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onStartTest }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(undefined);
  const [selectedCount, setSelectedCount] = useState<number>(5);

  const getSubjectColorClass = (id: string) => {
    switch (id) {
      case 'turkce':
        return 'from-blue-600/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400';
      case 'matematik':
        return 'from-cyan-600/20 to-blue-600/10 border-cyan-500/30 text-cyan-400';
      case 'geometri':
        return 'from-purple-600/20 to-fuchsia-600/10 border-purple-500/30 text-purple-400';
      case 'tarih':
        return 'from-amber-600/20 to-orange-600/10 border-amber-500/30 text-amber-400';
      case 'cografya':
        return 'from-emerald-600/20 to-teal-600/10 border-emerald-500/30 text-emerald-400';
      case 'vatandaslik':
        return 'from-purple-600/20 to-violet-600/10 border-purple-500/30 text-purple-400';
      case 'guncel':
        return 'from-rose-600/20 to-pink-600/10 border-rose-500/30 text-rose-400';
      default:
        return 'from-slate-700/20 to-slate-800/10 border-slate-700 text-slate-400';
    }
  };

  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStartTest(subject.id, selectedTopicId, selectedCount);
  };

  return (
    <div 
      className={`glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.015] flex flex-col justify-between border ${getSubjectColorClass(subject.id)}`}
    >
      {/* Background Gradient Glow */}
      <div className="absolute -right-12 -top-12 w-36 h-36 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-slate-800/90 border border-slate-700 shadow-sm ${getSubjectColorClass(subject.id).split(' ').pop()}`}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 tracking-tight">{subject.name}</h3>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3 text-amber-400" /> ÖSYM Müfredat Uyumlu
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            %{subject.overallPercentage} Ağırlık
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 my-4 py-3 px-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
          <div className="flex flex-col items-center justify-center p-1.5 text-center">
            <span className="text-slate-400 flex items-center gap-1 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> Soru
            </span>
            <span className="font-bold text-slate-200 text-sm">{subject.totalQuestions} Soru</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 text-center border-x border-slate-800">
            <span className="text-slate-400 flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> Süre
            </span>
            <span className="font-bold text-slate-200 text-sm">{subject.recommendedTimeMinutes} Dk</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 text-center">
            <span className="text-slate-400 flex items-center gap-1 mb-1">
              <Layers className="w-3.5 h-3.5 text-purple-400" /> Konular
            </span>
            <span className="font-bold text-slate-200 text-sm">{subject.topics.length} Konu</span>
          </div>
        </div>
      </div>

      {/* Topics Collapsible Section */}
      <div className="mt-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 font-medium py-2 px-1 transition-colors border-t border-slate-800/80"
        >
          <span>Alt Konular ({subject.topics.length})</span>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {isExpanded && (
          <div className="space-y-2 my-2 max-h-48 overflow-y-auto pr-1 text-xs">
            <div
              onClick={() => setSelectedTopicId(undefined)}
              className={`p-2 rounded-lg cursor-pointer transition-all border ${
                selectedTopicId === undefined
                  ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200 font-semibold'
                  : 'bg-slate-800/50 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>Tüm Ders (Karışık Test)</span>
                <span className="text-[10px] opacity-75">{subject.totalQuestions} Soru</span>
              </div>
            </div>

            {subject.topics.map((topic: TopicConfig) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`p-2 rounded-lg cursor-pointer transition-all border ${
                  selectedTopicId === topic.id
                    ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200 font-semibold'
                    : 'bg-slate-800/50 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{topic.name}</span>
                  <span className="text-[10px] text-slate-400">{topic.questionCount} Soru (%{topic.percentage})</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Soru Sayısı Seçici */}
      <div className="mt-3 py-2 px-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Soru Sayısı:</span>
        <div className="flex items-center gap-1">
          {([5, 10, 20, 30, 40] as const).map((cnt) => (
            <button
              key={cnt}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCount(cnt);
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                selectedCount === cnt
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {cnt}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleStart}
        className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-md hover:shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99]"
      >
        <PlayCircle className="w-4 h-4 fill-white text-indigo-700" />
        {selectedTopicId ? `Seçili Konudan (${selectedCount} Soru) Başla` : `Genel Testi (${selectedCount} Soru) Başlat`}
      </button>
    </div>
  );
};

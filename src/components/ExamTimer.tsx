import React, { useEffect, useState } from 'react';
import { Clock, Pause, Play, AlertTriangle } from 'lucide-react';

interface ExamTimerProps {
  initialMinutes: number;
  onTimeUp?: () => void;
  onTimerTick?: (secondsRemaining: number) => void;
  isPausedExternal?: boolean;
}

export const ExamTimer: React.FC<ExamTimerProps> = ({
  initialMinutes,
  onTimeUp,
  onTimerTick,
  isPausedExternal = false,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialMinutes * 60);
  const [isPaused, setIsPaused] = useState<boolean>(isPausedExternal);

  useEffect(() => {
    setSecondsLeft(initialMinutes * 60);
  }, [initialMinutes]);

  useEffect(() => {
    setIsPaused(isPausedExternal);
  }, [isPausedExternal]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        const next = prev - 1;
        if (onTimerTick) onTimerTick(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeUp, onTimerTick]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isWarning = secondsLeft <= 120 && secondsLeft > 0; // Less than 2 minutes

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div
      className={`flex items-center gap-3 py-1.5 px-3.5 rounded-xl border transition-all duration-300 ${
        isWarning
          ? 'bg-rose-950/60 border-rose-500/60 text-rose-300 shadow-lg shadow-rose-500/20 animate-pulse-fast'
          : isPaused
          ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
          : 'bg-slate-800/90 border-slate-700 text-slate-200 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2">
        {isWarning ? (
          <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
        ) : (
          <Clock className={`w-4 h-4 ${isPaused ? 'text-amber-400' : 'text-indigo-400'}`} />
        )}
        <span className="font-mono text-base font-bold tracking-wider">
          {formatNumber(minutes)}:{formatNumber(seconds)}
        </span>
      </div>

      {/* Pause/Resume Toggle */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        title={isPaused ? 'Süreyi Devam Ettir' : 'Süreyi Duraklat'}
        className="p-1 rounded-lg hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 transition-colors"
      >
        {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
      </button>

      {isWarning && (
        <span className="text-[11px] font-semibold text-rose-400 hidden sm:inline">
          Az Süre Kaldı!
        </span>
      )}
    </div>
  );
};

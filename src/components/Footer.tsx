import React, { useState } from 'react';
import { getActiveApiKey } from '../services/aiService';
import { Activity, Database, Trash2, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';

interface FooterProps {
  onResetData?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetData }) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const activeKey = getActiveApiKey();
  const isUsingCustomOrBuiltin = activeKey && activeKey.length > 20;

  const handleReset = () => {
    try {
      localStorage.removeItem('kpss_test_history');
      if (onResetData) onResetData();
      setShowConfirmReset(false);
      window.location.reload();
    } catch (err) {
      console.error('Failed to reset data:', err);
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 px-4 mt-auto text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* System Health Badges */}
        <div className="flex flex-wrap items-center gap-4">
          {/* API Status */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>OpenAI API:</span>
            <strong className="text-emerald-400 font-medium">
              {isUsingCustomOrBuiltin ? 'Aktif (ÖSYM Servisi)' : 'Lokal Mock Modu'}
            </strong>
          </div>

          {/* Dataset Status */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span>ÖSYM Veri Seti:</span>
            <strong className="text-indigo-400 font-medium">2006-2025 Müfredatı</strong>
          </div>

          {/* Version */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Sürüm:</span>
            <strong className="text-slate-200 font-mono">v2.0 Production</strong>
          </div>
        </div>

        {/* Reset Data Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowConfirmReset(true)}
            className="py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 flex items-center gap-1.5 transition-colors"
            title="Tüm kayıtlı test ve istatistik verilerini sıfırla"
          >
            <Trash2 className="w-3.5 h-3.5" /> Tüm Verileri Sıfırla
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-rose-500/40 space-y-4 text-center">
            <Trash2 className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-100">Kayıtlı Veriler Sıfırlansın mı?</h3>
            <p className="text-xs text-slate-300">
              Bu işlem localStorage üzerinde tutulan tüm çözülmüş test geçmişinizi ve konu istatistiklerini temizleyecektir. Emin misiniz?
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                Vazgeç
              </button>
              <button
                onClick={handleReset}
                className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs"
              >
                Evet, Sıfırla
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

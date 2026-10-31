import React from 'react';

export type VisualDiagramType =
  | 'right-triangle'
  | 'circle-pie'
  | 'coordinate-plane'
  | 'parallel-lines'
  | 'polygon'
  | 'turkey-map-minerals'
  | 'turkey-map-rivers'
  | 'climate-graph'
  | 'population-pyramid'
  | 'history-timeline'
  | 'ottoman-map'
  | 'data-graph-bar'
  | 'logic-grid-table';

interface VisualDiagramRendererProps {
  type?: VisualDiagramType | string;
  caption?: string;
}

export const VisualDiagramRenderer: React.FC<VisualDiagramRendererProps> = ({
  type = 'right-triangle',
  caption,
}) => {
  return (
    <div className="my-4 p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 flex flex-col items-center justify-center max-w-lg mx-auto shadow-inner space-y-2">
      <div className="w-full flex items-center justify-center py-2">
        {/* 1. GEOMETRİ: Dik Üçgen */}
        {type === 'right-triangle' && (
          <svg width="280" height="180" viewBox="0 0 280 180" className="drop-shadow-md">
            <polygon
              points="50,30 50,150 230,150"
              fill="rgba(79, 70, 229, 0.15)"
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d="M 50,45 L 65,45 L 65,30" fill="none" stroke="#e0e7ff" strokeWidth="1.5" />
            <circle cx="57" cy="38" r="2" fill="#818cf8" />
            <line x1="50" y1="30" x2="91.5" y2="122.3" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="35" y="25" fill="#f8fafc" fontSize="14" fontWeight="bold">A (90°)</text>
            <text x="35" y="165" fill="#f8fafc" fontSize="14" fontWeight="bold">B</text>
            <text x="240" y="165" fill="#f8fafc" fontSize="14" fontWeight="bold">C</text>
            <text x="95" y="135" fill="#f59e0b" fontSize="12" fontWeight="bold">H (D)</text>
            <text x="20" y="95" fill="#a5b4fc" fontSize="13" fontWeight="bold">c = 6 cm</text>
            <text x="130" y="170" fill="#a5b4fc" fontSize="13" fontWeight="bold">b = 8 cm</text>
            <text x="150" y="80" fill="#a5b4fc" fontSize="13" fontWeight="bold">a = 10 cm</text>
            <text x="45" y="80" fill="#f59e0b" fontSize="12" fontWeight="bold">h_a = ?</text>
          </svg>
        )}

        {/* 2. GEOMETRİ & MATEMATİK: Daire Dilim / Grafik */}
        {(type === 'circle-pie' || type === 'data-graph-pie') && (
          <svg width="250" height="200" viewBox="0 0 250 200" className="drop-shadow-md">
            <path d="M 125,20 A 80,80 0 1 0 125,180 Z" fill="rgba(59, 130, 246, 0.3)" stroke="#60a5fa" strokeWidth="2" />
            <path d="M 125,20 A 80,80 0 0 1 194.28,140 L 125,100 Z" fill="rgba(16, 185, 129, 0.3)" stroke="#34d399" strokeWidth="2" />
            <path d="M 194.28,140 A 80,80 0 0 1 125,180 L 125,100 Z" fill="rgba(245, 158, 11, 0.3)" stroke="#fbbf24" strokeWidth="2" />
            <text x="65" y="105" fill="#93c5fd" fontSize="12" fontWeight="bold">Koyun (180°)</text>
            <text x="140" y="70" fill="#6ee7b7" fontSize="12" fontWeight="bold">Keçi (120°)</text>
            <text x="145" y="150" fill="#fde047" fontSize="12" fontWeight="bold">İnek (60° = 40)</text>
          </svg>
        )}

        {/* 3. COĞRAFYA: Türkiye Madenler Harita Görseli */}
        {type === 'turkey-map-minerals' && (
          <svg width="340" height="180" viewBox="0 0 340 180" className="drop-shadow-md">
            {/* Türkiye Haritası Ana Şeması */}
            <path
              d="M 20,80 C 40,40 100,45 160,30 C 220,25 280,35 320,60 C 330,90 310,130 270,140 C 200,150 120,145 60,135 C 30,130 15,100 20,80 Z"
              fill="rgba(16, 185, 129, 0.12)"
              stroke="#10b981"
              strokeWidth="2"
            />
            {/* Maden Noktaları */}
            {/* Konya Seydişehir - Boksit */}
            <circle cx="130" cy="110" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
            <text x="110" y="130" fill="#fbbf24" fontSize="11" fontWeight="bold">1. Konya (Seydişehir)</text>

            {/* Batman - Petrol */}
            <circle cx="270" cy="105" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <text x="250" y="125" fill="#f87171" fontSize="11" fontWeight="bold">2. Batman</text>

            {/* Zonguldak - Taş Kömürü */}
            <circle cx="140" cy="45" r="6" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
            <text x="110" y="35" fill="#c084fc" fontSize="11" fontWeight="bold">3. Zonguldak (Ereğli)</text>

            {/* Elazığ - Bakır / Krom */}
            <circle cx="240" cy="85" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
            <text x="220" y="75" fill="#60a5fa" fontSize="11" fontWeight="bold">4. Elazığ (Maden)</text>
          </svg>
        )}

        {/* 4. COĞRAFYA: Sıcaklık ve Yağış İklim Grafiği */}
        {type === 'climate-graph' && (
          <svg width="300" height="180" viewBox="0 0 300 180" className="drop-shadow-md">
            {/* Eksenler */}
            <line x1="40" y1="20" x2="40" y2="140" stroke="#64748b" strokeWidth="1.5" />
            <line x1="40" y1="140" x2="270" y2="140" stroke="#64748b" strokeWidth="1.5" />
            <line x1="270" y1="20" x2="270" y2="140" stroke="#64748b" strokeWidth="1.5" />

            {/* Yağış Sütunları (Mavi) */}
            <rect x="50" y="50" width="12" height="90" fill="#3b82f6" opacity="0.7" />
            <rect x="70" y="70" width="12" height="70" fill="#3b82f6" opacity="0.7" />
            <rect x="90" y="90" width="12" height="50" fill="#3b82f6" opacity="0.7" />
            <rect x="110" y="115" width="12" height="25" fill="#3b82f6" opacity="0.7" />
            <rect x="130" y="125" width="12" height="15" fill="#3b82f6" opacity="0.7" />
            <rect x="150" y="130" width="12" height="10" fill="#3b82f6" opacity="0.7" />
            <rect x="170" y="120" width="12" height="20" fill="#3b82f6" opacity="0.7" />
            <rect x="190" y="95" width="12" height="45" fill="#3b82f6" opacity="0.7" />
            <rect x="210" y="75" width="12" height="65" fill="#3b82f6" opacity="0.7" />
            <rect x="230" y="40" width="12" height="100" fill="#3b82f6" opacity="0.7" />

            {/* Sıcaklık Eğrisi (Kırmızı) */}
            <path
              d="M 56,120 Q 140,30 236,110"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
            />

            <text x="15" y="80" fill="#93c5fd" fontSize="10" fontWeight="bold">Yağış (mm)</text>
            <text x="275" y="80" fill="#f87171" fontSize="10" fontWeight="bold">Sıcaklık (°C)</text>
            <text x="100" y="160" fill="#cbd5e1" fontSize="11" fontWeight="bold">Aylar (O S M N M H T A E E K A)</text>
          </svg>
        )}

        {/* 5. TARİH: Milli Mücadele Kronoloji Zaman Çizelgesi */}
        {type === 'history-timeline' && (
          <svg width="340" height="140" viewBox="0 0 340 140" className="drop-shadow-md">
            {/* Ana Çizelge Çizgisi */}
            <line x1="20" y1="70" x2="320" y2="70" stroke="#f59e0b" strokeWidth="3" />

            {/* Duraklar */}
            {/* Amasya 1919 */}
            <circle cx="40" cy="70" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <text x="25" y="45" fill="#34d399" fontSize="10" fontWeight="bold">Amasya Gen.</text>
            <text x="28" y="95" fill="#cbd5e1" fontSize="9">Haziran 1919</text>

            {/* Erzurum 1919 */}
            <circle cx="110" cy="70" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x="95" y="45" fill="#f87171" fontSize="10" fontWeight="bold">Erzurum Kong.</text>
            <text x="98" y="95" fill="#cbd5e1" fontSize="9">Temmuz 1919</text>

            {/* Sivas 1919 */}
            <circle cx="180" cy="70" r="7" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
            <text x="168" y="45" fill="#60a5fa" fontSize="10" fontWeight="bold">Sivas Kong.</text>
            <text x="168" y="95" fill="#cbd5e1" fontSize="9">Eylül 1919</text>

            {/* I. TBMM 1920 */}
            <circle cx="250" cy="70" r="7" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
            <text x="238" y="45" fill="#c084fc" fontSize="10" fontWeight="bold">I. TBMM</text>
            <text x="238" y="95" fill="#cbd5e1" fontSize="9">Nisan 1920</text>

            {/* Lozan 1923 */}
            <circle cx="305" cy="70" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="290" y="45" fill="#fbbf24" fontSize="10" fontWeight="bold">Lozan</text>
            <text x="290" y="95" fill="#cbd5e1" fontSize="9">Temmuz 1923</text>
          </svg>
        )}

        {/* 6. SÖZEL MANTIK: Tablo Şeması */}
        {type === 'logic-grid-table' && (
          <svg width="300" height="150" viewBox="0 0 300 150" className="drop-shadow-md">
            <rect x="20" y="20" width="260" height="110" rx="8" fill="rgba(30, 41, 59, 0.9)" stroke="#6366f1" strokeWidth="2" />
            <line x1="20" y1="55" x2="280" y2="55" stroke="#475569" strokeWidth="1.5" />
            <line x1="20" y1="90" x2="280" y2="90" stroke="#475569" strokeWidth="1.5" />
            <line x1="100" y1="20" x2="100" y2="130" stroke="#475569" strokeWidth="1.5" />
            <line x1="190" y1="20" x2="190" y2="130" stroke="#475569" strokeWidth="1.5" />

            <text x="40" y="42" fill="#a5b4fc" fontSize="11" fontWeight="bold">Aday</text>
            <text x="125" y="42" fill="#a5b4fc" fontSize="11" fontWeight="bold">Sıra / Gün</text>
            <text x="215" y="42" fill="#a5b4fc" fontSize="11" fontWeight="bold">Görev</text>

            <text x="35" y="77" fill="#f8fafc" fontSize="11">Ahmet & Ceyda</text>
            <text x="130" y="77" fill="#f8fafc" fontSize="11">1. ve 2. Sıra</text>
            <text x="210" y="77" fill="#34d399" fontSize="11" fontWeight="bold">Mülakat A</text>

            <text x="45" y="112" fill="#f8fafc" fontSize="11">Deniz</text>
            <text x="135" y="112" fill="#f8fafc" fontSize="11">3. Sıra</text>
            <text x="210" y="112" fill="#fbbf24" fontSize="11" fontWeight="bold">Mülakat B</text>
          </svg>
        )}

        {/* 7. GEOMETRİ: Analitik Koordinat Düzlemi */}
        {type === 'coordinate-plane' && (
          <svg width="240" height="180" viewBox="0 0 240 180" className="drop-shadow-md">
            <line x1="20" y1="90" x2="220" y2="90" stroke="#94a3b8" strokeWidth="2" />
            <line x1="120" y1="10" x2="120" y2="170" stroke="#94a3b8" strokeWidth="2" />
            <line x1="30" y1="140" x2="210" y2="20" stroke="#818cf8" strokeWidth="3" />
            <circle cx="120" cy="90" r="3" fill="#f8fafc" />
            <text x="125" y="105" fill="#cbd5e1" fontSize="11">O(0,0)</text>
            <text x="220" y="105" fill="#cbd5e1" fontSize="12" fontWeight="bold">x</text>
            <text x="128" y="15" fill="#cbd5e1" fontSize="12" fontWeight="bold">y</text>
            <text x="170" y="35" fill="#a5b4fc" fontSize="12" fontWeight="bold">d doğrusu</text>
          </svg>
        )}

        {/* 8. GEOMETRİ: Çokgen / Dörtgen */}
        {type === 'polygon' && (
          <svg width="240" height="180" viewBox="0 0 240 180" className="drop-shadow-md">
            <polygon
              points="120,20 210,80 175,160 65,160 30,80"
              fill="rgba(168, 85, 247, 0.15)"
              stroke="#c084fc"
              strokeWidth="2.5"
            />
            <text x="115" y="15" fill="#f8fafc" fontSize="13" fontWeight="bold">A</text>
            <text x="220" y="85" fill="#f8fafc" fontSize="13" fontWeight="bold">B</text>
            <text x="180" y="175" fill="#f8fafc" fontSize="13" fontWeight="bold">C</text>
            <text x="55" y="175" fill="#f8fafc" fontSize="13" fontWeight="bold">D</text>
            <text x="15" y="85" fill="#f8fafc" fontSize="13" fontWeight="bold">E</text>
          </svg>
        )}
      </div>

      {caption && (
        <span className="text-[11px] font-semibold text-slate-300 italic">
          {caption}
        </span>
      )}
    </div>
  );
};

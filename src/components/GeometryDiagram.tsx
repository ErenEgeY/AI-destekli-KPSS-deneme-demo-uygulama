import React from 'react';

export type DiagramType =
  | 'right-triangle'
  | 'circle-pie'
  | 'coordinate-plane'
  | 'parallel-lines'
  | 'polygon';

interface GeometryDiagramProps {
  type?: DiagramType | string;
  caption?: string;
}

export const GeometryDiagram: React.FC<GeometryDiagramProps> = ({
  type = 'right-triangle',
  caption = 'Şekil 1: ÖSYM Geometri Çizimi',
}) => {
  return (
    <div className="my-4 p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 flex flex-col items-center justify-center max-w-md mx-auto shadow-inner space-y-2">
      <div className="w-full flex items-center justify-center py-2">
        {type === 'right-triangle' && (
          <svg width="280" height="180" viewBox="0 0 280 180" className="drop-shadow-md">
            {/* Dik Üçgen ABC */}
            {/* A (50, 30), B (50, 150), C (230, 150) */}
            <polygon
              points="50,30 50,150 230,150"
              fill="rgba(79, 70, 229, 0.15)"
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Diklik Simgesi (A köşesinde) */}
            <path d="M 50,45 L 65,45 L 65,30" fill="none" stroke="#e0e7ff" strokeWidth="1.5" />
            <circle cx="57" cy="38" r="2" fill="#818cf8" />

            {/* Yükseklik [Ah_a] */}
            {/* Hipotenüs BC denklemi: y = 150 - (120/180)*(x - 50) = 150 - (2/3)(x - 50) */}
            {/* Dik ayağı D ikilisi: (91.5, 122.3) */}
            <line
              x1="50"
              y1="30"
              x2="91.5"
              y2="122.3"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4,4"
            />

            {/* Köşe Etiketleri */}
            <text x="35" y="25" fill="#f8fafc" fontSize="14" fontWeight="bold">A (90°)</text>
            <text x="35" y="165" fill="#f8fafc" fontSize="14" fontWeight="bold">B</text>
            <text x="240" y="165" fill="#f8fafc" fontSize="14" fontWeight="bold">C</text>
            <text x="95" y="135" fill="#f59e0b" fontSize="12" fontWeight="bold">H (D)</text>

            {/* Kenar Ölçüleri */}
            <text x="20" y="95" fill="#a5b4fc" fontSize="13" fontWeight="bold">c = 6 cm</text>
            <text x="130" y="170" fill="#a5b4fc" fontSize="13" fontWeight="bold">b = 8 cm</text>
            <text x="150" y="80" fill="#a5b4fc" fontSize="13" fontWeight="bold">a = 10 cm</text>
            <text x="45" y="80" fill="#f59e0b" fontSize="12" fontWeight="bold">h_a = ?</text>
          </svg>
        )}

        {type === 'circle-pie' && (
          <svg width="240" height="200" viewBox="0 0 240 200" className="drop-shadow-md">
            {/* Daire Grafiği (Merkez 120, 100, Yarıçap 80) */}
            {/* Koyun 180° (Sol Yarım Daire: 90° - 270°) */}
            <path
              d="M 120,20 A 80,80 0 1 0 120,180 Z"
              fill="rgba(59, 130, 246, 0.3)"
              stroke="#60a5fa"
              strokeWidth="2"
            />
            {/* Keçi 120° (270° - 30°) */}
            <path
              d="M 120,20 A 80,80 0 0 1 189.28,140 L 120,100 Z"
              fill="rgba(16, 185, 129, 0.3)"
              stroke="#34d399"
              strokeWidth="2"
            />
            {/* İnek 60° (30° - 90°) */}
            <path
              d="M 189.28,140 A 80,80 0 0 1 120,180 L 120,100 Z"
              fill="rgba(245, 158, 11, 0.3)"
              stroke="#fbbf24"
              strokeWidth="2"
            />

            {/* Daire Etiketleri */}
            <text x="60" y="105" fill="#93c5fd" fontSize="12" fontWeight="bold">Koyun (180°)</text>
            <text x="135" y="70" fill="#6ee7b7" fontSize="12" fontWeight="bold">Keçi (120°)</text>
            <text x="140" y="150" fill="#fde047" fontSize="12" fontWeight="bold">İnek (60° = 40)</text>
          </svg>
        )}

        {type === 'coordinate-plane' && (
          <svg width="240" height="180" viewBox="0 0 240 180" className="drop-shadow-md">
            {/* Eksenler */}
            <line x1="20" y1="90" x2="220" y2="90" stroke="#94a3b8" strokeWidth="2" />
            <line x1="120" y1="10" x2="120" y2="170" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Ok Başları */}
            <path d="M 215,85 L 225,90 L 215,95 Z" fill="#94a3b8" />
            <path d="M 115,15 L 120,5 L 125,15 Z" fill="#94a3b8" />

            {/* Doğru d: 2x - 3y + 6 = 0 */}
            <line x1="30" y1="140" x2="210" y2="20" stroke="#818cf8" strokeWidth="3" />

            <circle cx="120" cy="90" r="3" fill="#f8fafc" />
            <text x="125" y="105" fill="#cbd5e1" fontSize="11">O(0,0)</text>

            <text x="220" y="105" fill="#cbd5e1" fontSize="12" fontWeight="bold">x</text>
            <text x="128" y="15" fill="#cbd5e1" fontSize="12" fontWeight="bold">y</text>
            <text x="170" y="35" fill="#a5b4fc" fontSize="12" fontWeight="bold">d doğrusu</text>
          </svg>
        )}

        {type === 'parallel-lines' && (
          <svg width="260" height="160" viewBox="0 0 260 160" className="drop-shadow-md">
            {/* d1 ve d2 paralel doğruları */}
            <line x1="20" y1="40" x2="240" y2="40" stroke="#818cf8" strokeWidth="2.5" />
            <line x1="20" y1="120" x2="240" y2="120" stroke="#818cf8" strokeWidth="2.5" />

            {/* Kesen doğru k */}
            <line x1="60" y1="140" x2="200" y2="20" stroke="#f59e0b" strokeWidth="2" />

            <text x="245" y="45" fill="#a5b4fc" fontSize="12" fontWeight="bold">d1</text>
            <text x="245" y="125" fill="#a5b4fc" fontSize="12" fontWeight="bold">d2</text>
            <text x="205" y="25" fill="#fbbf24" fontSize="12" fontWeight="bold">k</text>

            <text x="155" y="55" fill="#34d399" fontSize="11" fontWeight="bold">a°</text>
            <text x="95" y="115" fill="#34d399" fontSize="11" fontWeight="bold">b°</text>
          </svg>
        )}

        {type === 'polygon' && (
          <svg width="240" height="180" viewBox="0 0 240 180" className="drop-shadow-md">
            {/* Düzgün Beşgen / Dörtgen */}
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
        <span className="text-[11px] font-semibold text-slate-400 italic">
          {caption}
        </span>
      )}
    </div>
  );
};

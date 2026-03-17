'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Tag } from 'lucide-react';

// Simulated before/after images using CSS patterns
const cases = [
  { label: 'Lip Filler', area: 'Lips', date: '19 Mar 2026', beforeDate: '5 Jan 2026' },
  { label: 'Botox — Full Face', area: 'Face', date: '19 Mar 2026', beforeDate: '1 Dec 2025' },
  { label: 'Skin Rejuvenation', area: 'Forehead', date: '19 Mar 2026', beforeDate: '3 Feb 2026' },
];

function FaceIllustration({ variant }: { variant: 'before' | 'after' }) {
  const skin = variant === 'before' ? '#d4a882' : '#e8c4a0';
  const line = variant === 'before' ? '#c49870' : '#ddb890';
  const linesOpacity = variant === 'before' ? 1 : 0.3;
  const lipColor = variant === 'before' ? '#c87070' : '#e090a0';

  return (
    <svg viewBox="0 0 80 100" style={{ width: '100%', height: '100%' }}>
      <rect width="80" height="100" fill={variant === 'before' ? '#f0ebe4' : '#fdf5f0'} />
      {/* Face */}
      <ellipse cx="40" cy="52" rx="26" ry="34" fill={skin} />
      {/* Eyes */}
      <ellipse cx="30" cy="42" rx="6" ry="3.5" fill="white" />
      <ellipse cx="50" cy="42" rx="6" ry="3.5" fill="white" />
      <circle cx="30" cy="42" r="2" fill="#3a2820" />
      <circle cx="50" cy="42" r="2" fill="#3a2820" />
      {/* Eyebrows */}
      <path d={variant === 'before' ? "M 25 36 Q 30 34 35 36" : "M 25 35 Q 30 33 35 35"} fill="none" stroke="#6b4c3b" strokeWidth="1.2" strokeLinecap="round" />
      <path d={variant === 'before' ? "M 45 36 Q 50 34 55 36" : "M 45 35 Q 50 33 55 35"} fill="none" stroke="#6b4c3b" strokeWidth="1.2" strokeLinecap="round" />
      {/* Forehead lines */}
      {variant === 'before' && (
        <g opacity={linesOpacity}>
          <path d="M 30 28 Q 40 26 50 28" fill="none" stroke={line} strokeWidth="0.6" />
          <path d="M 32 24 Q 40 22 48 24" fill="none" stroke={line} strokeWidth="0.5" />
          <path d="M 32 32 Q 38 31.5 32 30.5" fill="none" stroke={line} strokeWidth="0.4" />
        </g>
      )}
      {/* Nose */}
      <ellipse cx="40" cy="56" rx="4" ry="3" fill={line} opacity={0.4} />
      {/* Lips */}
      <path d={variant === 'before' ? "M 32 68 Q 40 72 48 68" : "M 30 67 Q 40 75 50 67"} fill={lipColor} />
      <path d={variant === 'before' ? "M 34 68 Q 40 65 46 68" : "M 32 67 Q 40 64 48 67"} fill={lipColor + 'aa'} />
      {/* Nasolabial folds */}
      {variant === 'before' && (
        <g opacity="0.6">
          <path d="M 28 56 Q 29 63 31 67" fill="none" stroke={line} strokeWidth="0.7" />
          <path d="M 52 56 Q 51 63 49 67" fill="none" stroke={line} strokeWidth="0.7" />
        </g>
      )}
      {/* Label */}
      <rect x="4" y="4" width={variant === 'before' ? 24 : 22} height="10" rx="3" fill={variant === 'before' ? 'rgba(0,0,0,0.3)' : 'rgba(92,99,64,0.8)'} />
      <text x="16" y="11" textAnchor="middle" fontSize="5" fill="white" fontWeight="600">
        {variant === 'before' ? 'Before' : 'After'}
      </text>
    </svg>
  );
}

export default function BeforeAfter() {
  const [caseIdx, setCaseIdx] = useState(0);
  const [comparing, setComparing] = useState(true);
  const current = cases[caseIdx];

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>Before & After Gallery</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Sarah Mitchell · Secured patient record</p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setCaseIdx(i => Math.max(0, i-1))} className="p-1 rounded-lg hover:bg-gray-100">
            <ChevronLeft size={16} style={{ color: caseIdx > 0 ? 'var(--foreground)' : 'var(--border)' }} />
          </button>
          <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', padding: '0 4px' }}>{caseIdx + 1}/{cases.length}</span>
          <button onClick={() => setCaseIdx(i => Math.min(cases.length - 1, i+1))} className="p-1 rounded-lg hover:bg-gray-100">
            <ChevronRight size={16} style={{ color: caseIdx < cases.length - 1 ? 'var(--foreground)' : 'var(--border)' }} />
          </button>
        </div>
      </div>

      {/* Comparison view */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag size={13} style={{ color: 'var(--color-olive)' }} />
          <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{current.label}</span>
          <span className="phase-badge" style={{ background: 'rgba(92,99,64,0.1)', color: 'var(--color-olive)', fontSize: '0.6rem' }}>{current.area}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Before */}
          <div>
            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)', aspectRatio: '3/4' }}>
              <FaceIllustration variant="before" />
            </div>
            <p style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)', textAlign: 'center', marginTop: 4 }}>{current.beforeDate}</p>
          </div>
          {/* After */}
          <div>
            <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--color-olive)', aspectRatio: '3/4' }}>
              <FaceIllustration variant="after" />
            </div>
            <p style={{ fontSize: '0.65rem', color: 'var(--color-olive)', textAlign: 'center', marginTop: 4, fontWeight: 600 }}>{current.date}</p>
          </div>
        </div>

        {/* Tabs for switching cases */}
        <div className="flex gap-1.5 mt-3">
          {cases.map((c, i) => (
            <button
              key={i}
              onClick={() => setCaseIdx(i)}
              className="flex-1 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: i === caseIdx ? 'var(--color-olive)' : 'var(--secondary)',
                color: i === caseIdx ? 'white' : 'var(--muted-foreground)',
                border: `1px solid ${i === caseIdx ? 'transparent' : 'var(--border)'}`,
                fontSize: '0.65rem',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

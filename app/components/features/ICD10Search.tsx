'use client';
import { useState } from 'react';
import { Search, Star, Plus, FileText } from 'lucide-react';

const allCodes = [
  { code: 'L70.0', desc: 'Acne vulgaris', cat: 'Skin' },
  { code: 'L70.4', desc: 'Infantile acne', cat: 'Skin' },
  { code: 'L57.8', desc: 'Skin changes due to chronic exposure', cat: 'Skin' },
  { code: 'G43.9', desc: 'Migraine, unspecified', cat: 'Neurology' },
  { code: 'M54.5', desc: 'Low back pain', cat: 'Musculoskeletal' },
  { code: 'J45.9', desc: 'Asthma, unspecified', cat: 'Respiratory' },
  { code: 'E11.9', desc: 'Type 2 diabetes without complications', cat: 'Endocrine' },
  { code: 'I10', desc: 'Essential hypertension', cat: 'Cardiovascular' },
  { code: 'F32.9', desc: 'Major depressive disorder, unspecified', cat: 'Mental Health' },
  { code: 'Z00.0', desc: 'General adult medical examination', cat: 'Preventive' },
  { code: 'L90.5', desc: 'Scar conditions and fibrosis of skin', cat: 'Skin' },
  { code: 'L81.0', desc: 'Postinflammatory hyperpigmentation', cat: 'Skin' },
];

const favourites = ['L70.0', 'Z00.0', 'L90.5'];

export default function ICD10Search() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<typeof allCodes>([]);

  const filtered = query.length > 0
    ? allCodes.filter(c => c.code.toLowerCase().includes(query.toLowerCase()) || c.desc.toLowerCase().includes(query.toLowerCase()))
    : allCodes.filter(c => favourites.includes(c.code));

  const toggle = (code: typeof allCodes[0]) => {
    setSelected(prev =>
      prev.find(c => c.code === code.code)
        ? prev.filter(c => c.code !== code.code)
        : [...prev, code]
    );
  };

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>ICD-10 Code Search</p>
          <div className="flex items-center gap-1">
            <Star size={12} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Showing doctor favourites</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ border: '1.5px solid var(--border)', background: 'var(--secondary)' }}>
          <Search size={14} style={{ color: 'var(--muted-foreground)' }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search by code (e.g. "J45") or description…'
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ fontSize: '0.8rem' }}
          />
        </div>
      </div>

      {/* Results list */}
      <div style={{ maxHeight: 220, overflowY: 'auto' }}>
        {filtered.map(code => {
          const isSelected = !!selected.find(c => c.code === code.code);
          const isFav = favourites.includes(code.code);
          return (
            <button
              key={code.code}
              onClick={() => toggle(code)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
              style={{
                borderBottom: '1px solid var(--border)',
                background: isSelected ? 'rgba(92,99,64,0.06)' : 'white',
              }}
              onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'var(--secondary)'; }}
              onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = 'white'; }}
            >
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  borderColor: isSelected ? 'var(--color-olive)' : 'var(--border)',
                  background: isSelected ? 'var(--color-olive)' : 'transparent',
                }}
              >
                {isSelected && <span style={{ color: 'white', fontSize: '0.6rem' }}>✓</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 700, fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--color-olive)' }}>{code.code}</span>
                  {isFav && <Star size={10} style={{ color: '#f59e0b', fill: '#f59e0b' }} />}
                  <span className="phase-badge" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--muted-foreground)', fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>{code.cat}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{code.desc}</p>
              </div>
              {!isSelected && <Plus size={14} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* Selected codes */}
      {selected.length > 0 && (
        <div className="px-4 py-3" style={{ borderTop: '1px solid var(--border)', background: 'var(--secondary)' }}>
          <div className="flex items-center gap-1.5 mb-2">
            <FileText size={12} style={{ color: 'var(--color-olive)' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>On invoice ({selected.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selected.map(s => (
              <button
                key={s.code}
                onClick={() => toggle(s)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs"
                style={{ background: 'rgba(92,99,64,0.12)', color: 'var(--color-olive)', border: '1px solid rgba(92,99,64,0.3)' }}
              >
                <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{s.code}</span>
                <span style={{ fontSize: '0.65rem' }}>×</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

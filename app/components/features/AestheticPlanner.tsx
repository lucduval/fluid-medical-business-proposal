'use client';
import { useState } from 'react';
import { X, Info } from 'lucide-react';

// Injection points on a simplified face SVG (percentage positions)
const facePoints = [
  { id: 'f1', cx: 50, cy: 15, label: 'Frontalis', zone: 'Forehead' },
  { id: 'f2', cx: 38, cy: 22, label: 'Frontalis L', zone: 'Forehead' },
  { id: 'f3', cx: 62, cy: 22, label: 'Frontalis R', zone: 'Forehead' },
  { id: 'f4', cx: 38, cy: 35, label: 'Glabella L', zone: 'Glabella' },
  { id: 'f5', cx: 62, cy: 35, label: 'Glabella R', zone: 'Glabella' },
  { id: 'f6', cx: 50, cy: 33, label: 'Procerus', zone: 'Glabella' },
  { id: 'f7', cx: 30, cy: 42, label: 'Crow\'s L', zone: 'Periorbital' },
  { id: 'f8', cx: 70, cy: 42, label: 'Crow\'s R', zone: 'Periorbital' },
  { id: 'f9', cx: 28, cy: 45, label: 'Periorbital L2', zone: 'Periorbital' },
  { id: 'f10', cx: 72, cy: 45, label: 'Periorbital R2', zone: 'Periorbital' },
  { id: 'f11', cx: 38, cy: 70, label: 'NLF L', zone: 'Mid-face' },
  { id: 'f12', cx: 62, cy: 70, label: 'NLF R', zone: 'Mid-face' },
  { id: 'f13', cx: 42, cy: 82, label: 'Lip upper L', zone: 'Lips' },
  { id: 'f14', cx: 58, cy: 82, label: 'Lip upper R', zone: 'Lips' },
  { id: 'f15', cx: 50, cy: 88, label: 'Lip lower', zone: 'Lips' },
];

const products = ['Botox', 'Dysport', 'Juvederm', 'Restylane', 'Sculptra', 'Radiesse'];
const zoneColors: Record<string, string> = {
  Forehead: '#5c6340',
  Glabella: '#8a9465',
  Periorbital: '#3d4228',
  'Mid-face': '#a0a870',
  Lips: '#c0986a',
};

export default function AestheticPlanner() {
  const [markers, setMarkers] = useState<Record<string, { product: string; units: number; notes: string }>>({
    f1: { product: 'Botox', units: 10, notes: '' },
    f4: { product: 'Botox', units: 5, notes: '' },
    f5: { product: 'Botox', units: 5, notes: '' },
    f7: { product: 'Botox', units: 8, notes: '' },
    f8: { product: 'Botox', units: 8, notes: '' },
  });
  const [selected, setSelected] = useState<string | null>('f1');

  const toggleMarker = (id: string) => {
    if (markers[id]) {
      setSelected(id);
    } else {
      setMarkers(prev => ({ ...prev, [id]: { product: 'Botox', units: 4, notes: '' } }));
      setSelected(id);
    }
  };

  const removeMarker = (id: string) => {
    setMarkers(prev => { const n = { ...prev }; delete n[id]; return n; });
    setSelected(null);
  };

  const totalUnits = Object.values(markers).reduce((s, m) => s + m.units, 0);

  const point = facePoints.find(p => p.id === selected);
  const markerData = selected ? markers[selected] : null;

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>Aesthetic Planner</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Face Diagram · Click to place/select markers</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="phase-badge" style={{ background: 'rgba(92,99,64,0.1)', color: 'var(--color-olive)' }}>
            {Object.keys(markers).length} points · {totalUnits}U total
          </span>
        </div>
      </div>

      <div className="flex">
        {/* SVG Face */}
        <div className="flex-1 relative p-3">
          <svg viewBox="0 0 100 110" style={{ width: '100%', maxHeight: 260, display: 'block' }}>
            {/* Face outline */}
            <ellipse cx="50" cy="55" rx="32" ry="42" fill="#fef3e8" stroke="#e5e3de" strokeWidth="0.8" />
            {/* Eyes */}
            <ellipse cx="36" cy="47" rx="7" ry="4" fill="white" stroke="#d0cdc7" strokeWidth="0.6" />
            <ellipse cx="64" cy="47" rx="7" ry="4" fill="white" stroke="#d0cdc7" strokeWidth="0.6" />
            <circle cx="36" cy="47" r="2.5" fill="#4a3728" />
            <circle cx="64" cy="47" r="2.5" fill="#4a3728" />
            {/* Nose */}
            <path d="M 50 58 L 47 68 Q 50 70 53 68 Z" fill="none" stroke="#d0cdc7" strokeWidth="0.6" />
            {/* Mouth */}
            <path d="M 43 80 Q 50 86 57 80" fill="none" stroke="#d0cdc7" strokeWidth="0.8" strokeLinecap="round" />
            {/* Eyebrows */}
            <path d="M 30 40 Q 36 37 42 39" fill="none" stroke="#8b7355" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 58 39 Q 64 37 70 40" fill="none" stroke="#8b7355" strokeWidth="1.2" strokeLinecap="round" />

            {/* Injection points */}
            {facePoints.map(pt => {
              const hasMarker = !!markers[pt.id];
              const isSelected = selected === pt.id;
              const zone = pt.zone;
              const color = zoneColors[zone] || '#5c6340';
              return (
                <g key={pt.id} onClick={() => toggleMarker(pt.id)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    r={isSelected ? 3.5 : hasMarker ? 3 : 2.2}
                    fill={hasMarker ? color : 'rgba(255,255,255,0.8)'}
                    stroke={hasMarker ? color : '#ccc'}
                    strokeWidth={isSelected ? 1.5 : 0.8}
                    opacity={hasMarker ? 1 : 0.7}
                  />
                  {hasMarker && (
                    <text x={pt.cx} y={pt.cy + 0.8} textAnchor="middle" fontSize="2.5" fill="white" fontWeight="bold">
                      {markers[pt.id].units}
                    </text>
                  )}
                  {isSelected && (
                    <circle cx={pt.cx} cy={pt.cy} r={5.5} fill="none" stroke={color} strokeWidth={0.8} strokeDasharray="2,1.5" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side panel */}
        <div style={{ width: 160, borderLeft: '1px solid var(--border)', padding: '12px' }}>
          {selected && markerData ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>{point?.label}</span>
                <button onClick={() => removeMarker(selected)} className="p-0.5 rounded">
                  <X size={12} style={{ color: '#dc2626' }} />
                </button>
              </div>
              <span className="phase-badge mb-2" style={{ background: `${zoneColors[point?.zone || '']}20`, color: zoneColors[point?.zone || ''], fontSize: '0.55rem', padding: '0.1rem 0.45rem', display: 'inline-flex' }}>
                {point?.zone}
              </span>
              <div className="space-y-2 mt-2">
                <div>
                  <label style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>Product</label>
                  <select
                    value={markerData.product}
                    onChange={e => setMarkers(p => ({ ...p, [selected!]: { ...p[selected!], product: e.target.value } }))}
                    className="w-full px-2 py-1 rounded-md text-xs"
                    style={{ border: '1px solid var(--border)', background: 'var(--secondary)', fontSize: '0.72rem' }}
                  >
                    {products.map(pr => <option key={pr}>{pr}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>Units</label>
                  <input
                    type="number"
                    value={markerData.units}
                    min={1} max={50}
                    onChange={e => setMarkers(p => ({ ...p, [selected!]: { ...p[selected!], units: +e.target.value } }))}
                    className="w-full px-2 py-1 rounded-md text-xs"
                    style={{ border: '1px solid var(--border)', background: 'var(--secondary)', fontSize: '0.72rem' }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-4">
              <Info size={20} style={{ color: 'var(--border)', marginBottom: 6 }} />
              <p style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>Click any point on the face diagram to place or edit a marker</p>
            </div>
          )}

          {/* Zone legend */}
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            {Object.entries(zoneColors).map(([zone, color]) => (
              <div key={zone} className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span style={{ fontSize: '0.6rem', color: 'var(--muted-foreground)' }}>{zone}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

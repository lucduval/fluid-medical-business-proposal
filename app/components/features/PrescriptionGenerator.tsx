'use client';
import { useState } from 'react';
import { Printer, Mail, Download, Plus, Trash2 } from 'lucide-react';

const defaultDrugs = [
  { name: 'Metformin', strength: '500mg', freq: 'Twice daily', duration: '30 days', qty: '60 tabs', repeat: '2', schedule: null },
  { name: 'Vitamin D3', strength: '5000 IU', freq: 'Once daily', duration: '60 days', qty: '60 caps', repeat: '1', schedule: null },
];

export default function PrescriptionGenerator() {
  const [drugs, setDrugs] = useState(defaultDrugs);
  const [generated, setGenerated] = useState(false);

  const removeDrug = (i: number) => setDrugs(prev => prev.filter((_, idx) => idx !== i));

  const addDrug = () => setDrugs(prev => [...prev, { name: 'Omega-3', strength: '1000mg', freq: 'Once daily', duration: '30 days', qty: '30 caps', repeat: '0', schedule: null }]);

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {!generated ? (
        <>
          {/* Header */}
          <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>Prescription Generator</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Dr Carl Arndt · HPCSA: MP1234567 · Patient: John van der Berg</p>
          </div>

          {/* Drug list */}
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {drugs.map((drug, i) => (
              <div key={i} className="px-4 py-3 flex items-start gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{drug.name}</span>
                    <span className="phase-badge" style={{ background: 'rgba(92,99,64,0.1)', color: 'var(--color-olive)', fontSize: '0.6rem', padding: '0.1rem 0.5rem' }}>{drug.strength}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>📋 {drug.freq}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>⏱ {drug.duration}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>📦 {drug.qty}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>🔁 {drug.repeat}x repeats</span>
                  </div>
                </div>
                <button onClick={() => removeDrug(i)} className="p-1.5 rounded-lg transition-colors hover:bg-red-50">
                  <Trash2 size={13} style={{ color: '#dc2626' }} />
                </button>
              </div>
            ))}
          </div>

          {/* Add & generate */}
          <div className="p-4 flex gap-2">
            <button
              onClick={addDrug}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
              style={{ border: '1.5px solid var(--border)', background: 'var(--secondary)' }}
            >
              <Plus size={13} /> Add Drug
            </button>
            <button
              onClick={() => setGenerated(true)}
              className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'var(--color-olive)', color: 'white' }}
            >
              Generate Prescription PDF
            </button>
          </div>
        </>
      ) : (
        <div>
          {/* PDF preview */}
          <div className="m-4 p-4 rounded-xl" style={{ border: '2px solid var(--border)', background: 'white' }}>
            {/* Letterhead */}
            <div className="flex justify-between items-start pb-3 mb-3" style={{ borderBottom: '2px solid var(--color-olive)' }}>
              <div>
                <p style={{ fontWeight: 800, fontSize: '1rem', fontFamily: 'Georgia, serif', color: 'var(--color-olive)' }}>Fluid Medical</p>
                <p style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>Dr F. Müller · HPCSA: MP1234567</p>
                <p style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>Practice No: 0123456 · Cape Town</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 600 }}>PRESCRIPTION</p>
                <p style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>19 March 2026</p>
              </div>
            </div>
            <div className="mb-3">
              <p style={{ fontSize: '0.7rem', fontWeight: 600 }}>Patient: John van der Berg</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>Date of Birth: 12 Feb 1980</p>
            </div>
            <div className="space-y-2 mb-3">
              {drugs.map((d, i) => (
                <div key={i} className="pl-3" style={{ borderLeft: '3px solid var(--color-olive)' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.8rem' }}>Rp. {d.name} {d.strength}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Sig: {d.freq} × {d.duration} · Qty: {d.qty} · Repeats: {d.repeat}</p>
                </div>
              ))}
            </div>
            <div className="pt-3" style={{ borderTop: '1px dashed var(--border)' }}>
              <div className="flex items-end gap-3">
                <div>
                  <div style={{ width: 80, height: 30, borderBottom: '1px solid var(--foreground)', marginBottom: 2 }} />
                  <p style={{ fontSize: '0.6rem', color: 'var(--muted-foreground)' }}>Dr F. Müller (Signature)</p>
                </div>
                <div className="w-8 h-8 rounded border flex items-center justify-center" style={{ border: '1px solid var(--color-olive)', color: 'var(--color-olive)', fontSize: '0.5rem', fontWeight: 700 }}>STAMP</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 px-4 pb-4">
            <button onClick={() => setGenerated(false)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs" style={{ border: '1px solid var(--border)' }}>
              ← Edit
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs" style={{ border: '1px solid var(--border)' }}>
              <Download size={12} /> Download
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs" style={{ border: '1px solid var(--border)' }}>
              <Mail size={12} /> Email Patient
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs" style={{ border: '1px solid var(--border)' }}>
              <Printer size={12} /> Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

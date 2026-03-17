'use client';
import { useState } from 'react';
import { AlertTriangle, Package, Plus, ChevronDown } from 'lucide-react';

const consumables = [
  { name: 'Botulinum Toxin 100U (Botox)', supplier: 'Allergan', unit: 'vial', cost: 2800, stock: 8, reorder: 5, cat: 'Injectables' },
  { name: 'Lidocaine 2% 10ml Amp', supplier: 'Fresenius', unit: 'amp', cost: 28, stock: 3, reorder: 10, cat: 'Local Anaesthetic' },
  { name: '27G Microcannula', supplier: 'Dermo', unit: 'pack', cost: 95, stock: 24, reorder: 12, cat: 'Needles' },
  { name: 'Hyaluronic Acid Filler 1ml', supplier: 'Galderma', unit: 'syringe', cost: 1800, stock: 5, reorder: 4, cat: 'Injectables' },
  { name: 'Suture 3-0 Vicryl', supplier: 'Ethicon', unit: 'pack', cost: 62, stock: 2, reorder: 8, cat: 'Sutures' },
];

const templates = [
  { name: 'Botox — Full Face', items: ['Botulinum Toxin 100U (Botox)', '27G Microcannula'], services: ['Botox Consultation', 'Full Face Botox'] },
  { name: 'Minor Excision', items: ['Lidocaine 2% 10ml Amp', 'Suture 3-0 Vicryl'] , services: ['Minor Procedure', 'Wound Dressing'] },
];

export default function StockManagement() {
  const [view, setView] = useState<'stock' | 'templates'>('stock');
  const [applied, setApplied] = useState<string | null>(null);

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {/* Tab bar */}
      <div className="flex items-center px-4 pt-4 pb-2 gap-2" style={{ borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontWeight: 700, fontSize: '0.875rem', marginRight: 8 }}>Stock & Billing</p>
        <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'var(--secondary)' }}>
          <button
            onClick={() => setView('stock')}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            style={{ background: view === 'stock' ? 'var(--color-olive)' : 'transparent', color: view === 'stock' ? 'white' : 'var(--muted-foreground)' }}
          >
            Inventory
          </button>
          <button
            onClick={() => setView('templates')}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            style={{ background: view === 'templates' ? 'var(--color-olive)' : 'transparent', color: view === 'templates' ? 'white' : 'var(--muted-foreground)' }}
          >
            Billing Templates
          </button>
        </div>
      </div>

      {view === 'stock' ? (
        <div style={{ maxHeight: 260, overflowY: 'auto' }}>
          {consumables.map((item, i) => {
            const low = item.stock < item.reorder;
            const pct = Math.min(100, Math.round((item.stock / (item.reorder * 2)) * 100));
            return (
              <div key={i} className="px-4 py-3" style={{ borderBottom: i < consumables.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span style={{ fontWeight: 600, fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                      {low && <AlertTriangle size={12} style={{ color: '#f59e0b', flexShrink: 0 }} />}
                    </div>
                    <div className="flex gap-3 mt-0.5">
                      <span style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>{item.supplier}</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>R{item.cost}/{item.unit}</span>
                      <span className="phase-badge" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--muted-foreground)', fontSize: '0.55rem', padding: '0.05rem 0.35rem' }}>{item.cat}</span>
                    </div>
                  </div>
                  <div className="text-right ml-3">
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: low ? '#f59e0b' : 'var(--color-olive)' }}>{item.stock}</span>
                    <p style={{ fontSize: '0.6rem', color: 'var(--muted-foreground)' }}>reorder: {item.reorder}</p>
                  </div>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: low ? '#f59e0b' : 'var(--color-olive)' }} />
                </div>
                {low && (
                  <p style={{ fontSize: '0.6rem', color: '#f59e0b', marginTop: 2 }}>⚠ Low stock — reorder now</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {templates.map((t, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1.5px solid var(--border)' }}>
              <div className="flex items-center justify-between px-3 py-2.5" style={{ background: 'var(--secondary)' }}>
                <div className="flex items-center gap-2">
                  <Package size={14} style={{ color: 'var(--color-olive)' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{t.name}</span>
                </div>
                <button
                  onClick={() => setApplied(applied === t.name ? null : t.name)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: applied === t.name ? 'var(--color-olive)' : 'white', color: applied === t.name ? 'white' : 'var(--color-olive)', border: '1px solid var(--color-olive)' }}
                >
                  {applied === t.name ? '✓ Applied' : '+ Apply to encounter'}
                </button>
              </div>
              <div className="px-3 py-2">
                <div className="flex flex-wrap gap-1.5">
                  {t.items.map(item => (
                    <span key={item} className="phase-badge" style={{ background: 'rgba(92,99,64,0.08)', color: 'var(--color-olive)', fontSize: '0.6rem' }}>📦 {item}</span>
                  ))}
                  {t.services.map(s => (
                    <span key={s} className="phase-badge" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>💰 {s}</span>
                  ))}
                </div>
                {applied === t.name && (
                  <p style={{ fontSize: '0.65rem', color: 'var(--color-olive)', marginTop: 6 }}>✓ Consumables deducted from stock · Invoice pre-populated</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

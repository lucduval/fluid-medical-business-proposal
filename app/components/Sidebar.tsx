'use client';
import { useState, useEffect } from 'react';
import { X, Menu, FileText, Layers, DollarSign, GitBranch, Clock, ArrowRight, Phone } from 'lucide-react';

const navItems = [
  { id: 'cover', label: 'Cover', icon: FileText },
  { id: 'executive-summary', label: 'Executive Summary', icon: null },
  { id: 'current-stack', label: 'Current Stack', icon: null },
  { id: 'phase-1', label: 'Phase 1 — Booking', icon: Layers },
  { id: 'phase-2', label: 'Phase 2 — Billing', icon: Layers },
  { id: 'phase-3', label: 'Phase 3 — Clinical', icon: Layers },
  { id: 'phase-4', label: 'Phase 4 — Engagement', icon: Layers },
  { id: 'effort-summary', label: 'Effort Summary', icon: null },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'comparison', label: 'Custom vs HealthAccess', icon: GitBranch },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'next-steps', label: 'Next Steps', icon: ArrowRight },
  { id: 'contact', label: 'Contact', icon: Phone },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('cover');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      let current = 'cover';
      for (const section of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) current = section.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-xl"
        style={{ background: 'var(--color-ink)', color: 'white' }}
        aria-label="Toggle navigation"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${!open ? 'sidebar-closed' : ''}`}
        style={{
          background: 'var(--color-ink)',
          width: '256px',
        }}
      >
        {/* Logo area */}
        <div className="px-6 pt-8 pb-6" style={{ borderBottom: '1px solid #2a2a2a' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: 'var(--color-olive)', color: 'white' }}
            >
              FM
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">Fluid Medical</p>
              <p style={{ color: '#6b6b6b', fontSize: '0.7rem' }}>Development Proposal</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center gap-2"
                  style={{
                    background: isActive ? 'var(--color-olive)' : 'transparent',
                    color: isActive ? 'white' : '#a8a8a8',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = '#2a2a2a';
                      (e.currentTarget as HTMLElement).style.color = 'white';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = '#a8a8a8';
                    }
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: isActive ? 'white' : '#4a4a4a' }}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-5" style={{ borderTop: '1px solid #2a2a2a' }}>
          <p style={{ color: '#4a4a4a', fontSize: '0.7rem' }}>Version 1.0 · 16 March 2026</p>
        </div>
      </aside>
    </>
  );
}

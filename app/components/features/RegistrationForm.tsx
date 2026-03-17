'use client';
import { useState } from 'react';
import { CheckCircle, Circle, User, Shield, Activity, Phone } from 'lucide-react';

const sections = [
  {
    title: 'Personal Details',
    icon: User,
    color: '#5c6340',
    fields: [
      { label: 'Full Name', value: 'Sarah Mitchell', done: true },
      { label: 'ID Number', value: '8501015000080', done: true },
      { label: 'Date of Birth', value: '01 January 1985', done: true },
      { label: 'Email Address', value: 'sarah@example.com', done: true },
    ],
  },
  {
    title: 'Medical Aid',
    icon: Shield,
    color: '#8a9465',
    fields: [
      { label: 'Medical Aid Name', value: 'Discovery Health', done: true },
      { label: 'Membership Number', value: '123456789', done: true },
      { label: 'Plan Option', value: 'Executive', done: true },
      { label: 'Main Member', value: 'Self', done: true },
    ],
  },
  {
    title: 'Medical History',
    icon: Activity,
    color: '#3d4228',
    fields: [
      { label: 'Chronic Conditions', value: '', done: false },
      { label: 'Current Medications', value: '', done: false },
      { label: 'Known Allergies', value: 'Penicillin', done: true },
      { label: 'Previous Surgeries', value: '', done: false },
    ],
  },
  {
    title: 'Emergency Contact',
    icon: Phone,
    color: '#6b7280',
    fields: [
      { label: 'Contact Name', value: 'John Mitchell', done: true },
      { label: 'Relationship', value: 'Spouse', done: true },
      { label: 'Phone Number', value: '+27 82 555 0100', done: true },
      { label: 'GP Name', value: '', done: false },
    ],
  },
];

export default function RegistrationForm() {
  const [active, setActive] = useState(0);

  const completionCounts = sections.map(s => s.fields.filter(f => f.done).length);
  const totalFields = sections.reduce((sum, s) => sum + s.fields.length, 0);
  const totalDone = completionCounts.reduce((a, b) => a + b, 0);
  const pct = Math.round((totalDone / totalFields) * 100);

  const sec = sections[active];

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>Patient Registration</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Sent after booking confirmation · Sarah Mitchell</p>
          </div>
          <div className="text-right">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-olive)' }}>{pct}%</span>
            <p style={{ fontSize: '0.6rem', color: 'var(--muted-foreground)' }}>complete</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: 'var(--color-olive)' }}
          />
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 px-3 py-2" style={{ borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
        {sections.map((s, i) => {
          const count = completionCounts[i];
          const total = s.fields.length;
          const done = count === total;
          return (
            <button
              key={s.title}
              onClick={() => setActive(i)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all"
              style={{
                background: active === i ? `${s.color}15` : 'transparent',
                border: `1px solid ${active === i ? s.color : 'transparent'}`,
              }}
            >
              {done ? (
                <CheckCircle size={12} style={{ color: s.color }} />
              ) : (
                <Circle size={12} style={{ color: 'var(--border)' }} />
              )}
              <span style={{ fontSize: '0.7rem', fontWeight: active === i ? 600 : 400, color: active === i ? s.color : 'var(--muted-foreground)' }}>
                {s.title}
              </span>
              <span className="phase-badge" style={{ background: `${s.color}20`, color: s.color, fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>
                {count}/{total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fields */}
      <div className="p-4 grid grid-cols-2 gap-2.5" style={{ minHeight: 180 }}>
        {sec.fields.map(field => (
          <div key={field.label}>
            <label style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 4 }}>
              {field.label}
            </label>
            <div
              className="w-full px-3 py-2 rounded-lg text-sm"
              style={{
                border: `1.5px solid ${field.done ? sec.color + '60' : 'var(--border)'}`,
                background: field.done ? `${sec.color}08` : 'var(--secondary)',
                color: field.done ? 'var(--foreground)' : 'var(--muted-foreground)',
                fontSize: '0.8rem',
                minHeight: 36,
              }}
            >
              {field.done ? field.value : <span style={{ fontStyle: 'italic', fontSize: '0.7rem' }}>Not filled in</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="px-4 py-2.5 flex items-center gap-2" style={{ borderTop: '1px solid var(--border)', background: 'var(--secondary)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: pct === 100 ? 'var(--color-olive)' : '#f59e0b' }} />
        <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>
          {pct === 100 ? 'Form complete — ready for consult' : `${totalFields - totalDone} fields remaining — Matty can chase up`}
        </span>
      </div>
    </div>
  );
}

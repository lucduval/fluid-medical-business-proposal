'use client';
import { useState } from 'react';
import { CreditCard, CheckCircle, Clock, AlertCircle, Smartphone } from 'lucide-react';

const steps = [
  { id: 1, label: 'Select Service', icon: '🩺' },
  { id: 2, label: 'Choose Slot', icon: '📅' },
  { id: 3, label: 'Pay Online', icon: '💳' },
  { id: 4, label: 'Confirmed', icon: '✅' },
];

const methods = [
  { label: 'Card', icon: CreditCard, desc: 'Visa / Mastercard' },
  { label: 'EFT', icon: null, desc: 'Instant EFT' },
  { label: 'SnapScan', icon: Smartphone, desc: 'QR Payment' },
];

export default function PaymentFlow() {
  const [step, setStep] = useState(3);
  const [method, setMethod] = useState('Card');

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {/* Step progress */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between relative">
          <div className="absolute inset-x-0 top-4 h-0.5" style={{ background: 'var(--border)', zIndex: 0 }} />
          {steps.map((s, i) => {
            const done = s.id < step;
            const active = s.id === step;
            return (
              <div key={s.id} className="flex flex-col items-center gap-1 relative z-10">
                <button
                  onClick={() => setStep(s.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: done ? 'var(--color-olive)' : active ? 'var(--color-olive)' : 'white',
                    border: `2px solid ${done || active ? 'var(--color-olive)' : 'var(--border)'}`,
                    color: done || active ? 'white' : 'var(--muted-foreground)',
                  }}
                >
                  {done ? '✓' : s.icon}
                </button>
                <span style={{ fontSize: '0.6rem', fontWeight: active ? 600 : 400, color: active ? 'var(--color-olive)' : 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {step === 3 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Consultation — Dr Fritz</p>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.75rem' }}>Thursday 19 March · 09:00</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-olive)' }}>R950</p>
                <p style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>incl. VAT</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {methods.map(m => (
                <button
                  key={m.label}
                  onClick={() => setMethod(m.label)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left"
                  style={{
                    border: `1.5px solid ${method === m.label ? 'var(--color-olive)' : 'var(--border)'}`,
                    background: method === m.label ? 'rgba(92,99,64,0.06)' : 'white',
                  }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: method === m.label ? 'var(--color-olive)' : 'var(--secondary)' }}>
                    {m.icon ? <m.icon size={12} style={{ color: method === m.label ? 'white' : 'var(--muted-foreground)' }} /> : <span style={{ fontSize: '0.6rem', fontWeight: 700, color: method === m.label ? 'white' : 'var(--muted-foreground)' }}>EFT</span>}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{m.label}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>{m.desc}</p>
                  </div>
                  <div className="ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: method === m.label ? 'var(--color-olive)' : 'var(--border)' }}>
                    {method === m.label && <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-olive)' }} />}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(4)}
              className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'var(--color-olive)', color: 'white' }}
              onMouseEnter={e => (e.target as HTMLElement).style.background = 'var(--color-olive-dark)'}
              onMouseLeave={e => (e.target as HTMLElement).style.background = 'var(--color-olive)'}
            >
              Pay R950 via {method}
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(92,99,64,0.12)' }}>
              <CheckCircle size={32} style={{ color: 'var(--color-olive)' }} />
            </div>
            <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>Payment Confirmed!</p>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem', textAlign: 'center', marginBottom: 16 }}>
              Booking and receipt sent to your email. Your appointment is confirmed.
            </p>
            <div className="flex gap-2">  
              {(['pending', 'paid', 'failed'] as const).map(status => (
                <div
                  key={status}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                  style={{
                    background: status === 'paid' ? 'rgba(92,99,64,0.12)' : status === 'failed' ? 'rgba(220,38,38,0.1)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${status === 'paid' ? 'rgba(92,99,64,0.3)' : status === 'failed' ? 'rgba(220,38,38,0.3)' : 'var(--border)'}`,
                  }}
                >
                  {status === 'paid' ? <CheckCircle size={10} style={{ color: 'var(--color-olive)' }} /> : status === 'failed' ? <AlertCircle size={10} style={{ color: '#dc2626' }} /> : <Clock size={10} style={{ color: 'var(--muted-foreground)' }} />}
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'capitalize', color: status === 'paid' ? 'var(--color-olive)' : status === 'failed' ? '#dc2626' : 'var(--muted-foreground)' }}>{status}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-4 text-xs underline"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Reset demo
            </button>
          </div>
        )}

        {step < 3 && (
          <div className="flex flex-col items-center py-6">
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>Select a step above to preview</p>
          </div>
        )}
      </div>
    </div>
  );
}

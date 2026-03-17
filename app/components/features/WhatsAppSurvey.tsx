'use client';
import { useState } from 'react';
import { Send, MessageCircle, CheckCircle, Clock } from 'lucide-react';

const templates = [
  { name: 'Post-Procedure Follow-Up', questions: ['How is your pain level today? (1–10)', 'Any swelling or bruising? (yes/no)', 'Are you happy with the result so far?'] },
  { name: 'PHQ-9 Depression Screen', questions: ['Little interest in doing things? (0–3)', 'Feeling down or hopeless? (0–3)', 'Trouble sleeping or sleeping too much? (0–3)'] },
  { name: 'Diet & Exercise Check-in', questions: ['How many glasses of water today?', 'Did you exercise this week? (yes/no)', 'Rate your energy levels (1–10)'] },
];

const chatMessages = [
  { from: 'system', text: '👋 Hi Sarah, Dr Fritz has sent you a quick follow-up. It takes about 2 minutes.', time: '09:15' },
  { from: 'system', text: '1️⃣ How is your pain level today? (1–10)', time: '09:15' },
  { from: 'patient', text: '3', time: '09:17' },
  { from: 'system', text: '2️⃣ Any swelling or bruising? (yes/no)', time: '09:17' },
  { from: 'patient', text: 'A little swelling on the right side', time: '09:18' },
  { from: 'system', text: '3️⃣ Are you happy with the result so far?', time: '09:18' },
];

export default function WhatsAppSurvey() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [sent, setSent] = useState(false);
  const [view, setView] = useState<'compose' | 'chat'>('compose');
  const [reply, setReply] = useState('');

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#25D366' }}>
          <MessageCircle size={16} color="white" />
        </div>
        <div className="flex-1">
          <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>WhatsApp Survey — 360dialog</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Patient: Sarah Mitchell · +27 82 555 0100</p>
        </div>
        <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'var(--secondary)' }}>
          {(['compose', 'chat'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className="px-2.5 py-1 rounded-md text-xs font-medium transition-all capitalize"
              style={{ background: view === v ? 'var(--color-olive)' : 'transparent', color: view === v ? 'white' : 'var(--muted-foreground)' }}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'compose' ? (
        <div className="p-4">
          <p style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: 10 }}>Select a survey template</p>
          <div className="space-y-2 mb-4">
            {templates.map((t, i) => (
              <button
                key={i}
                onClick={() => setSelectedTemplate(i)}
                className="w-full text-left p-3 rounded-xl transition-all"
                style={{
                  border: `1.5px solid ${selectedTemplate === i ? 'var(--color-olive)' : 'var(--border)'}`,
                  background: selectedTemplate === i ? 'rgba(92,99,64,0.06)' : 'white',
                }}
              >
                <p style={{ fontWeight: 600, fontSize: '0.8rem', marginBottom: 4 }}>{t.name}</p>
                <div className="space-y-0.5">
                  {t.questions.map((q, j) => (
                    <p key={j} style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)' }}>• {q}</p>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {!sent ? (
            <button
              onClick={() => { setSent(true); setTimeout(() => setView('chat'), 1000); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: '#25D366', color: 'white' }}
            >
              <Send size={15} /> Send via WhatsApp
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)' }}>
              <CheckCircle size={16} style={{ color: '#25D366' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#25D366' }}>Sent! Switching to chat view…</span>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Chat area */}
          <div className="px-4 py-3 space-y-2" style={{ maxHeight: 220, overflowY: 'auto', background: '#efeae2' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'patient' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="px-3 py-2 rounded-2xl max-w-[75%]"
                  style={{
                    background: msg.from === 'patient' ? '#dcf8c6' : 'white',
                    borderRadius: msg.from === 'patient' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  }}
                >
                  <p style={{ fontSize: '0.78rem', lineHeight: 1.4 }}>{msg.text}</p>
                  <p style={{ fontSize: '0.55rem', color: '#a0a0a0', textAlign: 'right', marginTop: 2 }}>{msg.time} ✓✓</p>
                </div>
              </div>
            ))}
            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-2xl" style={{ background: 'white', borderRadius: '18px 18px 18px 4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '0.78rem' }}>
                  <Clock size={11} style={{ display: 'inline', marginRight: 4, color: '#a0a0a0' }} />
                  <em style={{ color: '#a0a0a0' }}>Awaiting reply…</em>
                </p>
              </div>
            </div>
          </div>

          {/* Response input */}
          <div className="flex gap-2 p-3" style={{ borderTop: '1px solid var(--border)', background: '#f0f0f0' }}>
            <input
              value={reply}
              onChange={e => setReply(e.target.value)}
              placeholder="Type a reply…"
              className="flex-1 px-3 py-2 rounded-full text-xs outline-none"
              style={{ background: 'white', border: '1px solid var(--border)' }}
            />
            <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#25D366' }}>
              <Send size={14} color="white" />
            </button>
          </div>

          {/* Logged to record note */}
          <div className="px-4 py-2.5" style={{ background: 'rgba(92,99,64,0.05)', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.65rem', color: 'var(--color-olive)' }}>📊 All responses auto-logged to Sarah Mitchell's patient profile</p>
          </div>
        </div>
      )}
    </div>
  );
}

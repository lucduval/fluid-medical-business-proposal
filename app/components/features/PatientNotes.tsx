'use client';
import { useState } from 'react';
import { Mic, Brain, Check, Edit3, AlertCircle } from 'lucide-react';

const heidinote = `**Subjective:** Patient presents with persistent lower back pain for 2 weeks, rated 6/10. No radiation to legs. aggravated by prolonged sitting.

**Objective:** Lumbar ROM reduced by ~30%. Tenderness at L4/L5. Neurological exam normal. BP 122/78, HR 68.

**Assessment:** Mechanical lower back pain, likely muscular strain. No red flags identified.

**Plan:** 
- Rx: Ibuprofen 400mg TDS with food for 7 days
- Physio referral for lumbar stabilisation
- Review in 2 weeks if no improvement
- Patient advised on posture and ergonomics`;

export default function PatientNotes() {
  const [heidiPulling, setHeidiPulling] = useState(false);
  const [heidiLoaded, setHeidiLoaded] = useState(false);
  const [approved, setApproved] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  const pullHeidi = () => {
    setHeidiPulling(true);
    setTimeout(() => {
      setHeidiPulling(false);
      setHeidiLoaded(true);
      setNoteContent(heidinote);
    }, 1800);
  };

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>Clinical Notes — John van der Berg</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>19 March 2026 · Dr Fritz Müller</p>
        </div>
        {!heidiLoaded ? (
          <button
            onClick={pullHeidi}
            disabled={heidiPulling}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: heidiPulling ? 'var(--secondary)' : 'var(--color-olive)',
              color: heidiPulling ? 'var(--muted-foreground)' : 'white',
              border: `1px solid ${heidiPulling ? 'var(--border)' : 'transparent'}`,
            }}
          >
            {heidiPulling ? (
              <>
                <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Pulling from Heidi…
              </>
            ) : (
              <>
                <Brain size={13} /> Import from Heidi AI
              </>
            )}
          </button>
        ) : (
          <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(92,99,64,0.1)', color: 'var(--color-olive)' }}>
            <Brain size={11} /> Heidi session synced
          </span>
        )}
      </div>

      {/* SOAP note editor */}
      <div className="p-4">
        {heidiLoaded && !approved && (
          <div className="mb-2 px-3 py-2 rounded-lg flex items-center gap-2" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
            <AlertCircle size={13} style={{ color: '#f59e0b' }} />
            <span style={{ fontSize: '0.7rem', color: '#92400e' }}>AI-generated draft. Please review and approve before saving.</span>
          </div>
        )}
        <div
          className="w-full rounded-xl p-3 outline-none text-sm"
          style={{
            border: `1.5px solid ${heidiLoaded && !approved ? '#f59e0b' : heidiLoaded && approved ? 'var(--color-olive)' : 'var(--border)'}`,
            background: 'var(--secondary)',
            minHeight: 160,
            fontSize: '0.78rem',
            lineHeight: 1.7,
            whiteSpace: 'pre-wrap',
            color: 'var(--foreground)',
            fontFamily: 'inherit',
          }}
        >
          {noteContent || (
            <span style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
              Start typing in SOAP format, or import from Heidi AI scribe above…
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          {heidiLoaded && !approved && (
            <>
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
                style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}
              >
                <Edit3 size={12} /> Edit
              </button>
              <button
                onClick={() => setApproved(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
                style={{ background: 'var(--color-olive)', color: 'white' }}
              >
                <Check size={12} /> Approve & Save
              </button>
            </>
          )}
          {approved && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(92,99,64,0.08)', border: '1px solid rgba(92,99,64,0.2)' }}>
              <Check size={13} style={{ color: 'var(--color-olive)' }} />
              <span style={{ fontSize: '0.7rem', color: 'var(--color-olive)', fontWeight: 600 }}>Note approved & locked — 19 Mar 2026 09:45</span>
            </div>
          )}
          {!heidiLoaded && !noteContent && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}>
              <Mic size={13} style={{ color: 'var(--muted-foreground)' }} />
              <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Heidi AI listens during consult and generates notes automatically</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

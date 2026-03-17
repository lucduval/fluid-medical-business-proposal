'use client';
import { useState, useRef } from 'react';
import { PenLine, RefreshCw, CheckCircle, Undo } from 'lucide-react';

export default function ConsentForm() {
  const [signed, setSigned] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    setDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;
    lastPos.current = { x, y };
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    lastPos.current = { x, y };
  };

  const stopDraw = () => setDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setSigned(false);
  };

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>Aesthetics Consent Form</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Dr Carl Arndt · Patient: Sarah Mitchell</p>
          </div>
          <span className="phase-badge" style={{ background: 'rgba(92,99,64,0.12)', color: 'var(--color-olive)' }}>
            {signed ? '✓ Signed' : 'Pending'}
          </span>
        </div>
      </div>

      {/* Consent text */}
      <div className="px-4 pt-3 pb-2">
        <div className="rounded-xl p-3" style={{ background: 'var(--secondary)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
            I, the undersigned, consent to the proposed aesthetic treatment as discussed with Dr Carl Arndt.
            I confirm I have been informed about the procedure, potential risks, and expected outcomes.
            I understand that results may vary and that follow-up appointments may be required.
            {' '}<strong style={{ color: 'var(--foreground)' }}>Treatment: Botulinum Toxin (Botox) — Full Face</strong>{' '}
            · Date: 19 March 2026 · Practice: Fluid Medical.
          </p>
        </div>
      </div>

      {/* Signature area */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <PenLine size={13} style={{ color: 'var(--color-olive)' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>Patient Signature</span>
          </div>
          {hasDrawn && !signed && (
            <button
              onClick={clear}
              className="flex items-center gap-1 text-xs"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <Undo size={11} /> Clear
            </button>
          )}
          {signed && (
            <button
              onClick={clear}
              className="flex items-center gap-1 text-xs"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <RefreshCw size={11} /> Reset
            </button>
          )}
        </div>
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            border: `2px dashed ${hasDrawn ? 'var(--color-olive)' : 'var(--border)'}`,
            background: signed ? 'rgba(92,99,64,0.04)' : 'var(--secondary)',
          }}
        >
          {!signed && (
            <canvas
              ref={canvasRef}
              width={400}
              height={80}
              className="w-full cursor-crosshair"
              style={{ height: 80, display: 'block' }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
          )}
          {signed && (
            <div className="flex items-center justify-center" style={{ height: 80 }}>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} style={{ color: 'var(--color-olive)' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-olive)' }}>Signed & timestamped — 19 Mar 2026 09:03</span>
              </div>
            </div>
          )}
          {!hasDrawn && !signed && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p style={{ fontSize: '0.75rem', color: '#ccc' }}>Draw signature here</p>
            </div>
          )}
        </div>

        {hasDrawn && !signed && (
          <button
            onClick={() => setSigned(true)}
            className="w-full mt-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'var(--color-olive)', color: 'white' }}
          >
            Confirm & Sign — Save as PDF
          </button>
        )}

        {signed && (
          <div className="mt-2 px-3 py-2 rounded-lg flex items-center gap-2" style={{ background: 'rgba(92,99,64,0.08)', border: '1px solid rgba(92,99,64,0.2)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-olive)' }}>📄 AestheticsConsent_SarahMitchell_19Mar2026.pdf saved to patient record</span>
          </div>
        )}
      </div>
    </div>
  );
}

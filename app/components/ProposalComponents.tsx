'use client';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

// ── Pricing Tables ────────────────────────────────────────────────────────────

export function PricingTables() {
  const rate = 400;
  const phases = [
    { label: 'Phase 1 — Booking, Payments, Onboarding', hrs: 50 },
    { label: 'Phase 2 — Billing, ICD-10, Prescriptions', hrs: 54 },
    { label: 'Phase 3 — Clinical Tools, Aesthetic Planner', hrs: 80 },
    { label: 'Phase 4 — WhatsApp Surveys', hrs: 28 },
  ];
  const totalHrs = phases.reduce((s, p) => s + p.hrs, 0);
  const totalCost = totalHrs * rate;

  return (
    <div className="space-y-4">
      {/* Rate card */}
      <div className="rounded-2xl p-5" style={{ border: '2px solid var(--color-olive)', background: 'rgba(92,99,64,0.06)' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Hourly Rate</p>
        <p style={{ fontWeight: 800, fontSize: '2rem', color: 'var(--color-olive)', lineHeight: 1 }}>R{rate.toLocaleString()}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--muted-foreground)' }}>/hr</span></p>
      </div>

      {/* Build cost breakdown */}
      <div className="card overflow-hidden">
        <table className="proposal-table">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Hours</th>
              <th>Cost at R{rate}/hr</th>
            </tr>
          </thead>
          <tbody>
            {phases.map(p => (
              <tr key={p.label}>
                <td>{p.label}</td>
                <td>{p.hrs} hrs</td>
                <td style={{ fontWeight: 600, color: 'var(--color-olive)' }}>R{(p.hrs * rate).toLocaleString()}</td>
              </tr>
            ))}
            <tr>
              <td style={{ fontWeight: 700 }}>Total (all 4 phases)</td>
              <td style={{ fontWeight: 700 }}>{totalHrs} hrs</td>
              <td style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-olive)' }}>R{totalCost.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
        Phases can be contracted and invoiced separately. Phase 1 is recommended as the starting engagement.
      </p>
    </div>
  );
}

// ── Retainer Table ────────────────────────────────────────────────────────────

export function RetainerTable() {
  const plans = [
    { name: 'Basic', cost: 3500, icon: '🌱', includes: ['Bug fixes', 'Vercel/Convex monitoring', 'Dependency updates', '2 hrs development'] },
    { name: 'Standard', cost: 6500, icon: '⭐', includes: ['All of Basic', '6 hrs development', 'Priority response (4hr SLA)', 'Minor feature changes'], rec: true },
    { name: 'Growth', cost: 10000, icon: '🚀', includes: ['All of Standard', '12 hrs development', 'New feature scoping', 'Monthly check-in call'] },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map(p => (
        <div
          key={p.name}
          className="rounded-2xl overflow-hidden"
          style={{
            border: `2px solid ${p.rec ? 'var(--color-olive)' : 'var(--border)'}`,
            background: p.rec ? 'rgba(92,99,64,0.04)' : 'white',
          }}
        >
          <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
            {p.rec && <span className="phase-badge mb-2" style={{ background: 'rgba(92,99,64,0.15)', color: 'var(--color-olive)', fontSize: '0.6rem', display: 'inline-flex' }}>⭐ Recommended to start</span>}
            <p style={{ fontSize: '1.25rem', marginBottom: 4 }}>{p.icon}</p>
            <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{p.name}</p>
            <p style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-olive)', marginTop: 4 }}>R{p.cost.toLocaleString()}<span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--muted-foreground)' }}>/month</span></p>
          </div>
          <div className="px-5 py-4">
            <ul className="space-y-2">
              {p.includes.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle size={13} style={{ color: 'var(--color-olive)', marginTop: 1, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Running Costs ─────────────────────────────────────────────────────────────

export function RunningCosts() {
  const costs = [
    { service: 'Vercel Pro', cost: '~R350/month', icon: '▲' },
    { service: 'Convex (scaled usage)', cost: 'R0–R700/month', icon: '⚡' },
    { service: '360dialog WhatsApp API', cost: 'R150 setup + ~R0.60–R1.20/conversation', icon: '💬' },
    { service: 'PayFast transaction fees', cost: '3.5% per transaction', icon: '💳' },
    { service: 'Heidi Health subscription', cost: "Per Heidi's pricing", icon: '🎙️' },
    { service: 'PDF/email service (Resend)', cost: 'R0–R200/month', icon: '📧' },
  ];

  return (
    <div className="card overflow-hidden">
      <table className="proposal-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Estimated Monthly Cost</th>
          </tr>
        </thead>
        <tbody>
          {costs.map(c => (
            <tr key={c.service}>
              <td>
                <span className="mr-2">{c.icon}</span>
                {c.service}
              </td>
              <td style={{ color: 'var(--muted-foreground)' }}>{c.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Comparison ────────────────────────────────────────────────────────────────

export function Comparison() {
  const healthAccessPros = [
    'Ready to use immediately, no build time',
    'HPCSA and medical aid billing pre-built',
    'Local support team familiar with SA regulations',
    'ICD-10 and NHRPL code databases included',
  ];
  const healthAccessCons = [
    'Not built for aesthetics, longevity, or sport medicine workflows',
    'No aesthetic planner for recording injection sites',
    'No WhatsApp survey tool for patient engagement',
    'Slow to customise — requests go into a backlog',
    'Per-seat licensing scales with every new doctor',
    'Data lock-in — migration is painful and incomplete',
    'Generic UI — unnecessary clicks and workarounds',
  ];
  const customPros = [
    'Built around Fluid Medical\'s actual workflow',
    'Aesthetic planner, WhatsApp surveys, prescription generator',
    'You own your data — no lock-in, exportable any time',
    'Instant iteration — new features shipped in days',
    'Scales cheaply — no per-seat licensing',
    'Heidi integration built natively',
  ];
  const customCons = [
    'Higher upfront cost — investment required before go-live',
    'Build time — Phase 1 takes approximately 6–8 weeks',
    'Single developer dependency (mitigated by clean code & retainer)',
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* HealthAccess */}
      <div className="card overflow-hidden">
        <div className="px-5 pt-5 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 2 }}>HealthAccess</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Off-the-shelf SA practice management SaaS</p>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Pros</p>
            <ul className="space-y-1.5">
              {healthAccessPros.map(p => (
                <li key={p} className="flex items-start gap-2">
                  <CheckCircle size={13} style={{ color: '#16a34a', marginTop: 1, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Cons</p>
            <ul className="space-y-1.5">
              {healthAccessCons.map(c => (
                <li key={c} className="flex items-start gap-2">
                  <XCircle size={13} style={{ color: '#dc2626', marginTop: 1, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Custom */}
      <div className="card overflow-hidden" style={{ border: '2px solid var(--color-olive)' }}>
        <div className="px-5 pt-5 pb-3" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(92,99,64,0.04)' }}>
          <p style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 2 }}>Custom Build</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Bespoke platform built for Fluid Medical</p>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Pros</p>
            <ul className="space-y-1.5">
              {customPros.map(p => (
                <li key={p} className="flex items-start gap-2">
                  <CheckCircle size={13} style={{ color: 'var(--color-olive)', marginTop: 1, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Cons</p>
            <ul className="space-y-1.5">
              {customCons.map(c => (
                <li key={c} className="flex items-start gap-2">
                  <XCircle size={13} style={{ color: '#dc2626', marginTop: 1, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Verdict */}
        <div className="px-5 py-4" style={{ borderTop: '1px solid var(--border)', background: 'rgba(92,99,64,0.06)' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-olive)', marginBottom: 4 }}>Verdict</p>
          <p style={{ fontSize: '0.78rem', color: 'var(--foreground)', lineHeight: 1.6 }}>
            For a standard GP, HealthAccess is fine. For a multi-discipline, aesthetics-forward, tech-forward practice like Fluid Medical — a custom platform is the only option that will keep up with how the business actually grows.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────

export function Timeline() {
  const milestones = [
    { phase: 'Phase 1', label: 'Booking, Payments & Onboarding', weeks: 'Week 3–4', features: ['Booking Links', 'PayFast', 'Patient Forms', 'Consent'], pct: 22 },
    { phase: 'Phase 2', label: 'Billing, ICD-10 & Prescriptions', weeks: 'Week 6–7', features: ['Services Page', 'ICD-10', 'Invoicing', 'Prescriptions'], pct: 47 },
    { phase: 'Phase 3', label: 'Clinical Tools & Aesthetic Planner', weeks: 'Week 10–11', features: ['Notes', 'Heidi AI', 'Aesthetic Planner', 'Before/After', 'Stock'], pct: 76 },
    { phase: 'Phase 4', label: 'WhatsApp Patient Engagement', weeks: 'Week 13–14', features: ['WA Surveys', 'PHQ-9', 'Symptom Tracking'], pct: 100 },
  ];

  const phaseColors = ['#5c6340', '#8a9465', '#3d4228', '#a0a870'];

  return (
    <div className="space-y-4">
      {/* Bar chart */}
      <div className="card p-5">
        <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)', marginBottom: 16 }}>Indicative timeline assuming ~20 billable hours/week. Can be accelerated with agreed sprint commitments.</p>
        <div className="space-y-5">
          {milestones.map((m, i) => (
            <div key={m.phase}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: phaseColors[i] }}>{m.phase}</span>
                  <span style={{ fontSize: '0.75rem' }}>{m.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>{m.weeks}</span>
                  <Clock size={12} style={{ color: 'var(--muted-foreground)' }} />
                </div>
              </div>
              <div className="h-5 rounded-full overflow-hidden" style={{ background: 'var(--secondary)' }}>
                <div
                  className="h-full rounded-full flex items-center px-3 transition-all"
                  style={{ width: `${m.pct}%`, background: phaseColors[i], minWidth: 60 }}
                >
                  <span style={{ fontSize: '0.55rem', color: 'white', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {m.weeks}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {m.features.map(f => (
                  <span key={f} className="phase-badge" style={{ background: `${phaseColors[i]}15`, color: phaseColors[i], fontSize: '0.58rem' }}>{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>📅 Total estimated: <strong>13–14 weeks</strong> from kick-off · <strong>~212 billable hours</strong></p>
        </div>
      </div>
    </div>
  );
}

// ── Next Steps ────────────────────────────────────────────────────────────────

export function NextSteps() {
  const steps = [
    { num: '01', title: 'Agree on phase and rate', desc: 'Phase 1 is recommended as a starting point so the team gets immediate value quickly.' },
    { num: '02', title: 'Sign a simple service agreement', desc: 'Covering IP ownership (you own everything built), payment terms (50% upfront, 50% on delivery per phase), and confidentiality.' },
    { num: '03', title: 'Kick-off call', desc: '1 hour with Fritz and Matty to walk through Phase 1 in detail and confirm any workflow nuances before development starts.' },
    { num: '04', title: 'Weekly progress updates', desc: 'Short Loom video or WhatsApp voice note each Friday showing what was built that week.' },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {steps.map((s, i) => (
        <div key={s.num} className="card p-5">
          <div className="flex items-start gap-4">
            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-olive)', opacity: 0.3, lineHeight: 1, flexShrink: 0, fontFamily: 'Georgia, serif' }}>{s.num}</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{s.title}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

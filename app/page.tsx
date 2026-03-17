'use client';

import Sidebar from './components/Sidebar';
import BookingCalendar from './components/features/BookingCalendar';
import PaymentFlow from './components/features/PaymentFlow';
import RegistrationForm from './components/features/RegistrationForm';
import ConsentForm from './components/features/ConsentForm';
import ICD10Search from './components/features/ICD10Search';
import PrescriptionGenerator from './components/features/PrescriptionGenerator';
import PatientNotes from './components/features/PatientNotes';
import AestheticPlanner from './components/features/AestheticPlanner';
import BeforeAfter from './components/features/BeforeAfter';
import StockManagement from './components/features/StockManagement';
import WhatsAppSurvey from './components/features/WhatsAppSurvey';
import { PricingTables, RunningCosts, Comparison, Timeline, NextSteps } from './components/ProposalComponents';

// ─── Section wrapper ───────────────────────────────────────────────────────────
function Section({ id, label, title, intro, children }: {
  id: string;
  label?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} style={{ marginBottom: '5rem' }}>
      {label && <p className="section-label" style={{ marginBottom: 8 }}>{label}</p>}
      <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: intro ? 12 : 24, lineHeight: 1.25 }}>{title}</h2>
      {intro && <p style={{ fontSize: '0.925rem', color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: 28, maxWidth: '76ch' }}>{intro}</p>}
      {children}
    </section>
  );
}

// ─── Feature card ───────────────────────────────────────────────────────────
function FeatureCard({ num, title, desc, effort, phase, children }: {
  num: string; title: string; desc: string; effort: string; phase: string; children?: React.ReactNode
}) {
  const phaseColors: Record<string, string> = { '1': '#5c6340', '2': '#8a9465', '3': '#3d4228', '4': '#a0a870' };
  const c = phaseColors[phase] || '#5c6340';
  return (
    <div className="card overflow-hidden" style={{ marginBottom: '2.5rem' }}>
      {/* Feature header */}
      <div className="px-6 pt-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-xl font-bold text-sm"
              style={{ width: 36, height: 36, background: `${c}15`, color: c }}
            >
              {num}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem' }}>{title}</h3>
                <span className="phase-badge" style={{ background: `${c}15`, color: c }}>Phase {phase}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', marginTop: 2 }}>Estimated: {effort}</p>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: 1.7, marginTop: 12 }}>{desc}</p>
      </div>
      {/* Visual component */}
      {children && <div className="p-5">{children}</div>}
    </div>
  );
}

// ─── Stack layer ───────────────────────────────────────────────────────────
function StackBadge({ layer, tech, icon }: { layer: string; tech: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ border: '1px solid var(--border)', background: 'white' }}>
      <span style={{ fontSize: '1.25rem' }}>{icon}</span>
      <div>
        <p style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{layer}</p>
        <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>{tech}</p>
      </div>
    </div>
  );
}

// ─── Phase header ─────────────────────────────────────────────────────────────
function PhaseHeader({ num, title, total, hours }: { num: string; title: string; total: string; hours: string }) {
  const colors: Record<string, string> = { '1': '#5c6340', '2': '#8a9465', '3': '#3d4228', '4': '#a0a870' };
  const c = colors[num] || '#5c6340';
  return (
    <div
      id={`phase-${num}`}
      className="flex items-center justify-between flex-wrap gap-3 p-5 rounded-2xl mb-6"
      style={{ background: `${c}0d`, border: `1.5px solid ${c}30` }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl font-bold text-white text-sm" style={{ background: c }}>
          P{num}
        </div>
        <div>
          <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>Phase {num}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>{title}</p>
        </div>
      </div>
      <div className="text-right">
        <p style={{ fontWeight: 700, fontSize: '0.9rem', color: c }}>{total}</p>
        <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>{hours}</p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Sidebar />

      {/* Main content — offset for sidebar */}
      <main
        style={{
          marginLeft: 256,
          minHeight: '100vh',
          padding: 0,
        }}
        className="lg:ml-64"
      >
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 2rem 5rem' }}>

          {/* ── COVER ───────────────────────────────────────────────── */}
          <section id="cover" style={{ marginBottom: '6rem', paddingTop: '2rem' }}>
            <p className="section-label" style={{ marginBottom: 16 }}>Software Development Proposal</p>
            <h1 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 24 }}>
              Fluid Medical<br />
              <span style={{ color: 'var(--color-olive)' }}>Practice Management Platform</span>
            </h1>

            <div className="grid sm:grid-cols-3 gap-3 mb-8" style={{ maxWidth: 560 }}>
              {[
                { label: 'Prepared for', value: 'Fluid Medical' },
                { label: 'Date', value: '16 March 2026' },
                { label: 'Version', value: '1.0' },
              ].map(m => (
                <div key={m.label} className="rounded-xl p-3" style={{ border: '1px solid var(--border)', background: 'white' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{m.label}</p>
                  <p style={{ fontWeight: 600, fontSize: '0.82rem' }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { val: '14', label: 'Features' },
                { val: '4', label: 'Phases' },
                { val: '~212', label: 'Hours estimated' },
                { val: '14wk', label: 'Full build timeline' },
              ].map(s => (
                <div key={s.label} className="card p-4 text-center">
                  <p className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-olive)' }}>{s.val}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', marginTop: 2 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="divider" style={{ marginBottom: '5rem' }} />

          {/* ── 1. EXECUTIVE SUMMARY ────────────────────────────────── */}
          <Section
            id="executive-summary"
            label="Section 1"
            title="Executive Summary"
            intro="Fluid Medical already has a solid CRM foundation I built: Contacts, Leads, Appointments, Invoices, and Doctors, running on Next.js, Convex, Clerk, and Vercel. This proposal is the natural next step: turning that foundation into a fully-featured practice management platform built specifically around the way you work."
          >
            <div className="rounded-2xl p-6" style={{ background: 'rgba(92,99,64,0.06)', border: '1.5px solid rgba(92,99,64,0.2)' }}>
              <p style={{ fontWeight: 700, fontFamily: 'Georgia, serif', fontSize: '1rem', marginBottom: 8 }}>The goal</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
                To bring every tool the practice needs into one fast, customisable platform that grows with the business. No more working around generic software. Something that fits Fluid Medical, not the other way around.
              </p>
            </div>
          </Section>

          {/* ── 2. CURRENT STACK ────────────────────────────────────── */}
          <Section
            id="current-stack"
            label="Section 2"
            title="Current Stack"
            intro="The foundation is already there and it's solid. Everything I'm proposing builds on top of what exists. No starting over, no migration risk."
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StackBadge layer="Frontend" tech="Next.js (App Router)" icon="▲" />
              <StackBadge layer="Backend / Database" tech="Convex (real-time)" icon="⚡" />
              <StackBadge layer="Authentication" tech="Clerk" icon="🔐" />
              <StackBadge layer="Hosting" tech="Vercel" icon="☁️" />
              <StackBadge layer="Payments" tech="PayFast (to integrate)" icon="💳" />
              <StackBadge layer="WhatsApp" tech="360dialog API" icon="💬" />
              <StackBadge layer="AI Scribe" tech="Heidi Health API" icon="🎙️" />
            </div>
          </Section>

          {/* ── 3. FEATURE SCOPE ────────────────────────────────────── */}
          <Section
            id="feature-scope"
            label="Section 3"
            title="Feature Scope & Specification"
          >
            <p style={{ fontSize: '0.925rem', color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: 36 }}>
              Features are organised into four delivery phases, ordered by clinical priority and dependency.
            </p>

            {/* PHASE 1 */}
            <PhaseHeader num="1" title="Booking, Payments & Patient Onboarding" total="~50 hours" hours="The foundation for patient-facing interactions" />

            <FeatureCard
              num="3.1"
              title="Doctor Booking Links + Collective Calendar"
              desc="Each doctor gets a public booking link showing their live availability. Patients pick a service, choose a time, and confirm. Matty gets a collective calendar with all doctors side by side and drag-and-drop rescheduling."
              effort="20 hours"
              phase="1"
            >
              <BookingCalendar />
            </FeatureCard>

            <FeatureCard
              num="3.2"
              title="Online Payments — PayFast Integration"
              desc="Patients can pay at the time of booking or via an invoice link after their consult. PayFast handles card, EFT and SnapScan. Payments reconcile automatically against the invoice."
              effort="10 hours"
              phase="1"
            >
              <PaymentFlow />
            </FeatureCard>

            <FeatureCard
              num="3.3"
              title="Patient Registration Form"
              desc="A digital registration form goes out automatically after a booking is made. All new patient info is captured before the consult so there are no paper forms on arrival. Completion status shows on the appointment card."
              effort="8 hours"
              phase="1"
            >
              <RegistrationForm />
            </FeatureCard>

            <FeatureCard
              num="3.4"
              title="Consent Form (Digital Signature)"
              desc="A procedure-specific consent form that can be sent before or during a consult. The patient signs digitally on their own device or a tablet in the room. Signed forms are auto-saved as PDFs against the encounter record."
              effort="12 hours"
              phase="1"
            >
              <ConsentForm />
            </FeatureCard>

            {/* PHASE 2 */}
            <PhaseHeader num="2" title="Billing, Coding & Prescriptions" total="~54 hours" hours="Clinical compliance and revenue infrastructure" />

            <FeatureCard
              num="3.5"
              title="Services Page & Quick Billing"
              desc="A master list of all Fluid Medical services with pricing, type, and duration. Doctors and admin can add any service to an invoice in a single click, during or after a consult."
              effort="8 hours"
              phase="2"
            >
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>Services</p>
                  <span className="phase-badge" style={{ background: 'rgba(92,99,64,0.1)', color: 'var(--color-olive)' }}>+ Add Service</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Botox — Full Face', type: 'Aesthetics', price: 'R2,500', dur: '45 min' },
                    { name: 'Longevity Consultation', type: 'Longevity', price: 'R950', dur: '60 min' },
                    { name: 'Sport Injury Assessment', type: 'Sport', price: 'R850', dur: '45 min' },
                    { name: 'IV Vitamin Drip', type: 'Health', price: 'R1,800', dur: '60 min' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl" style={{ border: '1px solid var(--border)', background: 'var(--secondary)' }}>
                      <div className="flex items-center gap-2">
                        <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>{s.name}</span>
                        <span className="phase-badge" style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--muted-foreground)', fontSize: '0.58rem' }}>{s.type}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>{s.dur}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={{ fontWeight: 700, color: 'var(--color-olive)', fontSize: '0.875rem' }}>{s.price}</span>
                        <button className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'var(--color-olive)', color: 'white', fontSize: '0.68rem' }}>+ Add to Invoice</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FeatureCard>

            <FeatureCard
              num="3.6"
              title="ICD-10 Code Billing System"
              desc="A searchable ICD-10 database built into the invoicing workflow. Doctors search by keyword or code and attach diagnoses to invoice line items for medical aid billing. Most-used codes save as personal favourites per doctor."
              effort="12 hours"
              phase="2"
            >
              <ICD10Search />
            </FeatureCard>

            <FeatureCard
              num="3.7"
              title="Invoicing Enhancement (Insurance & Medical Aid Codes)"
              desc="Building on the existing MVP invoices to meet formal billing requirements: NHRPL procedure codes, ICD-10 codes, VAT, and medical aid-compatible formatting. PDF generation includes the practice letterhead and doctor details."
              effort="14 hours"
              phase="2"
            >
              <div className="card overflow-hidden">
                <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>Invoice #INV-0094</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>John van der Berg · 19 March 2026</p>
                  </div>
                  <span className="phase-badge" style={{ background: 'rgba(245,158,11,0.15)', color: '#d97706' }}>Pending</span>
                </div>
                <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--secondary)' }}>
                      <th style={{ padding: '8px 14px', textAlign: 'left', fontWeight: 600, fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Description</th>
                      <th style={{ padding: '8px 14px', textAlign: 'left', fontWeight: 600, fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>ICD-10</th>
                      <th style={{ padding: '8px 14px', textAlign: 'left', fontWeight: 600, fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>NHRPL</th>
                      <th style={{ padding: '8px 14px', textAlign: 'right', fontWeight: 600, fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { desc: 'Consultation', icd: 'Z00.0', nhrpl: '0190', amount: 'R950.00' },
                      { desc: 'Botox — Full Face', icd: 'L70.0', nhrpl: '3520', amount: 'R2,500.00' },
                      { desc: 'Consumables', icd: '—', nhrpl: '—', amount: 'R280.00' },
                    ].map((r, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '8px 14px' }}>{r.desc}</td>
                        <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--color-olive)' }}>{r.icd}</td>
                        <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{r.nhrpl}</td>
                        <td style={{ padding: '8px 14px', textAlign: 'right', fontWeight: 600 }}>{r.amount}</td>
                      </tr>
                    ))}
                    <tr style={{ background: 'var(--secondary)' }}>
                      <td colSpan={3} style={{ padding: '8px 14px', fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>VAT (15%)</td>
                      <td style={{ padding: '8px 14px', textAlign: 'right', fontSize: '0.75rem' }}>R549.00</td>
                    </tr>
                    <tr>
                      <td colSpan={3} style={{ padding: '10px 14px', fontWeight: 700 }}>Total</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 800, fontSize: '1rem', color: 'var(--color-olive)' }}>R4,279.00</td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex gap-2 px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <button className="flex-1 py-2 rounded-xl text-xs font-semibold" style={{ background: 'var(--color-olive)', color: 'white' }}>📧 Email to Patient</button>
                  <button className="px-4 py-2 rounded-xl text-xs" style={{ border: '1px solid var(--border)' }}>📄 Download PDF</button>
                </div>
              </div>
            </FeatureCard>

            <FeatureCard
              num="3.8"
              title="Prescription Generator"
              desc="The doctor fills in a structured prescription form and the system generates a professional PDF with the doctor's details, signature, stamp and patient info pre-filled. Schedule 5 and 6 substances are flagged automatically."
              effort="20 hours"
              phase="2"
            >
              <PrescriptionGenerator />
            </FeatureCard>

            {/* PHASE 3 */}
            <PhaseHeader num="3" title="Clinical Tools & Documentation" total="~80 hours" hours="The tools that differentiate Fluid Medical from generic systems" />

            <FeatureCard
              num="3.9"
              title="Patient Notes Per Encounter"
              desc="Every appointment has its own clinical notes section. The doctor can write structured or free-text notes and attach files like lab results, referral letters or photos. Notes lock after 24 hours and any edits require a reason, keeping a clean audit trail."
              effort="12 hours"
              phase="3"
            >
              <PatientNotes />
            </FeatureCard>

            <FeatureCard
              num="3.10"
              title="Heidi Health Integration (AI Medical Scribe)"
              desc="Heidi listens to the consultation and writes the clinical notes automatically. This integration pulls Heidi's output directly into the patient's encounter record so the doctor never needs to leave the platform."
              effort="12 hours"
              phase="3"
            >
              <div className="rounded-xl p-4" style={{ border: '1.5px solid var(--border)', background: 'var(--secondary)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(92,99,64,0.12)' }}>🎙️</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Heidi AI Integration</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Session-linked · Notes pull into encounter record</p>
                  </div>
                </div>
                <div className="flex items-start gap-0" style={{ position: 'relative' }}>
                  {[
                    { step: '1', label: 'Doctor starts Heidi session', icon: '🎙️' },
                    { step: '2', label: 'Heidi listens & transcribes', icon: '🧠' },
                    { step: '3', label: 'Notes pulled into Fluid Medical', icon: '📋' },
                    { step: '4', label: 'Doctor reviews & approves', icon: '✅' },
                  ].map((s, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center text-center relative">
                      {i < 3 && (
                        <div style={{ position: 'absolute', top: 16, left: '50%', width: '100%', height: 2, background: 'var(--border)', zIndex: 0 }} />
                      )}
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-base relative z-10" style={{ background: 'white', border: '2px solid var(--color-olive)' }}>
                        {s.icon}
                      </div>
                      <p style={{ fontSize: '0.62rem', marginTop: 6, color: 'var(--muted-foreground)', lineHeight: 1.4 }}>{s.label}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', marginTop: 12, fontStyle: 'italic' }}>
                  Note: Subject to Heidi API access and documentation. Integration scope may be adjusted once API is reviewed.
                </p>
              </div>
            </FeatureCard>

            <FeatureCard
              num="3.11"
              title="Aesthetic Planner (SVG Face & Body Annotation Tool)"
              desc="A proper visual tool for recording aesthetic procedures. The doctor picks a face or body diagram and annotates injection points directly on the diagram, capturing product, units, dilution and clinical notes per point. Saved as a PDF in the encounter record."
              effort="24 hours"
              phase="3"
            >
              <AestheticPlanner />
            </FeatureCard>

            <FeatureCard
              num="3.12"
              title="Before & After Photography"
              desc="A structured photo gallery per patient, organised by date and body area. Photos upload per encounter and display side by side for clinical review or patient consultations. Access is permission-controlled."
              effort="12 hours"
              phase="3"
            >
              <BeforeAfter />
            </FeatureCard>

            <FeatureCard
              num="3.13"
              title="Consumables & Stock Management with Billing Templates"
              desc="A product and consumable inventory that tracks stock levels and supports procedure billing templates. A 'Minor Excision' template, for example, adds all the relevant consumables to the invoice in one click and deducts from stock at the same time."
              effort="20 hours"
              phase="3"
            >
              <StockManagement />
            </FeatureCard>

            {/* PHASE 4 */}
            <PhaseHeader num="4" title="Patient Engagement" total="~28 hours" hours="Closing the loop with patients between visits" />

            <FeatureCard
              num="3.14"
              title="WhatsApp Survey & Symptom Tracking (Official API)"
              desc="Using the official WhatsApp Business API via 360dialog, doctors can send custom surveys directly to patients: symptom scores, pain scales, PHQ-9 screening, diet and exercise check-ins, post-procedure follow-ups. All responses are stored against the patient record."
              effort="28 hours"
              phase="4"
            >
              <WhatsAppSurvey />
              <p style={{ marginTop: 12, fontSize: '0.72rem', color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
                Note: 360dialog charges per conversation (~R0.60–R1.20/conversation). This is a third-party cost passed through or budgeted separately.
              </p>
            </FeatureCard>
          </Section>

          {/* ── 4. EFFORT SUMMARY ───────────────────────────────────── */}
          <Section
            id="effort-summary"
            label="Section 4"
            title="Effort Summary"
          >
            <div className="card overflow-hidden mb-4">
              <table className="proposal-table">
                <thead>
                  <tr>
                    <th>Phase</th>
                    <th>Features</th>
                    <th>Est. Hours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Phase 1 — Booking, Payments, Patient Onboarding</td><td>4 features</td><td style={{ fontWeight: 700, color: '#5c6340' }}>50 hrs</td></tr>
                  <tr><td>Phase 2 — Billing, ICD-10, Prescriptions</td><td>4 features</td><td style={{ fontWeight: 700, color: '#8a9465' }}>54 hrs</td></tr>
                  <tr><td>Phase 3 — Clinical Tools, Aesthetic Planner, Stock</td><td>5 features</td><td style={{ fontWeight: 700, color: '#3d4228' }}>80 hrs</td></tr>
                  <tr><td>Phase 4 — WhatsApp Surveys</td><td>1 feature</td><td style={{ fontWeight: 700, color: '#a0a870' }}>28 hrs</td></tr>
                  <tr>
                    <td style={{ fontWeight: 800 }}>Total</td>
                    <td style={{ fontWeight: 700 }}>14 features across 4 phases</td>
                    <td style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-olive)' }}>~212 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Visual bar */}
            <div className="card p-5">
              <div className="space-y-3">
                {[
                  { label: 'Phase 1', hrs: 50, total: 212, color: '#5c6340' },
                  { label: 'Phase 2', hrs: 54, total: 212, color: '#8a9465' },
                  { label: 'Phase 3', hrs: 80, total: 212, color: '#3d4228' },
                  { label: 'Phase 4', hrs: 28, total: 212, color: '#a0a870' },
                ].map(p => (
                  <div key={p.label} className="flex items-center gap-3">
                    <span style={{ width: 58, fontSize: '0.75rem', fontWeight: 600, color: p.color, flexShrink: 0 }}>{p.label}</span>
                    <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: 'var(--secondary)' }}>
                      <div
                        className="h-full rounded-full flex items-center px-3"
                        style={{ width: `${(p.hrs / p.total) * 100}%`, background: p.color }}
                      >
                        <span style={{ fontSize: '0.6rem', color: 'white', fontWeight: 700, whiteSpace: 'nowrap' }}>{p.hrs} hrs</span>
                      </div>
                    </div>
                    <span style={{ width: 44, textAlign: 'right', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>{Math.round((p.hrs / p.total) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ── 5. PRICING ──────────────────────────────────────────── */}
          <Section
            id="pricing"
            label="Section 5"
            title="Pricing"
            intro="Given our working relationship, I'm quoting well below the standard South African senior developer market rate of R1,200 to R1,800 per hour."
          >
            <div className="space-y-8">
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 16 }}>5.1 Hourly Rate Options & Build Cost</h3>
                <PricingTables />
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 16 }}>5.2 Monthly Retainer (Post-Build)</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 16 }}>
                  Once we're live, we'd agree on a monthly retainer to cover hosting, bug fixes, dependency updates, minor changes and ongoing support. Pricing for this is open for discussion and we can figure it out closer to go-live.
                </p>
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 16 }}>5.3 Third-Party Running Costs</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 16 }}>
                  These are external costs Fluid Medical pays directly, not development fees.
                </p>
                <RunningCosts />
              </div>
            </div>
          </Section>

          {/* ── 6. COMPARISON ───────────────────────────────────────── */}
          <Section
            id="comparison"
            label="Section 6"
            title="Why Custom vs. HealthAccess"
            intro="Fluid Medical currently uses HealthAccess, a South African practice management SaaS. Here is an honest comparison."
          >
            <Comparison />
          </Section>

          {/* ── 7. TIMELINE ─────────────────────────────────────────── */}
          <Section
            id="timeline"
            label="Section 7"
            title="Delivery Timeline (Indicative)"
          >
            <Timeline />
          </Section>

          {/* ── 8. NEXT STEPS ───────────────────────────────────────── */}
          <Section
            id="next-steps"
            label="Section 8"
            title="What Happens Next"
          >
            <NextSteps />
          </Section>

          {/* ── 9. CONTACT ──────────────────────────────────────────── */}
          <section id="contact" style={{ marginBottom: '3rem' }}>
            <p className="section-label" style={{ marginBottom: 8 }}>Section 9</p>
            <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 24 }}>Contact</h2>

            <div className="card p-6" style={{ maxWidth: 400 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white" style={{ background: 'var(--color-olive)', fontSize: '1.1rem' }}>
                  LC
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem' }}>Luc Duval</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Product Manager / Software Engineer</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { icon: '📧', val: 'luc.duval100@gmail.com' },
                  { icon: '📱', val: '+27 83 285 2913' },
                ].map(c => (
                  <div key={c.val} className="flex items-center gap-2">
                    <span>{c.icon}</span>
                    <span style={{ fontSize: '0.85rem' }}>{c.val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 flex items-center gap-2" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-olive)' }} />
                <p style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>This proposal is valid for 30 days from 16 March 2026.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

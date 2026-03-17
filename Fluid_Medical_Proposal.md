# Software Development Proposal
# Fluid Medical Practice Management Platform

| | |
|---|---|
| **Prepared for** | Fluid Medical |
| **Prepared by** | Luc Duval |
| **Date** | 16 March 2026 |
| **Version** | 1.0 |

---

## At a Glance

| 14 Features | 4 Phases | ~212 Hours | 14-week build |
|---|---|---|---|

---

## Section 1 — Executive Summary

Fluid Medical has an existing MVP I built that covers Contacts, Leads, Appointments, Invoices, and Doctors, running on Next.js, Convex, Clerk, and Vercel. This proposal is the natural next step: expanding that foundation into a fully-featured practice management platform built specifically around the way you work.

**The goal:** To bring every tool the practice needs into one fast, customisable platform that grows with the business. No more working around generic software. Something that fits Fluid Medical, not the other way around.

Fluid Medical operates across multiple disciplines: aesthetics, longevity, sport medicine, and general practice. That is not something an off-the-shelf tool handles well. Generic systems force you to adapt your workflows to their limitations. This platform is built the other way around: the software adapts to how you work.

Everything proposed here has been scoped with your actual workflow in mind. Each feature maps to a real operational need. Nothing is included for the sake of it.

---

## Section 2 — Current Stack

The technical foundation is already in place. Everything I am proposing builds on top of what exists. No starting over, no migration risk.

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router) |
| Backend / Database | Convex (real-time) |
| Authentication | Clerk |
| Hosting | Vercel |
| Payments | PayFast (to integrate) |
| WhatsApp | 360dialog API |
| AI Scribe | Heidi Health API |

The existing MVP already handles contacts, appointments, invoices, and lead management. Everything in this proposal layers on top of those records. We are not rebuilding anything, we are extending it.

---

## Section 3 — Feature Scope & Specification

Features are organised into four delivery phases, ordered by clinical priority and dependency. Each phase can be contracted and delivered independently.

---

### Phase 1 — Booking, Payments & Patient Onboarding
*~50 hours · The foundation for patient-facing interactions*

---

#### 3.1 Doctor Booking Links + Collective Calendar
**Estimated effort: 20 hours**

This feature gives each doctor a unique public booking link that shows their live availability. The patient picks a service type (consultation, aesthetic treatment, sport assessment, etc.), selects an available time slot, and confirms. No back-and-forth required.

On the admin side, there is a collective calendar view with all doctors displayed side by side. Appointments can be rescheduled with a simple drag and drop, and any changes are reflected in real-time across the system. The view filters by doctor, service type, or date range.

Key capabilities:
- Unique booking URL per doctor
- Live calendar availability (no double-booking)
- Service selection at booking time
- Collective admin calendar with drag-and-drop rescheduling
- Appointment confirmation sent to patient via email or WhatsApp

---

#### 3.2 Online Payments — PayFast Integration
**Estimated effort: 10 hours**

Patients can pay at the time of booking or later via a payment link sent after their consult. PayFast handles card payments, EFT, and SnapScan.

When a patient completes payment, it reconciles automatically against the corresponding invoice in the system. The invoice status updates to Paid and the payment date and reference are recorded. Payment links can be resent directly from the invoice if needed.

Key capabilities:
- Card, EFT, and SnapScan via PayFast
- Payment at booking or via invoice link post-consult
- Automatic reconciliation against invoice records
- Paid/pending status tracked per invoice
- Payment link resend from within the platform

---

#### 3.3 Patient Registration Form
**Estimated effort: 8 hours**

After a booking is made, a digital registration form is automatically sent to the patient via email or WhatsApp before they arrive. The form captures everything needed: personal details, medical history, current medications, emergency contacts, and any relevant clinical background.

Once submitted, all of that information is saved directly into the patient's record in the system. The appointment card shows whether the form has been completed, so the front desk knows at a glance who is ready.

Key capabilities:
- Auto-sent after a booking is confirmed
- Captures demographics, medical history, medications, emergency contacts
- Data saved directly into patient record (no manual re-entry)
- Completion status visible on the appointment card
- Mobile-friendly form that works on any device

---

#### 3.4 Consent Form (Digital Signature)
**Estimated effort: 12 hours**

A procedure-specific consent form that can be sent to the patient before their appointment or completed on a tablet in the room at the time of the consult. The patient reads the form on their own device and signs digitally using a touch or mouse signature. No printing, no scanning.

Once signed, the system generates a timestamped PDF of the completed consent form and attaches it automatically to the patient's encounter record. Consent forms are searchable and retrievable at any time.

Different consent templates can be created for different procedure types: Botox, filler, minor excisions, and so on.

Key capabilities:
- Procedure-specific consent templates
- Sent digitally before or during the consult
- Digital signature capture on any device or in-room tablet
- Auto-generated, timestamped PDF saved to the encounter record
- Accessible and searchable from the patient's history

---

### Phase 2 — Billing, Coding & Prescriptions
*~54 hours · Clinical compliance and revenue infrastructure*

---

#### 3.5 Services Page & Quick Billing
**Estimated effort: 8 hours**

A master list of all Fluid Medical services with pricing, type, and duration. From the services page, a doctor or admin can add any service to an open invoice with a single click during or after a consult. The service entry pulls through with the correct price automatically.

Services are categorised (aesthetics, longevity, sport, general), and the list is easy to maintain. New services can be added or prices updated at any time without a developer.

Key capabilities:
- Master list of all services with name, type, price and duration
- One-click "Add to Invoice" during or after a consult
- Searchable and filterable by category
- Admin-managed with no code changes required to add or update services

---

#### 3.6 ICD-10 Code Billing System
**Estimated effort: 12 hours**

For any patient billing to medical aid, ICD-10 diagnostic codes need to be attached to each invoice line item. Without this, medical aid claims are rejected or require significant manual correction.

This feature adds a searchable ICD-10 database directly into the invoicing workflow. Doctors can search by keyword (for example, "lower back pain") or by code directly. The matching codes appear instantly and can be attached to the relevant line item with a single click.

Each doctor can save their most frequently used codes as personal favourites, so the codes they use every day are immediately accessible without searching.

Key capabilities:
- Full ICD-10 database searchable by keyword or code
- Codes attach directly to invoice line items
- Personal favourites saved per doctor
- Required for compliant medical aid billing
- Search results prioritise recently used codes

---

#### 3.7 Invoicing Enhancement (Insurance & Medical Aid Codes)
**Estimated effort: 14 hours**

This feature upgrades the existing MVP invoicing to meet formal medical billing requirements: the kind that medical aids, insurers, and the HPCSA expect to see on a valid tax invoice.

Enhancements include support for NHRPL procedure codes alongside ICD-10 codes, VAT calculation, and a professional PDF output that includes the practice letterhead, treating doctor's details, registration number, and patient information correctly formatted for medical aid submission.

The invoice PDF can be emailed directly to the patient or downloaded. Invoices can also be formatted for direct medical aid claims where required.

Key capabilities:
- NHRPL procedure code support
- ICD-10 code integration on line items
- VAT (15%) calculation
- Professional PDF with practice letterhead and doctor details
- Email to patient directly from the invoice
- Medical aid-compatible formatting

---

#### 3.8 Prescription Generator
**Estimated effort: 20 hours**

A structured prescription tool built directly into the platform. The doctor fills in the prescription using a guided form: patient details (pre-filled from the record), medication name, dosage, frequency, duration, and any clinical notes. The system generates a professional, formatted PDF with the doctor's details, practice stamp, and signature pre-loaded.

Schedule 5 and 6 controlled substances are flagged automatically when added, serving as a compliance reminder. Completed prescriptions are saved against the encounter record and can be re-issued or modified for repeat prescriptions.

Key capabilities:
- Structured prescription form with patient details pre-filled
- Medication name, dosage, frequency, duration, and notes
- PDF output with doctor details, signature, and practice stamp
- Schedule 5 and 6 substance flagging
- Prescription saved to the encounter record
- Repeat prescription workflow

---

### Phase 3 — Clinical Tools & Documentation
*~80 hours · The tools that differentiate Fluid Medical from generic systems*

---

#### 3.9 Patient Notes Per Encounter
**Estimated effort: 12 hours**

Every appointment becomes an encounter record with its own dedicated clinical notes section. The doctor can write structured or free-text notes, attach files (lab results, referral letters, photos, imaging reports), and record clinical observations in a consistent format.

Notes lock after 24 hours. Any edits or amendments after that point require a reason to be entered, and the edit history is preserved, creating a clean, auditable clinical record. This is the standard required from a medico-legal perspective and what protects the practice if a clinical record is ever challenged.

Notes are accessible from the patient's full history, so a doctor seeing a returning patient can immediately review what was noted in previous encounters without leaving the platform.

Key capabilities:
- Encounter-specific notes section per appointment
- Structured or free-text note entry
- File attachments (PDFs, images, lab results)
- Notes lock after 24 hours
- Amendments require a reason and are logged with a timestamp
- Full encounter history visible from the patient record

---

#### 3.10 Heidi Health Integration (AI Medical Scribe)
**Estimated effort: 12 hours**

Heidi Health is an AI medical scribe that listens to a consultation and generates clinical notes automatically. It is trained on medical language and structured to produce SOAP or summary notes that a doctor can review and approve.

This integration connects Heidi directly into the platform. The doctor starts a Heidi session at the beginning of a consult, and when the session ends, Heidi's generated notes are pulled directly into the patient's encounter record in Fluid Medical. The doctor reviews, edits if needed, and approves, without ever needing to switch between platforms or copy-paste anything.

Writing clinical notes is one of the most time-consuming parts of a consultation. This reduces it to a review step.

Key capabilities:
- Heidi session linked to an encounter record
- Notes automatically imported at session end
- Doctor reviews and approves within the platform
- Supports SOAP and narrative note formats
- Subject to Heidi API documentation and access. Integration scope confirmed once API is reviewed.

---

#### 3.11 Aesthetic Planner (SVG Face & Body Annotation Tool)
**Estimated effort: 24 hours**

A dedicated visual annotation tool built specifically for aesthetic medicine. The doctor selects a face or body diagram (front face, lateral face, neck, décolletage, full body) and annotates injection points directly on the diagram by clicking or tapping. For each annotation point, they record the product used, the number of units, the dilution, and any relevant clinical notes.

The completed diagram with all annotations is saved as a PDF in the patient's encounter record. On a follow-up visit, the doctor can see exactly what was done previously and where, which is essential for aesthetic treatments where precision and consistency matter.

This is one of the features that most clearly demonstrates the value of a custom build. No off-the-shelf system offers this.

Key capabilities:
- Face and body diagram selection
- Click/tap annotation directly on the diagram
- Per-point data capture: product, units, dilution, notes
- Full diagram saved as PDF in the encounter record
- Historical annotations visible on return visits
- Multiple diagram types (face, neck, body zones)

---

#### 3.12 Before & After Photography
**Estimated effort: 12 hours**

A structured photo gallery per patient, organised by date and body area. Photos are uploaded per encounter and displayed in a before/after side-by-side view for direct comparison. The gallery is filterable by body area and date, making it easy to track progress over multiple treatment sessions.

Access to the photo gallery is permission-controlled, ensuring patient privacy. Photos are only visible to authorised clinical staff and are not accessible to admin users by default.

Key capabilities:
- Photo upload per encounter
- Before/after side-by-side comparison view
- Organised by date and body area
- Permission-controlled access (clinical staff only)
- Filterable gallery per patient

---

#### 3.13 Consumables & Stock Management with Billing Templates
**Estimated effort: 20 hours**

A product and consumable inventory that tracks stock levels in real-time. When a procedure is performed, the relevant consumables are deducted from stock automatically. Low stock alerts can be configured per item.

The billing template system is where this becomes particularly powerful. A template for a specific procedure (for example, a Minor Excision or a Full Face Botox treatment) can be configured once. When that template is selected during billing, it automatically adds all the relevant consumables and procedure items to the invoice in one click, and simultaneously deducts those items from stock.

Key capabilities:
- Product and consumable inventory with real-time stock levels
- Automatic stock deduction on procedure billing
- Low stock alerts per item
- Procedure billing templates (one click adds all items)
- Simultaneous invoice update and stock deduction
- Reorder point tracking

---

### Phase 4 — Patient Engagement
*~28 hours · Closing the loop with patients between visits*

---

#### 3.14 WhatsApp Survey & Symptom Tracking (Official API)
**Estimated effort: 28 hours**

Using the official WhatsApp Business API via 360dialog, doctors can send custom surveys and check-ins directly to patients on WhatsApp. Surveys are built within the platform and can include symptom scores, pain scales (1 to 10), PHQ-9 mental health screening, diet and exercise check-ins, post-procedure follow-up questionnaires, and satisfaction surveys.

The doctor or admin selects a survey template, chooses a patient or patient list, and sends it with one click. Patient responses come back through the WhatsApp API and are stored automatically against the patient's record. Doctors can view response summaries, track scores over time, and identify patients who need follow-up attention.

This is particularly useful for longevity and chronic care patients where regular check-ins between visits are part of the treatment plan.

Key capabilities:
- Custom survey builder within the platform
- Sends via official WhatsApp Business API (360dialog)
- Supports symptom scores, pain scales, PHQ-9, diet/exercise check-ins, post-procedure follow-ups
- Responses stored against the patient record
- Score tracking over time per patient
- One-click send to individual patients or patient groups
- Note: 360dialog charges approximately R0.60 to R1.20 per conversation. This is a direct cost to Fluid Medical, not a development fee.

---

## Section 4 — Effort Summary

| Phase | Features | Estimated Hours |
|---|---|---|
| Phase 1: Booking, Payments, Patient Onboarding | 4 features | 50 hrs |
| Phase 2: Billing, ICD-10, Prescriptions | 4 features | 54 hrs |
| Phase 3: Clinical Tools, Aesthetic Planner, Stock | 5 features | 80 hrs |
| Phase 4: WhatsApp Surveys | 1 feature | 28 hrs |
| **Total** | **14 features across 4 phases** | **~212 hrs** |

Phases are independent. Phase 1 is recommended as the starting engagement. It delivers immediate, tangible value to both patients and the practice within the first few weeks, and validates the approach before committing to the full scope.

---

## Section 5 — Pricing

Given our working relationship, I am quoting well below the standard South African senior developer market rate of R1,200 to R1,800 per hour.

### 5.1 Hourly Rate & Build Cost

**Hourly Rate: R400/hour**

| Phase | Hours | Cost at R400/hr |
|---|---|---|
| Phase 1: Booking, Payments, Onboarding | 50 hrs | R20,000 |
| Phase 2: Billing, ICD-10, Prescriptions | 54 hrs | R21,600 |
| Phase 3: Clinical Tools, Aesthetic Planner | 80 hrs | R32,000 |
| Phase 4: WhatsApp Surveys | 28 hrs | R11,200 |
| **Total (all 4 phases)** | **212 hrs** | **R84,800** |

Phases can be contracted and invoiced separately. Payment terms are 50% upfront per phase, 50% on delivery.

### 5.2 Monthly Retainer (Post-Build)

Once the platform is live, we would agree on a monthly retainer to cover hosting, bug fixes, dependency updates, minor changes, and ongoing support. This ensures the platform stays healthy and continues to improve after go-live. Pricing is open for discussion and we can finalise this closer to launch.

### 5.3 Third-Party Running Costs

These are external costs Fluid Medical pays directly to service providers. They are not development fees and are not included in the figures above.

| Service | Estimated Monthly Cost |
|---|---|
| Vercel Pro (hosting) | ~R350/month |
| Convex (database, scaled usage) | R0 to R700/month |
| 360dialog WhatsApp API | R150 setup + ~R0.60 to R1.20/conversation |
| PayFast transaction fees | 3.5% per transaction |
| Heidi Health subscription | Per Heidi's pricing |
| PDF/email service (Resend) | R0 to R200/month |

---

## Section 6 — Why Custom vs. HealthAccess

Here is an honest comparison between building a custom platform and continuing with an off-the-shelf solution.

### HealthAccess

**What it does well:**
- Ready to use immediately, with no build time
- HPCSA and medical aid billing pre-configured
- Local support team familiar with South African regulations
- ICD-10 and NHRPL code databases included

**Where it falls short:**
- Not designed for aesthetics, longevity, or sport medicine workflows
- No aesthetic planner for recording injection sites and treatment details
- No WhatsApp survey or patient engagement tooling
- Slow to customise. Feature requests go into a vendor backlog with no guaranteed timeline.
- Per-seat licensing that gets more expensive as the practice grows
- Data lock-in. Your patient data lives in their system on their terms.
- Generic UI designed for the average GP, not a multi-discipline practice like Fluid Medical

### Custom Build (Fluid Medical Platform)

**What you gain:**
- Built around Fluid Medical's actual workflow, not a generic one
- Aesthetic planner, WhatsApp surveys, prescription generator. Features built for how you actually work.
- You own your data outright, with no lock-in and full export capability at any time
- Fast iteration. New features can be scoped and shipped in days, not months.
- Scales without per-seat costs as the team grows
- Heidi AI scribe integrated natively into the clinical workflow

**What to be aware of:**
- Higher upfront investment before go-live compared to a monthly SaaS subscription
- Phase 1 takes around 3 to 4 weeks to build before you are live
- Single developer dependency, mitigated by clean, well-documented code and an ongoing retainer structure

**Verdict:** For a standard GP, HealthAccess does the job. For a multi-discipline, aesthetics-forward, tech-forward practice like Fluid Medical, a generic tool will always be a workaround. A custom platform is the only thing that keeps up with how you actually grow.

---

## Section 7 — Delivery Timeline (Indicative)

Timeline assumes approximately 20 billable hours per week. This can be accelerated with agreed sprint commitments.

| Phase | Focus | Delivery Window |
|---|---|---|
| Phase 1 | Booking, Payments & Patient Onboarding | Weeks 3 to 4 |
| Phase 2 | Billing, ICD-10 & Prescriptions | Weeks 6 to 7 |
| Phase 3 | Clinical Tools & Aesthetic Planner | Weeks 10 to 11 |
| Phase 4 | WhatsApp Patient Engagement | Weeks 13 to 14 |

Total estimated: **13 to 14 weeks** from kick-off across approximately **212 billable hours**.

Each phase ends with a demo and handover before the next begins. You get working, usable software at the end of each phase, not just at the end of the whole project.

---

## Section 8 — What Happens Next

### 01 — Agree on scope and rate
I recommend starting with Phase 1 so the team gets real value quickly without a large upfront commitment. We can confirm whether you want to start with all 4 phases on contract or take it one phase at a time.

### 02 — Sign a simple service agreement
Covering IP ownership (you own everything I build), payment terms (50% upfront, 50% on delivery per phase), and confidentiality. I will prepare a clean one-page agreement.

### 03 — Kick-off call
One hour to walk through Phase 1 in detail, confirm any workflow nuances, and make sure I understand how the team actually works before I start building.

### 04 — Weekly updates
A short Loom video or WhatsApp voice note every Friday showing what got built that week. No surprises, no black box.

---

## Section 9 — Contact

**Luc Duval**
Product Manager / Software Engineer

📧 luc.duval100@gmail.com
📱 +27 83 285 2913

---

*This proposal is valid for 30 days from 16 March 2026.*

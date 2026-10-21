import React, { useState } from "react";
import "./ContactPage.css";

const CONFIG = {
  ENDPOINT: "",
  EMAIL: "enquiries@gaaconsulting.com"
};

const BRANDS = [
  {
    id: "gaa",
    name: "GAA Consulting",
    label: "Corporate Advisory",
    lead: "Senior Corporate Law Partner",
    sla: "< 4 business hours",
    topics: [
      "Corporate law & company secretarial",
      "Mergers, acquisitions & restructuring",
      "Fundraising, term sheets & due diligence",
      "NBFC & financial regulatory advisory",
      "General corporate governance retainer"
    ]
  },
  {
    id: "filings",
    name: "Filings First",
    label: "Accounting & Tax",
    lead: "Taxation & Statutory Compliance Lead",
    sla: "< 2 business hours",
    topics: [
      "Statutory bookkeeping & financial accounts",
      "Corporate taxation & advance tax",
      "GST returns, reconciliations & audit defence",
      "Corporate secretarial & MCA compliance calendar",
      "FDI, RBI & cross-border regulatory reporting"
    ]
  },
  {
    id: "hirings",
    name: "Hirings First",
    label: "Talent & Workforce",
    lead: "Executive Search & Talent Director",
    sla: "< 6 business hours",
    topics: [
      "Hire leadership / C-suite executives",
      "IT & specialized engineering talent",
      "Corporate legal, finance & CS recruitment",
      "Campus placement drives for early talent",
      "Managed workforce outsourcing & payroll"
    ]
  }
];

const SUGGESTIONS = [
  "+ M&A Advisory",
  "+ MCA Notice Defence",
  "+ Due Diligence Review",
  "+ C-Suite Search",
  "+ GST Audit Assistance",
  "+ GIFT City Entity"
];

export default function ContactPage() {
  const [selectedBrandId, setSelectedBrandId] = useState("gaa");
  const [selectedTopic, setSelectedTopic] = useState(BRANDS[0].topics[0]);
  const [ndaChecked, setNdaChecked] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    // prefilled from the About Us "Request an introduction" box, if used
    email: (() => {
      try {
        return sessionStorage.getItem("gaa-intro-email") || "";
      } catch (e) {
        return "";
      }
    })(),
    phone: "",
    message: ""
  });

  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const [isSending, setIsSending] = useState(false);
  const [dispatchReceipt, setDispatchReceipt] = useState(null);

  const activeBrand = BRANDS.find((b) => b.id === selectedBrandId) || BRANDS[0];

  const handleBrandSelect = (brandId) => {
    setSelectedBrandId(brandId);
    const targetBrand = BRANDS.find((b) => b.id === brandId);
    if (targetBrand && targetBrand.topics.length > 0) {
      setSelectedTopic(targetBrand.topics[0]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSuggestion = (chip) => {
    const cleanText = chip.replace("+ ", "");
    setFormData((prev) => ({
      ...prev,
      message: prev.message ? `${prev.message}\n• Requirement: ${cleanText}` : `• Requirement: ${cleanText}`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (!trimmedName || !emailValid || phoneDigits.length < 8) {
      setStatusMsg({
        type: "err",
        text: "Please provide your full name, a valid corporate email, and contact telephone number."
      });
      return;
    }

    setIsSending(true);
    setStatusMsg({ type: "", text: "" });

    const refCode = `GAA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestampStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";

    const payload = {
      referenceCode: refCode,
      timestamp: timestampStr,
      desk: activeBrand.name,
      topic: selectedTopic,
      lead: activeBrand.lead,
      sla: activeBrand.sla,
      nda: ndaChecked ? "Bilateral NDA Requested" : "Standard Professional Privilege",
      name: formData.name,
      company: formData.company || "Independent / Confidential",
      email: formData.email,
      phone: formData.phone,
      message: formData.message || "Consultation inquiry regarding " + selectedTopic
    };

    try {
      if (CONFIG.ENDPOINT) {
        const res = await fetch(CONFIG.ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Failed to dispatch brief");
      } else {
        // Mailto fallback
        const subject = encodeURIComponent(`[${refCode}] ${payload.desk} — ${payload.topic}`);
        const bodyLines = [
          `REFERENCE: ${refCode}`,
          `PRACTICE DESK: ${payload.desk}`,
          `PRIMARY TOPIC: ${payload.topic}`,
          `LEAD PARTNER: ${payload.lead}`,
          `CLIENT NAME: ${payload.name}`,
          `COMPANY: ${payload.company}`,
          `EMAIL: ${payload.email}`,
          `PHONE: ${payload.phone}`,
          `MUTUAL NDA: ${payload.nda}`,
          `--------------------------------------------------`,
          `EXECUTIVE BRIEF:`,
          payload.message
        ].join("\n");

        window.open(`mailto:${CONFIG.EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyLines)}`, "_self");
      }

      setDispatchReceipt(payload);
    } catch (err) {
      console.error(err);
      setStatusMsg({
        type: "err",
        text: `Unable to dispatch automatically. Please email us directly at ${CONFIG.EMAIL}`
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setDispatchReceipt(null);
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    setStatusMsg({ type: "", text: "" });
  };

  return (
    <div className="contact-page-unified" id="contact-top">
      <div className="cpu-wrap">
        <div className="cpu-grid">
          {/* LEFT COLUMN: EDITORIAL HEADING & DIRECT CHANNELS */}
          <div className="cpu-left">
            <h1 className="cpu-title">
              Business, <em>first.</em><br />
              <span>Let's start the conversation.</span>
            </h1>

            <p className="cpu-lead">
              Connect directly with senior practice partners across corporate legal advisory, statutory MCA compliance, and executive talent. Every matter is protected under strict fiduciary privilege.
            </p>

            {/* Quick Assurance Pills */}
            <div className="cpu-assurances">
              <div className="cpu-as-pill">
                <span>⏱️</span>
                <b>&lt; 4 Hours Response SLA</b>
              </div>
              <div className="cpu-as-pill">
                <span>🔒</span>
                <b>100% Mutual NDA</b>
              </div>
              <div className="cpu-as-pill">
                <span>⚖️</span>
                <b>32 Specialists</b>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="cpu-channels-card">
              <span className="cpu-channels-label">Direct Communication Lines</span>

              <a href="mailto:enquiries@gaaconsulting.com" className="cpu-channel-item">
                <div className="cpu-chan-info">
                  <span className="cpu-chan-sub">Corporate Inquiries</span>
                  <span className="cpu-chan-link">enquiries@gaaconsulting.com</span>
                </div>
                <span className="cpu-chan-arrow" aria-hidden="true">→</span>
              </a>

              <a href="tel:+912249801200" className="cpu-channel-item">
                <div className="cpu-chan-info">
                  <span className="cpu-chan-sub">HQ Direct Telephone</span>
                  <span className="cpu-chan-link">+91 22 4980 1200</span>
                </div>
                <span className="cpu-chan-arrow" aria-hidden="true">→</span>
              </a>

              <a href="tel:+912249801299" className="cpu-channel-item" style={{ borderColor: "rgba(220,106,64,0.3)" }}>
                <div className="cpu-chan-info">
                  <span className="cpu-chan-sub" style={{ color: "var(--o)" }}>Emergency Statutory Duty Line</span>
                  <span className="cpu-chan-link" style={{ color: "var(--o)" }}>+91 22 4980 1299</span>
                </div>
                <span className="cpu-chan-arrow" style={{ color: "var(--o)" }} aria-hidden="true">→</span>
              </a>
            </div>

            {/* Clean Locations Line */}
            <div className="cpu-locations">
              <b>Corporate Desks:</b> Mumbai (BKC) · New Delhi (CP) · Bengaluru (Indiranagar) · GIFT City IFSC
            </div>
          </div>

          {/* RIGHT COLUMN: CONCISE ANIMATIVE FORM */}
          <div className="cpu-right">
            <div className="cpu-form-card">
              {dispatchReceipt ? (
                <div className="cpu-success">
                  <div className="cpu-success-icon" aria-hidden="true">✓</div>
                  <span className="cpu-ref-code">DISPATCH REF #{dispatchReceipt.referenceCode}</span>
                  <h3>Consultation Dispatched</h3>
                  <p>
                    Thank you, <b>{dispatchReceipt.name}</b>. Your brief has been dispatched directly to the desk of our <b>{dispatchReceipt.lead}</b> under bilateral confidentiality protocols.
                  </p>
                  <p style={{ fontSize: "13px", color: "#7A7268" }}>
                    Committed partner response window: <b>{dispatchReceipt.sla}</b>.
                  </p>
                  <button
                    type="button"
                    className="cpu-submit-btn"
                    style={{ width: "auto", padding: "14px 28px", marginTop: "12px" }}
                    onClick={handleReset}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="cpu-form">
                  <div className="cpu-form-head">
                    <span className="cpu-channels-label" style={{ marginBottom: "6px" }}>Executive Briefing</span>
                    <h2>Send a Direct Message</h2>
                    <p>Select practice area. Transmission is protected by statutory professional privilege.</p>
                  </div>

                  {/* Brand Selector (Matching Home Page) */}
                  <div className="cpu-brand-selector" role="tablist">
                    {BRANDS.map((brand) => {
                      const isActive = selectedBrandId === brand.id;
                      return (
                        <button
                          key={brand.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`cpu-brand-btn ${isActive ? "active" : ""}`}
                          onClick={() => handleBrandSelect(brand.id)}
                        >
                          <b>{brand.name}</b>
                          <small>{brand.label}</small>
                        </button>
                      );
                    })}
                  </div>

                  {/* Routing Lead Ribbon */}
                  <div className="cpu-routing-ribbon" key={selectedBrandId}>
                    <div>
                      <span>Practice Partner:</span>
                      <b style={{ marginLeft: "6px" }}>{activeBrand.lead}</b>
                    </div>
                    <span>SLA: {activeBrand.sla}</span>
                  </div>

                  {/* Topic Dropdown */}
                  <div className="cpu-field">
                    <label className="cpu-field-label" htmlFor="cpu-topic">
                      <span>Primary Topic <span className="req">*</span></span>
                    </label>
                    <select
                      id="cpu-topic"
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="cpu-select"
                    >
                      {activeBrand.topics.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name & Company Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div className="cpu-field">
                      <label className="cpu-field-label" htmlFor="cpu-name">
                        <span>Full Name <span className="req">*</span></span>
                      </label>
                      <input
                        type="text"
                        id="cpu-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Sharma"
                        className="cpu-input"
                        required
                      />
                    </div>

                    <div className="cpu-field">
                      <label className="cpu-field-label" htmlFor="cpu-company">
                        <span>Company (optional)</span>
                      </label>
                      <input
                        type="text"
                        id="cpu-company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Apex Tech Ltd."
                        className="cpu-input"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <div className="cpu-field">
                      <label className="cpu-field-label" htmlFor="cpu-email">
                        <span>Work Email <span className="req">*</span></span>
                      </label>
                      <input
                        type="email"
                        id="cpu-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@company.com"
                        className="cpu-input"
                        required
                      />
                    </div>

                    <div className="cpu-field">
                      <label className="cpu-field-label" htmlFor="cpu-phone">
                        <span>Phone / WhatsApp <span className="req">*</span></span>
                      </label>
                      <input
                        type="tel"
                        id="cpu-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="cpu-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Requirement Textarea */}
                  <div className="cpu-field">
                    <label className="cpu-field-label" htmlFor="cpu-message">
                      <span>Requirement Scope / Context</span>
                      <span style={{ fontSize: "11px", color: "#7A7268", fontWeight: 500 }}>Optional</span>
                    </label>
                    <textarea
                      id="cpu-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Briefly state your matter, jurisdiction, deal quantum, or filing urgency..."
                      className="cpu-textarea"
                    />

                    {/* Quick Suggestion Chips */}
                    <div className="cpu-tags-row">
                      <span style={{ font: "700 10.5px/1 var(--gm)", color: "#7A7268", textTransform: "uppercase" }}>
                        Quick Add:
                      </span>
                      {SUGGESTIONS.map((sug) => (
                        <button
                          key={sug}
                          type="button"
                          className="cpu-tag"
                          onClick={() => handleAddSuggestion(sug)}
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mutual NDA Checkbox */}
                  <label className="cpu-nda-label">
                    <input
                      type="checkbox"
                      checked={ndaChecked}
                      onChange={(e) => setNdaChecked(e.target.checked)}
                    />
                    <span>
                      <b>Execute Mutual NDA</b> prior to sharing confidential deal documents.
                    </span>
                  </label>

                  {/* Status Banner */}
                  {statusMsg.text && (
                    <div className={`cpu-status ${statusMsg.type}`} role="alert">
                      <span>{statusMsg.type === "err" ? "⚠️" : "✓"}</span>
                      <span>{statusMsg.text}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button type="submit" className="cpu-submit-btn" disabled={isSending}>
                    {isSending ? (
                      <span>Dispatching Brief to Practice Partner…</span>
                    ) : (
                      <>
                        <span>Send enquiry to {activeBrand.name}</span>
                        <span className="cpu-arrow" aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  <div className="cpu-subnote">
                    🔒 Strictly confidential · Protected by statutory professional secrecy
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// One template for all 25 Filings First service pages ("FF Detail" mockup).
// GST registration adds eligibility, registration types and document tabs.
import React, { useState } from "react";
import { Link } from "../site/router.jsx";
import { FFPage, HeroForm, Faq, ffHref, svcHref, jump } from "./FFLayout.jsx";
import { PAGES, GST_REG, SERVICES } from "./ffData.js";

const two = (i) => String(i + 1).padStart(2, "0");

function Head({ eb, h2, dark, children }) {
  return (
    <div className="ff-headrow">
      <div className="ff-head" data-ffrv>
        <span className="ff-mono" style={dark ? { color: "var(--o)" } : undefined}>{eb}</span>
        <h2 className="ff-h2">{h2}</h2>
      </div>
      {children}
    </div>
  );
}

export default function FFService({ slug }) {
  const gst = slug === "gst-registration";
  const p = gst ? GST_REG : PAGES[slug];
  const parent = p.parent ? SERVICES.find((s) => s.slug === p.parent) : null;
  const [tab, setTab] = useState(gst ? Object.keys(GST_REG.docTabs.tabs)[0] : null);
  const docs = gst ? GST_REG.docTabs.tabs[tab] : p.docs.items;
  const nav = gst
    ? [["ff-eligibility", "Eligibility"], ["ff-types", "Types"], ["ff-documents", "Documents"], ["ff-process", "Process"], ["ff-pricing", "Pricing"], ["ff-faqs", "FAQs"]]
    : [["ff-who", "Who it's for"], ["ff-scope", "Scope"], ["ff-documents", "Documents"], ["ff-process", "Process"], ["ff-pricing", "Pricing"], ["ff-faqs", "FAQs"]];
  const toTop = jump("ff-top");

  return (
    <FFPage nav={nav} pageKey={slug}>
      {/* Hero + callback form */}
      <section id="ff-top" className="ff-w ff-hero">
        <nav className="ff-crumbs" aria-label="Breadcrumb">
          <Link to={ffHref("/")}>Filings First</Link>
          <span>/</span>
          {parent ? <Link to={svcHref(parent.slug)}>{parent.name}</Link> : <Link to={`${ffHref("/")}#ff-scope`}>Services</Link>}
          <span>/</span>
          <b aria-current="page">{p.name}</b>
        </nav>
        <div className="ff-hero-row">
          <div className="ff-hero-l">
            <span className="ff-eb">{p.eyebrow}</span>
            <h1>
              {p.h1[0]} <span>{p.h1[1]}</span>
            </h1>
            <p className="ff-lead">{p.lead}</p>
            <div className="ff-checks">
              {p.checks.map((c, j) => (
                <div key={j}><span className="ff-tick">✓</span>{c}</div>
              ))}
            </div>
          </div>
          <HeroForm title={p.formTitle} service={p.name} />
        </div>
      </section>

      {/* Overview */}
      <section className="ff-paper">
        <div className="ff-w ff-sec ff-ov">
          <div data-ffrv>
            <span className="ff-mono">Overview</span>
            <h2 className="ff-h2">{p.overview.h2}</h2>
          </div>
          <div data-ffrv>
            <p>{p.overview.p1}</p>
            <p>{p.overview.p2}</p>
          </div>
        </div>
      </section>

      {gst ? (
        <>
          {/* Who needs to register */}
          <section id="ff-eligibility" className="ff-w ff-sec ff-col">
            <Head eb="Eligibility" h2={GST_REG.eligibility.h2} />
            <div className="ff-grid ff-g280" data-ffrv>
              {GST_REG.eligibility.thresholds.map(([k, v, d]) => (
                <div className="ff-thr" key={k}><small>{k}</small><b>{v}</b><span>{d}</span></div>
              ))}
              <div className="ff-mand">
                <small>{GST_REG.eligibility.mandatoryLabel}</small>
                <div>{GST_REG.eligibility.mandatory.map((m) => <div key={m}><i></i>{m}</div>)}</div>
              </div>
            </div>
            <span className="ff-small-note">{GST_REG.eligibility.note}</span>
          </section>
          {/* Registration types */}
          <section id="ff-types" className="ff-paper">
            <div className="ff-w ff-sec ff-col">
              <Head eb="Types of registration" h2={GST_REG.types.h2} />
              <div className="ff-grid ff-g280" data-ffrv>
                {GST_REG.types.items.map(([t, d], i) => (
                  <div className="ff-card" key={i}><span className="ff-num">{two(i)}</span><b>{t}</b><span>{d}</span></div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Who it's for */}
          <section id="ff-who" className="ff-w ff-sec ff-col">
            <Head eb="Who it's for" h2={p.who.h2} />
            <div className="ff-grid ff-g240" data-ffrv>
              {p.who.items.map((w, i) => (
                <div key={i} className={`ff-who${p.who.dark.includes(i) ? " dark" : ""}`}>
                  <span className="ff-num">{two(i)}</span>
                  <b>{w}</b>
                </div>
              ))}
            </div>
          </section>
          {/* Scope */}
          <section id="ff-scope" className="ff-paper">
            <div className="ff-w ff-sec ff-col">
              <Head eb="What's covered" h2={p.scope.h2} />
              <div className="ff-grid ff-g280" data-ffrv>
                {p.scope.items.map(([t, d], i) => (
                  <div className="ff-card" key={i}><span className="ff-num">{two(i)}</span><b>{t}</b><span>{d}</span></div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Documents */}
      <section id="ff-documents" className="ff-w ff-sec ff-col">
        <Head eb="Documents required" h2={gst ? GST_REG.docTabs.h2 : p.docs.h2}>
          {gst && (
            <div className="ff-tabs" role="group" aria-label="Business type">
              {Object.keys(GST_REG.docTabs.tabs).map((k) => (
                <button key={k} type="button" aria-pressed={tab === k} onClick={() => setTab(k)}>{k}</button>
              ))}
            </div>
          )}
        </Head>
        <div className="ff-grid ff-g260" data-ffrv>
          {docs.map((d, i) => (
            <div className="ff-doc" key={i}><span className="ff-num">{two(i)}</span><b>{d}</b></div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="ff-process" className="ff-dark">
        <div className="ff-w ff-sec ff-col">
          <Head eb="Process & timelines" h2={p.process.h2} dark>
            <span className="ff-cad">{p.process.cadence}</span>
          </Head>
          <div className="ff-steps" data-ffrv>
            {p.process.steps.map(([t, d], i) => (
              <div className="ff-step" key={i}>
                <span>{two(i)}</span>
                <b>{t}</b>
                <span>{d}</span>
              </div>
            ))}
          </div>
          <span className="ff-note">{p.process.note}</span>
        </div>
      </section>

      {/* Pricing */}
      <section id="ff-pricing" className="ff-w ff-sec ff-col">
        <Head eb="Pricing" h2={p.pricing.h2} />
        <div className="ff-grid ff-g300" data-ffrv>
          {p.pricing.plans.map((pl) => (
            <div key={pl.name} className={`ff-plan${pl.rec ? " rec" : ""}`}>
              <div className="ff-plan-h">
                <b>{pl.name}</b>
                {pl.rec && <span className="ff-rec">Recommended</span>}
              </div>
              <div className="ff-price"><b>{pl.price}</b><span>{pl.suffix}</span></div>
              <div className="ff-list">
                {pl.items.map((x, j) => <div key={j}><span className="ff-tick">✓</span>{x}</div>)}
              </div>
              <a href="#ff-top" onClick={toTop} className="ff-plan-cta">{pl.cta} →</a>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits + why act now */}
      <section className="ff-paper">
        <div className="ff-w ff-sec ff-ben">
          <div data-ffrv>
            <span className="ff-mono">Benefits</span>
            <h2 className="ff-h2">{p.benefits.h2}</h2>
            <div className="ff-ben-list">
              {p.benefits.items.map(([t, d], j) => (
                <div key={j}><b>{t}</b><span>{d}</span></div>
              ))}
            </div>
          </div>
          <div className="ff-act" data-ffrv>
            <span className="ff-mono">{p.benefits.eyebrow}</span>
            <b>{p.benefits.title}</b>
            <p>{p.benefits.text}</p>
            <a href="#ff-top" onClick={toTop} className="ff-btn dark">{p.benefits.cta} <span className="ar">→</span></a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="ff-faqs" className="ff-w ff-sec ff-faq">
        <div data-ffrv>
          <span className="ff-mono">FAQs</span>
          <h2 className="ff-h2">{p.faqs.h2}</h2>
        </div>
        <div className="ff-acc-list">
          <Faq items={p.faqs.items} />
        </div>
      </section>

      {/* Related services */}
      <section className="ff-paper">
        <div className="ff-w ff-rel">
          <span className="ff-mono">{p.related.label}</span>
          <div className="ff-grid ff-g220" data-ffrv>
            {p.related.items.map(([s, tag, name]) => (
              <Link key={s + name} to={svcHref(s)} className="ff-relcard">
                <div><span>{tag}</span><span>→</span></div>
                <b>{name}</b>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </FFPage>
  );
}

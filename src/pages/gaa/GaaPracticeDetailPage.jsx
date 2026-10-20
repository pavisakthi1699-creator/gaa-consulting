import React, { useEffect, useRef, useState } from "react";
import useGaaMotion from "./useGaaMotion";
import {
  GaaHeader, GaaSubBar, GaaFooter, SubHero, GlanceCard, SectionHead, CtaBand, FaqList, Ring, useLink,
} from "./GaaShell";
import { PRACTICES, getPractice } from "../../data/gaaContent";
import { TEAM_MEMBERS } from "../../data/teamData";

const ANCHORS = [
  ["overview", "Overview"],
  ["services", "Services"],
  ["process", "Process"],
  ["faq", "FAQs"],
  ["related", "Related"],
];

export default function GaaPracticeDetailPage({ slug, onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  const p = getPractice(slug) || PRACTICES[0];
  useGaaMotion(ref, `${p.title} | GAA Consulting`);

  // Highlight the in-page anchor for the section in view
  const [cur, setCur] = useState("overview");
  useEffect(() => {
    const els = ANCHORS.map(([id]) => document.getElementById(id)).filter(Boolean);
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCur(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const jump = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const lead = TEAM_MEMBERS.find((m) => m.department === "GAA Consulting" && m.category === "leadership");
  const idx = PRACTICES.findIndex((x) => x.slug === p.slug);
  const next = PRACTICES[(idx + 1) % PRACTICES.length];

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="practices" />
      <GaaSubBar link={link} crumbs={[["practices", "Practice Areas"], [null, p.short]]} />
      <main>
        <SubHero
          tag={`Practice ${p.no} · ${p.short}`}
          lines={p.hero}
          em={p.heroEm}
          sub={p.lede}
          actions={
            <>
              <a className="btn o" {...link("@contact", { intent: p.intent })}>
                Consult the Practice Partner <span className="ar">→</span>
              </a>
              <a className="btn g" href="#services" onClick={jump("services")}>
                See Services ↓
              </a>
            </>
          }
          aside={
            <GlanceCard
              head={`Practice ${p.no}`}
              rows={p.glance}
              note="Every file is reviewed by a senior partner before it is filed or shared."
            />
          }
          ticker={p.chips}
        />

        <nav className="anav" aria-label="On this page">
          <div className="w">
            {ANCHORS.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={jump(id)} aria-current={cur === id ? "true" : undefined}>
                {label}
              </a>
            ))}
            <a className="anav-cta" {...link("@contact", { intent: p.intent })}>Book a Briefing →</a>
          </div>
        </nav>

        <section className="s" id="overview">
          <div className="w ag">
            <div>
              <span className="gm eb">Practice Overview</span>
              <h2 style={{ marginTop: "14px" }}>{p.short} <em>done properly.</em></h2>
              {p.overview.map((t) => <p className="ap" key={t.slice(0, 20)}>{t}</p>)}
              <div className="who">
                <span className="gm eb">Who we advise</span>
                <div className="chips">
                  {p.audience.map((a) => <span key={a}>{a}</span>)}
                </div>
              </div>
            </div>
            <aside className="cred">
              <h3>Practice Lead</h3>
              <p className="sub">Direct partner access on every matter</p>
              {lead && (
                <div className="plead">
                  <img src={lead.image} alt={lead.name} loading="lazy" />
                  <div>
                    <b>{lead.name}</b>
                    <span>{lead.role}</span>
                  </div>
                </div>
              )}
              <div className="ci"><span className="ic">01</span><div><b>Under 4-Hour Response</b><span>On urgent notices, board resolutions and transaction queries.</span></div></div>
              <div className="ci"><span className="ic">02</span><div><b>Fixed, Written Fees</b><span>Scope and fee agreed in writing before work starts.</span></div></div>
              <div className="ci"><span className="ic">03</span><div><b>Mutual NDA First</b><span>Signed before we review a single document.</span></div></div>
              <a className="btn o" {...link("@contact", { intent: p.intent })}>
                <span>Initiate Engagement Briefing</span><span className="ar">→</span>
              </a>
            </aside>
          </div>
        </section>

        <section className="s alt" id="services">
          <div className="w">
            <SectionHead eb="What We Do" p="The core services within this practice. Every engagement is scoped to your entity, so you only pay for what you need.">
              Services within <em>this practice.</em>
            </SectionHead>
            <div className="svcs">
              {p.services.map(([t, d], i) => (
                <div className="svc" key={t}>
                  <span className="gm">{p.no}.{String(i + 1).padStart(2, "0")}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s" id="process">
          <div className="w">
            <SectionHead eb="How We Work" p="A clear four-stage process with a named partner accountable at every stage.">
              From first call to <em>final filing.</em>
            </SectionHead>
            <ol className="steps draw">
              {p.process.map(([t, d], i) => (
                <li className="step" key={t}>
                  <span className="no">{String(i + 1).padStart(2, "0")}</span>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="s alt" id="faq">
          <div className="w ag">
            <div>
              <span className="gm eb">Frequently Asked</span>
              <h2 style={{ marginTop: "14px" }}>Questions clients <em>ask us first.</em></h2>
              <p className="ap">Short answers to common questions about this practice. For advice on your specific facts, book a confidential briefing with a partner.</p>
              <div className="acts">
                <a className="btn" {...link("how-we-work")}>How We Work <span className="ar">→</span></a>
              </div>
            </div>
            <FaqList items={p.faqs} />
          </div>
        </section>

        <section className="s" id="related">
          <div className="w">
            <SectionHead eb="Related Practices">
              Practices that <em>work alongside.</em>
            </SectionHead>
            <div className="pgrid">
              {p.related.map((s) => {
                const r = getPractice(s);
                return (
                  <a className="pc5" key={s} {...link(`practices/${s}`)}>
                    <div className="top"><span className="n">{r.no} · Practice</span><span className="go2">→</span></div>
                    <h3>{r.title}</h3>
                    <p>{r.summary}</p>
                  </a>
                );
              })}
            </div>
            <a className="nextp" {...link(`practices/${next.slug}`)}>
              <span className="gm">Next practice · {next.no}</span>
              <b>{next.title}</b>
              <i aria-hidden="true">→</i>
            </a>
          </div>
        </section>

        <CtaBand
          link={link}
          intent={p.intent}
          title="Discuss your matter with"
          em="a practice partner."
          p="Every briefing is protected under mutual non-disclosure. You will get a written scope, timeline and fixed fee within 48 hours."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}

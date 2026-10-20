import React, { useEffect, useRef, useState } from "react";
import useGaaMotion from "./useGaaMotion";
import {
  GaaHeader, GaaSubBar, GaaFooter, SubHero, GlanceCard, Split, Ledger, CtaBand, FaqList, Ring, useLink,
} from "./GaaShell";
import { PRACTICES, getPractice } from "../../data/gaaContent";
import { TEAM_MEMBERS } from "../../data/teamData";

const ANCHORS = [
  ["overview", "Overview"],
  ["services", "What's included"],
  ["process", "Process"],
  ["faq", "FAQs"],
];

export default function GaaPracticeDetailPage({ slug, onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  const p = getPractice(slug) || PRACTICES[0];
  useGaaMotion(ref, `${p.navName} | GAA Consulting`);

  const [cur, setCur] = useState("overview");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCur(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ANCHORS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
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
      <GaaSubBar link={link} crumbs={[["practices", "Services"], [null, p.navName]]} />
      <main>
        <SubHero
          tag={p.navName}
          lines={p.hero}
          em={p.heroEm}
          sub={p.lede}
          actions={
            <>
              <a className="btn o" {...link("@contact", { intent: p.intent })}>
                Talk to a Partner <span className="ar">→</span>
              </a>
              <a className="btn g" href="#services" onClick={jump("services")}>
                What's included
              </a>
            </>
          }
          aside={<GlanceCard head="At a glance" rows={p.glance} note="Every file is reviewed by a senior partner before it is filed or shared." />}
          ticker={p.chips}
        />

        <nav className="anav" aria-label="On this page">
          <div className="w">
            {ANCHORS.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={jump(id)} aria-current={cur === id ? "true" : undefined}>
                {label}
              </a>
            ))}
            <a className="anav-cta" {...link("@contact", { intent: p.intent })}>Book a Consultation</a>
          </div>
        </nav>

        <section className="s ov" id="overview">
          <div className="w">
            <p className="statement">{p.overview[0]}</p>
            <div className="ov-g">
              <p className="ov-t">{p.overview[1]}</p>
              <div className="ov-who">
                <h3>Who we advise</h3>
                <ul>{p.audience.map((a) => <li key={a}>{a}</li>)}</ul>
              </div>
              {lead && (
                <a className="ov-lead" {...link("people")}>
                  <img src={lead.image} alt="" loading="lazy" />
                  <span>
                    <small>Your partner</small>
                    <b>{lead.name}</b>
                    <span>{lead.role}</span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </section>

        <Split
          id="services"
          alt
          title={<>What's <em>included.</em></>}
          p="Every engagement is scoped to your company, so you only pay for what you need."
          actions={<a className="btn" {...link("@contact", { intent: p.intent })}>Get a fixed quote <span className="ar">→</span></a>}
        >
          <dl className="svl">
            {p.services.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </Split>

        <section className="s" id="process">
          <div className="w">
            <div className="shd">
              <h2>How the work <em>moves.</em></h2>
              <p>Four stages, one partner accountable from the first call to the final filing.</p>
            </div>
            <ol className="trk draw">
              {p.process.map(([t, d], i) => (
                <li key={t}>
                  <span className="trk-n">{i + 1}</span>
                  <b>{t}</b>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Split
          id="faq"
          alt
          title={<>Questions clients <em>ask first.</em></>}
          p="For advice on your own facts, book a confidential call with a partner."
          actions={<a className="btn" {...link("how-we-work")}>How we work <span className="ar">→</span></a>}
        >
          <FaqList items={p.faqs} />
        </Split>

        <section className="s" id="related">
          <div className="w">
            <div className="shd">
              <h2>Often paired <em>with this.</em></h2>
            </div>
            <Ledger
              link={link}
              items={p.related.map((s) => {
                const r = getPractice(s);
                return { key: s, to: `practices/${s}`, title: r.navName, desc: r.summary };
              })}
            />
            <a className="nextp" {...link(`practices/${next.slug}`)}>
              <span>Next service</span>
              <b>{next.navName}</b>
              <i aria-hidden="true">→</i>
            </a>
          </div>
        </section>

        <CtaBand
          link={link}
          intent={p.intent}
          title="Discuss your matter with"
          em="a partner."
          p="Every conversation is covered by a mutual NDA. You get a written scope, timeline and fixed fee within 48 hours."
        />
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}

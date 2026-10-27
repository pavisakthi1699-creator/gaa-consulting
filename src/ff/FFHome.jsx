// Filings First home page ("Filings First" mockup).
import React, { useEffect, useState } from "react";
import { Link } from "../site/router.jsx";
import { FFPage, ContactForm, Faq, svcHref, jump } from "./FFLayout.jsx";
import { HOME, SERVICES, FF_CONTACT } from "./ffData.js";

const NAV = [["ff-packages", "Packages"], ["ff-process", "Process"], ["ff-faqs", "FAQs"], ["ff-insights", "Insights"]];

// Live-looking compliance calendar: one filing after another moves from scheduled to filed.
function Calendar() {
  const rows = HOME.calendar.rows;
  const [done, setDone] = useState(1);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setDone((d) => (d >= rows.length ? 1 : d + 1)), 2200);
    return () => clearInterval(t);
  }, [rows.length]);
  return (
    <div className="ff-cal-w">
      <span aria-hidden="true"></span>
      <div className="ff-cal" aria-label="Example compliance calendar">
        <div className="ff-cal-h">
          <div>
            <small>Compliance calendar</small>
            <b>{HOME.calendar.month}</b>
          </div>
          <div className="ff-cal-p">
            {Math.min(done, rows.length)} of {rows.length} filed
            <span className="ff-bar"><i style={{ width: `${(Math.min(done, rows.length) / rows.length) * 100}%` }}></i></span>
          </div>
        </div>
        <div>
          {rows.map(([d, t, s], i) => {
            const st = i < done ? "done" : i === done ? "now" : "";
            return (
              <div key={d} className={`ff-cal-r ${st}`}>
                <span className="ff-cal-d">{d}</span>
                <div><b>{t}</b><span>{s}</span></div>
                <span className="ff-st">{st === "done" ? "✓ Filed" : st === "now" ? "In progress" : "Scheduled"}</span>
              </div>
            );
          })}
        </div>
        <div className="ff-cal-n">{HOME.calendar.note}</div>
      </div>
    </div>
  );
}

function Services() {
  const [open, setOpen] = useState(0);
  return (
    <div className="ff-svc">
      {SERVICES.map((s, i) => (
        <div key={s.slug} className={`ff-svc-row${open === i ? " open" : ""}`} onMouseEnter={() => setOpen(i)}>
          <Link
            to={svcHref(s.slug)}
            onFocus={() => setOpen(i)}
            onClick={(e) => {
              // first tap on touch screens opens the row, second tap opens the page
              if (open !== i) {
                e.preventDefault();
                setOpen(i);
              }
            }}
            aria-expanded={open === i}
          >
            <span className="n">0{i + 1}</span>
            <span className="t">{s.name}</span>
            <span className="d">{s.line}</span>
            <span className="c" aria-hidden="true">→</span>
          </Link>
          <div className="ff-svc-x">
            <div>
              <div>
                {s.items.map(([slug, name]) => (
                  <Link key={slug} to={svcHref(slug)} tabIndex={open === i ? 0 : -1}>
                    <span>{name}</span>
                    <span>→</span>
                  </Link>
                ))}
                <Link to={svcHref(s.slug)} className="all" tabIndex={open === i ? 0 : -1}>
                  <span>All of {s.name}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FFHome() {
  const [withUs, setWithUs] = useState(true);
  const [annual, setAnnual] = useState(false);
  const cards = withUs ? HOME.change.with : HOME.change.without;
  return (
    <FFPage nav={NAV} home pageKey="home">
      {/* Hero */}
      <section id="ff-top" className="ff-w ff-home-hero">
        <div className="ff-home-l">
          <span className="ff-eb">{HOME.eyebrow}</span>
          <h1>
            {HOME.h1[0]}
            <br />
            <span className="ff-acc">{HOME.h1[1]}</span>
          </h1>
          <p className="ff-lead">{HOME.lead}</p>
          <div className="ff-acts">
            <a href="#ff-contact" onClick={jump("ff-contact")} className="ff-btn dark">Talk to an expert <span className="ar">→</span></a>
            <a href="#ff-scope" onClick={jump("ff-scope")} className="ff-btn line">Explore services</a>
          </div>
        </div>
        <Calendar />
      </section>

      {/* Filing marquee */}
      <div className="ff-mq" aria-label={`We handle: ${HOME.marquee.join(", ")}`}>
        <div className="ff-mq-t" aria-hidden="true">
          {[0, 1].map((k) => (
            <div key={k}>
              {HOME.marquee.map((m) => (
                <React.Fragment key={m}>
                  <span>{m}</span>
                  <i></i>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Before & after */}
      <section className="ff-w ff-sec home ff-col">
        <div className="ff-headrow">
          <div className="ff-head" data-ffrv>
            <span className="ff-mono">{HOME.change.eyebrow}</span>
            <h2 className="ff-h2 lg">{HOME.change.h2}</h2>
          </div>
          <div className="ff-toggle" role="group" aria-label="Compare">
            <button type="button" aria-pressed={!withUs} onClick={() => setWithUs(false)}>Without us</button>
            <button type="button" aria-pressed={withUs} onClick={() => setWithUs(true)}>With Filings First</button>
          </div>
        </div>
        <div className="ff-grid ff-g280" data-ffrv>
          {cards.map(([t, d], i) => (
            <div key={i} className={`ff-ch${withUs ? "" : " off"}`} style={{ "--d": `${i * 0.05}s` }}>
              <i>{withUs ? "✓" : "!"}</i>
              <b>{t}</b>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="ff-scope" className="ff-dark">
        <div className="ff-w ff-sec home ff-col">
          <div className="ff-headrow">
            <div className="ff-head" data-ffrv>
              <span className="ff-mono">Services</span>
              <h2 className="ff-h2 lg">Five services. One team.</h2>
            </div>
            <span style={{ fontSize: 15, color: "#A39C94" }}>Hover or tap a service to see what's inside.</span>
          </div>
          <Services />
        </div>
      </section>

      {/* Packages */}
      <section id="ff-packages" className="ff-w ff-sec home ff-col">
        <div className="ff-headrow">
          <div className="ff-head" data-ffrv>
            <span className="ff-mono">{HOME.packages.eyebrow}</span>
            <h2 className="ff-h2 lg">{HOME.packages.h2}</h2>
          </div>
          <div className="ff-toggle light" role="group" aria-label="Billing">
            <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
            <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>Annual</button>
          </div>
        </div>
        <div className="ff-grid ff-g280" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,290px),1fr))", alignItems: "stretch" }} data-ffrv>
          {HOME.packages.tiers.map((t) => (
            <div key={t.name} className={`ff-tier${t.top ? " top" : ""}`}>
              <div className="ff-tier-h">
                <small>{t.tier}</small>
                {t.top && <em>Most chosen</em>}
              </div>
              <div className="ff-tier-n"><b>{t.name}</b><span>{t.for}</span></div>
              <div className="ff-price"><b>₹ X,XXX</b><span>{annual ? "/ year" : "/ month"}</span></div>
              <div className="ff-list">
                {t.items.map((x) => <div key={x}><span className="ff-tick">✓</span>{x}</div>)}
              </div>
              <div className="ff-limit">{t.limit}</div>
              <a href="#ff-contact" onClick={jump("ff-contact")} className="ff-plan-cta">{t.cta} →</a>
            </div>
          ))}
        </div>
        <span className="ff-fine">{HOME.packages.note}</span>
      </section>

      {/* Process */}
      <section id="ff-process" className="ff-paper">
        <div className="ff-w ff-sec home ff-col" style={{ gap: "clamp(32px,4vw,52px)" }}>
          <div className="ff-head" data-ffrv>
            <span className="ff-mono">{HOME.process.eyebrow}</span>
            <h2 className="ff-h2 lg">{HOME.process.h2}</h2>
          </div>
          <div className="ff-proc" data-ffrv>
            <i aria-hidden="true"></i>
            {HOME.process.steps.map(([when, t, d], k) => (
              <div key={t}>
                <span className="ff-proc-n">0{k + 1}</span>
                <small>{when}</small>
                <b>{t}</b>
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusions & terms */}
      <section className="ff-w ff-sec home ff-terms">
        <div data-ffrv>
          <span className="ff-mono">{HOME.terms.eyebrow}</span>
          <h2 className="ff-h2">{HOME.terms.h2}</h2>
        </div>
        <div className="ff-terms-g" data-ffrv>
          <div>
            <b>Not included</b>
            {HOME.terms.excluded.map((x) => <div key={x}><i>×</i><span>{x}</span></div>)}
          </div>
          <div>
            <b>Engagement terms</b>
            {HOME.terms.terms.map((x) => <div key={x}><i className="dash">–</i><span>{x}</span></div>)}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="ff-faqs" className="ff-paper">
        <div className="ff-w ff-sec home ff-faq">
          <div data-ffrv>
            <span className="ff-mono">{HOME.faqs.eyebrow}</span>
            <h2 className="ff-h2 lg">{HOME.faqs.h2}</h2>
          </div>
          <div className="ff-hfaq">
            <Faq items={HOME.faqs.items} variant="card" />
          </div>
        </div>
      </section>

      {/* Insights */}
      <section id="ff-insights" className="ff-w ff-sec home ff-col">
        <div className="ff-headrow">
          <div className="ff-head" data-ffrv>
            <span className="ff-mono">{HOME.insights.eyebrow}</span>
            <h2 className="ff-h2 lg">{HOME.insights.h2}</h2>
          </div>
          {/* TODO(client): link to the blog when it exists */}
          <a href="#ff-insights" className="ff-all">View all articles →</a>
        </div>
        <div className="ff-posts" data-ffrv>
          {HOME.insights.posts.map(([cat, read, title]) => (
            <a key={title} href="#ff-insights" className="ff-post">
              <div><span>{cat}</span><span>{read}</span></div>
              <b>{title}</b>
              <span>Read article →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="ff-contact" className="ff-dark">
        <div className="ff-w ff-contact">
          <div data-ffrv>
            <span className="ff-mono">{HOME.contact.eyebrow}</span>
            <h2>
              {HOME.contact.h2[0]} <span>{HOME.contact.h2[1]}</span>
            </h2>
            <div className="ff-cinfo">
              <div><small>Office</small><span>{FF_CONTACT.office}</span></div>
              <div><small>Email</small><a href={`mailto:${FF_CONTACT.email}`}>{FF_CONTACT.email}</a></div>
              <div><small>Phone</small><a href={`tel:${FF_CONTACT.phone.replace(/\s/g, "")}`}>{FF_CONTACT.phone}</a></div>
            </div>
          </div>
          <ContactForm topics={HOME.contact.topics} />
        </div>
      </section>
    </FFPage>
  );
}

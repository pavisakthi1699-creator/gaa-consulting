import React, { useState } from "react";
import { GAA_NAV, GAA_FOOTER_LINKS } from "../../data/gaaContent";

/* Build an href + click handler for internal links.
   `to` is either a GAA sub path ("practices", "practices/fdi-fema", "" for GAA home)
   or a group page prefixed with "@" ("@home", "@contact", "@about", "@filings-first"). */
export function useLink(onNavigate) {
  return (to, extra = {}) => {
    const group = to.startsWith("@");
    const page = group ? to.slice(1) : to ? `gaa-consulting/${to}` : "gaa-consulting";
    const href =
      page === "home" ? "#/" : page === "contact" ? "#/contact?brand=gaa" : `#/${page}`;
    return {
      href,
      onClick: (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        if (onNavigate) onNavigate(page, extra.intent || null);
        else window.location.hash = href;
      },
    };
  };
}

export function GaaHeader({ link, active }) {
  return (
    <>
      <div id="pg"></div>
      <header id="hdr">
        <div className="hd">
          <a {...link("")} aria-label="GAA Consulting home">
            <img src="/gaa-consulting-logo.png" alt="GAA Consulting" />
          </a>
          <nav aria-label="Main">
            <a {...link("@home")}>Group Portal</a>
            {GAA_NAV.map(([to, label]) => (
              <a key={to} {...link(to)} aria-current={active === to ? "page" : undefined}>
                {label}
              </a>
            ))}
          </nav>
          <a className="book" {...link("@contact")}>
            Book Consultation →
          </a>
        </div>
      </header>
    </>
  );
}

/* Strip under the header: back link + breadcrumb trail + practice pill */
export function GaaSubBar({ link, crumbs = [] }) {
  return (
    <div className="sbar">
      <div className="w">
        <a className="back" {...link("")}>
          <span>←</span>
          <span>GAA Consulting Home</span>
        </a>
        <div className="sbr">
          <nav className="crumbs gm" aria-label="Breadcrumb">
            <a {...link("@home")}>Group</a>
            <i>/</i>
            <a {...link("")}>GAA Consulting</a>
            {crumbs.map(([to, label], k) => (
              <React.Fragment key={label}>
                <i>/</i>
                {k === crumbs.length - 1 || to == null ? (
                  <span aria-current="page">{label}</span>
                ) : (
                  <a {...link(to)}>{label}</a>
                )}
              </React.Fragment>
            ))}
          </nav>
          <span className="bpill">
            <i></i>GAA Consulting Practice
          </span>
        </div>
      </div>
    </div>
  );
}

export function GaaFooter({ link }) {
  return (
    <footer>
      <div className="ft ft-gaa">
        <nav aria-label="GAA Consulting">
          {GAA_FOOTER_LINKS.map(([to, label]) => (
            <a key={to} {...link(to)}>
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="ft">
        <img src="/gaa-consulting-logo.png" alt="GAA Consulting" />
        <div>
          <a data-site="gaa" {...link("")}>GAA Consulting</a>
          <span style={{ color: "var(--m)", cursor: "default", userSelect: "none" }}>Filings First</span>
          <span style={{ color: "var(--m)", cursor: "default", userSelect: "none" }}>Hirings First</span>
          <a {...link("@about")}>About us</a>
          <a {...link("@contact")}>Contact us</a>
        </div>
        <span>© 2026 · All rights reserved</span>
      </div>
    </footer>
  );
}

/* Hero headline with the same line-mask + hover-skew words as the home hero.
   lines: ["Board-ready", "compliance,", "every quarter."], em: indexes rendered in orange italic */
export function HeroTitle({ lines, em = [] }) {
  return (
    <h1 aria-label={lines.join(" ")}>
      {lines.map((ln, i) => {
        const words = ln.split(" ").map((w, k) => (
          <React.Fragment key={k}>
            {k > 0 && " "}
            <span className="hw">{w}</span>
          </React.Fragment>
        ));
        return (
          <span className="ln" key={i} aria-hidden="true">
            <span>{em.includes(i) ? <em>{words}</em> : words}</span>
          </span>
        );
      })}
    </h1>
  );
}

/* Shorter version of the home hero for inner pages */
export function SubHero({ tag, lines, em, sub, actions, aside, ticker }) {
  return (
    <section className="hero6 hsub" id="top">
      <span className="sect" aria-hidden="true">§</span>
      <div className="w h6main">
        <div>
          <span className="tag6 e3" style={{ "--t": ".05s" }}>{tag}</span>
          <HeroTitle lines={lines} em={em} />
          <p className="sub6 e3" style={{ "--t": ".55s" }}>{sub}</p>
          {actions && <div className="acts e3" style={{ "--t": ".7s" }}>{actions}</div>}
        </div>
        {aside && <div className="stackc e3" style={{ "--t": ".4s" }}>
          <div className="lyr l3"></div>
          <div className="lyr l2"></div>
          <div className="front">{aside}</div>
        </div>}
      </div>
      {ticker && (
        <div className="tk" aria-hidden="true">
          <div>
            {[0, 1, 2, 3].flatMap((r) =>
              ticker.map((t, k) => (
                <React.Fragment key={`${r}-${k}`}>
                  <span>{t}</span>
                  <span className="s">✦</span>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* "At a glance" list inside the hero stack card */
export function GlanceCard({ head = "At a glance", note, rows }) {
  return (
    <>
      <div className="fh">
        <span>{head}</span>
        <span>GAA Consulting</span>
      </div>
      <dl className="gl">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="fnote">{note}</p>}
    </>
  );
}

export function SectionHead({ eb, children, p }) {
  return (
    <div className="head6">
      <span className="gm eb">{eb}</span>
      <h2 style={{ marginTop: "14px" }}>{children}</h2>
      {p && <p>{p}</p>}
    </div>
  );
}

export function CtaBand({ link, eb = "Next step", title, em, p, intent }) {
  return (
    <section className="s band">
      <span className="orb"></span>
      <span className="orb"></span>
      <div className="w">
        <span className="gm eb">{eb}</span>
        <h2 style={{ marginTop: "16px" }}>
          {title} <em>{em}</em>
        </h2>
        <p>{p}</p>
        <div className="acts">
          <a className="btn o" {...link("@contact", { intent })}>
            Schedule Partner Briefing <span className="ar">→</span>
          </a>
          <a className="btn g" {...link("practices")}>
            Explore Practice Areas
          </a>
        </div>
      </div>
    </section>
  );
}

export function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        const id = `faq-${i}-${q.length}`;
        return (
          <div className="faq-i" key={q}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <i className="gm">{String(i + 1).padStart(2, "0")}</i>
              <b>{q}</b>
              <span className="pm" aria-hidden="true">+</span>
            </button>
            <div className="fa" id={id} role="region">
              <div>
                <p>{a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Ring() {
  return <div id="ring" aria-hidden="true"></div>;
}

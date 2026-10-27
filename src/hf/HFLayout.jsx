// Hirings First: header (Talent & services mega menu + Group dropdown), footer, contact form and
// shared bands. Built from the "Hirings First Site" mockups (v2).
import React, { useEffect, useRef, useState } from "react";
import { Link, navigate } from "../site/router.jsx";
import { href, SITES } from "../site/sites.js";
import { GroupMenu, GroupLinks } from "../site/GroupMenu.jsx";
import { CATS, SVCS, HF_CONTACT, ROTATE } from "./hfData.js";

export const hfHref = (path = "/") => href("hf", path);
export const catHref = (slug) => hfHref(`/talent/${slug}`);
export const svcHref = (slug) => hfHref(`/services/${slug}`);
const logo = SITES.hf.logo;
// Every site's menu starts with Home and About us of GAA Consulting (the GAA Group home)
const GROUP_HOME = href("gaa", "/");
const GROUP_ABOUT = href("gaa", "/about");

/** Link to a home page section: scrolls when already on the home page, otherwise opens it there. */
export function useSection(home) {
  return (id, after) => ({
    href: home ? `#${id}` : `${hfHref("/")}#${id}`,
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      after && after();
      const el = home && document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else navigate(`${hfHref("/")}#${id}`);
    },
  });
}

/** Scroll reveal for [data-hfrv] blocks. */
export function useReveal(key) {
  useEffect(() => {
    const scan = () => [...document.querySelectorAll(".hfx [data-hfrv]:not(.hf-in)")];
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scan().forEach((e) => e.classList.add("hf-in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("hf-in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    const obs = () => scan().forEach((e) => io.observe(e));
    obs();
    const t1 = setTimeout(obs, 600), t2 = setTimeout(obs, 1800);
    return () => {
      io.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [key]);
}

function Header({ home }) {
  const [hide, setHide] = useState(false);
  const [mega, setMega] = useState(false);
  const [mob, setMob] = useState(false);
  const last = useRef(0);
  const t = useRef(0);
  const sec = useSection(home);

  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      if (y < 80 || y < last.current - 4) setHide(false);
      else if (y > last.current + 4) {
        setHide(true);
        setMega(false);
      }
      last.current = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    const key = (e) => {
      if (e.key === "Escape") {
        setMega(false);
        setMob(false);
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("scroll", on);
      document.removeEventListener("keydown", key);
    };
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("hf-lock", mob);
    return () => document.documentElement.classList.remove("hf-lock");
  }, [mob]);

  const open = () => {
    clearTimeout(t.current);
    setMega(true);
  };
  const close = () => {
    t.current = setTimeout(() => setMega(false), 150);
  };
  const shut = () => {
    setMob(false);
    setMega(false);
  };

  return (
    <header className={`hf-hdr${hide && !mob && !mega ? " hide" : ""}`} onMouseLeave={close}>
      <div className="hf-topbar">
        <div className="hf-topbar-in">
          <span className="hf-mono">A GAA Group company</span>
          <nav aria-label="Group companies">
            <Link to={href("ga", "/")}>GAA Associates</Link>
            <Link to={href("ff", "/")}>Filings First</Link>
            <Link to={hfHref("/")} aria-current="page" className="here"><i aria-hidden="true" />Hirings First</Link>
          </nav>
        </div>
      </div>
      <div className="hf-bar">
        <Link to={hfHref("/")} className="hf-brand" aria-label="Hirings First home" onClick={shut}>
          <img src={logo} alt="" />
          <span>Hirings <em>First</em></span>
        </Link>
        <nav className="hf-nav" aria-label="Main">
          <Link to={GROUP_HOME} onMouseEnter={close}>Home</Link>
          <Link to={GROUP_ABOUT} onMouseEnter={close}>About us</Link>
          <span className="hf-mega-wrap" onMouseEnter={open}>
            <button type="button" className={`hf-mega-btn${mega ? " on" : ""}`} aria-expanded={mega} aria-controls="hf-mega" onClick={() => setMega((v) => !v)}>
              Talent &amp; services <i aria-hidden="true">▾</i>
            </button>
          </span>
          <a {...sec("hf-pool")} onMouseEnter={close}>Talent pool</a>
          <a {...sec("hf-process")} onMouseEnter={close}>How it works</a>
          <a {...sec("hf-contact")} onMouseEnter={close}>Contact</a>
          <span onMouseEnter={close} style={{ display: "flex" }}>
            <GroupMenu current="hf" />
          </span>
        </nav>
        <a className="hf-cta" {...sec("hf-contact", shut)}>Hire Talent →</a>
        <button type="button" className="hf-burger" aria-label={mob ? "Close menu" : "Open menu"} aria-expanded={mob} aria-controls="hf-mob" onClick={() => setMob((v) => !v)}>
          {mob ? "✕" : "☰"}
        </button>
      </div>

      <div className="hf-mega" id="hf-mega" data-open={mega} onMouseEnter={open} onMouseLeave={close}>
        <div className="hf-mega-in">
          <div className="hf-mega-l">
            <span className="hf-mono hf-mega-k">Talent by function</span>
            <div className="hf-mega-grid">
              {CATS.map((c, i) => (
                <Link key={c.slug} to={catHref(c.slug)} className="hf-mega-item" onClick={shut}>
                  <span className="hf-mega-n">0{i + 1}</span>
                  <b>{c.name}</b>
                </Link>
              ))}
            </div>
          </div>
          <div className="hf-mega-r">
            <span className="hf-mono hf-mega-k">Services</span>
            {SVCS.map((s) => (
              <Link key={s.slug} to={svcHref(s.slug)} className="hf-mega-svc" onClick={shut}>
                <span>{s.name}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="hf-mob" id="hf-mob" data-open={mob}>
        <Link className="hf-mob-a" to={GROUP_HOME} onClick={shut}>Home</Link>
        <Link className="hf-mob-a" to={GROUP_ABOUT} onClick={shut}>About us</Link>
        <span className="hf-mono hf-mob-k">Talent categories</span>
        {CATS.map((c) => (
          <Link key={c.slug} to={catHref(c.slug)} className="hf-mob-cat" onClick={shut}>
            <span>{c.name}</span>
            <span className="o">→</span>
          </Link>
        ))}
        <span className="hf-mono hf-mob-k">Services</span>
        {SVCS.map((s) => (
          <Link key={s.slug} to={svcHref(s.slug)} className="hf-mob-cat" onClick={shut}>
            <span>{s.name}</span>
            <span className="o">→</span>
          </Link>
        ))}
        <a className="hf-mob-a" {...sec("hf-pool", shut)}>Talent pool</a>
        <a className="hf-mob-a" {...sec("hf-process", shut)}>How it works</a>
        <a className="hf-mob-a last" {...sec("hf-contact", shut)}>Contact</a>
        <GroupLinks current="hf" onPick={shut} />
        <a className="hf-mob-cta" {...sec("hf-contact", shut)}>Hire Talent →</a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="hf-foot">
      <div className="hf-foot-in">
        <div className="hf-foot-top">
          <div className="hf-foot-brand">
            <div>
              <span className="lg"><img src={logo} alt="Hirings First" /></span>
              <span className="nm">Hirings <em>First</em></span>
            </div>
            <p>Talent acquisition and workforce solutions. Part of the GAA Group.</p>
          </div>
          <nav className="hf-foot-col" aria-label="Talent">
            <span className="hf-mono">Talent</span>
            {CATS.map((c) => <Link key={c.slug} to={catHref(c.slug)}>{c.name}</Link>)}
          </nav>
          <nav className="hf-foot-col" aria-label="Services">
            <span className="hf-mono">Services</span>
            {SVCS.map((s) => <Link key={s.slug} to={svcHref(s.slug)}>{s.name}</Link>)}
          </nav>
          <nav className="hf-foot-col" aria-label="Group companies">
            <span className="hf-mono">Group companies</span>
            <Link to={href("ga", "/")}>GAA Associates</Link>
            <Link to={href("ff", "/")}>Filings First</Link>
            <Link to={hfHref("/")}>Hirings First</Link>
            <Link to={GROUP_ABOUT}>About the group</Link>
          </nav>
          <div className="hf-foot-col">
            <span className="hf-mono">Contact</span>
            <a href={`mailto:${HF_CONTACT.email}`}>{HF_CONTACT.email}</a>
            <a href={`tel:${HF_CONTACT.phone.replace(/\s/g, "")}`}>{HF_CONTACT.phone}</a>
            <span className="dim">{HF_CONTACT.office}</span>
          </div>
        </div>
        <div className="hf-foot-bot">
          <span>© 2026 Hirings First · A GAA Group company</span>
          <nav aria-label="Legal">
            <Link to={href("gaa", "/disclaimer")}>Privacy policy</Link>
            <Link to={href("gaa", "/disclaimer")}>Terms of use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function HFPage({ home = false, pageKey, children }) {
  useReveal(pageKey);
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h) setTimeout(() => document.getElementById(h)?.scrollIntoView(), 80);
  }, [pageKey]);
  return (
    <div className={`hfx${home ? " hf-home" : " hf-sub"}`}>
      <a className="hf-skip" href="#hf-main">Skip to content</a>
      <Header home={home} />
      <main id="hf-main">{children}</main>
      <Footer />
    </div>
  );
}

/* ---------------- "Hiring shouldn't be complicated." band ---------------- */
export function ClosingBand({ home }) {
  const sec = useSection(home);
  return (
    <section className="hf-close">
      <span className="hf-close-hf" aria-hidden="true">HF</span>
      <div className="hf-close-in">
        <h2 data-hfrv="">Hiring shouldn't be complicated.</h2>
        <div className="hf-close-row" data-hfrv="">
          <p>Find the right person. <span>Faster.</span></p>
          <a {...sec("hf-contact")} className="hf-btn orange xl">Start Hiring <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}

/** Switch the contact form to "I'm looking for a job". */
export const asCandidate = () => window.dispatchEvent(new CustomEvent("hf-mode", { detail: 1 }));

/* ---------------- contact section + form (home page) ---------------- */
export function ContactSection() {
  const [mode, setMode] = useState(0);
  const [funcs, setFuncs] = useState([]);
  const [f, setF] = useState({ name: "", org: "", email: "", phone: "", hp: "" });
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const on = (e) => {
      setMode(e.detail);
      setFuncs([]);
      setStatus(null);
    };
    window.addEventListener("hf-mode", on);
    return () => window.removeEventListener("hf-mode", on);
  }, []);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const pick = (m) => {
    setMode(m);
    setFuncs([]);
    setStatus(null);
  };
  const toggle = (l) => setFuncs(funcs.includes(l) ? funcs.filter((x) => x !== l) : [...funcs, l]);

  const submit = (e) => {
    e.preventDefault();
    if (f.hp) return;
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || f.phone.replace(/\D/g, "").length < 8) {
      setStatus({ t: "er", m: "Please enter your name, a valid email and a phone number." });
      return;
    }
    const lines = [
      `Enquiry: ${mode ? "Looking for a job" : "Wants to hire"}`,
      `Name: ${f.name}`,
      `${mode ? "Current role" : "Company"}: ${f.org || "-"}`,
      `Email: ${f.email}`,
      `Phone: ${f.phone}`,
      `${mode ? "Functions" : "Roles hiring for"}: ${funcs.join(", ") || "-"}`,
      `Page: ${window.location.href}`,
    ];
    const subject = mode ? "Join the talent pool" : "Hiring enquiry";
    window.location.href = `mailto:${HF_CONTACT.email}?subject=${encodeURIComponent(`${subject}: ${f.name}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus({ t: "ok", m: `Your email app should open with the details addressed to ${HF_CONTACT.email}. Please press send there.` });
  };
  const sent = status?.t === "ok";

  return (
    <section id="hf-contact" className="hf-contact">
      <div className="hf-contact-in">
        <div className="hf-contact-l" data-hfrv="">
          <span className="hf-eyebrow">Contact</span>
          <h2>Tell us who<br />you <span className="o">need.</span></h2>
          <p>Share the role and we'll come back with a plan, usually the same day.</p>
          <div className="hf-cd">
            <div><span className="hf-mono">Email</span><a href={`mailto:${HF_CONTACT.email}`}>{HF_CONTACT.email}</a></div>
            <div><span className="hf-mono">Phone</span><a href={`tel:${HF_CONTACT.phone.replace(/\s/g, "")}`}>{HF_CONTACT.phone}</a></div>
            <div><span className="hf-mono">Office</span><span>{HF_CONTACT.office}</span></div>
          </div>
        </div>
        <form className="hf-form" onSubmit={submit} noValidate>
          <div role="tablist" aria-label="I am" className="hf-modes">
            {["I want to hire", "I'm looking for a job"].map((l, i) => (
              <button key={l} type="button" role="tab" aria-selected={mode === i} className={mode === i ? "on" : ""} onClick={() => pick(i)}>{l}</button>
            ))}
          </div>
          <div className="hf-frow">
            <label className="hf-fld"><span>Full name</span><input name="name" required autoComplete="name" placeholder="Your name" value={f.name} onChange={set("name")} /></label>
            <label className="hf-fld"><span>{mode ? "Current role" : "Company"}</span><input name="org" placeholder={mode ? "e.g. Accounts Executive" : "Company name"} value={f.org} onChange={set("org")} /></label>
          </div>
          <div className="hf-frow">
            <label className="hf-fld"><span>Email</span><input name="email" type="email" required autoComplete="email" placeholder="name@company.com" value={f.email} onChange={set("email")} /></label>
            <label className="hf-fld"><span>Phone</span><input name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" value={f.phone} onChange={set("phone")} /></label>
          </div>
          <input className="hf-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.hp} onChange={set("hp")} />
          <div className="hf-funcs">
            <span>{mode ? "Functions you work in" : "Roles you are hiring for"}</span>
            <div>
              {ROTATE.map((l) => (
                <button key={l} type="button" aria-pressed={funcs.includes(l)} className={funcs.includes(l) ? "on" : ""} onClick={() => toggle(l)}>{l}</button>
              ))}
            </div>
          </div>
          {status && <div className={`hf-msg ${status.t}`} role="status">{status.m}</div>}
          <button type="submit" className={`hf-submit${sent ? " sent" : ""}`}>
            <span>{sent ? "Thanks, we'll be in touch shortly" : mode ? "Join the talent pool" : "Start hiring"}</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </section>
  );
}

// Filings First: header (mega menu + Group dropdown), footer, forms and shared pieces.
import React, { useEffect, useRef, useState } from "react";
import { Link } from "../site/router.jsx";
import { href, SITES } from "../site/sites.js";
import { GroupMenu, GroupLinks } from "../site/GroupMenu.jsx";
import { SERVICES, FF_CONTACT } from "./ffData.js";
import logo from "./ff-logo.png";

export const ffHref = (path = "/") => href("ff", path);
export const svcHref = (slug) => ffHref(`/services/${slug}`);
const HOME_CONTACT = () => `${ffHref("/")}#ff-contact`;

/** Scroll to an in-page section (ids are prefixed "ff-"). */
export const jump = (id) => (e) => {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth" });
};

function useReveal(key) {
  useEffect(() => {
    const els = [...document.querySelectorAll(".ffx [data-ffrv]:not(.in)")];
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [key]);
}

function Header({ nav, home }) {
  const [hide, setHide] = useState(false);
  const [mega, setMega] = useState(false);
  const [mob, setMob] = useState(false);
  const last = useRef(0);
  const t = useRef(0);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      if (y < 120 || y < last.current - 4) setHide(false);
      else if (y > last.current + 4) setHide(true), setMega(false);
      last.current = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    const key = (e) => e.key === "Escape" && (setMega(false), setMob(false));
    document.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("scroll", on);
      document.removeEventListener("keydown", key);
    };
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("ff-lock", mob);
    return () => document.documentElement.classList.remove("ff-lock");
  }, [mob]);
  const open = () => (clearTimeout(t.current), setMega(true));
  const close = () => (t.current = setTimeout(() => setMega(false), 150));
  const shut = () => (setMob(false), setMega(false));
  const anchor = (id) => (e) => (shut(), jump(id)(e));

  return (
    <header className={`ff-hdr${hide && !mob ? " hide" : ""}`} onMouseLeave={close}>
      <div className="ff-hdr-in">
        <Link to={ffHref("/")} className="ff-brand" onClick={shut}>
          <img src={logo} alt="Filings First" />
          <span>Filings First</span>
        </Link>
        <nav className={`ff-nav${home ? " home" : ""}`} aria-label="Main">
          {/* Home and About us: the GAA Group home (GAA Consulting) */}
          <Link to={href("gaa", "/")} onMouseEnter={close}>Home</Link>
          <Link to={href("gaa", "/about")} onMouseEnter={close}>About us</Link>
          <span style={{ position: "relative", display: "flex", alignItems: "center" }} onMouseEnter={open}>
            <button type="button" className="ff-svc-btn" aria-expanded={mega} aria-controls="ff-mega" onClick={() => setMega((v) => !v)}>
              Services <i>▾</i>
            </button>
          </span>
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={anchor(id)} onMouseEnter={close}>{label}</a>
          ))}
          <span onMouseEnter={close} style={{ display: "flex" }}>
            <GroupMenu current="ff" />
          </span>
        </nav>
        <a href={home ? "#ff-contact" : "#ff-top"} onClick={anchor(home ? "ff-contact" : "ff-top")} className="ff-btn dark sm ff-cta">Talk to an expert</a>
        <button type="button" className="ff-burger" aria-label={mob ? "Close menu" : "Open menu"} aria-expanded={mob} aria-controls="ff-mob" onClick={() => setMob((v) => !v)}>
          {mob ? "✕" : "☰"}
        </button>
      </div>

      <div className="ff-mega" id="ff-mega" data-open={mega} onMouseEnter={open} onMouseLeave={close}>
        <div className="ff-mega-in">
          {SERVICES.map((s, i) => (
            <div className="ff-mega-col" key={s.slug}>
              <Link to={svcHref(s.slug)} className="ff-mega-h" onClick={shut}>
                <small>0{i + 1}</small>
                <b>{s.name} <i>→</i></b>
              </Link>
              {s.items.map(([slug, name]) => (
                <Link key={slug} to={svcHref(slug)} onClick={shut}>{name}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="ff-mega-foot">
          <div>
            <span>Not sure what you need?</span>
            <Link to={HOME_CONTACT()} onClick={shut}>Talk to an expert →</Link>
          </div>
        </div>
      </div>

      <div className="ff-mob" id="ff-mob" data-open={mob}>
        <Link className="anchor" to={href("gaa", "/")} onClick={shut}>Home</Link>
        <Link className="anchor" to={href("gaa", "/about")} onClick={shut}>About us</Link>
        <span className="ff-mono">Services</span>
        {SERVICES.map((s) => (
          <Link key={s.slug} to={svcHref(s.slug)} onClick={shut}>
            {s.name}
            <span>→</span>
          </Link>
        ))}
        {nav.map(([id, label]) => (
          <a key={id} className="anchor" href={`#${id}`} onClick={anchor(id)}>{label}</a>
        ))}
        <GroupLinks current="ff" onPick={shut} />
        <a href={home ? "#ff-contact" : "#ff-top"} onClick={anchor(home ? "ff-contact" : "ff-top")} className="ff-btn dark">Talk to an expert</a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="ff-foot">
      <div className="ff-w ff-foot-top">
        <div className="ff-foot-brand">
          <div>
            <img src={logo} alt="Filings First" />
            <b>Filings First</b>
          </div>
          <p>Accounting, taxation and compliance, part of the GAA Group.</p>
        </div>
        <nav className="ff-foot-col" aria-label="Services">
          <span className="ff-mono">Services</span>
          {SERVICES.map((s) => <Link key={s.slug} to={svcHref(s.slug)}>{s.name}</Link>)}
        </nav>
        <nav className="ff-foot-col" aria-label="Group companies">
          <span className="ff-mono">Group companies</span>
          <Link to={href("gaa", "/")}>GAA Consulting</Link>
          <Link to={href("ga", "/")}>GAA Associates</Link>
          <Link to={ffHref("/")}>Filings First</Link>
          <Link to={href("hf", "/")}>Hirings First</Link>
          <Link to={href("gaa", "/about")}>About the group</Link>
        </nav>
        <div className="ff-foot-col">
          <span className="ff-mono">Contact</span>
          <span>{FF_CONTACT.office}</span>
          <a href={`mailto:${FF_CONTACT.email}`}>{FF_CONTACT.email}</a>
          <a href={`tel:${FF_CONTACT.phone.replace(/\s/g, "")}`}>{FF_CONTACT.phone}</a>
        </div>
      </div>
      <div className="ff-w ff-foot-bot">
        <div>
          <span>© {new Date().getFullYear()} Filings First · A GAA Group company</span>
          <nav aria-label="Legal">
            <Link to={href("gaa", "/disclaimer")}>Privacy policy</Link>
            <Link to={href("gaa", "/disclaimer")}>Terms of use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function FFPage({ nav, home = false, pageKey, children }) {
  useReveal(pageKey);
  return (
    <div className="ffx">
      <a className="ff-skip" href="#ff-main">Skip to content</a>
      <Header nav={nav} home={home} />
      <main id="ff-main">{children}</main>
      <Footer />
    </div>
  );
}

/* ---------------- forms ---------------- */
function send(payload, setStatus) {
  const to = SITES.ff.email;
  const body = Object.entries(payload).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  window.location.href = `mailto:${to}?subject=${encodeURIComponent("Callback request: " + (payload.Service || "Filings First"))}&body=${encodeURIComponent(body)}`;
  setStatus({ t: "ok", m: `Thank you. Your email app should open with the request addressed to ${to}. We call back within 1 working day.` });
}

const TYPES = ["Proprietorship", "Partnership / LLP", "Company", "Other"];

/** Callback form beside the hero on every service page. */
export function HeroForm({ title, service }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", hp: "" });
  const [type, setType] = useState(TYPES[0]);
  const [status, setStatus] = useState(null);
  const on = (e) => setF((p) => ({ ...p, [e.target.name]: e.target.value }));
  const [lead, rest] = title.startsWith("Talk to ") ? ["Talk to", title.slice(8)] : ["", title];
  const submit = (e) => {
    e.preventDefault();
    if (f.hp) return;
    if (!f.name.trim() || f.phone.replace(/\D/g, "").length < 10) return setStatus({ t: "er", m: "Please add your name and a 10-digit phone number." });
    send({ Service: service, Name: f.name, Phone: "+91 " + f.phone, Email: f.email, "Business type": type, Page: window.location.href }, setStatus);
  };
  return (
    <form className="ff-form ff-formcard" onSubmit={submit} noValidate>
      <div className="ff-form-h">
        <div>
          <b>{lead} {rest}</b>
          <small>Free consultation · No obligation</small>
        </div>
        <span className="ff-online"><i></i>Online</span>
      </div>
      <div className="ff-fields">
        <label className="ff-field"><span>Full name</span><input name="name" value={f.name} onChange={on} placeholder="Your name" autoComplete="name" /></label>
        <label className="ff-field">
          <span>Phone</span>
          <span className="ff-phone"><b>+91</b><input name="phone" type="tel" value={f.phone} onChange={on} placeholder="98765 43210" autoComplete="tel-national" /></span>
        </label>
        <label className="ff-field"><span>Email <em>(optional)</em></span><input name="email" type="email" value={f.email} onChange={on} placeholder="name@company.com" autoComplete="email" /></label>
      </div>
      <div className="ff-pick">
        <span>Business type</span>
        <div className="ff-radios">
          {TYPES.map((x) => (
            <button key={x} type="button" className="ff-radio" aria-pressed={type === x} onClick={() => setType(x)}><i></i>{x}</button>
          ))}
        </div>
      </div>
      <input className="ff-hp" name="hp" value={f.hp} onChange={on} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="ff-submit"><span>Request a callback</span><i>→</i></button>
      <div className="ff-assure">
        <span><b>✓</b>Callback within 1 working day</span>
        <span><b>✓</b>Your details stay private</span>
      </div>
      {status && <p className={`ff-status ${status.t}`} role="status">{status.m}</p>}
    </form>
  );
}

/** "Talk to an expert" form in the home contact section. */
export function ContactForm({ topics }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", hp: "" });
  const [pick, setPick] = useState([]);
  const [status, setStatus] = useState(null);
  const on = (e) => setF((p) => ({ ...p, [e.target.name]: e.target.value }));
  const toggle = (x) => setPick((p) => (p.includes(x) ? p.filter((y) => y !== x) : [...p, x]));
  const submit = (e) => {
    e.preventDefault();
    if (f.hp) return;
    if (!f.name.trim() || f.phone.replace(/\D/g, "").length < 10) return setStatus({ t: "er", m: "Please add your name and a 10-digit phone number." });
    send({ Service: pick.join(", ") || "General", Name: f.name, Phone: "+91 " + f.phone, Email: f.email, Page: window.location.href }, setStatus);
  };
  return (
    <form className="ff-form" onSubmit={submit} noValidate>
      <div className="ff-form-t">
        <b>Talk to an expert</b>
        <small>Free consultation · No obligation</small>
      </div>
      <div className="ff-fields ff-fgrid">
        <label className="ff-field"><span>Full name</span><input name="name" value={f.name} onChange={on} placeholder="Your name" autoComplete="name" /></label>
        <label className="ff-field">
          <span>Phone</span>
          <span className="ff-phone"><b>+91</b><input name="phone" type="tel" value={f.phone} onChange={on} placeholder="98765 43210" autoComplete="tel-national" /></span>
        </label>
        <label className="ff-field"><span>Work email</span><input name="email" type="email" value={f.email} onChange={on} placeholder="name@company.com" autoComplete="email" /></label>
      </div>
      <div className="ff-pick">
        <span>I need help with</span>
        <div className="ff-chips">
          {topics.map((x) => <button key={x} type="button" className="ff-chip" aria-pressed={pick.includes(x)} onClick={() => toggle(x)}>{x}</button>)}
        </div>
      </div>
      <input className="ff-hp" name="hp" value={f.hp} onChange={on} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="ff-submit"><span>Request a callback</span><i>→</i></button>
      {status && <p className={`ff-status ${status.t}`} role="status">{status.m}</p>}
    </form>
  );
}

/** Accordion. variant "line" (service pages) or "card" (home). First item open, like the mockups. */
export function Faq({ items, variant = "line" }) {
  const [open, setOpen] = useState(0);
  const cls = variant === "card" ? "ff-hqa" : "ff-qa";
  return items.map(([q, a], i) => (
    <div key={i} className={`${cls}${open === i ? " open" : ""}`}>
      <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
        <span>{q}</span>
        <i aria-hidden="true">+</i>
      </button>
      <div className="ff-qa-a"><div><p>{a}</p></div></div>
    </div>
  ));
}

// "Group" dropdown shown at the end of every site's main menu:
// Filings First, Hirings First, GAA Consulting. Opens on hover, click or keyboard.
import React, { useEffect, useRef, useState } from "react";
import { SITES, GROUP_ORDER, href } from "./sites.js";
import { Link } from "./router.jsx";
import "./group-menu.css";

export function GroupMenu({ current, label = "Group", onPick, btnClass = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const t = useRef(0);
  useEffect(() => {
    const down = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const key = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, []);
  const enter = () => {
    clearTimeout(t.current);
    setOpen(true);
  };
  const leave = () => {
    t.current = setTimeout(() => setOpen(false), 150);
  };
  return (
    <div className="grpdd" ref={ref} onMouseEnter={enter} onMouseLeave={leave}>
      <button type="button" className={`grpdd-btn ${btnClass}`} aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)}>
        {label}
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" /></svg>
      </button>
      <div className="grpdd-panel" data-open={open}>
        <span className="grpdd-k">GAA Group companies</span>
        {GROUP_ORDER.map((k) => {
          const s = SITES[k];
          return (
            <Link
              key={k}
              to={href(k, "/")}
              className={`grpdd-item${k === current ? " here" : ""}`}
              data-here={k === current ? "" : undefined}
              onClick={() => {
                setOpen(false);
                onPick && onPick();
              }}
            >
              <span className="grpdd-logo"><img src={s.logo} alt="" /></span>
              <span className="grpdd-tx">
                <b>{s.name}</b>
                <small>{s.line}</small>
              </span>
              {k === current ? <em>You are here</em> : <i aria-hidden="true">→</i>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/** Plain list for mobile menus. */
export function GroupLinks({ current, onPick, tabIndex }) {
  return (
    <div className="grpdd-m">
      <span className="grpdd-k">Group</span>
      {GROUP_ORDER.map((k) => (
        <Link key={k} to={href(k, "/")} className={`grpdd-mi${k === current ? " here" : ""}`} onClick={onPick} tabIndex={tabIndex}>
          <span className="grpdd-logo"><img src={SITES[k].logo} alt="" /></span>
          <b>{SITES[k].name}</b>
          {k === current ? <em>You are here</em> : <i aria-hidden="true">→</i>}
        </Link>
      ))}
    </div>
  );
}

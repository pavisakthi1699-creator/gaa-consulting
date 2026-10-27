import React, { useEffect, useRef } from "react";
import "./GaaConsultingPage.css";
import { GaaHeader, GaaFooter, useLink } from "./gaa/GaaShell";
import { gaaPath, go } from "../site/gaaPaths.js";

export default function GaaConsultingPage({ onNavigate }) {
  const containerRef = useRef(null);
  const link = useLink(onNavigate);

  const navigateTo = (page, section = null) => go(gaaPath(section ? `${page}#${section}` : page));

  const scrollToSection = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const root = containerRef.current || document;
    const RM = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (RM) document.documentElement.classList.add("rm");

    const cl = (x) => Math.min(1, Math.max(0, x));

    // Set page title matching ref_GAA_Consulting.html exactly
    window.scrollTo({ top: 0, behavior: "instant" });

    // 1. Ready class on body
    const readyTimer = setTimeout(() => document.body.classList.add("ready"), 80);

    // 2. Split headings into masked words
    function splitWords(el) {
      const out = (n) => {
        [...n.childNodes].forEach((c) => {
          if (c.nodeType === 3) {
            const f = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach((t) => {
              if (!t) return;
              if (/^\s+$/.test(t)) {
                f.appendChild(document.createTextNode(" "));
                return;
              }
              const w = document.createElement("span");
              w.className = "wd";
              const i = document.createElement("i");
              i.textContent = t;
              w.appendChild(i);
              f.appendChild(w);
            });
            c.replaceWith(f);
          } else if (c.nodeType === 1) out(c);
        });
      };
      out(el);
      el.querySelectorAll(".wd>i").forEach((i, k) => {
        i.style.transitionDelay = Math.min(k, 12) * 55 + "ms";
      });
    }

    const headings = root.querySelectorAll("h2");
    headings.forEach((h) => {
      h.classList.add("sp");
      splitWords(h);
    });

    // 3. Reveal elements
    root
      .querySelectorAll(".card,.rows>div,.links a,.route,.tx>*,.side>*,.det>*")
      .forEach((e) => {
        e.classList.add("rv");
      });

    const io =
      "IntersectionObserver" in window && !RM
        ? new IntersectionObserver(
            (es) =>
              es.forEach((x) => {
                if (x.isIntersecting) {
                  x.target.classList.add("in");
                  io.unobserve(x.target);
                }
              }),
            { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
          )
        : null;

    root.querySelectorAll(".rv,.sp").forEach((e) => {
      if (io) {
        if (e.parentNode) {
          const sib = [...e.parentNode.children].filter((c) =>
            c.classList.contains("rv")
          );
          e.style.transitionDelay = Math.min(sib.indexOf(e), 5) * 90 + "ms";
        }
        io.observe(e);
      } else {
        e.classList.add("in");
      }
    });

    // 4. Benchmarks grid trigger
    const sgridTimer = setTimeout(() => {
      const sgrid = root.querySelector("#sgrid");
      if (sgrid) sgrid.classList.add("go");
    }, RM ? 0 : 350);

    // 5. Header scroll progress & hide/show
    const hdr = root.querySelector("#hdr");
    const pg = root.querySelector("#pg");
    let lastY = 0;
    function tick() {
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (hdr) {
        hdr.classList.toggle("hide", y > 120 && y > lastY + 2);
        if (y < lastY - 2 || y < 120) hdr.classList.remove("hide");
        document.documentElement.style.setProperty("--hh", hdr.offsetHeight + "px");
      }
      lastY = y;
      if (pg) {
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - vh
        );
        pg.style.transform = `scaleX(${cl(y / maxScroll)})`;
      }
    }
    let raf = 0;
    const req = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          tick();
        });
    };
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    tick();

    // 6. Magnetic buttons and fine pointer interactions
    let cancelLoop = () => {};
    if (!RM && window.matchMedia("(pointer:fine)").matches) {
      // Magnetic buttons
      root.querySelectorAll(".btn,.book").forEach((b) => {
        b.addEventListener("mousemove", (e) => {
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${
            (e.clientX - r.left - r.width / 2) * 0.18
          }px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
        });
        b.addEventListener("mouseleave", () => (b.style.transform = ""));
      });

      // Hero tilt
      const hero = root.querySelector("#top");
      if (hero) {
        hero.addEventListener("mousemove", (e) => {
          const r = hero.getBoundingClientRect();
          hero.style.setProperty(
            "--px",
            ((e.clientX - r.left) / r.width - 0.5).toFixed(3)
          );
          hero.style.setProperty(
            "--py",
            ((e.clientY - r.top) / r.height - 0.5).toFixed(3)
          );
        });
      }

      // Card spotlights
      root.querySelectorAll(".pc5").forEach((c) =>
        c.addEventListener("mousemove", (e) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty("--x", e.clientX - r.left + "px");
          c.style.setProperty("--y", e.clientY - r.top + "px");
        })
      );

      // Custom cursor ring
      const ring = root.querySelector("#gaa-cursor-ring");
      let x = -100,
        y = -100,
        tx = -100,
        ty = -100;
      const onMouseMove = (e) => {
        tx = e.clientX;
        ty = e.clientY;
        if (ring) ring.classList.add("on");
      };
      const onMouseLeave = () => {
        if (ring) ring.classList.remove("on");
      };
      const onMouseOver = (e) => {
        if (ring) {
          ring.classList.toggle(
            "big",
            !!e.target.closest("a,button,.pc5,.hub,.val")
          );
        }
      };

      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mouseover", onMouseOver);

      let loopId = 0;
      function loop() {
        x += (tx - x) * 0.18;
        y += (ty - y) * 0.18;
        if (ring) ring.style.transform = `translate(${x}px,${y}px)`;
        loopId = requestAnimationFrame(loop);
      }
      loopId = requestAnimationFrame(loop);

      cancelLoop = () => {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mouseover", onMouseOver);
        cancelAnimationFrame(loopId);
      };
    }

    return () => {
      clearTimeout(readyTimer);
      clearTimeout(sgridTimer);
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      document.body.classList.remove("ready");
      if (io) io.disconnect();
      cancelLoop();
    };
  }, []);

  return (
    <div className="gaa-consulting-root" ref={containerRef}>
      <GaaHeader link={link} />
<div className="sbar"><div className="w"><a className="back" {...link("@about")}><span>←</span><span>About the GAA Group</span></a><div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}><span className="bpill"><i></i>GAA Consulting Practice</span><span className="gm" style={{ color: "var(--m)", fontSize: "11px" }}>Statutory Professional Privilege</span></div></div></div>
<main>
<section className="hero6" id="top"><span className="sect" aria-hidden="true">§</span>
<div className="w h6main"><div>
<span className="tag6 e3" style={{ "--t": ".05s" }}>Corporate Law · M&amp;A Advisory · Company Secretarial</span>
<h1 aria-label="Strategic Counsel for Uncompromising Governance."><span className="ln"><span><span className="hw">Strategic</span> <span className="hw">Counsel</span></span></span><span className="ln"><span><span className="hw">for</span> <em><span className="hw">Uncompromising</span></em></span></span><span className="ln"><span><em><span className="hw">Governance.</span></em></span></span></h1>
<p className="sub6 e3" style={{ "--t": ".55s" }}>GAA Consulting is the specialized corporate legal, company secretarial, and transaction diligence practice of GAA Group. We advise founders, enterprise boards, private equity funds, and foreign corporations navigating high-stakes statutory compliance, cross-border entry, and corporate restructurings across India.</p>
<div className="acts e3" style={{ "--t": ".7s" }}><a className="btn o" href="/contact?intent=Corporate%20law%20%26%20company%20secretarial" onClick={(e) => { e.preventDefault(); navigateTo("contact", "Corporate law & company secretarial"); }}>Consult Senior Corporate Partner <span className="ar">→</span></a><a className="btn g" href="#practices" onClick={(e) => { e.preventDefault(); scrollToSection("practices"); }}>Explore Practice Areas ↓</a></div></div>
<div className="stackc e3" style={{ "--t": ".4s" }}><div className="lyr l3"></div><div className="lyr l2"></div><div className="front" id="front">
<div className="fh"><span>Practice Benchmarks</span><span>Est. for Growth</span></div>
<div className="sgrid" id="sgrid"><div className="st6"><div className="num" role="img" aria-label="150+">150<span className="sf">+</span></div><span className="lbl">M&amp;A &amp; Diligence Mandates</span></div><div className="st6"><div className="num" role="img" aria-label="500+">500<span className="sf">+</span></div><span className="lbl">Annual Board Calendars</span></div><div className="st6"><div className="num" role="img" aria-label="100%">100<span className="sf">%</span></div><span className="lbl">ICSI Fiduciary Standard</span></div><div className="st6"><div className="num" role="img" aria-label="4">4</div><span className="lbl">Physical Desks in India</span></div></div>
<p className="fnote">Direct senior partner leadership on every file. Zero junior delegating or automated form-filling shortcuts.</p></div></div></div>
<div className="tk" aria-hidden="true"><div><span>Corporate Law</span><span className="s">✦</span><span>M&amp;A Advisory</span><span className="s">✦</span><span>Company Secretarial</span><span className="s">✦</span><span>FDI &amp; FEMA</span><span className="s">✦</span><span>NBFC Advisory</span><span className="s">✦</span><span>Corporate Law</span><span className="s">✦</span><span>M&amp;A Advisory</span><span className="s">✦</span><span>Company Secretarial</span><span className="s">✦</span><span>FDI &amp; FEMA</span><span className="s">✦</span><span>NBFC Advisory</span><span className="s">✦</span><span>Corporate Law</span><span className="s">✦</span><span>M&amp;A Advisory</span><span className="s">✦</span><span>Company Secretarial</span><span className="s">✦</span><span>FDI &amp; FEMA</span><span className="s">✦</span><span>NBFC Advisory</span><span className="s">✦</span><span>Corporate Law</span><span className="s">✦</span><span>M&amp;A Advisory</span><span className="s">✦</span><span>Company Secretarial</span><span className="s">✦</span><span>FDI &amp; FEMA</span><span className="s">✦</span><span>NBFC Advisory</span><span className="s">✦</span></div></div></section>

<section className="s" id="advantage"><div className="w"><div className="head6"><span className="gm eb">The Advisory Difference</span><h2 style={{ marginTop: "14px" }}>Why leading enterprises <em>choose GAA Consulting.</em></h2>
<p>India's corporate advisory space is polarized between low-cost automated filing portals that lack legal foresight, and traditional law firms that charge punitive hourly retainers without operational execution. GAA Consulting bridges that chasm.</p></div>
<div className="cmp">
<div className="cc rv"><span className="t">Commodity Filing Portals</span><h3>Routine Form-Filers</h3><p>Low-cost automated platforms designed for basic incorporations. They lack strategic corporate counsel, offer zero NCLT/RD defense, and leave boards exposed to severe statutory fines when complex compliance lapses arise.</p><ul><li><b>✕</b>Passive, automated form submission</li><li><b>✕</b>No transaction or M&amp;A advisory</li><li><b>✕</b>Inability to represent before NCLT or ROC</li></ul></div>
<div className="cc hl rv"><span className="t">GAA Consulting Standard</span><h3>Strategic Corporate Advisory</h3><p>Integrated corporate law, company secretarial retainer, and transaction execution under strict fiduciary oversight. Dedicated senior partner accessibility with predictable, fixed-mandate pricing.</p><ul><li><b>✓</b>Senior Practising CS &amp; Corporate Lawyers</li><li><b>✓</b>Full M&amp;A diligence, Section 233, and NCLT representation</li><li><b>✓</b>Proactive statutory calendar with Zero Default record</li><li><b>✓</b>Protected by statutory professional secrecy</li></ul></div>
<div className="cc rv"><span className="t">Legacy Law Firms</span><h3>Traditional Law Firms</h3><p>High-overhead law practices designed for litigation. Excellent legal briefs, but punitive hourly billing models, junior associate file delegation, and minimal hands-on day-to-day secretarial execution.</p><ul><li><b>✕</b>Unpredictable hourly billing models</li><li><b>✕</b>Disconnected from routine MCA execution</li><li><b>✕</b>Junior associate delegation</li></ul></div></div></div></section>

<section className="s alt" id="practices"><div className="w"><div className="head6"><span className="gm eb">Core Practice Areas</span><h2 style={{ marginTop: "14px" }}>Precision counsel across the <em>corporate lifecycle.</em></h2>
<p>From initial India entity architecture to complex cross-border restructuring and regulatory defense, explore our specialized advisory verticals.</p></div>
<div className="pgrid"><a className="pc5 rv" {...link("practices/corporate-secretarial")}><div className="top"><span className="n">01 · Practice</span><span className="go2">→</span></div><h3>Corporate Law &amp; Company Secretarial (CS)</h3><p>Comprehensive corporate secretarial retainer for Indian entities and multinationals. We ensure statutory registers, Board and shareholder meetings, MCA-21 filings, and Secretarial Audits (under Section 204 of Companies Act, 2013) are impeccably maintained.</p><div className="chips"><span>Board Governance</span><span>MCA-21 Filings</span><span>Secretarial Audit (Sec 204)</span><span>Compounding of Offenses</span></div></a><a className="pc5 rv" {...link("practices/mergers-restructuring")}><div className="top"><span className="n">02 · Practice</span><span className="go2">→</span></div><h3>M&amp;A, Restructuring &amp; Joint Ventures</h3><p>End-to-end transactional execution for domestic and cross-border M&amp;A. From structuring fast-track mergers under Section 233 to NCLT schemes of arrangement, capital reductions, and slump sale business transfer agreements (BTA).</p><div className="chips"><span>NCLT Schemes</span><span>Fast-Track Mergers (Sec 233)</span><span>Demergers</span><span>Share Purchase Agreements</span></div></a><a className="pc5 rv" {...link("practices/fdi-fema")}><div className="top"><span className="n">03 · Practice</span><span className="go2">→</span></div><h3>FDI, FEMA &amp; Cross-Border India Entry</h3><p>Turnkey India entry advisory for multinational corporations, foreign funds, and NRIs. Structuring Wholly Owned Subsidiaries (WOS), Joint Ventures, and Liaison/Branch offices in full compliance with RBI guidelines and FEMA regulations.</p><div className="chips"><span>Wholly Owned Subsidiaries</span><span>FCGPR &amp; FLA Returns</span><span>Branch Offices</span><span>Overseas Direct Investment</span></div></a><a className="pc5 rv" {...link("practices/due-diligence")}><div className="top"><span className="n">04 · Practice</span><span className="go2">→</span></div><h3>Transaction &amp; Legal Due Diligence</h3><p>Rigorous buy-side and sell-side legal, regulatory, and corporate secretarial diligence for venture capital rounds, private equity investments, and strategic acquisitions. We identify latent non-compliances and rectify them pre-closing.</p><div className="chips"><span>VC / PE Diligence</span><span>Secretarial Health Checks</span><span>Cap Table Validation</span><span>CP Satisfaction</span></div></a><a className="pc5 rv" {...link("practices/nbfc-regulatory")}><div className="top"><span className="n">05 · Practice</span><span className="go2">→</span></div><h3>NBFC &amp; Financial Sector Advisory</h3><p>Specialized regulatory counsel for Non-Banking Financial Companies (NBFCs), digital lending platforms, and fintechs navigating the Reserve Bank of India’s strict master directions, registration hurdles, and periodic statutory inspections.</p><div className="chips"><span>RBI NBFC Registration</span><span>Digital Lending Guidelines</span><span>Co-Lending Frameworks</span><span>Fair Practices Code</span></div></a><a className="pc5 rv" {...link("practices/governance-defense")}><div className="top"><span className="n">06 · Practice</span><span className="go2">→</span></div><h3>Board Governance &amp; Regulatory Defense</h3><p>Advising Boards of Directors, Promoters, and Independent Directors on corporate governance best practices, Committee mandates (Audit, NRC, CSR), SEBI LODR alignment for pre-IPO firms, and defense against MCA show-cause notices.</p><div className="chips"><span>Independent Director Counsel</span><span>Audit &amp; NRC Charters</span><span>MCA Notice Defense</span><span>SEBI LODR Alignment</span></div></a></div><div className="acts"><a className="btn" {...link("practices")}>View All Practice Areas <span className="ar">→</span></a><a className="btn g" {...link("india-entry")}>India Entry Desk</a></div></div></section>

<section className="s" id="about-gaa"><div className="w ag"><div><span className="gm eb">About GAA Consulting</span><h2 style={{ marginTop: "14px" }}>Built on <em>fiduciary duty</em> and commercial pragmatism.</h2>
<p className="ap">GAA Consulting was founded on a singular conviction: corporate governance should accelerate enterprise growth, not paralyze it with bureaucracy. We operate as trusted outside corporate counsel and strategic company secretarial advisors to visionary promoters, institutional investors, and ambitious scaleups.</p>
<p className="ap">Our multidisciplinary practice convenes Practising Company Secretaries (FCS/ACS), Corporate Attorneys, M&amp;A Restructuring Specialists, and former regulatory counsels. Every matter is analyzed not in isolation, but through its broader impact on cap tables, investor relations, statutory compliance calendars, and institutional valuation.</p>
<div className="vals">
<div className="val rv"><i>01</i><div><b>Partner-Led Fiduciary Care</b><span>Direct partner oversight from inception to execution. We do not pass strategic briefs to junior trainees.</span></div></div>
<div className="val rv"><i>02</i><div><b>Commercial Pragmatism</b><span>We evaluate legal risk against commercial realities to deliver actionable pathways, not endless memos.</span></div></div>
<div className="val rv"><i>03</i><div><b>Zero Statutory Default</b><span>Relentless compliance calendar tracking across all MCA, ROC, RBI, and FEMA statutory filing deadlines.</span></div></div>
<div className="val rv"><i>04</i><div><b>Bilateral Confidentiality</b><span>Protected under statutory professional privilege with 100% mutual NDA execution before document review.</span></div></div></div></div>
<aside className="cred rv"><h3>Institutional Standards &amp; Credentials</h3><p className="sub">Governed by strict statutory &amp; professional frameworks</p>
<div className="ci"><span className="ic">01</span><div><b>ICSI Peer-Reviewed Practice</b><span>Compliant with the highest auditing standards issued by the Institute of Company Secretaries of India (ICSI).</span></div></div>
<div className="ci"><span className="ic">02</span><div><b>NCLT &amp; Regulatory Tribunal Standing</b><span>Admitted representation privileges before the National Company Law Tribunal (NCLT) and Regional Directors (RD).</span></div></div>
<div className="ci"><span className="ic">03</span><div><b>FEMA &amp; RBI India Entry Desks</b><span>Direct integration with Authorized Dealer Category-1 banks for swift inbound FDI, FLA, and ODI clearances.</span></div></div>
<div className="ci"><span className="ic">04</span><div><b>Under 4-Hour Partner Response SLA</b><span>Committed turnaround on emergency notices, board resolutions, and due diligence inquiries.</span></div></div>
<a className="btn o" href="/contact" onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}><span>Initiate Engagement Briefing</span><span className="ar">→</span></a></aside></div></section>

<section className="s alt" id="hubs"><div className="w"><div className="head6"><span className="gm eb">Commercial Hubs</span><h2 style={{ marginTop: "14px" }}>Physical presence in <em>India's financial corridors.</em></h2></div><div className="hubs"><div className="hub rv"><span className="tg">HQ &amp; M&amp;A Advisory</span><b>Mumbai (BKC)</b><span className="ad">Financial Centre, G-Block, Bandra Kurla Complex, Mumbai 400 051</span><a className="tel" href="tel:+912249801200">+91 22 4980 1200</a></div><div className="hub rv"><span className="tg">Regulatory &amp; NBFC Desk</span><b>New Delhi (CP)</b><span className="ad">Statesman House, Barakhamba Road, Connaught Place, New Delhi 110 001</span><a className="tel" href="tel:+911141508800">+91 11 4150 8800</a></div><div className="hub rv"><span className="tg">Tech &amp; Scaleup Diligence</span><b>Bengaluru (Indiranagar)</b><span className="ad">100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560 038</span><a className="tel" href="tel:+918043205500">+91 80 4320 5500</a></div><div className="hub rv"><span className="tg">Cross-Border &amp; FDI</span><b>GIFT City IFSC</b><span className="ad">Brigade International Financial Centre, GIFT City, Gandhinagar 382 355</span><a className="tel" href="tel:+917967703300">+91 79 6770 3300</a></div></div></div></section>

<section className="s band"><span className="orb"></span><span className="orb"></span><div className="w"><span className="gm eb">Next step</span><h2 style={{ marginTop: "16px" }}>Ready to elevate your <em>corporate governance?</em></h2>
<p>Speak directly with a senior practice partner at GAA Consulting. Every briefing is protected under mutual non-disclosure and strict fiduciary privilege.</p>
<div className="acts"><a className="btn o" href="/contact" onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}>Schedule Partner Briefing →</a><a className="btn g" href="#/" onClick={(e) => { e.preventDefault(); navigateTo("home"); }}>← GAA Group Portal</a></div></div></section>
</main><GaaFooter link={link} /><div id="gaa-cursor-ring" aria-hidden="true"></div>
    </div>
  );
}

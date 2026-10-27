import React from "react";
import logoMain from "../assets/logo-main.png";

export default function Footer({ onNavigate }) {
  const handleNav = (page, sectionId = null) => {
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer-full" role="contentinfo">
      <div className="footer-full-inner">
        {/* Left: Brand logo & tag */}
        <div className="footer-brand-col">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNav("home");
            }}
            className="footer-logo-wrap"
            aria-label="GAA Consulting home"
          >
            <img src={logoMain} alt="GAA Advisory Group" />
          </a>
          <span className="footer-motto">Business, first. · Advisory · Filings · Talent</span>
        </div>

        {/* Center: Clean single-row navigation links */}
        <nav className="footer-links-row" aria-label="Footer navigation">
          <button
            type="button"
            className="footer-nav-btn"
            onClick={() => handleNav("home")}
          >
            Home Portal
          </button>
          <button
            type="button"
            className="footer-nav-btn"
            onClick={() => handleNav("about")}
          >
            About Us
          </button>
          <button
            type="button"
            className="footer-nav-btn"
            onClick={() => handleNav("gaa-consulting")}
          >
            GAA Consulting
          </button>
          <span
            className="footer-nav-btn"
            style={{ color: "#7a7268", cursor: "default", userSelect: "none" }}
          >
            Filings First
          </span>
          <span
            className="footer-nav-btn"
            style={{ color: "#7a7268", cursor: "default", userSelect: "none" }}
          >
            Hirings First
          </span>
          <button
            type="button"
            className="footer-nav-btn"
            onClick={() => handleNav("contact")}
          >
            Contact
          </button>
        </nav>

        {/* Right: Live status badge, Copyright & Back to Top */}
        <div className="footer-right-col">
          <div className="footer-live-status">
            <span className="footer-pulse-dot" aria-hidden="true"></span>
            <span>GAA Consulting Active</span>
          </div>

          <button
            type="button"
            className="footer-back-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <span className="top-arrow" aria-hidden="true">↑</span>
          </button>

          <span className="footer-copy-text">© 2026 GAA Group · All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}

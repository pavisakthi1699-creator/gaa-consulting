import React, { useState } from "react";
import logoMain from "../assets/logo-main.png";

export default function Header({ currentPage, setCurrentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page, sectionId = null) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page, sectionId);
    } else {
      setCurrentPage(page);
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header id="hdr">
      <div className="hd">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          aria-label="GAA Consulting home"
          className="brand-link"
        >
          <img src={logoMain} alt="GAA Advisory Group" />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="desktop-nav">
          <a
            href="#/"
            className={`nav-link ${currentPage === "home" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
          >
            Home
          </a>
          <a
            href="#/about"
            className={`nav-link ${currentPage === "about" ? "active" : ""}`}
            aria-current={currentPage === "about" ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("about");
            }}
          >
            About us
          </a>
          <a
            href="#/gaa-consulting/practices"
            className={`nav-link ${currentPage === "gaa-consulting" ? "active" : ""}`}
            aria-current={currentPage === "gaa-consulting" ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("gaa-consulting/practices");
            }}
          >
            GAA Consulting
          </a>
          <span
            className="nav-link"
            style={{ color: "#7a7268", cursor: "default", userSelect: "none" }}
          >
            Filings First
          </span>
          <span
            className="nav-link"
            style={{ color: "#7a7268", cursor: "default", userSelect: "none" }}
          >
            Hirings First
          </span>
          <a
            href="#/contact"
            className={`nav-link ${currentPage === "contact" ? "active" : ""}`}
            aria-current={currentPage === "contact" ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
          >
            Contact us
          </a>
        </nav>

        <div className="hdr-actions">
          <a
            href="#/contact"
            className="book"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
          >
            Book a consultation
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`mob-toggle ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mob-drawer">
          <div className="mob-drawer-inner">
            <button
              type="button"
              className={`mob-link ${currentPage === "home" ? "active" : ""}`}
              onClick={() => handleNavClick("home")}
            >
              <span>01</span> Home Portal
            </button>
            <button
              type="button"
              className={`mob-link ${currentPage === "about" ? "active" : ""}`}
              onClick={() => handleNavClick("about")}
            >
              <span>02</span> About Us
            </button>
            <button
              type="button"
              className={`mob-link ${currentPage === "gaa-consulting" ? "active" : ""}`}
              onClick={() => handleNavClick("gaa-consulting/practices")}
            >
              <span>03</span> GAA Consulting
            </button>
            <div
              className="mob-link"
              style={{ color: "#7a7268", cursor: "default", userSelect: "none" }}
            >
              <span>04</span> Filings First
            </div>
            <div
              className="mob-link"
              style={{ color: "#7a7268", cursor: "default", userSelect: "none" }}
            >
              <span>05</span> Hirings First
            </div>
            <button
              type="button"
              className={`mob-link ${currentPage === "contact" ? "active" : ""}`}
              onClick={() => handleNavClick("contact")}
            >
              <span>06</span> Contact Us
            </button>

            <div className="mob-drawer-footer">
              <button
                type="button"
                className="book"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => handleNavClick("contact")}
              >
                Book a consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

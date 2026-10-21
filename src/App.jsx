import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import GaaSite from "./pages/gaa/GaaSite";

// In-page anchors on the GAA Consulting home page
const GAA_ANCHORS = ["#practices", "#about-gaa", "#hubs", "#advantage", "#top"];

/* Parse "#/gaa-consulting/practices/fdi-fema", "#/contact?brand=gaa", "#/about" ...
   The first path segment decides the page; for GAA the rest is the sub path. */
function parseHash(rawHash) {
  const hash = (rawHash || "").toLowerCase();
  const path = hash.replace(/^#\/?/, "").split("?")[0];
  const seg = path.split("/").filter(Boolean);
  const first = seg[0] || "";
  if (first.startsWith("gaa")) return { page: "gaa-consulting", gaaPath: seg.slice(1).join("/") };
  if (first.startsWith("about")) return { page: "about" };
  if (first.startsWith("contact")) return { page: "contact" };
  return { page: "home", section: first };
}

export default function App() {
  const initial = parseHash(window.location.hash);
  const [currentPage, setCurrentPage] = useState(initial.page);
  const [gaaPath, setGaaPath] = useState(initial.gaaPath || "");

  // Handle browser back/forward and initial URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (GAA_ANCHORS.includes(hash)) {
        const el = document.getElementById(hash.replace("#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
        return;
      }

      const r = parseHash(hash);
      setCurrentPage(r.page);
      if (r.page === "gaa-consulting") setGaaPath(r.gaaPath);

      if (r.page === "home" && r.section && r.section !== "top") {
        setTimeout(() => {
          const el = document.getElementById(r.section);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  const handleNavigate = (page, sectionId = null) => {
    // GAA Consulting site and its sub pages, e.g. "gaa-consulting/practices/fdi-fema"
    if (page === "gaa" || (page && page.startsWith("gaa-consulting"))) {
      const sub = page === "gaa" ? "" : page.replace(/^gaa-consulting\/?/, "");
      setCurrentPage("gaa-consulting");
      setGaaPath(sub);
      window.history.pushState(null, "", sub ? `#/gaa-consulting/${sub}` : "#/gaa-consulting");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "about") {
      setCurrentPage("about");
      window.history.pushState(null, "", "#/about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "contact") {
      setCurrentPage("contact");
      window.history.pushState(null, "", "#/contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCurrentPage("home");
      if (sectionId) {
        window.history.pushState(null, "", `#${sectionId}`);
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else {
        window.history.pushState(null, "", "#/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const isDedicatedSite = currentPage === "gaa-consulting";

  return (
    <div className="app-root">
      {/* About Us has its own header and footer (from the About Us design) */}
      {!isDedicatedSite && currentPage !== "about" && (
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onNavigate={handleNavigate}
        />
      )}

      <main id="main-content">
        {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentPage === "about" && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === "contact" && <ContactPage onNavigate={handleNavigate} />}
        {currentPage === "gaa-consulting" && <GaaSite path={gaaPath} onNavigate={handleNavigate} />}
      </main>

      {!isDedicatedSite && currentPage !== "about" && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

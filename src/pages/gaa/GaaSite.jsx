import React from "react";
import "../GaaConsultingPage.css";
import "./GaaSubpages.css";
import GaaConsultingPage from "../GaaConsultingPage";
import GaaPracticesPage from "./GaaPracticesPage";
import GaaPracticeDetailPage from "./GaaPracticeDetailPage";
import GaaIndiaEntryPage from "./GaaIndiaEntryPage";
import GaaIndustriesPage from "./GaaIndustriesPage";
import GaaExperiencePage from "./GaaExperiencePage";
import GaaInsightsPage from "./GaaInsightsPage";
import GaaPeoplePage from "./GaaPeoplePage";
import GaaHowWeWorkPage from "./GaaHowWeWorkPage";
import GaaDisclaimerPage from "./GaaDisclaimerPage";
import { getPractice } from "../../data/gaaContent";

/* Routes for the GAA Consulting site (all under #/gaa-consulting/...)
   ""                      -> Home (existing GaaConsultingPage)
   practices               -> Practice Areas index
   practices/<slug>        -> Practice detail (6 practices)
   india-entry             -> India Entry Desk
   industries              -> Industries
   experience              -> Representative mandates
   insights                -> Insights & compliance calendar
   people                  -> GAA Consulting team
   how-we-work             -> Engagement models, process, FAQs
   disclaimer              -> Disclaimer & privacy */
export default function GaaSite({ path = "", onNavigate }) {
  const [a, b] = path.split("/").filter(Boolean);
  const k = path || "home";

  switch (a) {
    case "practices":
      if (b && getPractice(b)) return <GaaPracticeDetailPage slug={b} key={k} onNavigate={onNavigate} />;
      return <GaaPracticesPage key={k} onNavigate={onNavigate} />;
    case "india-entry":
      return <GaaIndiaEntryPage key={k} onNavigate={onNavigate} />;
    case "industries":
      return <GaaIndustriesPage key={k} onNavigate={onNavigate} />;
    case "experience":
      return <GaaExperiencePage key={k} onNavigate={onNavigate} />;
    case "insights":
      return <GaaInsightsPage key={k} onNavigate={onNavigate} />;
    case "people":
      return <GaaPeoplePage key={k} onNavigate={onNavigate} />;
    case "how-we-work":
      return <GaaHowWeWorkPage key={k} onNavigate={onNavigate} />;
    case "disclaimer":
      return <GaaDisclaimerPage key={k} onNavigate={onNavigate} />;
    default:
      return <GaaConsultingPage key={k} onNavigate={onNavigate} />;
  }
}

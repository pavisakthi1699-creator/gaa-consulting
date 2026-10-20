import React, { useRef } from "react";
import useGaaMotion from "./useGaaMotion";
import { GaaHeader, GaaSubBar, GaaFooter, Ring, useLink } from "./GaaShell";

// PLACEHOLDER: standard-form wording. Have it reviewed by the firm's partners / counsel before launch.
export default function GaaDisclaimerPage({ onNavigate }) {
  const ref = useRef(null);
  const link = useLink(onNavigate);
  useGaaMotion(ref, "Disclaimer | GAA Consulting");

  return (
    <div className="gaa-consulting-root gaa-sub" ref={ref}>
      <GaaHeader link={link} active="disclaimer" />
      <GaaSubBar link={link} crumbs={[[null, "Disclaimer"]]} />
      <main>
        <section className="s legal-s" id="top">
          <div className="w ag">
            <div>
              <span className="tag6">Legal</span>
              <h2 style={{ marginTop: "18px" }}>Disclaimer &amp; <em>privacy notice.</em></h2>
              <div className="legal">
                <h3>Disclaimer</h3>
                <p>This website is provided for general information about GAA Consulting and its practice areas. It is not intended to advertise or solicit work. By accessing this website, you confirm that you are seeking information about GAA Consulting of your own accord and that there has been no advertisement, personal communication, solicitation or inducement from GAA Consulting or its members.</p>
                <p>Nothing on this website is legal, tax or professional advice. Content such as briefing notes and the compliance calendar is a general guide, may not reflect the latest amendments and should not be relied upon without specific advice on your facts.</p>
                <p>Reading this website or contacting us through it does not create a professional or client relationship. A relationship is created only when an engagement letter is signed.</p>
                <p>GAA Consulting is not responsible for any action taken on the basis of information on this website, or for the content of third-party websites linked from it.</p>
                <h3>Confidentiality of communications</h3>
                <p>Please do not send confidential documents through the website forms before an NDA is in place. We will share a mutual non-disclosure agreement before reviewing any documents.</p>
                <h3>Privacy</h3>
                <p>Information submitted through our contact forms is used only to respond to your enquiry and to manage any resulting engagement. We do not sell or share your personal data with third parties for marketing. You may ask us to correct or delete your information at any time by writing to us through the contact page.</p>
              </div>
            </div>
            <aside className="cred">
              <h3>Questions about this notice?</h3>
              <p className="sub">Write to the practice partner directly</p>
              <div className="ci"><span className="ic">01</span><div><b>Engagement letters</b><span>Every mandate is confirmed in writing with scope, team and fees.</span></div></div>
              <div className="ci"><span className="ic">02</span><div><b>Mutual NDA</b><span>Signed before any document review.</span></div></div>
              <a className="btn o" {...link("@contact")}><span>Contact GAA Consulting</span><span className="ar">→</span></a>
            </aside>
          </div>
        </section>
      </main>
      <GaaFooter link={link} />
      <Ring />
    </div>
  );
}

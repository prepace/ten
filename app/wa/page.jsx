export const metadata = {
  title: 'WAEVCP2 — Tribal Offer (Amerind Nation LLC)'
};

export default function Page() {
  const css = `
    :root {
      --bg: #0b1020;
      --card: #121935;
      --ink: #e9eefc;
      --muted: #a9b3d4;
      --accent: #6ee7b7;
      --accent-2: #60a5fa;
      --warn: #fde68a;
      --ok: #c7f9cc;
      --shadow: 0 10px 30px rgba(0,0,0,.35);
      --radius: 18px;
    }
    html, body { height: 100%; }
    body {
      margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
      color: var(--ink); background: radial-gradient(1200px 700px at 25% -10%, #1b2450, var(--bg));
    }
    .wrap { max-width: 1100px; margin: 0 auto; padding: 40px 20px 80px; }
    .hero { display: grid; grid-template-columns: 1.1fr .9fr; gap: 28px; align-items: center; }
    .badgebar { display:flex; flex-wrap:wrap; gap:10px; margin:14px 0 18px; }
    .badge { background: linear-gradient(135deg, var(--accent-2), #8b5cf6); color:#041224; font-weight:700; padding:8px 12px; border-radius:999px; box-shadow: var(--shadow); }
    .badge.alt { background: linear-gradient(135deg, #34d399, #a3e635); }
    .h1 { font-size: clamp(28px, 4vw, 46px); line-height:1.05; margin: 6px 0 10px; font-weight: 800; letter-spacing: -.02em; }
    .lead { color: var(--muted); font-size: clamp(16px, 2vw, 19px); }
    .card { background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02)); border:1px solid rgba(255,255,255,.08); border-radius: var(--radius); box-shadow: var(--shadow); padding: 20px; }
    .cta { display:flex; gap:12px; margin-top:18px; }
    .btn { background: linear-gradient(135deg, var(--accent), #22c55e); color:#051b12; padding:12px 16px; border-radius:12px; text-decoration:none; font-weight:700; display:inline-block; box-shadow: var(--shadow); }
    .btn.ghost { background: transparent; color: var(--ink); border:1px solid rgba(255,255,255,.25); }
    .kpis { display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-top:16px; }
    .kpi { background: rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); border-radius: 14px; padding:14px; text-align:center; }
    .kpi .big { font-size: 28px; font-weight:800; letter-spacing:-.01em; }
    .kpi .sub { color: var(--muted); font-size:13px; margin-top:4px; }

    h2 { margin: 34px 0 12px; font-size: clamp(22px, 2.8vw, 30px); letter-spacing:-.01em; }
    p { color: var(--ink); }
    .grid { display:grid; grid-template-columns: 1fr 1fr; gap:22px; }

    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { text-align: right; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,.08); }
    th:first-child, td:first-child { text-align: right; }
    thead th { color: var(--muted); font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: .06em; }
    tbody tr:hover { background: rgba(255,255,255,.035); }
    .pct { font-weight:800; color: var(--accent); }
    .note { color: var(--muted); font-size: 13px; }

    .pill { display:inline-block; padding:6px 10px; border:1px dashed rgba(255,255,255,.35); border-radius:999px; font-size:13px; color: var(--ok); background: rgba(17, 94, 89, .15); }

    .list { margin: 10px 0 0 0; padding-left: 18px; color: var(--muted); }
    .list li { margin: 6px 0; }

    .footer { margin-top: 32px; font-size: 13px; color: var(--muted); }

    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; }
      .grid { grid-template-columns: 1fr; }
      .kpis { grid-template-columns: 1fr; }
    }
  `;

  return (
    <main>
      <style>{css}</style>
      <div className="wrap">
        {/* HERO */}
        <section className="hero">
          <div>
            <div className="badgebar">
              <span className="badge">WAEVCP2 — Public DC Fast Charging</span>
              <span className="badge alt">Minimum 10% of budget reserved for Tribes</span>
            </div>
            <h1 className="h1">Amerind Nation LLC — Tribal Turn‑Key Application &amp; Delivery</h1>
            <p className="lead">We handle strategy, Exhibit A, Exhibit G budgets, host letters, utility coordination, and contracting support. <strong>Tribal applicants receive waived items or maximum points</strong> on multiple requirements, accelerating approvals and delivery.</p>
            <div className="cta">
              <a className="btn" href="#contact">Book a 20‑min Intake</a>
              <a className="btn ghost" href="#details">See Pricing &amp; Scope</a>
            </div>
            <div className="kpis">
              <div className="kpi"><div className="big">4 L3 Ports</div><div className="sub">2× 150–160 kW cabinets, power‑sharing</div></div>
              <div className="kpi"><div className="big">$300k Grant</div><div className="sub">Per site target ask</div></div>
              <div className="kpi"><div className="big">30% EVI Credit</div><div className="sub">Elective pay — cash back</div></div>
            </div>
          </div>
          <div className="card">
            <strong>Why Tribal sites score well</strong>
            <ul className="list">
              <li>Public access at high‑trip Tribal business hubs (casino/hotel/c‑store) boosts mapping score.</li>
              <li>Tribal applicants typically receive <em>maximum credit</em> or <em>exemptions</em> on certain requirements (e.g., DBIP, EO 18‑03; ownership proof on Tribal lands).</li>
              <li>Amerind is authorized to coordinate directly with COMMERCE on your behalf.</li>
              <li><span className="pill">30% EVI tax credit via elective pay</span> — modeled below.</li>
            </ul>
          </div>
        </section>

        {/* OFFER TABLE */}
        <section id="details">
          <h2>Offer &amp; Project Sizing</h2>
          <p className="note">Multi‑site discounts apply to additional sites for the same Tribe. Amounts shown assume 4 L3 ports per site and a $430,000 project budget.</p>
          <div className="card">
            <table aria-label="Offer amounts and project sizes">
              <thead>
                <tr>
                  <th>Sites</th>
                  <th>Total app‑prep fee</th>
                  <th>Total project size</th>
                  <th>Grant funds</th>
                  <th>30% EVI tax credit (elective pay)</th>
                  <th>App fee as % of total project</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>$17,280</td>
                  <td>$430,000</td>
                  <td>$300,000</td>
                  <td>$130,000</td>
                  <td className="pct">4.02%</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>$31,104</td>
                  <td>$860,000</td>
                  <td>$600,000</td>
                  <td>$260,000</td>
                  <td className="pct">3.62%</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>$41,472</td>
                  <td>$1,290,000</td>
                  <td>$900,000</td>
                  <td>$390,000</td>
                  <td className="pct">3.21%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* HOURS TABLE */}
        <section>
          <h2>Work Justification — Application Preparation (108 hrs)</h2>
          <p className="note">Scope includes strategy, Exhibit A authoring, Exhibit G budgeting, Exhibit H orchestration, mapping optimization, utility coordination (+12.5 hrs), client communications (+18 hrs), packaging, and submission QA.</p>
          <div className="card">
            <table aria-label="Application preparation hours by role">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Role</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ textAlign: 'left' }}>Project Lead / PM</td><td>29</td></tr>
                <tr><td style={{ textAlign: 'left' }}>Grants Specialist / Coordinator</td><td>26</td></tr>
                <tr><td style={{ textAlign: 'left' }}>Technical Engineer (EE)</td><td>12</td></tr>
                <tr><td style={{ textAlign: 'left' }}>Budget &amp; Finance Analyst</td><td>17</td></tr>
                <tr><td style={{ textAlign: 'left' }}>GIS / Mapping</td><td>8</td></tr>
                <tr><td style={{ textAlign: 'left' }}>Client Success / Communications</td><td>14</td></tr>
                <tr><td style={{ textAlign: 'left' }}>Admin / QA</td><td>2</td></tr>
                <tr><th style={{ textAlign: 'left' }}>Total</th><th>108</th></tr>
              </tbody>
            </table>
            <p className="note" style={{ marginTop: 10 }}><strong>Blended rate:</strong> $160/hr &nbsp;•&nbsp; <strong>Application‑prep total:</strong> $17,280 per site (discounts applied for 2nd/3rd site).</p>
          </div>
        </section>

        {/* PAYMENT SCHEDULE SECTION */}
        <section>
          <h2>Payment Schedule — Application Preparation</h2>
          <div className="card">
            <p className="note">Milestones apply to the total agreed <strong>application‑prep fee</strong> for the order (after any Early Bird or Rush adjustments).</p>
            <table aria-label="Payment schedule with dates">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Milestone</th>
                  <th>Date</th>
                  <th>Percent</th>
                  <th style={{ textAlign: 'left' }}>Example amount (Normal price)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: 'left' }}>Project start / kickoff invoice</td>
                  <td>At start</td>
                  <td>20%</td>
                  <td style={{ textAlign: 'left' }}>1 site: $3,456 • 2 sites: $6,220.80 • 3 sites: $8,294.40</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left' }}>Progress payment</td>
                  <td>Nov 28</td>
                  <td>40%</td>
                  <td style={{ textAlign: 'left' }}>1 site: $6,912 • 2 sites: $12,441.60 • 3 sites: $16,588.80</td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left' }}>Final delivery payment</td>
                  <td>Dec 11</td>
                  <td>40%</td>
                  <td style={{ textAlign: 'left' }}>1 site: $6,912 • 2 sites: $12,441.60 • 3 sites: $16,588.80</td>
                </tr>
              </tbody>
            </table>
            <p className="note">Amounts above use the <strong>normal multi‑site totals</strong>: 1 site $17,280; 2 sites $31,104; 3 sites $41,472. If Early Bird (−10%) or Rush (+20%) applies, milestone amounts scale by the same percentage.</p>
          </div>
        </section>

        {/* PRICING WINDOWS SECTION */}
        <section>
          <h2>Pricing Windows — Early Bird, Normal, Rush</h2>
          <div className="card">
            <p className="note">Windows are based on project start date: <strong>Start by Nov 7 = Early Bird (−10%)</strong> • <strong>Nov 8–Nov 21 = Normal</strong> • <strong>Start after Nov 21 = Rush (+20%)</strong>.</p>
            <table aria-label="Early Bird, Normal, and Rush pricing by sites">
              <thead>
                <tr>
                  <th>Sites</th>
                  <th>Early Bird (start by Nov 7)</th>
                  <th>Normal (Nov 8–Nov 21)</th>
                  <th>Rush (start after Nov 21)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>$15,552.00</td>
                  <td>$17,280.00</td>
                  <td>$20,736.00</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>$27,993.60</td>
                  <td>$31,104.00</td>
                  <td>$37,324.80</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>$37,324.80</td>
                  <td>$41,472.00</td>
                  <td>$49,766.40</td>
                </tr>
              </tbody>
            </table>
            <p className="note">Prices above reflect your multi‑site discounts (site 2 −20%, site 3 −40%) before applying the Early Bird or Rush window adjustments.</p>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section id="contact" className="grid">
          <div className="card">
            <h2>Ready to move?</h2>
            <p>We’ll handle the paperwork, mapping score strategy, host letters, and budgets. You focus on choosing locations and vendors. We coordinate directly with COMMERCE as your authorized representative.</p>
            <ul className="list">
              <li><strong>Limited window:</strong> 30% EVI credit elective‑pay (cash) — current window ends June 30.</li>
              <li><strong>Minimum 10% of program budget reserved for Tribes.</strong></li>
              <li><strong>Many requirements waived or awarded maximum points</strong> for Tribal applicants.</li>
            </ul>
            <div className="cta">
              {/* <a className="btn" href="#contact">Start intake</a>
              <a className="btn ghost" href="mailto:tribal@example.com">Email us</a> */}
            </div>
          </div>
          <div className="card">
            <h2>What you’ll need</h2>
            <ul className="list">
              <li>Lead applicant info &amp; signer details</li>
              <li>Site address(es) &amp; public access confirmation</li>
              <li>Utility contact (if any) and past correspondence</li>
              <li>Preferred EPC/network approach (or we’ll RFP)</li>
              <li>Exhibit B signature; Exhibit H host letter signer</li>
            </ul>
          </div>
        </section>

        <div className="footer">
          © <span>{new Date().getFullYear()}</span> Amerind Nation LLC • This is informational, not tax or legal advice. Program terms subject to funding and contracting. Numbers shown are illustrative.
        </div>
      </div>
    </main>
  );
}
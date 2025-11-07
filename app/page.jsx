"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const CAContent = () => {
	const rate = 160;
	const hours = {
		pm: 58,
		grants: 52,
		ee: 24,
		finance: 34,
		gis: 16,
		cs: 28,
		qa: 4,
	};
	const totalHours = Object.values(hours).reduce((a, b) => a + b, 0);
	const basePerSite = totalHours * rate;
	const projectBudgetPerSite = 700000;
	const grantPerSite = 210000;
	const taxCreditPercent = 0.3;
	const taxCreditPerSite =
		Math.round((projectBudgetPerSite * taxCreditPercent) / 10000) * 10000;
	const perSiteDiscount = (sites) => 1 - 0.1 * (sites - 1);
	const totalFee = (sites) => basePerSite * sites * perSiteDiscount(sites);
	const totalProject = (sites) => projectBudgetPerSite * sites;
	const totalGrant = (sites) => grantPerSite * sites;
	const totalCredit = (sites) => taxCreditPerSite * sites;
	const pctOfProject = (sites) => (totalFee(sites) / totalProject(sites)) * 100;
	const fmtUSD = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
	const fmtUSD2 = (n) =>
		n.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});

	return (
		<div className="max-w-[1100px] mx-auto px-6 pb-8">
			{/* HERO */}
			<section className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-7 items-center">
				<div>
					<div className="flex flex-wrap gap-2.5 mb-4">
						<span className="inline-block rounded-full border border-[#1c2f67] bg-[#10214a] px-3 py-1.5 text-sm font-bold text-[#bcd2ff]">
							CALeVIP FCCP — Public DC Fast Charging (CA)
						</span>
						<span className="inline-block rounded-full border border-[#1c2f67] bg-[#10214a] px-3 py-1.5 text-sm font-bold text-[#a3e635]">
							Tribal projects eligible • Equity‑prioritized
						</span>
					</div>
					<h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
						Amerind Nation LLC — Tribal Turn‑Key Application &amp; Delivery
					</h1>
					<p className="text-lg text-[#d7deee] mb-5 max-w-2xl">
						We handle strategy, application authoring, budgets, host letters,
						utility coordination, and contracting support. We coordinate
						directly with the program administrator (e.g., CSE/CEC) on your
						behalf.
					</p>
					<div className="flex flex-wrap gap-3 mb-5">
						<Link
							className="inline-block bg-gradient-to-r from-[#6ee7b7] to-[#22c55e] text-[#051b12] px-4 py-3 rounded-lg font-bold shadow-lg hover:opacity-90 transition-opacity"
							href="#contact"
						>
							Book a 20‑min Intake
						</Link>
						<Link
							className="inline-block border border-white/25 bg-transparent text-[#e9eefc] px-4 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
							href="#details"
						>
							See Pricing &amp; Scope
						</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
						<div className="rounded-lg border border-[#22306b] bg-[#0f1a3d] p-4 text-center">
							<div className="text-sm uppercase tracking-wider text-[#a8b3cf] mb-1">
								4 L3 Ports
							</div>
							<div className="text-2xl font-extrabold">2× 320–400 kW</div>
							<div className="text-xs text-[#a8b3cf] mt-1">
								power‑sharing cabinets
							</div>
						</div>
						<div className="rounded-lg border border-[#22306b] bg-[#0f1a3d] p-4 text-center">
							<div className="text-sm uppercase tracking-wider text-[#a8b3cf] mb-1">
								Grant
							</div>
							<div className="text-2xl font-extrabold">$210k</div>
							<div className="text-xs text-[#a8b3cf] mt-1">
								Per site target ask
							</div>
						</div>
						<div className="rounded-lg border border-[#22306b] bg-[#0f1a3d] p-4 text-center">
							<div className="text-sm uppercase tracking-wider text-[#a8b3cf] mb-1">
								EVI Credit
							</div>
							<div className="text-2xl font-extrabold">30%</div>
							<div className="text-xs text-[#a8b3cf] mt-1">
								Elective pay — cash back
							</div>
						</div>
					</div>
				</div>
				<div className="rounded-2xl border border-[#22306b] bg-[#0f1a3d] p-5">
					<strong className="text-[#e9eefc]">Program Notes</strong>
					<ul className="mt-2 pl-5 text-[#d7deee] space-y-2">
						<li>
							Public access at high‑trip Tribal business hubs
							(casino/hotel/c‑store) tends to score well.
						</li>
						<li>
							Amerind serves as owner's rep to streamline utility, permitting,
							and contracting.
						</li>
						<li>
							<span className="inline-block px-2.5 py-1 border border-dashed border-white/35 rounded-full text-sm text-[#c7f9cc] bg-[rgba(17,94,89,.15)]">
								Requirement:
							</span>{" "}
							Able to supply{" "}
							<strong>utility approval on or before Jan 15, 2026</strong>.
						</li>
					</ul>
				</div>
			</section>

			{/* OFFER TABLE */}
			<section id="details" className="mt-16">
				<h2 className="text-3xl font-bold mb-3">
					Offer &amp; Project Sizing (CALeVIP FCCP)
				</h2>
				<p className="text-[#d7deee] mb-4 max-w-3xl">
					Multi‑site discounts apply to additional sites for the same Tribe.
					Amounts assume 4 L3 ports per site and a $430,000 project budget
					(illustrative).
				</p>
				<div className="rounded-2xl border border-[#22306b] bg-[#0f1a3d] p-5 overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Sites
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Total app‑prep fee
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Total project size
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Grant funds
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									30% EVI tax credit
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Fee as % of project
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="hover:bg-white/3.5 transition-colors">
								<td className="text-right p-3 border-b border-white/10">1</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalFee(1))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalProject(1))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalGrant(1))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalCredit(1))}
								</td>
								<td className="text-right p-3 border-b border-white/10 font-bold text-[#6ee7b7]">
									{pctOfProject(1).toFixed(2)}%
								</td>
							</tr>
							<tr className="hover:bg-white/3.5 transition-colors">
								<td className="text-right p-3 border-b border-white/10">2</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalFee(2))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalProject(2))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalGrant(2))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalCredit(2))}
								</td>
								<td className="text-right p-3 border-b border-white/10 font-bold text-[#6ee7b7]">
									{pctOfProject(2).toFixed(2)}%
								</td>
							</tr>
							<tr className="hover:bg-white/3.5 transition-colors">
								<td className="text-right p-3 border-b border-white/10">3</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalFee(3))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalProject(3))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalGrant(3))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalCredit(3))}
								</td>
								<td className="text-right p-3 border-b border-white/10 font-bold text-[#6ee7b7]">
									{pctOfProject(3).toFixed(2)}%
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* HOURS TABLE */}
			<section className="mt-16">
				<h2 className="text-3xl font-bold mb-3">
					Work Justification — Application Preparation (216 hrs)
				</h2>
				<p className="text-[#d7deee] mb-4 max-w-3xl">
					Scope includes strategy, application authoring, budgeting, host‑letter
					orchestration, mapping optimization, utility coordination, client
					communications, packaging, and submission QA.
				</p>
				<div className="rounded-2xl border border-[#22306b] bg-[#0f1a3d] p-5 overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr>
								<th className="text-left p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Role
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Hours
								</th>
							</tr>
						</thead>
						<tbody>
							{[
								{ role: "Project Lead / PM", hours: 58 },
								{ role: "Grants Specialist / Coordinator", hours: 52 },
								{ role: "Technical Engineer (EE)", hours: 24 },
								{ role: "Budget &amp; Finance Analyst", hours: 34 },
								{ role: "GIS / Mapping", hours: 16 },
								{ role: "Client Success / Communications", hours: 28 },
								{ role: "Admin / QA", hours: 4 },
							].map((item) => (
								<tr
									key={item.role}
									className="hover:bg-white/3.5 transition-colors"
								>
									<td className="text-left p-3 border-b border-white/10">
										{item.role}
									</td>
									<td className="text-right p-3 border-b border-white/10">
										{item.hours}
									</td>
								</tr>
							))}
							<tr>
								<th className="text-left p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Total
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									216
								</th>
							</tr>
						</tbody>
					</table>
					<p className="text-[#a8b3cf] text-sm mt-3">
						<strong>Blended rate:</strong> $160/hr •{" "}
						<strong>Application‑prep total (per site):</strong> $
						{fmtUSD(basePerSite)} (discounts applied for 2nd/3rd site).
					</p>
				</div>
			</section>

			{/* PRICING WINDOWS */}
			<section className="mt-16">
				<h2 className="text-3xl font-bold mb-3">
					Pricing Windows — Early Bird, Standard, Rush
				</h2>
				<div className="rounded-2xl border border-[#22306b] bg-[#0f1a3d] p-5">
					<p className="text-[#a8b3cf] text-sm mb-4">
						Windows are based on project start date/time (Pacific):{" "}
						<strong>Start by Nov 21, 5:00 p.m. PT = Early Bird (−10%)</strong> •{" "}
						<strong>
							Nov 21, 5:01 p.m. PT through Dec 5, 5:00 p.m. PT = Standard
						</strong>{" "}
						• <strong>Start after Dec 5, 5:00 p.m. PT = Rush (+20%)</strong>.{" "}
						<strong>No applications accepted after Dec 19.</strong>
					</p>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr>
									<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
										Sites
									</th>
									<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
										Early Bird (by Nov 21)
									</th>
									<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
										Standard
									</th>
									<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
										Rush
									</th>
								</tr>
							</thead>
							<tbody>
								{[1, 2, 3].map((i) => (
									<tr key={i} className="hover:bg-white/3.5 transition-colors">
										<td className="text-right p-3 border-b border-white/10">
											{i}
										</td>
										<td className="text-right p-3 border-b border-white/10">
											${fmtUSD2(totalFee(i) * 0.9)}
										</td>
										<td className="text-right p-3 border-b border-white/10">
											${fmtUSD2(totalFee(i) * 1.0)}
										</td>
										<td className="text-right p-3 border-b border-white/10">
											${fmtUSD2(totalFee(i) * 1.2)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section
				id="contact"
				className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6"
			>
				<div className="rounded-2xl border border-[#1b2450] bg-[#0f1a3d] p-5">
					<h3 className="text-2xl font-bold mb-3">Ready to move?</h3>
					<p className="text-[#cdd6f4] mb-4">
						We'll handle the paperwork, mapping score strategy, host letters,
						and budgets. You focus on choosing locations and vendors. We
						coordinate directly with the program administrator as your
						authorized representative.
					</p>
					<ul className="space-y-2 text-[#cdd6f4] text-sm">
						<li>
							<strong>Limited window:</strong> 30% EVI credit elective‑pay
							(cash) — current window ends June 30.
						</li>
						<li>
							<strong>Requirement:</strong> Must be able to supply{" "}
							<strong>utility approval on or before Jan 15, 2026</strong>.
						</li>
						<li>
							<strong>Deadline:</strong>{" "}
							<strong>No applications accepted after Dec 19.</strong>
						</li>
					</ul>
				</div>
				<div className="rounded-2xl border border-[#1b2450] bg-[#0f1a3d] p-5">
					<h3 className="text-2xl font-bold mb-3">What you'll need</h3>
					<ul className="space-y-2 text-[#cdd6f4] text-sm mb-4">
						<li>Lead applicant info &amp; signer details</li>
						<li>Site address(es) &amp; public access confirmation</li>
						<li>Utility contact (if any) and past correspondence</li>
						<li>Preferred EPC/network approach (or we'll RFP)</li>
						<li>Host letter signer and schedule availability</li>
					</ul>
					<div className="flex flex-wrap gap-3">
						<Link
							className="inline-block bg-gradient-to-r from-[#6ee7b7] to-[#22c55e] text-[#051b12] px-4 py-3 rounded-lg font-bold shadow-lg hover:opacity-90 transition-opacity"
							href="https://calendly.com/ampace"
							target="_blank"
							rel="noopener noreferrer"
						>
							Book Intake Session
						</Link>
						<Link
							className="inline-block border border-white/25 bg-transparent text-[#e9eefc] px-4 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
							href="mailto:pace@amerindnation.com"
						>
							Email us
						</Link>
						<Link
							className="inline-block border border-white/25 bg-transparent text-[#e9eefc] px-4 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
							href="tel:+17036720267"
						>
							Call us
						</Link>
					</div>
				</div>
			</section>

			<div className="mt-8 pt-8 border-t border-white/10 text-sm text-[#a8b3cf]">
				© <span>{new Date().getFullYear()}</span> Amerind Nation LLC • This is
				informational, not tax or legal advice. Program terms subject to funding
				and contracting. Numbers shown are illustrative.
			</div>
		</div>
	);
};

const WAContent = () => {
	const rate = 160;
	const hours = {
		pm: 29,
		grants: 26,
		ee: 12,
		finance: 17,
		gis: 8,
		cs: 14,
		qa: 2,
	};
	const totalHours = Object.values(hours).reduce((a, b) => a + b, 0);
	const basePerSite = totalHours * rate;
	const projectBudgetPerSite = 430000;
	const grantPerSite = 300000;
	const taxCreditPercent = 0.3;
	const taxCreditPerSite =
		Math.round((projectBudgetPerSite * taxCreditPercent) / 10000) * 10000;
	const perSiteDiscount = (sites) => 1 - 0.1 * (sites - 1);
	const totalFee = (sites) => basePerSite * sites * perSiteDiscount(sites);
	const totalProject = (sites) => projectBudgetPerSite * sites;
	const totalGrant = (sites) => grantPerSite * sites;
	const totalCredit = (sites) => taxCreditPerSite * sites;
	const pctOfProject = (sites) => (totalFee(sites) / totalProject(sites)) * 100;
	const fmtUSD = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
	const fmtUSD2 = (n) =>
		n.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});

	return (
		<div className="max-w-[1100px] mx-auto px-6 pb-8">
			{/* HERO */}
			<section className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-7 items-center">
				<div>
					<div className="flex flex-wrap gap-2.5 mb-4">
						<span className="inline-block rounded-full border border-[#1c2f67] bg-[#10214a] px-3 py-1.5 text-sm font-bold text-[#bcd2ff]">
							WAEVCP2 — Public DC Fast Charging
						</span>
						<span className="inline-block rounded-full border border-[#1c2f67] bg-[#10214a] px-3 py-1.5 text-sm font-bold text-[#a3e635]">
							Minimum 10% of budget reserved for Tribes
						</span>
					</div>
					<h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
						Amerind Nation LLC — Tribal Turn‑Key Application &amp; Delivery
					</h1>
					<p className="text-lg text-[#d7deee] mb-5 max-w-2xl">
						We handle strategy, Exhibit A, Exhibit G budgets, host letters,
						utility coordination, and contracting support.{" "}
						<strong>
							Tribal applicants receive waived items or maximum points
						</strong>{" "}
						on multiple requirements, accelerating approvals and delivery.
					</p>
					<div className="flex flex-wrap gap-3 mb-5">
						<Link
							className="inline-block bg-gradient-to-r from-[#6ee7b7] to-[#22c55e] text-[#051b12] px-4 py-3 rounded-lg font-bold shadow-lg hover:opacity-90 transition-opacity"
							href="#contact"
						>
							Book a 20‑min Intake
						</Link>
						<Link
							className="inline-block border border-white/25 bg-transparent text-[#e9eefc] px-4 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
							href="#details"
						>
							See Pricing &amp; Scope
						</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
						<div className="rounded-lg border border-[#22306b] bg-[#0f1a3d] p-4 text-center">
							<div className="text-sm uppercase tracking-wider text-[#a8b3cf] mb-1">
								4 L3 Ports
							</div>
							<div className="text-2xl font-extrabold">2× 150–160 kW</div>
							<div className="text-xs text-[#a8b3cf] mt-1">
								power‑sharing cabinets
							</div>
						</div>
						<div className="rounded-lg border border-[#22306b] bg-[#0f1a3d] p-4 text-center">
							<div className="text-sm uppercase tracking-wider text-[#a8b3cf] mb-1">
								Grant
							</div>
							<div className="text-2xl font-extrabold">$300k</div>
							<div className="text-xs text-[#a8b3cf] mt-1">
								Per site target ask
							</div>
						</div>
						<div className="rounded-lg border border-[#22306b] bg-[#0f1a3d] p-4 text-center">
							<div className="text-sm uppercase tracking-wider text-[#a8b3cf] mb-1">
								EVI Credit
							</div>
							<div className="text-2xl font-extrabold">30%</div>
							<div className="text-xs text-[#a8b3cf] mt-1">
								Elective pay — cash back
							</div>
						</div>
					</div>
				</div>
				<div className="rounded-2xl border border-[#22306b] bg-[#0f1a3d] p-5">
					<strong className="text-[#e9eefc]">
						Why Tribal sites score well
					</strong>
					<ul className="mt-2 pl-5 text-[#d7deee] space-y-2">
						<li>
							Public access at high‑trip Tribal business hubs
							(casino/hotel/c‑store) boosts mapping score.
						</li>
						<li>
							Tribal applicants typically receive <em>maximum credit</em> or{" "}
							<em>exemptions</em> on certain requirements (e.g., DBIP, EO 18‑03;
							ownership proof on Tribal lands).
						</li>
						<li>
							Amerind is authorized to coordinate directly with COMMERCE on your
							behalf.
						</li>
						<li>
							<span className="inline-block px-2.5 py-1 border border-dashed border-white/35 rounded-full text-sm text-[#c7f9cc] bg-[rgba(17,94,89,.15)]">
								30% EVI tax credit via elective pay
							</span>{" "}
							— modeled below.
						</li>
					</ul>
				</div>
			</section>

			{/* OFFER TABLE */}
			<section id="details" className="mt-16">
				<h2 className="text-3xl font-bold mb-3">Offer &amp; Project Sizing</h2>
				<p className="text-[#d7deee] mb-4 max-w-3xl">
					Multi‑site discounts apply to additional sites for the same Tribe.
					Amounts shown assume 4 L3 ports per site and a $430,000 project
					budget.
				</p>
				<div className="rounded-2xl border border-[#22306b] bg-[#0f1a3d] p-5 overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Sites
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Total app‑prep fee
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Total project size
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Grant funds
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									30% EVI tax credit
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Fee as % of project
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="hover:bg-white/3.5 transition-colors">
								<td className="text-right p-3 border-b border-white/10">1</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalFee(1))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalProject(1))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalGrant(1))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalCredit(1))}
								</td>
								<td className="text-right p-3 border-b border-white/10 font-bold text-[#6ee7b7]">
									{pctOfProject(1).toFixed(2)}%
								</td>
							</tr>
							<tr className="hover:bg-white/3.5 transition-colors">
								<td className="text-right p-3 border-b border-white/10">2</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalFee(2))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalProject(2))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalGrant(2))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalCredit(2))}
								</td>
								<td className="text-right p-3 border-b border-white/10 font-bold text-[#6ee7b7]">
									{pctOfProject(2).toFixed(2)}%
								</td>
							</tr>
							<tr className="hover:bg-white/3.5 transition-colors">
								<td className="text-right p-3 border-b border-white/10">3</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalFee(3))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalProject(3))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalGrant(3))}
								</td>
								<td className="text-right p-3 border-b border-white/10">
									${fmtUSD(totalCredit(3))}
								</td>
								<td className="text-right p-3 border-b border-white/10 font-bold text-[#6ee7b7]">
									{pctOfProject(3).toFixed(2)}%
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* HOURS TABLE */}
			<section className="mt-16">
				<h2 className="text-3xl font-bold mb-3">
					Work Justification — Application Preparation (108 hrs)
				</h2>
				<p className="text-[#d7deee] mb-4 max-w-3xl">
					Scope includes strategy, Exhibit A authoring, Exhibit G budgeting,
					Exhibit H orchestration, mapping optimization, utility coordination,
					client communications, packaging, and submission QA.
				</p>
				<div className="rounded-2xl border border-[#22306b] bg-[#0f1a3d] p-5 overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr>
								<th className="text-left p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Role
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Hours
								</th>
							</tr>
						</thead>
						<tbody>
							{[
								{ role: "Project Lead / PM", hours: 29 },
								{ role: "Grants Specialist / Coordinator", hours: 26 },
								{ role: "Technical Engineer (EE)", hours: 12 },
								{ role: "Budget &amp; Finance Analyst", hours: 17 },
								{ role: "GIS / Mapping", hours: 8 },
								{ role: "Client Success / Communications", hours: 14 },
								{ role: "Admin / QA", hours: 2 },
							].map((item) => (
								<tr
									key={item.role}
									className="hover:bg-white/3.5 transition-colors"
								>
									<td className="text-left p-3 border-b border-white/10">
										{item.role}
									</td>
									<td className="text-right p-3 border-b border-white/10">
										{item.hours}
									</td>
								</tr>
							))}
							<tr>
								<th className="text-left p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									Total
								</th>
								<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
									108
								</th>
							</tr>
						</tbody>
					</table>
					<p className="text-[#a8b3cf] text-sm mt-3">
						<strong>Blended rate:</strong> $160/hr •{" "}
						<strong>Application‑prep total:</strong> ${fmtUSD(basePerSite)} per
						site (discounts applied for 2nd/3rd site).
					</p>
				</div>
			</section>

			{/* PRICING WINDOWS */}
			<section className="mt-16">
				<h2 className="text-3xl font-bold mb-3">
					Pricing Windows — Early Bird, Standard, Rush
				</h2>
				<div className="rounded-2xl border border-[#22306b] bg-[#0f1a3d] p-5">
					<p className="text-[#a8b3cf] text-sm mb-4">
						Windows are based on project start date:{" "}
						<strong>Start by Nov 14 = Early Bird (−10%)</strong> •{" "}
						<strong>Nov 15–Nov 28 = Standard</strong> •{" "}
						<strong>Start after Nov 28 = Rush (+20%)</strong>.
					</p>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr>
									<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
										Sites
									</th>
									<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
										Early Bird
									</th>
									<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
										Standard
									</th>
									<th className="text-right p-3 text-xs uppercase tracking-wider text-[#a8b3cf] font-bold border-b border-white/10">
										Rush
									</th>
								</tr>
							</thead>
							<tbody>
								{[1, 2, 3].map((i) => (
									<tr key={i} className="hover:bg-white/3.5 transition-colors">
										<td className="text-right p-3 border-b border-white/10">
											{i}
										</td>
										<td className="text-right p-3 border-b border-white/10">
											${fmtUSD2(totalFee(i) * 0.9)}
										</td>
										<td className="text-right p-3 border-b border-white/10">
											${fmtUSD2(totalFee(i) * 1.0)}
										</td>
										<td className="text-right p-3 border-b border-white/10">
											${fmtUSD2(totalFee(i) * 1.2)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p className="text-[#a8b3cf] text-sm mt-3">
						Prices reflect multi‑site discounts (site 2 −20%, site 3 −40%)
						before applying Early Bird or Rush adjustments.
					</p>
				</div>
			</section>

			{/* CTA */}
			<section
				id="contact"
				className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6"
			>
				<div className="rounded-2xl border border-[#1b2450] bg-[#0f1a3d] p-5">
					<h3 className="text-2xl font-bold mb-3">Ready to move?</h3>
					<p className="text-[#cdd6f4] mb-4">
						We'll handle the paperwork, mapping score strategy, host letters,
						and budgets. You focus on choosing locations and vendors. We
						coordinate directly with COMMERCE as your authorized representative.
					</p>
					<ul className="space-y-2 text-[#cdd6f4] text-sm">
						<li>
							<strong>Limited window:</strong> 30% EVI credit elective‑pay
							(cash) — current window ends June 30.
						</li>
						<li>
							<strong>
								Minimum 10% of program budget reserved for Tribes.
							</strong>
						</li>
						<li>
							<strong>
								Many requirements waived or awarded maximum points
							</strong>{" "}
							for Tribal applicants.
						</li>
					</ul>
				</div>
				<div className="rounded-2xl border border-[#1b2450] bg-[#0f1a3d] p-5">
					<h3 className="text-2xl font-bold mb-3">What you'll need</h3>
					<ul className="space-y-2 text-[#cdd6f4] text-sm mb-4">
						<li>Lead applicant info &amp; signer details</li>
						<li>Site address(es) &amp; public access confirmation</li>
						<li>Utility contact (if any) and past correspondence</li>
						<li>Preferred EPC/network approach (or we'll RFP)</li>
						<li>Exhibit B signature; Exhibit H host letter signer</li>
					</ul>
					<div className="flex flex-wrap gap-3">
						<Link
							className="inline-block bg-gradient-to-r from-[#6ee7b7] to-[#22c55e] text-[#051b12] px-4 py-3 rounded-lg font-bold shadow-lg hover:opacity-90 transition-opacity"
							href="https://calendly.com/ampace"
							target="_blank"
							rel="noopener noreferrer"
						>
							Book Intake Session
						</Link>
						<Link
							className="inline-block border border-white/25 bg-transparent text-[#e9eefc] px-4 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
							href="mailto:pace@amerindnation.com"
						>
							Email us
						</Link>
						<Link
							className="inline-block border border-white/25 bg-transparent text-[#e9eefc] px-4 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
							href="tel:+17036720267"
						>
							Call us
						</Link>
					</div>
				</div>
			</section>

			<div className="mt-8 pt-8 border-t border-white/10 text-sm text-[#a8b3cf]">
				© <span>{new Date().getFullYear()}</span> Amerind Nation LLC • This is
				informational, not tax or legal advice. Program terms subject to funding
				and contracting. Numbers shown are illustrative.
			</div>
		</div>
	);
};

export default function Page() {
	const [selectedTribe, setSelectedTribe] = useState("ca");
	const searchParams = useSearchParams();

	// Set tribe from query param on mount
	useEffect(() => {
		const tribe = searchParams.get("tribe");
		if (tribe === "wa" || tribe === "ca") {
			setSelectedTribe(tribe);
		}
	}, [searchParams]);

	return (
		<main className="">
			{/* LOGO HEADER */}
			<div className="mb-8 py-2 px-6 bg-white flex flex-wrap items-center justify-between gap-6">
				<Link href="/">
					<Image
						src="/ten-logo.png"
						alt="Tribal Energy Network logo"
						width={300}
						height={60}
						priority
						sizes="(max-width: 768px) 250px, 300px"
					/>
				</Link>
				<div className="flex gap-4 items-center">
					<Link
						href="https://www.amerindnation.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="/an-logo.png"
							alt="Amerind Nation logo"
							width={240}
							height={60}
							priority
							sizes="(max-width: 768px) 120px, 150px"
						/>
					</Link>
					<Link
						href="https://www.7gnative.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="/7g-logo.png"
							alt="7G logo"
							width={60}
							height={60}
							priority
							sizes="(max-width: 768px) 40px, 40px"
						/>
					</Link>
				</div>
			</div>
			<div className="max-w-[1100px] mx-auto px-6">
				{/* TRIBE SELECTOR */}
				<div className="flex gap-6 mb-8 pb-6 border-b border-white/10 flex-wrap justify-center">
					<button
						type="button"
						onClick={() => setSelectedTribe("ca")}
						className={`px-6 py-3 rounded-lg font-bold transition-all ${
							selectedTribe === "ca"
								? "bg-gradient-to-r from-[#6ee7b7] to-[#22c55e] text-[#051b12] border-2 border-white scale-105"
								: "bg-gradient-to-r from-[#60a5fa] to-[#8b5cf6] text-[#041224] hover:opacity-90"
						}`}
					>
						CA Tribes - CALeVIP
					</button>
					<button
						type="button"
						onClick={() => setSelectedTribe("wa")}
						className={`px-6 py-3 rounded-lg font-bold transition-all ${
							selectedTribe === "wa"
								? "bg-gradient-to-r from-[#6ee7b7] to-[#22c55e] text-[#051b12] border-2 border-white scale-105"
								: "bg-gradient-to-r from-[#60a5fa] to-[#8b5cf6] text-[#041224] hover:opacity-90"
						}`}
					>
						WA Tribes - WAEVCP2
					</button>
				</div>

				{/* RENDER SELECTED CONTENT */}
				{selectedTribe === "ca" ? <CAContent /> : <WAContent />}
			</div>
		</main>
	);
}

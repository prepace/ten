"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const GOAL = 500000;

// ---- COPY PIVOT: Participation tiers (keeps same layout/images) ----
const TIERS = [
	{
		key: "site",
		name: "Tribal Site Note",
		price: 50000,
		badge: "Top Tribal Impact",
		features: ["Milestone-linked returns", "Named recognition at host site"],
		image: "/ten5.jpg",
		action: "Request Term Sheet",
		primary: true,
	},
	{
		key: "port",
		name: "Per-Station Participation",
		price: 10000,
		badge: "On-Site Recognition",
		features: ["Port-level allocation", "QR-linked recognition"],
		image: "/ten3.jpg",
		action: "Request Allocation",
	},
	{
		key: "circle",
		name: "Strategic Partner",
		price: 5000,
		badge: "Support the Cause",
		features: ["Partner listing", "Project briefings"],
		image: "/ten8.jpg",
		action: "Request Intro Call",
	},
];

const KPIS = [
	{ label: "CALeVIP per port (cap)", value: "$55,000" },
	{ label: "Federal incentives (30%)", value: "$54,000" },
	{ label: "Sponsor match effect", value: "36×" },
	{ label: "Ports per Tribe (target)", value: "10" },
];

const FAQS = [
	{
		q: "How does my participation unlock 36×?",
		a: "Your tranche funds Tribal readiness (liaison, surveys, engineering, permits) that qualifies host sites for CALeVIP awards and federal credits. These program dollars plus private sponsors cover equipment and operations, multiplying the effect of your capital across ~10 ports per site.",
	},
	{
		q: "Can I focus on a specific Tribe or site?",
		a: "Yes. Note your preference in the request form. Allocation can be assigned to a host site with your review; if not selected by Sep 30, we'll follow up to discuss options.",
	},
	{
		q: "How are returns structured?",
		a: "Returns are milestone-indexed (e.g., shovel-ready, scheduled install, grant approval) and described in the term sheet. Public site copy is informational; we share specifics 1:1.",
	},
];

const TIMELINE = [
	{ date: "Aug 23", text: "Capital launch" },
	{ date: "Sep 30", text: "Target to submit all 10 sites" },
	{ date: "Oct 29", text: "CALeVIP Tribal priority window closes" },
	{ date: "Dec–Jun", text: "Installations & activation" },
];

const BUDGET = [
	{ label: "Tribal Community Liaison", value: 10000, color: "#21c55d" },
	{ label: "Accounting & Grant Management", value: 8000, color: "#00d0ff" },
	{ label: "Site Assessments & Surveys", value: 3000, color: "#f59e0b" },
	{ label: "Preliminary Engineering", value: 4000, color: "#60a5fa" },
	{ label: "Final Design & Stamped Plans", value: 6000, color: "#a78bfa" },
	{ label: "Permitting Support", value: 5000, color: "#ef4444" },
];

function currency(n) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(n);
}

function StatCard({ label, children }) {
	return (
		<div className="flex-1 min-w-[180px] rounded-2xl border border-[#1b2450] bg-card p-4">
			<div className="text-[12px] uppercase tracking-wider text-[#a8b3cf]">
				{label}
			</div>
			<div className="mt-1 text-[22px] font-extrabold">{children}</div>
		</div>
	);
}

function Countdown({ target }) {
	const [out, setOut] = useState("—");
	useEffect(() => {
		const tick = () => {
			const now = new Date();
			const diff = new Date(target).getTime() - now.getTime();
			if (diff <= 0) return setOut("0d 0h 0m");
			const d = Math.floor(diff / 86400000);
			const h = Math.floor((diff % 86400000) / 3600000);
			const m = Math.floor((diff % 3600000) / 60000);
			setOut(`${d}d ${h}h ${m}m`);
		};
		tick();
		const id = setInterval(tick, 60000);
		return () => clearInterval(id);
	}, [target]);
	return <>{out}</>;
}

function Cylinder({ percent = 100, label }) {
	const pct = Math.max(0, Math.min(100, percent));
	return (
		<div className="flex flex-col items-center gap-1" aria-hidden="true">
			<div className="relative h-24 w-8 overflow-hidden rounded-full border border-[#22306b] bg-[#0b2545]">
				<div
					className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,#21c55d,#a6ffcb)]"
					style={{ height: `${pct}%` }}
				/>
			</div>
			{label ? (
				<div className="text-[11px] leading-3 text-[#a8b3cf]">{label}</div>
			) : null}
		</div>
	);
}

function PieChart({
	segments,
	size = 220,
	innerRatio = 0.58,
	title = "Budget Snapshot",
	desc,
}) {
	const total = segments.reduce((s, x) => s + x.value, 0) || 1;
	const cx = size / 2;
	const cy = size / 2;
	const rOuter = size / 2 - 6;
	const rInner = rOuter * innerRatio;

	const toRad = (deg) => (deg - 90) * (Math.PI / 180);
	const fmt = (n) => Number(n.toFixed(6));
	const pc = (r, angle) => ({
		x: fmt(cx + r * Math.cos(toRad(angle))),
		y: fmt(cy + r * Math.sin(toRad(angle))),
	});
	const ringSeg = (start, end) => {
		const large = end - start > 180 ? 1 : 0;
		const p1 = pc(rOuter, start);
		const p2 = pc(rOuter, end);
		const p3 = pc(rInner, end);
		const p4 = pc(rInner, start);
		return [
			`M ${p1.x} ${p1.y}`,
			`A ${fmt(rOuter)} ${fmt(rOuter)} 0 ${large} 1 ${p2.x} ${p2.y}`,
			`L ${p3.x} ${p3.y}`,
			`A ${fmt(rInner)} ${fmt(rInner)} 0 ${large} 0 ${p4.x} ${p4.y}`,
			"Z",
		].join(" ");
	};

	let angle = 0;
	const paths = segments.map((seg, i) => {
		const sweep = (seg.value / total) * 360;
		const d = ringSeg(angle, angle + sweep);
		angle += sweep;
		return { d, color: seg.color, key: `${seg.label}-${i}` };
	});

	return (
		<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img">
			<title>{title}</title>
			{desc ? <desc>{desc}</desc> : null}
			{/* background ring */}
			<circle cx={fmt(cx)} cy={fmt(cy)} r={fmt(rOuter)} fill="#0b2545" />
			<circle cx={fmt(cx)} cy={fmt(cy)} r={fmt(rInner)} fill="#0f1a3d" />
			{paths.map((p) => (
				<path key={p.key} d={p.d} fill={p.color} />
			))}
		</svg>
	);
}

export default function Page() {
	const [raised] = useState(0); // display only; not changing behavior
	const [modalOpen, setModalOpen] = useState(false);
	const sitesFunded = useMemo(() => Math.floor(raised / 50000), [raised]);
	const progressPct = Math.max(0, Math.min(100, (raised / GOAL) * 100));
	const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || ""; // set in .env.local
	const BOOKING_TITLE = process.env.NEXT_PUBLIC_BOOKING_TITLE || "Book a call";

	useEffect(() => {
		if (!modalOpen) return;
		const onKey = (e) => {
			if (e.key === "Escape") setModalOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [modalOpen]);

	function CalendarEmbed({ src, title }) {
		return (
			<div>
				<iframe
					src={src}
					title={title}
					loading="lazy"
					className="h-[70vh] w-full rounded-xl border border-[#1e2b5c] bg-[#0a1537]"
					allow="fullscreen; geolocation *; microphone *; camera *"
				/>
				<p className="mt-2 text-sm text-[#cfe0ff]">
					Trouble loading?{" "}
					<a
						className="underline"
						href={src}
						target="_blank"
						rel="noopener noreferrer"
					>
						Open booking page in a new tab
					</a>
					.
				</p>
			</div>
		);
	}

	return (
		<>
			{/* HERO */}
			<header className="relative overflow-hidden bg-[radial-gradient(1200px_400px_at_70%_-20%,rgba(0,208,255,.25),transparent),linear-gradient(180deg,#0b1020,#0b1020_55%,#0a0f24)]">
				<div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-7 p-6 py-12 lg:grid-cols-[1.1fr_.9fr]">
					<div>
						<div className="inline-block rounded-full border border-[#1c2f67] bg-[#10214a] px-2.5 py-1 text-[13px] text-[#bcd2ff]">
							Fundraising ends <strong>Sep 30, 2025</strong> • CALeVIP Tribal
							window closes <strong>Oct 29, 2025</strong>
						</div>
						<h1 className="mt-3 text-[40px] font-extrabold leading-[1.05] tracking-tight">
							Launch the Tribal Energy Network: Finance 10 Tribal Fast-Charge
							Sites
						</h1>
						<p className="mt-3 text-[18px] text-muted">
							A <strong>$50k</strong> site tranche can unlock ~
							<strong>$1.8M</strong> per Tribe via CALeVIP grants, federal
							credits, and network sponsors. Investor participation is
							milestone-indexed; see the deck for terms.
						</p>
						<div className="mt-5 flex flex-wrap gap-3">
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => setModalOpen(true)}
							>
								Request Term Sheet
							</button>
							<button
								type="button"
								className="btn btn-outline"
								onClick={() =>
									window.open(
										"https://calevip.org/fast-charge-california-project",
										"_blank",
									)
								}
							>
								Learn More about CALeVIP
							</button>
						</div>
						<div className="mt-5 flex flex-wrap gap-4">
							<div className="min-w-[260px] flex-1 card">
								<div className="text-[12px] uppercase tracking-wider text-[#a8b3cf]">
									Goal
								</div>
								<div className="mt-1 text-[22px] font-extrabold">
									$500,000 by Sep 30
								</div>
								<div
									className="relative h-4 overflow-hidden rounded-xl border border-[#1b2450] bg-[#0f1a3d]"
									aria-label="progress to goal"
									role="progressbar"
									aria-valuemin={0}
									aria-valuemax={100}
									aria-valuenow={Math.round(progressPct)}
								>
									<span
										style={{ width: `${progressPct}%` }}
										className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,#21c55d,#a6ffcb)]"
									/>
								</div>
								<div className="mt-1 text-[13px] text-[#b8c4e3]">
									{currency(raised)} raised • {sitesFunded}/10 sites funded
								</div>
							</div>
							<StatCard label="Countdown to Sep 30">
								<Countdown target="2025-09-30T23:59:59-05:00" />
							</StatCard>
							<StatCard label="Countdown to Oct 29 (CALeVIP Grant Deadline)">
								<Countdown target="2025-10-29T23:59:59-05:00" />
							</StatCard>
						</div>
					</div>
					<div>
						<div className="relative mb-2 aspect-[6/3] w-full overflow-hidden rounded-2xl border border-[#22306b] bg-[#0f1a3d]">
							<Image
								src="/ten0.jpg"
								alt="Hero visual placeholder"
								fill
								sizes="(min-width: 1024px) 50vw, 100vw"
								className="object-cover opacity-85"
								priority
							/>
						</div>
						<div className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-4 text-[#cfe0ff]">
							<strong>Mission-First:</strong> Participation strengthens Tribal
							infrastructure. For private sponsorship or investment, request the
							term sheet and we'll follow up 1:1.
						</div>
						<ul className="mt-2 grid gap-2">
							<li className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-3">
								CALeVIP Fast Charge California Project: up to{" "}
								<strong>$55,000 per port</strong> with Tribal priority.
							</li>
							<li className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-3">
								Federal incentives: Per ~$180,000 port, 30% tax credits cover ~
								<strong>$54,000 per port</strong>.
							</li>
							<li className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-3">
								Private network sponsorships complete funding for installation
								and operations.
							</li>
						</ul>
					</div>
				</div>
			</header>

			{/* NEW: Investment Overview Deck (Canva) */}
			<section id="deck" className="mx-auto max-w-[1100px] p-6">
				<h2 className="text-[28px] font-bold">Investment Overview Deck</h2>
				<p className="mt-1 max-w-[72ch] text-[#d7deee]">
					Walk through the structure, risk controls, milestones, and modeled
					returns. For a detailed term sheet, use the "Request Term Sheet"
					button.
				</p>
				<div className="relative mt-4 w-full overflow-hidden rounded-xl border border-[#22306b] bg-[#0f1a3d]">
					<div
						style={{
							position: "relative",
							width: "100%",
							height: 0,
							paddingTop: "56.25%",
							boxShadow: "0 2px 8px rgba(63,69,81,0.16)",
							overflow: "hidden",
							borderRadius: 8,
						}}
					>
						<iframe
							loading="lazy"
							title="AN-TEN Sponsorship"
							src="https://www.canva.com/design/DAGwLBmZn74/su-79oMkSXQWohC1JzNkbg/view?embed"
							allow="fullscreen"
							style={{
								position: "absolute",
								inset: 0,
								width: "100%",
								height: "100%",
								border: "none",
							}}
						/>
					</div>
					<p className="mt-2 text-sm text-[#cfe0ff]">
						Trouble loading?{" "}
						<a
							className="underline"
							href="https://www.canva.com/design/DAGwLBmZn74/su-79oMkSXQWohC1JzNkbg/view?utm_content=DAGwLBmZn74&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
							target="_blank"
							rel="noopener noreferrer"
						>
							Open the deck in a new tab
						</a>
						.
					</p>
				</div>
			</section>

			<main id="main">
				<section className="mx-auto max-w-[1100px] p-6">
					<h2 className="text-[28px] font-bold">
						Your $1 Unlocks ~$36 in Clean Energy Infrastructure
					</h2>
					<p className="mt-1 max-w-[72ch] text-[#d7deee]">
						A $50,000 site tranche can trigger a ~36× match through grants, tax
						credits, and sponsorship—qualifying a bank of fast chargers at a
						Tribal business with <em>no out-of-pocket</em> to the Tribe.
						Investor participation is milestone-indexed and detailed in the term
						sheet.
					</p>
					<div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
						{KPIS.map(({ label, value }) => (
							<div
								key={label}
								className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-4"
							>
								<div className="text-[12px] uppercase tracking-wider text-[#a8b3cf]">
									{label}
								</div>
								<div className="mt-1 text-[22px] font-extrabold">{value}</div>
							</div>
						))}
					</div>
					<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
						<div className="flex flex-col rounded-2xl border border-[#1b2450] gap-4 bg-card p-4 lg:col-span-7">
							<div className="flex-1">
								<h3 className="text-lg font-semibold">36x Multiplier</h3>
								<p className="mt-1">
									$50k seed unlocks ~$1.8M in program/go-to-market enablement
									per Tribe (≈10 ports @ ~$180k all-in/port). Returns are tied
									to milestone progress.
								</p>
							</div>
							<figure>
								<div className="mt-2 flex flex-wrap items-end gap-4">
									<Cylinder percent={28} label="$50k" />
									<span className="text-2xl">=</span>
									<div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
										{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
											<Cylinder key={`full-${n}`} percent={100} label="$180k" />
										))}
									</div>
								</div>
								<figcaption className="sr-only">
									Seed funding at ~20% unlocks ten fully funded ports.
								</figcaption>
							</figure>
						</div>
						<div className="rounded-2xl border border-[#1b2450] bg-card p-4 lg:col-span-5">
							<h3 className="text-lg font-semibold">How Funds Flow</h3>
							<p>
								Participation funds Tribal readiness that qualifies sites for
								CALeVIP awards and federal credits. Cash is custodied at a
								Native-owned FDIC bank (CD) with a CD-backed line of credit;
								draw limits throttle downside. Upside is tied to sites reaching
								shovel-ready and then grant approval. Term sheet covers the
								schedule.
								<br />
								<br />
								Hurry—California matching ends Oct 29, and federal matching
								sunsets June 30, 2026.
							</p>
						</div>
					</div>
				</section>

				<section className="mx-auto max-w-[1100px] p-6">
					<h2 className="text-[28px] font-bold">
						How This Helps Tribes & Native-Owned Businesses
					</h2>
					<div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
						{[
							{
								title: "$1,000,000+ Annual Revenue",
								body: "EV DC Fast Charger sessions + incremental foot traffic support Native-owned businesses and tourism.",
								image: "/ten6.jpg",
							},
							{
								title: "Tribal Energy Resilience",
								body: "Upgrades that pave the way for solar, storage, and microgrids, strengthening Tribal energy sovereignty.",
								image: "/ten7.jpg",
							},
							{
								title: "No Indoor Space Required",
								body: "Unlike ATMs or kiosks, chargers use parking stalls and bring new and high net-worth customers to the door.",
								image: "/ten2.jpg",
							},
						].map((c) => (
							<div
								key={c.title}
								className="rounded-2xl border border-[#1b2450] bg-card p-4"
							>
								<div className="relative mb-3 h-28 w-full overflow-hidden rounded-xl border border-[#22306b] bg-[#0f1a3d]">
									<Image
										src={c.image}
										alt="Benefit visual placeholder"
										fill
										sizes="(min-width: 1024px) 33vw, 100vw"
										className="object-cover opacity-85"
									/>
								</div>
								<h3 className="text-lg font-semibold">{c.title}</h3>
								<p className="text-[#cdd6f4]">{c.body}</p>
							</div>
						))}
					</div>
				</section>

				{/* Use of Proceeds (renamed) */}
				<section className="mx-auto max-w-[1100px] p-6">
					<h2 className="text-[28px] font-bold">Use of Proceeds</h2>
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						<div className="rounded-2xl border border-[#1b2450] bg-card p-4">
							<h3 className="text-lg font-semibold">Readiness & Execution</h3>
							<ul className="mt-2 grid gap-2">
								{[
									"Tribal liaison & outreach",
									"Site surveys & travel",
									"Grant writing & submissions",
									"Project coordination & admin",
								].map((i) => (
									<li
										key={i}
										className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-3"
									>
										{i}
									</li>
								))}
							</ul>
						</div>
						<div className="rounded-2xl border border-[#1b2450] bg-card p-4">
							<h3 className="text-lg font-semibold">
								Where Program Dollars Go
							</h3>
							<ul className="mt-2 grid gap-2">
								{[
									"Hardware & engineering",
									"Installation & commissioning",
									"Warranty & maintenance",
									"Infrastructure upgrades",
								].map((i) => (
									<li
										key={i}
										className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-3"
									>
										{i}
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
						<div className="rounded-2xl border border-[#1b2450] bg-card p-4">
							<h3 className="text-lg font-semibold">Budget Snapshot</h3>
							<figure className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
								<PieChart
									title="Use of $50,000 site tranche"
									desc="Tribal Community Liaison $13,000; Accounting and Grant Management $11,000; Site Assessments and Surveys $4,000; Preliminary Engineering $6,000; Final Design and Stamped Plans $9,000; Permitting Support $7,000."
									segments={BUDGET}
								/>
								<figcaption className="sm:ml-4">
									<ul className="grid gap-2">
										{BUDGET.map((s) => (
											<li
												key={s.label}
												className="flex items-center gap-2 text-[#cdd6f4]"
											>
												<span
													className="inline-block h-3 w-3 rounded-sm"
													style={{ backgroundColor: s.color }}
												/>
												<span className="text-sm">{s.label}</span>
											</li>
										))}
									</ul>
								</figcaption>
							</figure>
						</div>
						<div className="rounded-2xl border border-[#1b2450] bg-card p-4">
							<h3 className="text-lg font-semibold">Timeline</h3>
							<ul className="mt-2 grid gap-2">
								{TIMELINE.map((t) => (
									<li
										key={t.date}
										className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-3"
									>
										<strong>{t.date}:</strong> {t.text}
									</li>
								))}
							</ul>
						</div>
					</div>
				</section>

				{/* NEW: Risk & Return Mechanics */}
				<section id="mechanics" className="mx-auto max-w-[1100px] p-6">
					<h2 className="text-[28px] font-bold">Risk & Return Mechanics</h2>
					<div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
						<div className="rounded-2xl border border-[#1b2450] bg-card p-4">
							<h3 className="text-lg font-semibold">Downside Controls</h3>
							<ul className="mt-2 grid gap-2">
								<li className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-3">
									Custody via Native-owned FDIC bank CD; capital access via
									CD-backed line of credit with draw limits.
								</li>
								<li className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-3">
									Staged draws only as sites hit milestones (e.g., shovel-ready,
									scheduled install).
								</li>
							</ul>
						</div>
						<div className="rounded-2xl border border-[#1b2450] bg-card p-4">
							<h3 className="text-lg font-semibold">Return Triggers</h3>
							<p>
								Returns accrue as sites achieve milestones (shovel-ready → grant
								approval). See the deck for schedules and modeled outcomes tied
								to 10-site completion.
							</p>
						</div>
					</div>
				</section>

				{/* See the Sites */}
				<section className="mx-auto grid max-w-[1100px] grid-cols-1 items-stretch gap-4 p-6 lg:grid-cols-2">
					<div>
						<h2 className="text-[28px] font-bold">See the Sites</h2>
						<p className="mt-1 max-w-[72ch] text-[#d7deee]">
							Explore the proposed Tribal locations and track activation
							progress.
						</p>
						<button
							type="button"
							className="mt-3 btn btn-outline"
							onClick={() =>
								window.open(
									"https://prepace.github.io/ten-map",
									"_blank",
									"noopener,noreferrer",
								)
							}
						>
							Open TEN Map
						</button>
					</div>
					<div className="relative h-48 w-full overflow-hidden rounded-xl border border-[#22306b] bg-[#0f1a3d] lg:self-stretch">
						<Image
							src="/ten9.png"
							alt="TEN Map preview"
							fill
							sizes="(min-width: 1024px) 33vw, 100vw"
							className="object-cover opacity-85"
							onClick={() =>
								window.open(
									"https://prepace.github.io/ten-map",
									"_blank",
									"noopener,noreferrer",
								)
							}
						/>
					</div>
				</section>

				{/* Participation Options (renamed from Ways to Give) */}
				<section className="mx-auto max-w-[1100px] p-6">
					<h2 className="text-[28px] font-bold">Participation Options</h2>
					<div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-3">
						{TIERS.map((t) => (
							<div
								key={t.key}
								className="flex flex-col gap-3 rounded-2xl border border-[#1b2450] bg-card p-4"
							>
								<div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#22306b] bg-[#0f1a3d]">
									<Image
										src={t.image}
										alt={`${t.name} visual placeholder`}
										fill
										sizes="(min-width: 1024px) 33vw, 100vw"
										className="object-cover opacity-85"
									/>
								</div>
								{t.badge && (
									<div className="inline-flex items-center gap-2 rounded-full border border-[#1c2f67] bg-[#10214a] px-3 py-2 text-[13px] text-[#bcd2ff]">
										{t.badge}
									</div>
								)}
								<h3 className="text-lg font-semibold">{t.name}</h3>
								<div className="text-2xl font-extrabold">
									{t.price >= 1000
										? `$${t.price.toLocaleString()}`
										: `$${t.price}+`}
								</div>
								<ul className="list-disc pl-5 text-[#cdd6f4]">
									{t.features.map((f) => (
										<li key={f}>{f}</li>
									))}
								</ul>
								<button
									type="button"
									className={t.primary ? "btn btn-primary" : "btn btn-outline"}
									onClick={() => {
										setModalOpen(true);
									}}
								>
									{t.action}
								</button>
							</div>
						))}
					</div>
					<p className="mt-3 text-[#aebce5]">
						Prefer to start with an intro call? Use "Request Intro Call" and
						we'll schedule time.
					</p>
				</section>

				{/* Transparency & Compliance */}
				<section className="mx-auto max-w-[1100px] p-6">
					<h2 className="text-[28px] font-bold">
						Transparency & Accountability
					</h2>
					<div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
						<div className="rounded-2xl border border-[#1b2450] bg-card p-4">
							<h3 className="text-lg font-semibold">Reporting</h3>
							<p>
								We'll share site activation photos, progress reports, and an
								annual impact summary. Use-of-proceeds is restricted to Tribal
								readiness and grant execution for eligible businesses. Depending
								on participation, additional reporting may be provided.
							</p>
						</div>
						<div className="rounded-2xl border border-[#1b2450] bg-card p-4">
							<h3 className="text-lg font-semibold">Compliance</h3>
							<p>
								This page is informational and not an offer to sell or a
								solicitation to buy any security. Any investment will be made
								only pursuant to definitive documents and may be limited to
								qualified or accredited parties; no guarantees of performance
								are made. Request the term sheet for details.
							</p>
						</div>
					</div>
				</section>

				{/* FAQ (structure unchanged) */}
				<section className="mx-auto max-w-[1100px] p-6">
					<h2 className="text-[28px] font-bold">FAQ</h2>
					<div className="mt-2 grid gap-3">
						{FAQS.map((f) => (
							<div
								key={f.q}
								className="rounded-xl border border-[#22306b] bg-[#0f1a3d] p-4"
							>
								<strong>{f.q}</strong>
								<br />
								{f.a}
							</div>
						))}
					</div>
				</section>
			</main>

			{/* FOOTER unchanged */}
			<footer className="bg-[#0a0f24] text-[#a5b3d5]">
				<div className="mx-auto max-w-[1100px] p-6">
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
						<div>
							<h3 className="mt-0 text-[#e7eeff]">Contact</h3>
							<div className="flex flex-wrap gap-4">
								<div>
									<p className="mt-2">
										Jennifer Schlosberg — CEO, Amerind Nation LLC
									</p>
									<p>jenni@amerindnation.com • 918-271-8477</p>
								</div>
								<div>
									<p className="mt-2">
										Pace Ellsworth — CIO, Amerind Nation LLC
									</p>
									<p>pace@amerindnation.com • 480-636-0927</p>
								</div>
							</div>
						</div>
					</div>
					<p className="mt-4 text-xs">
						© {new Date().getFullYear()} Amerind Nation LLC — Tribal Energy
						Network
					</p>
				</div>
			</footer>

			{modalOpen && (
				<div
					className="fixed inset-0 grid place-items-center bg-black/60 backdrop-blur-sm"
					role="dialog"
					aria-modal="true"
					aria-label="Request Term Sheet"
				>
					<div className="w-[92%] max-w-[640px] rounded-2xl border border-[#22306b] bg-[#0f1a3d] p-5">
						<div className="mb-2 flex flex-wrap items-center justify-between gap-2">
							<h3 className="m-0 text-lg font-semibold">
								{BOOKING_URL ? BOOKING_TITLE : "Request Term Sheet"}
							</h3>
							<button
								type="button"
								className="rounded-2xl border border-[#17406f] bg-[#0b2545] px-4 py-2 font-bold text-[#cfe9ff]"
								onClick={() => setModalOpen(false)}
							>
								Close
							</button>
						</div>
						{BOOKING_URL ? (
							<CalendarEmbed src={BOOKING_URL} title={BOOKING_TITLE} />
						) : (
							<>
								<p className="text-[#cfe0ff]">
									Share your details and we'll follow up 1:1 with the term
									sheet, site pipeline, and milestone-based schedules.
								</p>
								<form
									className="mt-3"
									onSubmit={(e) => {
										e.preventDefault();
										alert("Thanks! We'll follow up within 1 business day.");
										setModalOpen(false);
									}}
								>
									<div className="flex flex-wrap gap-3">
										<div className="min-w-[220px] flex-1">
											<label
												htmlFor="name"
												className="text-[13px] text-[#a8b3cf]"
											>
												Full Name
											</label>
											<input
												name="name"
												required
												className="w-full rounded-xl border border-[#1e2b5c] bg-[#0a1537] p-3 text-[#e9f2ff]"
											/>
										</div>
										<div className="min-w-[220px] flex-1">
											<label
												htmlFor="email"
												className="text-[13px] text-[#a8b3cf]"
											>
												Email
											</label>
											<input
												type="email"
												name="email"
												required
												className="w-full rounded-xl border border-[#1e2b5c] bg-[#0a1537] p-3 text-[#e9f2ff]"
											/>
										</div>
									</div>
									<div className="mt-3 flex flex-wrap gap-3">
										<div className="min-w-[220px] flex-1">
											<label
												htmlFor="phone"
												className="text-[13px] text-[#a8b3cf]"
											>
												Phone
											</label>
											<input
												name="phone"
												className="w-full rounded-xl border border-[#1e2b5c] bg-[#0a1537] p-3 text-[#e9f2ff]"
											/>
										</div>
										<div className="min-w-[220px] flex-1">
											<label
												htmlFor="interest"
												className="text-[13px] text-[#a8b3cf]"
											>
												Interest
											</label>
											<select
												name="interest"
												className="w-full rounded-xl border border-[#1e2b5c] bg-[#0a1537] p-3 text-[#e9f2ff]"
											>
												<option>Tribal Site Note ($50,000)</option>
												<option>Per-Station Participation ($10,000)</option>
												<option>Strategic Partner</option>
												<option>Corporate Sponsorship</option>
												<option>Private Placement / Investment</option>
											</select>
										</div>
									</div>
									<div className="mt-3">
										<label
											htmlFor="message"
											className="text-[13px] text-[#a8b3cf]"
										>
											Notes (optional)
										</label>
										<textarea
											rows={4}
											placeholder="e.g., Preference for Paskenta Rancheria; amount & timeline"
											className="w-full rounded-xl border border-[#1e2b5c] bg-[#0a1537] p-3 text-[#e9f2ff]"
										/>
									</div>
									<div className="mt-3 flex justify-end">
										<button
											className="rounded-2xl bg-primary px-4 py-3 font-bold text-[#062b15] shadow-glow"
											type="submit"
										>
											Send Request
										</button>
									</div>
								</form>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
}

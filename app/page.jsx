"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import coalition from "../data/coalition.json";

const bookingUrl =
	process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com/ampace";

const sources = [
	[
		"CA NEVI",
		"$0.80M",
		"grant",
		"Approx. 80% of eligible EVSE capex; reimbursement timing applies.",
	],
	[
		"48E elective pay",
		"$1.60M",
		"refundable tax credit",
		"Approx. 40% of $4M battery basis; subject to counsel and program rules.",
	],
	[
		"NMTC net benefit target",
		"$1.00M",
		"incentive",
		"Allocation, fees, eligibility, and portfolio approach required.",
	],
	[
		"SSBCI / CDFI facility",
		"$0.87M",
		"repayable debt/credit facility",
		"Construction liquidity that bridges grant and credit timing.",
	],
	[
		"SGIP battery support",
		"$0.63M",
		"incentive",
		"Program step, rate, storage tier, and cap mechanics apply.",
	],
	[
		"TOE cash escrow",
		"$0.10M",
		"cash escrow",
		"Tribal cash contribution via CD-secured escrow with Native bank partners.",
	],
];

const uses = [
	[
		"EVSE",
		"$1.00M",
		"8 public DC fast-charging positions; final kW and connector mix optimized for CEC scoring and utility conditions.",
	],
	[
		"BESS",
		"$4.00M",
		"Just-under-1 MW / up to 6 MWh battery system; sodium-ion or flow battery selected through procurement and eligibility review.",
	],
];

const tranches = [
	["June 2026", "$20k", "NEVI pre-development kickoff"],
	["September 2026", "$20k", "NEVI application submission"],
	["December 2026", "$20k", "NEVI grant conditional award"],
	["March 2027", "$20k", "EVSE delivery"],
	["June 2027", "$20k", "Substantial completion, prior to PTO"],
];

const qualificationStats = [
	[
		"25",
		"Identified eligible Tribes",
		"Along Alternative Fuel Corridors in California.",
	],
	[
		"17",
		"NMTC eligible census tracts",
		"New Markets Tax Credit eligibility is verified by census tract.",
	],
	[
		"9",
		"Energy Community counties",
		"Energy Community Tax Credit eligibility is screened by county.",
	],
	[
		"2026+",
		"Best-fit energy path",
		"If NEVI 6 is not the fit, we identify the strongest Tribal energy opportunity.",
	],
];

const partnerDetails = [
	[
		"Amerind Nation / TEN",
		"100% Native-owned sponsor, grant strategist, capital-weaving lead, and long-term operating coordinator.",
	],
	[
		"Colusa Indian Energy",
		"California Tribal microgrid and EPC experience for resilience-forward energy infrastructure.",
	],
	[
		"Allumia",
		"Energy-efficiency and energy construction project-management platform.",
	],
	[
		"7 Generations",
		"Native-led advisory and deployment partner for Tribal infrastructure and clean-energy development.",
	],
	[
		"InCharge Energy",
		"EV charging partner candidate; final equipment and CPO roles remain procurement-dependent.",
	],
	[
		"Sovereign Bank",
		"Native-owned depository institution providing cash match escrow services and TEN credit facilities.",
	],
];

const batteryNotes = [
	[
		"CCS + NACS EV charging ports",
		"Our installation leverages dual-port ICE-180s with CCS and NACS connectors, able to flexibly support future charging standards.",
	],
	[
		"Battery-first economics",
		"EV charging alone can struggle under full project finance. The BESS is what manages peak demand, preserves off-peak energy economics, and supports site resilience.",
	],
	[
		"Sodium-ion or flow baseline",
		"Sodium-ion and vanadium-flow options are being screened for safety, footprint, warranty, domestic-content, and FEOC/MACR readiness.",
	],
	[
		"480V three-phase integration",
		"Controls should allow the chargers to use the grid directly while the battery shaves peak demand and shifts load when rates make it valuable.",
	],
	[
		"Compact travel-center footprint",
		"Canopy, cantilevered, containerized, and below-grade battery layouts are design options for sites where land is tight.",
	],
	[
		"Forward compatibility",
		"TEN's model optimizes maintenance & upgrades, and supports adding renewables and other site amenities over time to support sovereignty.",
	],
];

const faqs = [
	[
		"What is CA NEVI 6?",
		"California's next funding round under the National Electric Vehicle Infrastructure program to deploy public DC fast charging along designated corridors. We support Tribes in site readiness, application, award compliance, and delivery.",
	],
	[
		"What's in the $5M per-site package?",
		"A $1M EV fast charging build sized for competitive NEVI scoring plus a $4M battery system, including development, delivery coordination, and subcontracted O&M support.",
	],
	[
		"How much cash does the Tribe put in?",
		"$100,000 total through a wholly-owned TOE in CD-secured escrow, released in five $20,000 milestone tranches.",
	],
	[
		"Why does the Tribe contribute cash at all?",
		"Aligns incentives, supports pre-development momentum, and helps unlock the broader capital stack while keeping Tribal exposure capped and predictable.",
	],
	[
		"Is SSBCI/CDFI free money?",
		"No — it is repayable financing used to bridge timing gaps and reduce friction. Repaid from project cash flows and/or reimbursements.",
	],
	[
		"Is NMTC guaranteed?",
		"No. NMTC is allocation-based and requires CDE allocation. We model a target net benefit and pursue it at the portfolio level.",
	],
	[
		"How does 48E elective pay work for Tribes?",
		"Eligible Tribal entities can receive the credit value as a refundable payment, subject to wage/apprenticeship rules, domestic content, and compliance.",
	],
	[
		"What is SGIP?",
		"California's Self-Generation Incentive Program — incentive for energy storage. Availability depends on program step/rates and eligibility.",
	],
	[
		"What if NEVI is not awarded?",
		"Proceed with the battery + targeted energy improvements. EV charging can be pursued through other grant programs or later rounds.",
	],
	[
		"Who owns the equipment?",
		"TEN initially owns and operates. TOE receives a contractual share of net operational benefits, with a path to Tribal ownership via capacity certification.",
	],
	[
		"What is capacity certification?",
		"Verification the Tribe/TOE can assume ownership responsibly (operations, maintenance, compliance). TEN facilitates the process.",
	],
	[
		"Do we need to hire staff?",
		"No. TOE incurs no operating expense in the base structure; TEN manages O&M via subcontractors.",
	],
	[
		"How is charging margin calculated?",
		"Charging revenue minus energy costs, network/CPO fees, maintenance, and other operating expenses. Transparent waterfall and reporting in the agreement.",
	],
	[
		"How does the battery save/make money?",
		"Reducing peak demand costs, shifting energy usage to lower-cost periods, supporting reliability, and capturing permissible arbitrage/savings depending on tariffs and operating rules.",
	],
	[
		"Is this a microgrid?",
		"Microgrid-ready. True microgrid operation depends on site controls, interconnection permissions, and additional generation/controls.",
	],
	[
		"Does this include LCFS revenue?",
		"Presented before LCFS — treated as incremental upside if captured contractually.",
	],
	[
		"What are the biggest risks?",
		"Grant award uncertainty, reimbursement/credit timing, SGIP step availability, NMTC allocation availability, operational utilization. Mitigated by portfolio structuring, compliance-first procurement, conservative underwriting.",
	],
	[
		"How long does deployment take?",
		"Day 1 kickoff → Day 90+ submission → Day 180+ award → Day 270+ delivery → Day 360+ substantial completion. Actual timing depends on interconnection and permitting.",
	],
	[
		"Can this scale?",
		"Yes — designed for 2–20 Tribes with standardized package, portfolio procurement, and repeatable compliance.",
	],
	[
		"Is this legal/tax advice?",
		"No. Planning information only. Final structures and eligibility confirmed with qualified counsel and program administrators.",
	],
];

function formatDate(value) {
	return new Intl.DateTimeFormat("en", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(new Date(`${value}T00:00:00`));
}

function Eyebrow({ children, className = "" }) {
	return (
		<p
			className={`mb-3 font-mono font-semibold uppercase tracking-[0.11em] text-[#b36b1f] ${className}`}
		>
			{children}
		</p>
	);
}

function DisplayHeading({ children, id, className = "" }) {
	return (
		<h2
			id={id}
			className={`text-balance font-serif text-4xl leading-[1.05] text-[#1c1a15] md:text-5xl ${className}`}
		>
			{children}
		</h2>
	);
}

function Section({ children, className = "", id }) {
	return (
		<section
			id={id}
			className={`mx-auto max-w-7xl px-4 py-14 sm:px-8 ${className}`}
		>
			{children}
		</section>
	);
}

function SectionHead({ title, children, light = false }) {
	return (
		<div
			className={`mb-6 grid gap-4 border-t pt-4 md:grid-cols-[1fr_minmax(18rem,40rem)] md:items-end ${
				light ? "border-[#fffdf7]/65" : "border-[#1c1a15]"
			}`}
		>
			<DisplayHeading className={light ? "text-[#fffdf7]" : ""}>
				{title}
			</DisplayHeading>
			<p
				className={`max-w-2xl ${
					light ? "text-[#fffdf7]/75" : "text-[#3b3830]"
				}`}
			>
				{children}
			</p>
		</div>
	);
}

function PrimaryLink({
	href,
	children,
	variant = "dark",
	className = "",
	newTab = false,
}) {
	const variants = {
		dark: "border-[#1c1a15] bg-[#1c1a15] text-[#fffdf7]",
		gold: "border-[#b36b1f] bg-[#b36b1f] text-[#1c1a15]",
		glass: "border-[#fffdf7]/55 bg-[#fffdf7]/10 text-[#fffdf7]",
	};

	return (
		<a
			className={`inline-flex min-h-11 items-center justify-center border px-4 py-3 font-bold transition-transform hover:-translate-y-0.5 ${variants[variant]} ${className}`}
			href={href}
			target={newTab ? "_blank" : undefined}
			rel={newTab ? "noopener noreferrer" : undefined}
		>
			{children}
		</a>
	);
}

function GridShell({ children, className = "" }) {
	return (
		<div
			className={`grid gap-[2px] border-[2px] border-[#d9d2c2] bg-[#d9d2c2] ${className}`}
		>
			{children}
		</div>
	);
}

function StatCard({ value, label, note }) {
	return (
		<div className="bg-[#fffdf7] p-5">
			<strong className="block font-serif text-4xl leading-none text-[#276449]">
				{value}
			</strong>
			<span className="mt-2 block text-[0.92rem] text-[#3b3830]">
				{label ? <b>{label}</b> : null}
				{label && note ? " — " : null}
				{note ?? label}
			</span>
		</div>
	);
}

function SourceCard({ title, amount, type, children }) {
	return (
		<div className="bg-[#fffdf7] p-5">
			<h3 className="mb-2 flex gap-4 text-balance font-serif text-2xl leading-tight text-[#1c1a15]">
				<span>{title}</span>
				{amount ? (
					<span className="ml-auto whitespace-nowrap font-mono text-base text-[#276449]">
						{amount}
					</span>
				) : null}
			</h3>
			{type ? (
				<span className="mb-3 inline-flex font-mono text-[0.73rem] font-semibold uppercase tracking-[0.11em] text-[#6b6658]">
					{type}
				</span>
			) : null}
			<p className="m-0 text-[#3b3830]">{children}</p>
		</div>
	);
}

function Disclaimer({ children, dark = false }) {
	return (
		<div
			className={`mt-4 border-l-4 border-[#b36b1f] p-4 ${
				dark
					? "bg-[#fffdf7]/10 text-[#fffdf7]/75"
					: "bg-[#ece7dc] text-[#3b3830]"
			}`}
		>
			{children}
		</div>
	);
}

function CheckList({ items }) {
	return (
		<ul className="grid gap-3">
			{items.map((item) => (
				<li
					className="grid grid-cols-[1rem_1fr] gap-2 text-[#fffdf7]/80"
					key={item}
				>
					<span className="font-bold text-[#b36b1f]">✓</span>
					<span>{item}</span>
				</li>
			))}
		</ul>
	);
}

function CoalitionThermometer() {
	const [visibleCount, setVisibleCount] = useState(0);
	const ref = useRef(null);
	const { tribesSignedOn, currentGoal, milestones, lastUpdated } = coalition;
	const activeMilestone =
		milestones.find((milestone) => milestone.n === currentGoal) ||
		milestones.find((milestone) => milestone.role === "active") ||
		milestones[0];
	const stretchGoals = milestones.filter(
		(milestone) => milestone.n > currentGoal,
	);
	const summary = `${tribesSignedOn} of ${currentGoal} Tribes signed on. Next milestone: ${activeMilestone.label} at ${currentGoal} Tribes. Stretch goals: ${stretchGoals.map((milestone) => `${milestone.label} at ${milestone.n}`).join(", ")}.`;

	useEffect(() => {
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (reduceMotion) {
			setVisibleCount(tribesSignedOn);
			return;
		}

		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisibleCount(tribesSignedOn);
					observer.disconnect();
				}
			},
			{ threshold: 0.35 },
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [tribesSignedOn]);

	return (
		<section
			className="relative z-10 mx-auto -mt-6 grid max-w-7xl border border-[#1c1a15] bg-[#1c1a15] md:grid-cols-[0.42fr_1fr]"
			ref={ref}
			aria-labelledby="coalition-title"
		>
			<div className="bg-[#fffdf7] p-5 md:p-8">
				<Eyebrow>Coalition momentum</Eyebrow>
				<DisplayHeading id="coalition-title">Tribes Signed On</DisplayHeading>
				<p className="mt-3 text-[#3b3830]">
					The count reflects signed Tribes only. Identified or in-diligence
					sites stay in the pipeline until an agreement is signed.
				</p>
				<div className="mt-5 border-l-4 border-[#b36b1f] bg-[#ece7dc] p-4">
					<h3 className="font-serif text-2xl leading-tight text-[#1c1a15]">
						Key Dates
					</h3>
					<ul className="mt-3 grid gap-2 text-[#3b3830]">
						<li>
							<strong>5/15/26</strong> — Invite-only TEN slots open.
						</li>
						<li>
							<strong>6/15/26</strong> — NEVI 6 application opens.
						</li>
						<li>
							<strong>8/15/26</strong> — LAST DAY to join coalition!
						</li>
					</ul>
				</div>
			</div>

			<div className="border-t border-[#1c1a15] bg-[#fffdf7] p-5 md:border-l md:border-t-0 md:p-8">
				<div className="mb-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
					<div>
						<strong className="block font-serif text-3xl leading-none text-[#1c1a15] md:text-5xl">
							{tribesSignedOn} of {currentGoal} Tribes signed on
						</strong>
						<span className="mt-2 block font-mono text-xs uppercase tracking-[0.08em] text-[#6b6658]">
							Last updated {formatDate(lastUpdated)}
						</span>
					</div>
					<PrimaryLink href="#eligibility">Bring your Tribe</PrimaryLink>
				</div>

				<p className="sr-only">{summary}</p>
				<div
					className="flex h-12 overflow-hidden border border-[#d9d2c2] bg-[#ece7dc]"
					role="progressbar"
					aria-valuenow={tribesSignedOn}
					aria-valuemin={0}
					aria-valuemax={currentGoal}
					aria-label={`Tribes signed on toward ${activeMilestone.label}`}
				>
					{Array.from({ length: currentGoal }, (_, index) => (
						<span
							aria-hidden="true"
							className={`min-w-0 flex-1 border-r border-[#d9d2c2] transition-colors duration-700 last:border-r-0 motion-reduce:transition-none ${
								index < visibleCount ? "bg-[#276449]" : "bg-transparent"
							}`}
							key={`progress-${index + 1}`}
						/>
					))}
				</div>

				<button
					className="mt-4 grid w-full cursor-help grid-cols-[2.35rem_1fr] items-start gap-3 border-b border-[#d9d2c2] bg-transparent pb-5 text-left text-[#1c1a15]"
					type="button"
				>
					<span
						className={`grid h-10 w-10 place-items-center border font-mono font-bold ${
							tribesSignedOn >= currentGoal
								? "border-[#276449] bg-[#276449] text-[#fffdf7]"
								: "border-[#d9d2c2] bg-[#ece7dc] text-[#1c1a15]"
						}`}
					>
						{tribesSignedOn >= currentGoal ? "✓" : currentGoal}
					</span>
					<span>
						<strong className="block text-[#1c1a15]">
							Next milestone at {currentGoal} Tribes — {activeMilestone.label}
						</strong>
						<span className="mt-1 block text-[#3b3830]">
							{activeMilestone.unlock}
						</span>
					</span>
				</button>

				<fieldset className="mt-4 grid gap-3 border-0 p-0 md:grid-cols-3">
					<legend className="col-span-full mb-1 font-mono text-[0.73rem] font-semibold uppercase tracking-[0.11em] text-[#6b6658]">
						Stretch goals
					</legend>
					{stretchGoals.map((milestone) => (
						<button
							className={`cursor-help border p-4 text-left text-[#6b6658] ${
								tribesSignedOn >= milestone.n
									? "border-[#276449] bg-[#e4eee7]"
									: "border-[#d9d2c2] bg-[#f4f1ea]"
							}`}
							key={milestone.n}
							title={milestone.unlock}
							type="button"
						>
							<strong className="block text-[#1c1a15]">
								{tribesSignedOn >= milestone.n ? "✓" : milestone.n} —{" "}
								{milestone.label}
							</strong>
							<span className="mt-1 block text-sm">{milestone.unlock}</span>
						</button>
					))}
				</fieldset>
			</div>
		</section>
	);
}

export default function Page() {
	return (
		<div className="min-h-screen bg-[#f4f1ea] text-[#1c1a15] [font-family:IBM_Plex_Sans,system-ui,sans-serif]">
			<header className="flex flex-wrap items-center justify-between gap-6 border-b border-[#d9d2c2] bg-[#fffdf7]/95 px-4 py-4 backdrop-blur sm:px-8 lg:px-12">
				<Link
					className="inline-flex"
					href="/"
					aria-label="Tribal Energy Network home"
				>
					<Image
						src="/logo.png"
						alt="Tribal Energy Network"
						width={160}
						height={80}
						priority
					/>
				</Link>
				<div className="flex items-center gap-4">
					<Link
						className="inline-flex"
						href="https://www.amerindnation.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="/an-logo.png"
							alt="Amerind Nation"
							width={210}
							height={52}
							priority
						/>
					</Link>
					<Link
						className="inline-flex"
						href="https://www.7gnative.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="/7g-logo.png"
							alt="7 Generations"
							width={54}
							height={54}
							priority
						/>
					</Link>
				</div>
			</header>

			<main id="main" className="bg-[#f4f1ea]">
				<section className="relative grid items-end overflow-hidden bg-[linear-gradient(90deg,rgba(28,26,21,0.9),rgba(28,26,21,0.58)_52%,rgba(28,26,21,0.28)),url('/ten2.jpg')] bg-cover bg-center px-4 pb-8 pt-20 text-[#fffdf7] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-32 after:bg-gradient-to-t after:from-[#f4f1ea] after:to-transparent p-16">
					<div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 md:grid-cols-[1.12fr_minmax(280px,0.55fr)]">
						<div>
							<Eyebrow>CA NEVI 6 · EVSE + BESS portfolio</Eyebrow>
							<h1 className="max-w-3xl text-balance font-serif text-6xl leading-[0.92] text-[#fffdf7] md:text-8xl">
								Tribal EV Microgrid
							</h1>
							<p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#fffdf7]/90 md:text-2xl">
								$5M per-site EV fast charging + battery package designed to
								limit Tribal cash exposure to $100k, while maximizing Tribal
								energy sovereignty, battery economics, and capital weaving with
								100% annual ROI.
							</p>
							<nav
								className="mt-7 flex flex-wrap gap-3"
								aria-label="Primary actions"
							>
								<PrimaryLink href="#eligibility" variant="gold">
									Claim One of 20 Slots
								</PrimaryLink>
								{/* <PrimaryLink href="#downloads" variant="glass">
									Download 1-Page Summary
								</PrimaryLink> */}
								<PrimaryLink href={bookingUrl} variant="glass" newTab>
									Book a 30-Min Call
								</PrimaryLink>
							</nav>
						</div>

						<ul className="grid list-none gap-px border border-[#fffdf7]/25 bg-[#fffdf7]/25 p-0">
							{[
								["$5.00M", "Total per-site project package"],
								["$1M", "EVSE build sized for competitive NEVI scoring"],
								["6 MWh", "Battery storage for demand control and resilience"],
								["$100k", "Tribal cash match held in escrow, 100% annual ROI"],
							].map(([value, label]) => (
								<li className="bg-[#1c1a15]/50 p-4" key={label}>
									<strong className="block font-serif text-3xl leading-none text-[#b36b1f]">
										{value}
									</strong>
									<span className="mt-2 block text-sm text-[#fffdf7]/80">
										{label}
									</span>
								</li>
							))}
						</ul>
					</div>
				</section>

				<Section className="max-w-5xl"></Section>

				<CoalitionThermometer />

				<Section id="downloads">
					<SectionHead title="A repeatable package for California Tribes">
						TEN owns, operates, and maintains the EVSE + BESS through qualified
						subcontractors while the Tribally-Owned Entity (TOE) receives a
						contractual share of net operational benefits. The public cohort has
						20 maximum slots for this CA NEVI 6 round.
					</SectionHead>
					<GridShell className="md:grid-cols-4">
						<StatCard
							value="8 CCS+NACS"
							note="180kW Public DC fast-charging EV cabinets per site"
						/>
						<StatCard
							value="6 MWh"
							note="BESS storage capacity target to eliminate demand charges"
						/>
						<StatCard
							value="≈$100k"
							note="Target annual TOE benefit, subject to performance"
						/>
						<StatCard
							value="0 Opex"
							note="A PPA lets TO incurs no operating expenses, just savings + rev share"
						/>
					</GridShell>
					<div className="pt-4">
						<DisplayHeading>Why a coalition?</DisplayHeading>
						<p className="mt-5 text-lg leading-relaxed text-[#3b3830]">
							The capital stack scales with the coalition. Our first milestone
							is <strong>5 Tribes</strong> — at which point NMTC becomes
							practical at the portfolio level and covers roughly 20% of project
							costs. Beyond that, the stretch goals compound: at{" "}
							<strong>10</strong>, preferred pricing on EV chargers; at{" "}
							<strong>15</strong>, on batteries; at{" "}
							<strong>20 Tribes (approximately $100M)</strong>, the bridge and
							permanent lending market — SSBCI, USDA REAP, and additional
							facilities — opens fully. Joining earlier compounds the benefit
							for every Tribe in the cohort.
						</p>
					</div>
				</Section>

				<Section>
					<SectionHead title="Sources & uses, labeled plainly">
						The model uses source-type labels throughout so finance teams can
						distinguish grants, refundable credits, incentives, repayable
						financing, and cash escrow without double-counting.
					</SectionHead>
					<GridShell className="md:grid-cols-4">
						{uses.map(([label, amount, note]) => (
							<StatCard key={label} value={amount} label={label} note={note} />
						))}
						<StatCard
							value="$5.00M"
							label="Total"
							note="EV fast charging plus microgrid-ready battery storage."
						/>
						<StatCard
							value="$100k"
							label="Tribal cash"
							note="Total contribution, equal to 10% of the EVSE budget and 2% of total project cost."
						/>
					</GridShell>

					<GridShell className="mt-4 md:grid-cols-3">
						{sources.map(([name, amount, type, note]) => (
							<SourceCard key={name} title={name} amount={amount} type={type}>
								{note}
							</SourceCard>
						))}
					</GridShell>
					<Disclaimer>
						<strong>Planning model disclaimer:</strong> Presented before any
						additional clean energy credits, LCFS revenue, utility programs, or
						other incentives not yet identified. This information is not legal
						or tax advice.
					</Disclaimer>
				</Section>

				<Section>
					<SectionHead title="Five easy $20k tranches">
						The Tribal contribution is capped and milestone-based at 10% of the
						EV portion (2% of the total $5 million project capital stack). All
						funds are held in trust by Native bank partners as cash match
						collateral for project financing.
					</SectionHead>
					<GridShell className="md:grid-cols-5">
						{tranches.map(([date, amount, event]) => (
							<div className="bg-[#fffdf7] p-5" key={date}>
								<strong className="mb-2 block font-mono text-sm text-[#276449]">
									{date}
								</strong>
								<b className="block text-xl text-[#1c1a15]">{amount}</b>
								<p className="mt-2 text-sm text-[#3b3830]">{event}</p>
							</div>
						))}
					</GridShell>
					<Disclaimer>
						<strong>WARNING: </strong>No Tribal partners may join the TEN
						application after August 15, 2026, in order to ensure ALL coalition
						members can meet the NEVI 6 application requirements.{" "}
						<strong>Hurry!</strong> The application process requires
						appointment-based eligibility review.
					</Disclaimer>
				</Section>

				<section className="bg-[#1c1a15] text-[#fffdf7]">
					<Section>
						<SectionHead title="Sovereignty stays central." light>
							The structure is designed to limit Tribal cash exposure, protect
							operating capacity, and preserve a clear path to future TOE
							ownership after capacity certification.
						</SectionHead>
						<div className="grid gap-5 md:grid-cols-2">
							<div className="border border-[#fffdf7]/15 bg-[#fffdf7]/5 p-6 md:p-8">
								<h3 className="mb-4 font-serif text-3xl leading-tight">
									What the Tribe-Owned Entity provides
								</h3>
								<CheckList
									items={[
										"Tribally controlled land or site access, as applicable.",
										"$100,000 cash match in escrow through five $20k milestones.",
										"Site coordination and local approvals support.",
										"Optional workforce coordination if desired.",
									]}
								/>
							</div>
							<div className="border border-[#fffdf7]/15 bg-[#fffdf7]/5 p-6 md:p-8">
								<h3 className="mb-4 font-serif text-3xl leading-tight">
									What Tribal Energy Network provides
								</h3>
								<CheckList
									items={[
										"Native-owned grant strategy, application management, and reporting.",
										"Compliance, due diligence, procurement, EPC, and O&M coordination.",
										"Transparent ROI waterfall: revenue → costs → distributions.",
										"Paid-up PPA structure with capacity certification for  Tribal ownership.",
									]}
								/>
							</div>
						</div>
					</Section>
				</section>

				<Section>
					<SectionHead title="Battery-first DCFC economics">
						The TEN plan treats the battery as core infrastructure supporting
						EVSE deployment. It is the control asset that makes fast charging
						pencil, especially where demand charges would otherwise erase
						margin.
					</SectionHead>
					<GridShell className="md:grid-cols-3">
						{batteryNotes.map(([title, note]) => (
							<SourceCard key={title} title={title}>
								{note}
							</SourceCard>
						))}
					</GridShell>
				</Section>

				<Section id="eligibility">
					<SectionHead title="Determine your Tribe's best energy opportunity">
						<strong>TEN participation is invite-only. </strong>We do not publish
						eligible Tribe names or site candidates. We review eligibility
						privately in an appointment, then map the best near-term and
						long-term energy path according to your Tribal energy plans.
					</SectionHead>
					<GridShell className="mb-4 md:grid-cols-4">
						{qualificationStats.map(([value, label, note]) => (
							<StatCard key={label} value={value} label={label} note={note} />
						))}
					</GridShell>
					<div className="grid gap-5 border border-[#d9d2c2] bg-[#fffdf7] p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
						<p className="max-w-3xl text-[#3b3830]">
							We have identified 25 eligible Tribes along Alternative Fuel
							Corridors in California. Of those, 17 are in New Markets Tax
							Credit eligible census tracts and 9 are in Energy Community Tax
							Credit eligible counties. Set an appointment to determine whether
							your Tribe is eligible for the 2026 CA NEVI 6 cohort. If this
							round is not the right fit, we can still identify the strongest
							Tribal energy opportunities for your land, load, utility
							territory, and capital position.
						</p>
						<PrimaryLink href={bookingUrl} newTab>
							Set Eligibility Appointment
						</PrimaryLink>
					</div>
				</Section>

				<section className="bg-[#1c1a15] text-[#fffdf7]">
					<Section>
						<SectionHead title="Tribal Energy Partners" light>
							Partner roles vary by geography, procurement outcome, and project
							need. No manufacturer or EPC is represented as final until
							contracted.
						</SectionHead>
						<div className="grid gap-px border border-[#fffdf7]/15 bg-[#fffdf7]/15 md:grid-cols-3">
							{partnerDetails.map(([partner, description]) => (
								<div className="bg-[#fffdf7]/5 p-5" key={partner}>
									<strong className="block text-[#fffdf7]">{partner}</strong>
									<span className="mt-2 block text-sm text-[#fffdf7]/75">
										{description}
									</span>
								</div>
							))}
						</div>
						<Disclaimer dark>
							Partner roles vary by geography, procurement outcome, and project
							need. No manufacturer or EPC is represented as final until
							contracted.
						</Disclaimer>
					</Section>
				</section>

				<Section id="faq">
					<SectionHead title="FAQs">
						<Link
							className="inline-flex min-h-11 items-center justify-center border border-[#1c1a15] bg-[#1c1a15] px-4 py-3 font-bold text-[#fffdf7] transition-transform hover:-translate-y-0.5"
							href={bookingUrl}
						>
							More questions? Book a Meeting
						</Link>
					</SectionHead>
					<GridShell className="md:grid-cols-2">
						{faqs.map(([question, answer]) => (
							<details className="bg-[#fffdf7] p-5" key={question}>
								<summary className="cursor-pointer font-bold text-[#1c1a15]">
									{question}
								</summary>
								<p className="mt-3 text-[#3b3830]">{answer}</p>
							</details>
						))}
					</GridShell>
				</Section>
			</main>

			<footer className="bg-[#1c1a15] px-4 py-8 text-sm text-[#fffdf7]/70 sm:px-8 lg:px-12">
				<div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.3fr]">
					<div>
						<strong className="mb-1 block text-[#fffdf7]">
							Tribal Energy Network
						</strong>
						Amerind Nation LLC · 100% Native-owned ·{" "}
						<a href="mailto:pace@amerindnation.com">pace@amerindnation.com</a>
					</div>
					<div>
						<strong className="mb-1 block text-[#fffdf7]">Disclaimer</strong>
						The funding model shown is a planning model and is contingent on
						eligibility, award decisions, and program availability. Presented
						before any additional clean energy credits, LCFS revenue, utility
						programs, or other incentives not yet identified. This information
						is not legal or tax advice.
					</div>
				</div>
			</footer>
		</div>
	);
}

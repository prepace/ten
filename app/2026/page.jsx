"use client";

import Image from "next/image";
import Link from "next/link";

export default function Page() {
	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;0,9..144,800;1,9..144,400&display=swap');

				:root {
					--sand: #f5f0e8;
					--earth: #3d2b1f;
					--clay: #8b5e3c;
					--sage: #5a7247;
					--sage-light: #7a9a63;
					--turquoise: #3a8a8c;
					--turquoise-deep: #2a6a6c;
					--sunset: #c44b28;
					--sunset-light: #e8693f;
					--gold: #c9a84c;
					--cream: #faf7f2;
					--charcoal: #2c2c2c;
					--muted: #7a7065;
				}

				* { margin: 0; padding: 0; box-sizing: border-box; }

				body {
					font-family: 'DM Sans', sans-serif;
					background: var(--sand);
					color: var(--earth);
					line-height: 1.6;
					-webkit-font-smoothing: antialiased;
				}

				.hero {
					background: var(--earth);
					color: var(--cream);
					padding: 3.5rem 2rem 3rem;
					position: relative;
					overflow: hidden;
				}
				.hero::before {
					content: '';
					position: absolute;
					top: 0; left: 0; right: 0; bottom: 0;
					background: repeating-linear-gradient(
						120deg,
						transparent,
						transparent 40px,
						rgba(197,168,76,0.03) 40px,
						rgba(197,168,76,0.03) 41px
					);
				}
				.hero-inner {
					max-width: 880px;
					margin: 0 auto;
					position: relative;
					z-index: 1;
				}
				.invite-tag {
					display: inline-block;
					background: rgba(201,168,76,0.15);
					border: 1px solid rgba(201,168,76,0.35);
					color: var(--gold);
					font-size: 0.78rem;
					font-weight: 600;
					text-transform: uppercase;
					letter-spacing: 0.08em;
					padding: 0.35rem 1rem;
					border-radius: 100px;
					margin-bottom: 1rem;
				}
				.hero h1 {
					font-family: 'Fraunces', serif;
					font-size: clamp(2rem, 5vw, 3rem);
					font-weight: 800;
					line-height: 1.15;
					margin-bottom: 0.75rem;
					letter-spacing: -0.03em;
				}
				.hero h1 span { color: var(--gold); }
				.hero-sub {
					font-size: 1.05rem;
					color: rgba(255,255,255,0.75);
					max-width: 640px;
					margin-bottom: 1.5rem;
					line-height: 1.7;
				}
				.hero-cta {
					display: inline-flex;
					align-items: center;
					gap: 0.5rem;
					background: var(--gold);
					color: var(--earth);
					padding: 0.85rem 1.75rem;
					border-radius: 100px;
					font-weight: 700;
					font-size: 0.95rem;
					text-decoration: none;
					transition: transform 0.15s, box-shadow 0.15s;
				}
				.hero-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }

				.value-strip {
					max-width: 880px;
					margin: -1.5rem auto 0;
					padding: 0 2rem;
					position: relative;
					z-index: 2;
				}
				.value-grid {
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					gap: 1px;
					background: rgba(61,43,31,0.1);
					border-radius: 12px;
					overflow: hidden;
					box-shadow: 0 8px 32px rgba(0,0,0,0.08);
				}
				.val-card {
					background: white;
					padding: 1.4rem 1rem;
					text-align: center;
				}
				.val-num {
					font-family: 'Fraunces', serif;
					font-size: 1.6rem;
					font-weight: 700;
					color: var(--turquoise-deep);
					line-height: 1.1;
				}
				.val-label {
					font-size: 0.73rem;
					color: var(--muted);
					margin-top: 0.3rem;
					text-transform: uppercase;
					letter-spacing: 0.06em;
					font-weight: 500;
				}

				.section {
					max-width: 880px;
					margin: 0 auto;
					padding: 3rem 2rem;
				}
				.section-header { margin-bottom: 1.5rem; }
				.section-header h2 {
					font-family: 'Fraunces', serif;
					font-size: 1.5rem;
					font-weight: 700;
					letter-spacing: -0.02em;
					color: var(--earth);
				}
				.section-header p {
					color: var(--muted);
					margin-top: 0.3rem;
					font-size: 0.92rem;
				}

				.network-intro {
					background: white;
					border-radius: 10px;
					padding: 1.5rem;
					box-shadow: 0 2px 12px rgba(0,0,0,0.05);
					margin-bottom: 1.5rem;
					border-left: 4px solid var(--gold);
					font-size: 0.92rem;
					line-height: 1.6;
				}
				.network-intro strong { color: var(--clay); }
				.site-table-wrap {
					overflow-x: auto;
					border-radius: 10px;
					box-shadow: 0 2px 12px rgba(0,0,0,0.06);
				}
				table {
					width: 100%;
					border-collapse: collapse;
					background: white;
					font-size: 0.88rem;
				}
				thead th {
					background: var(--earth);
					color: var(--cream);
					padding: 0.7rem 1rem;
					text-align: left;
					font-weight: 600;
					font-size: 0.78rem;
					text-transform: uppercase;
					letter-spacing: 0.05em;
					white-space: nowrap;
				}
				tbody td {
					padding: 0.55rem 1rem;
					border-bottom: 1px solid rgba(0,0,0,0.05);
				}
				tbody tr:hover { background: rgba(90,114,71,0.04); }
				.tribe-col { color: var(--clay); font-weight: 500; }
				tbody tr:nth-child(even) { background: rgba(0,0,0,0.015); }
				tbody tr:nth-child(even):hover { background: rgba(90,114,71,0.04); }

				.two-col {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 1.5rem;
					margin-bottom: 2rem;
				}
				.col-card {
					background: white;
					border-radius: 10px;
					padding: 1.5rem;
					box-shadow: 0 2px 12px rgba(0,0,0,0.05);
				}
				.col-card h3 {
					font-family: 'Fraunces', serif;
					font-size: 1.05rem;
					margin-bottom: 0.75rem;
					color: var(--earth);
				}
				.col-card.yours { border-top: 4px solid var(--gold); }
				.col-card.ours { border-top: 4px solid var(--turquoise); }
				.checklist { list-style: none; padding: 0; }
				.checklist li {
					padding: 0.35rem 0;
					font-size: 0.88rem;
					padding-left: 1.5rem;
					position: relative;
				}
				.checklist li::before {
					content: '✓';
					position: absolute;
					left: 0;
					font-weight: 700;
				}
				.col-card.yours .checklist li::before { color: var(--gold); }
				.col-card.ours .checklist li::before { color: var(--turquoise); }

				.budget-section {
					background: linear-gradient(180deg, var(--cream) 0%, var(--sand) 100%);
					border-top: 3px solid var(--gold);
					padding: 3rem 2rem;
				}
				.budget-inner { max-width: 880px; margin: 0 auto; }
				.budget-inner h2 {
					font-family: 'Fraunces', serif;
					font-size: 1.5rem;
					margin-bottom: 0.3rem;
				}
				.budget-sub {
					color: var(--muted);
					margin-bottom: 1.5rem;
					font-size: 0.92rem;
				}
				.budget-stack {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 1rem;
					margin-bottom: 2rem;
				}
				.budget-card {
					background: white;
					border-radius: 10px;
					padding: 1.5rem;
					box-shadow: 0 2px 12px rgba(0,0,0,0.05);
				}
				.budget-card h3 {
					font-family: 'Fraunces', serif;
					font-size: 1.05rem;
					margin-bottom: 0.75rem;
					color: var(--earth);
				}
				.budget-line {
					display: flex;
					justify-content: space-between;
					padding: 0.35rem 0;
					font-size: 0.88rem;
				}
				.budget-line span:last-child {
					font-weight: 600;
					font-variant-numeric: tabular-nums;
				}
				.budget-line.total {
					border-top: 2px solid var(--earth);
					margin-top: 0.4rem;
					padding-top: 0.5rem;
					font-weight: 700;
					font-size: 0.95rem;
				}
				.budget-line.sub-total {
					border-top: 1px dashed rgba(0,0,0,0.12);
					margin-top: 0.3rem;
					padding-top: 0.4rem;
					font-weight: 600;
					color: var(--clay);
				}
				.match-bar-wrap { margin: 1rem 0; }
				.match-bar {
					display: flex;
					border-radius: 8px;
					overflow: hidden;
					height: 36px;
					margin-bottom: 0.4rem;
				}
				.match-grant { background: var(--turquoise); width: 80%; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 600; color: white; }
				.match-inkind { background: var(--sage); width: 10%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 600; color: white; }
				.match-cash { background: var(--gold); width: 10%; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 600; color: var(--earth); }
				.match-labels { display: flex; font-size: 0.75rem; color: var(--muted); }
				.match-labels span:nth-child(1) { width: 80%; }
				.match-labels span:nth-child(2) { width: 10%; }
				.match-labels span:nth-child(3) { width: 10%; }

				.big-callout {
					background: white;
					border-radius: 12px;
					padding: 2rem;
					text-align: center;
					box-shadow: 0 4px 20px rgba(0,0,0,0.06);
					margin-bottom: 2rem;
					border: 2px solid rgba(201,168,76,0.2);
				}
				.big-callout-label {
					font-size: 0.78rem;
					text-transform: uppercase;
					letter-spacing: 0.08em;
					color: var(--muted);
					font-weight: 600;
					margin-bottom: 0.3rem;
				}
				.big-callout-num {
					font-family: 'Fraunces', serif;
					font-size: 3rem;
					font-weight: 800;
					color: var(--turquoise-deep);
					line-height: 1;
				}
				.big-callout-sub {
					font-size: 0.95rem;
					color: var(--muted);
					margin-top: 0.4rem;
				}
				.big-callout-note {
					font-size: 0.85rem;
					color: var(--clay);
					font-weight: 500;
					margin-top: 0.75rem;
				}

				.roi-scenarios {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 1rem;
					margin-bottom: 1.5rem;
				}
				.roi-card {
					background: white;
					border-radius: 10px;
					padding: 1.25rem;
					box-shadow: 0 2px 12px rgba(0,0,0,0.05);
					text-align: center;
				}
				.roi-card.conservative { border-top: 4px solid var(--muted); }
				.roi-card.moderate { border-top: 4px solid var(--turquoise); }
				.roi-card.aggressive { border-top: 4px solid var(--sage); }
				.roi-scenario-label {
					font-size: 0.72rem;
					text-transform: uppercase;
					letter-spacing: 0.06em;
					font-weight: 600;
					color: var(--muted);
					margin-bottom: 0.5rem;
				}
				.roi-card.moderate .roi-scenario-label { color: var(--turquoise-deep); }
				.roi-card.aggressive .roi-scenario-label { color: var(--sage); }
				.roi-payback {
					font-family: 'Fraunces', serif;
					font-size: 2rem;
					font-weight: 800;
					line-height: 1.1;
				}
				.roi-card.conservative .roi-payback { color: var(--muted); }
				.roi-card.moderate .roi-payback { color: var(--turquoise-deep); }
				.roi-card.aggressive .roi-payback { color: var(--sage); }
				.roi-payback-unit {
					font-size: 0.85rem;
					color: var(--muted);
					margin-bottom: 0.6rem;
				}
				.roi-detail {
					font-size: 0.82rem;
					color: var(--muted);
					padding: 0.2rem 0;
				}
				.roi-detail strong { color: var(--earth); }

				.phase2-callout {
					background: linear-gradient(135deg, var(--earth), var(--turquoise-deep));
					color: var(--cream);
					border-radius: 12px;
					padding: 1.75rem 2rem;
					margin-top: 1.5rem;
					position: relative;
					overflow: hidden;
				}
				.phase2-callout::after {
					content: '';
					position: absolute;
					top: 0; right: 0;
					width: 200px;
					height: 100%;
					background: radial-gradient(circle at 100% 50%, rgba(201,168,76,0.15), transparent 70%);
					pointer-events: none;
				}
				.phase2-label {
					display: inline-block;
					background: rgba(201,168,76,0.2);
					color: var(--gold);
					font-size: 0.72rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.08em;
					padding: 0.25rem 0.8rem;
					border-radius: 100px;
					margin-bottom: 0.75rem;
				}
				.phase2-title {
					font-family: 'Fraunces', serif;
					font-size: 1.25rem;
					font-weight: 700;
					margin-bottom: 0.5rem;
					position: relative;
					z-index: 1;
				}
				.phase2-grid {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 1.5rem;
					margin-top: 1.25rem;
					position: relative;
					z-index: 1;
				}
				.phase2-metric {
					padding-right: 1rem;
					border-right: 1px solid rgba(255,255,255,0.15);
				}
				.phase2-metric:last-child { border-right: none; }
				.phase2-val {
					font-family: 'Fraunces', serif;
					font-size: 2.2rem;
					font-weight: 800;
					color: var(--gold);
					line-height: 1;
				}
				.phase2-unit {
					font-size: 0.78rem;
					text-transform: uppercase;
					letter-spacing: 0.06em;
					color: rgba(255,255,255,0.6);
					margin-top: 0.3rem;
				}
				.phase2-desc {
					font-size: 0.88rem;
					color: rgba(255,255,255,0.75);
					line-height: 1.6;
					margin-top: 0.5rem;
					position: relative;
					z-index: 1;
				}
				.phase2-desc strong { color: var(--gold); font-weight: 600; }

				.retainer-callout {
					background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(90,114,71,0.06));
					border: 1px solid rgba(201,168,76,0.25);
					border-radius: 10px;
					padding: 1.25rem 1.5rem;
					font-size: 0.9rem;
					line-height: 1.6;
					margin-top: 1.5rem;
				}
				.retainer-callout strong { color: var(--clay); }

				.steps-section {
					background: var(--earth);
					color: var(--cream);
					padding: 3rem 2rem;
				}
				.steps-inner { max-width: 880px; margin: 0 auto; }
				.steps-inner h2 {
					font-family: 'Fraunces', serif;
					font-size: 1.5rem;
					margin-bottom: 1.5rem;
				}
				.steps-grid {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 1rem;
				}
				.step-card {
					background: rgba(255,255,255,0.05);
					border: 1px solid rgba(255,255,255,0.08);
					border-radius: 10px;
					padding: 1.5rem;
				}
				.step-num {
					font-family: 'Fraunces', serif;
					font-size: 2rem;
					font-weight: 800;
					color: var(--gold);
					line-height: 1;
					margin-bottom: 0.5rem;
				}
				.step-title {
					font-weight: 600;
					font-size: 0.95rem;
					margin-bottom: 0.4rem;
				}
				.step-desc {
					font-size: 0.85rem;
					color: rgba(255,255,255,0.6);
					line-height: 1.5;
				}
				.step-fee {
					display: inline-block;
					margin-top: 0.75rem;
					font-size: 0.78rem;
					font-weight: 600;
					color: var(--gold);
					background: rgba(201,168,76,0.12);
					padding: 0.25rem 0.75rem;
					border-radius: 100px;
				}

				.pricing-strip {
					max-width: 880px;
					margin: 0 auto;
					padding: 3rem 2rem;
				}
				.pricing-strip h2 {
					font-family: 'Fraunces', serif;
					font-size: 1.5rem;
					margin-bottom: 0.3rem;
				}
				.pricing-strip-sub {
					color: var(--muted);
					font-size: 0.92rem;
					margin-bottom: 1.5rem;
				}
				.pricing-cards {
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					gap: 1rem;
					margin-bottom: 1.5rem;
				}
				.price-card {
					background: white;
					border-radius: 10px;
					padding: 1.25rem;
					box-shadow: 0 2px 12px rgba(0,0,0,0.05);
					text-align: center;
				}
				.price-card.early { border-top: 4px solid var(--sage); position: relative; }
				.price-card.early::before {
					content: 'Best Rate';
					position: absolute;
					top: -10px;
					left: 50%;
					transform: translateX(-50%);
					background: var(--sage);
					color: white;
					font-size: 0.68rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.05em;
					padding: 0.2rem 0.7rem;
					border-radius: 100px;
					white-space: nowrap;
				}
				.price-card.standard { border-top: 4px solid var(--turquoise); }
				.price-card.rush { border-top: 4px solid var(--sunset); }
				.price-card.closed { border-top: 4px solid var(--muted); opacity: 0.5; }
				.price-window {
					font-size: 0.75rem;
					text-transform: uppercase;
					letter-spacing: 0.06em;
					font-weight: 600;
					margin-bottom: 0.3rem;
				}
				.price-card.early .price-window { color: var(--sage); }
				.price-card.standard .price-window { color: var(--turquoise-deep); }
				.price-card.rush .price-window { color: var(--sunset); }
				.price-card.closed .price-window { color: var(--muted); }
				.price-dates {
					font-size: 0.82rem;
					color: var(--muted);
					margin-bottom: 0.5rem;
				}
				.price-amount {
					font-family: 'Fraunces', serif;
					font-size: 1.6rem;
					font-weight: 700;
					color: var(--earth);
				}
				.price-card.closed .price-amount {
					font-size: 1rem;
					color: var(--muted);
					font-family: 'DM Sans', sans-serif;
					font-weight: 500;
				}
				.price-per { font-size: 0.78rem; color: var(--muted); }
				.price-savings {
					margin-top: 0.4rem;
					font-size: 0.78rem;
					font-weight: 600;
				}
				.price-card.early .price-savings { color: var(--sage); }
				.price-card.rush .price-savings { color: var(--sunset); }

				.timeline {
					max-width: 880px;
					margin: 0 auto;
					padding: 0 2rem 3rem;
				}
				.timeline h2 {
					font-family: 'Fraunces', serif;
					font-size: 1.5rem;
					margin-bottom: 1.5rem;
				}
				.tl-items {
					position: relative;
					padding-left: 2rem;
				}
				.tl-items::before {
					content: '';
					position: absolute;
					left: 6px;
					top: 8px;
					bottom: 8px;
					width: 2px;
					background: linear-gradient(to bottom, var(--turquoise), var(--sage), var(--gold), var(--sunset));
				}
				.tl-item {
					position: relative;
					margin-bottom: 1.25rem;
				}
				.tl-item::before {
					content: '';
					position: absolute;
					left: -2rem;
					top: 8px;
					width: 14px;
					height: 14px;
					border-radius: 50%;
					border: 3px solid var(--turquoise);
					background: var(--sand);
				}
				.tl-item:nth-child(3)::before { border-color: var(--sage); }
				.tl-item:nth-child(4)::before { border-color: var(--gold); }
				.tl-item:nth-child(5)::before { border-color: var(--sunset); }
				.tl-item:nth-child(6)::before { border-color: var(--sunset); background: var(--sunset); }
				.tl-date {
					font-size: 0.78rem;
					font-weight: 600;
					text-transform: uppercase;
					letter-spacing: 0.06em;
					color: var(--clay);
				}
				.tl-desc { font-size: 0.92rem; color: var(--earth); }

				.cta-section {
					background: linear-gradient(135deg, var(--turquoise-deep), var(--sage));
					color: white;
					padding: 3rem 2rem;
					text-align: center;
				}
				.cta-section h2 {
					font-family: 'Fraunces', serif;
					font-size: 1.8rem;
					margin-bottom: 0.5rem;
				}
				.cta-section p {
					opacity: 0.85;
					max-width: 560px;
					margin: 0 auto 1.5rem;
				}
				.cta-buttons {
					display: flex;
					gap: 1rem;
					justify-content: center;
					flex-wrap: wrap;
				}
				.btn {
					display: inline-flex;
					align-items: center;
					gap: 0.5rem;
					padding: 0.85rem 1.75rem;
					border-radius: 100px;
					font-weight: 600;
					font-size: 0.95rem;
					text-decoration: none;
					transition: transform 0.15s, box-shadow 0.15s;
				}
				.btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
				.btn-light { background: white; color: var(--earth); }
				.btn-outline { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.4); }

				.needs-grid {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
					gap: 1rem;
				}
				.need-card {
					background: white;
					border-radius: 8px;
					padding: 1.1rem;
					box-shadow: 0 1px 6px rgba(0,0,0,0.04);
					font-size: 0.88rem;
				}
				.need-card strong {
					display: block;
					margin-bottom: 0.3rem;
					color: var(--clay);
					font-size: 0.82rem;
					text-transform: uppercase;
					letter-spacing: 0.04em;
				}

				.footer {
					max-width: 880px;
					margin: 0 auto;
					padding: 2rem;
					font-size: 0.78rem;
					color: var(--muted);
					text-align: center;
				}
				.footer a { color: var(--clay); }

				@media (max-width: 700px) {
					.hero { padding: 2rem 1.25rem; }
					.section, .timeline, .pricing-strip { padding-left: 1.25rem; padding-right: 1.25rem; }
					.steps-section, .budget-section { padding: 2rem 1.25rem; }
					.value-strip { padding: 0 1.25rem; }
					.value-grid { grid-template-columns: repeat(2, 1fr); }
					.two-col { grid-template-columns: 1fr; }
					.budget-stack { grid-template-columns: 1fr; }
					.roi-scenarios { grid-template-columns: 1fr; }
					.steps-grid { grid-template-columns: 1fr; }
					.pricing-cards { grid-template-columns: 1fr 1fr; }
					.phase2-grid { grid-template-columns: 1fr; }
					.phase2-metric { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.15); padding-right: 0; padding-bottom: 1rem; }
					.phase2-metric:last-child { border-bottom: none; padding-bottom: 0; }
				}
			`}</style>

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

			{/* HERO */}
			<section className="hero">
				<div className="hero-inner">
					<div className="invite-tag">Invite Only &middot; Pre-Vetted Sites</div>
					<h1>Your Site Has Been Selected for <span>California NEVI 6</span></h1>
					<p className="hero-sub">The California Energy Commission is awarding $79 million for DC fast charging stations along major corridors. Your location has been identified as a strong candidate and included in a coordinated tribal application. We handle the entire process — you provide the site and the commitment.</p>
					<a href="https://calendly.com/ampace" className="hero-cta">Claim Your Spot →</a>
				</div>
			</section>

			{/* VALUE STRIP */}
			<div className="value-strip">
				<div className="value-grid">
					<div className="val-card">
						<div className="val-num">$1.2M</div>
						<div className="val-label">Grant per Station</div>
					</div>
					<div className="val-card">
						<div className="val-num">8</div>
						<div className="val-label">CCS + 8 NACS DCFC Ports</div>
					</div>
					<div className="val-card">
						<div className="val-num">150 kW</div>
						<div className="val-label">Per Port Output</div>
					</div>
					<div className="val-card">
						<div className="val-num">80%</div>
						<div className="val-label">Grant-Funded</div>
					</div>
				</div>
			</div>

			{/* COHORT / NETWORK */}
			<div className="section">
				<div className="section-header">
					<h2>You&apos;re in Good Company</h2>
					<p>Your site is part of a coordinated California tribal application covering up to 20 high-traffic locations along Alternative Fuel Corridors. Strength in numbers: grouping eligible tribal sites into one application unlocks volume pricing, shared engineering costs, and a stronger competitive position with the CEC.</p>
				</div>
				<div className="network-intro">
					<strong>Why this matters:</strong> The CEC&apos;s maximum award per applicant is 35% of the total solicitation ($27.65M). By applying as a coordinated tribal network rather than 20 separate single-site applications, we secure better pricing from EPC partners, avoid duplicating engineering and legal costs, and present a stronger, more cohesive proposal. Your site retains its own budget, grant allocation, and revenue stream — the network simply provides the scaffolding.
				</div>
				<div className="site-table-wrap">
					<table>
						<thead>
							<tr>
								<th>Site</th>
								<th>Tribe</th>
							</tr>
						</thead>
						<tbody>
							<tr><td>Lucky 7</td><td className="tribe-col">Smith River / Tolowa Dee-ni&apos;</td></tr>
							<tr><td>Tribal Fuel Mart</td><td className="tribe-col">Elk Valley</td></tr>
							<tr><td>Pem Mey Fuel Mart</td><td className="tribe-col">Yurok</td></tr>
							<tr><td>Rain Rock</td><td className="tribe-col">Karuk</td></tr>
							<tr><td>Fuel &amp; Fun</td><td className="tribe-col">Blue Lake</td></tr>
							<tr><td>Club at Mill Creek</td><td className="tribe-col">Big Lagoon</td></tr>
							<tr><td>Pump and Play</td><td className="tribe-col">Rohnerville / Bear River</td></tr>
							<tr><td>Rolling Hills</td><td className="tribe-col">Paskenta</td></tr>
							<tr><td>Casino Gas Station</td><td className="tribe-col">Coyote Valley</td></tr>
							<tr><td>Running Creek</td><td className="tribe-col">Upper Lake</td></tr>
							<tr><td>Market &amp; Fuel</td><td className="tribe-col">Big Valley</td></tr>
							<tr><td>Thunder Valley</td><td className="tribe-col">United Auburn</td></tr>
							<tr><td>Red Hawk</td><td className="tribe-col">Shingle Springs</td></tr>
							<tr><td>Sky River</td><td className="tribe-col">Wilton</td></tr>
							<tr><td>TREDC</td><td className="tribe-col">Tule River</td></tr>
							<tr><td>Chukchansi Gold</td><td className="tribe-col">Picayune</td></tr>
							<tr><td>Golden Acorn</td><td className="tribe-col">Campo Kumeyaay</td></tr>
							<tr><td>Cathedral City / Rancho Mirage</td><td className="tribe-col">Agua Caliente</td></tr>
							<tr><td>Fantasy Springs</td><td className="tribe-col">Cabazon</td></tr>
							<tr><td>Spotlight 29 / Shelee&apos;s</td><td className="tribe-col">Twenty-Nine Palms</td></tr>
							<tr><td>Red Earth</td><td className="tribe-col">Torres-Martinez</td></tr>
							<tr><td>Outlet Center / Pit Stop</td><td className="tribe-col">Viejas</td></tr>
							<tr><td>Quechan</td><td className="tribe-col">Fort Yuma</td></tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* WHAT WE HANDLE vs WHAT YOU PROVIDE */}
			<div className="section" style={{paddingTop: 0}}>
				<div className="section-header">
					<h2>We Handle the Heavy Lifting</h2>
					<p>This is a complex federal-state program with prevailing wage, environmental review, and utility coordination requirements. We manage all of it.</p>
				</div>
				<div className="two-col">
					<div className="col-card ours">
						<h3>What We Do</h3>
						<ul className="checklist">
							<li>Full grant application writing and strategy</li>
							<li>Budget development for CEC submission</li>
							<li>Preliminary site plans and engineering</li>
							<li>CEQA and NEPA environmental forms</li>
							<li>Utility verification and coordination</li>
							<li>Letters of commitment orchestration</li>
							<li>ECAMS portal registration and upload</li>
							<li>Post-award project management</li>
							<li>EPC procurement and vendor coordination</li>
							<li>Davis-Bacon and prevailing wage compliance</li>
						</ul>
					</div>
					<div className="col-card yours">
						<h3>What You Provide</h3>
						<ul className="checklist">
							<li>Site address and confirmation of public access</li>
							<li>Site control documentation (ownership or lease)</li>
							<li>Utility provider contact information</li>
							<li>Authorized signer for application</li>
							<li>CA Secretary of State registration</li>
							<li>$50,000 deposit to reserve your spot (held in trust until award)</li>
						</ul>
					</div>
				</div>
			</div>

			{/* HOW IT WORKS */}
			<section className="steps-section">
				<div className="steps-inner">
					<h2>How It Works</h2>
					<div className="steps-grid">
						<div className="step-card">
							<div className="step-num">1</div>
							<div className="step-title">Reserve Your Spot</div>
							<div className="step-desc">Confirm your site, provide basic information, and place your deposit. This secures your position in the tribal application and is held in trust — not billed until the grant is awarded and the CEC contract is executed.</div>
							<div className="step-fee">20% of fee &middot; Deposit held in trust</div>
						</div>
						<div className="step-card">
							<div className="step-num">2</div>
							<div className="step-title">We Build &amp; Submit</div>
							<div className="step-desc">Our team develops your full application — narrative, budget, site plans, environmental forms, utility verification — and submits everything through the CEC&apos;s ECAMS portal before the September 25 deadline.</div>
							<div className="step-fee">40% of fee &middot; Due at submission</div>
						</div>
						<div className="step-card">
							<div className="step-num">3</div>
							<div className="step-title">Award &amp; Build</div>
							<div className="step-desc">If awarded, we manage the full project — EPC procurement, construction oversight, commissioning, and 5-year operations setup. Your station opens and starts generating revenue for your tribe.</div>
							<div className="step-fee">40% of fee &middot; Due at award</div>
						</div>
					</div>
				</div>
			</section>

			{/* BUDGET, MATCH & ROI */}
			<section className="budget-section">
				<div className="budget-inner">
					<h2>Your Investment &amp; Return</h2>
					<p className="budget-sub">The CEC covers 80% of the project. Your tribe contributes 20% — half of which is value you already hold (land and staff time).</p>

					<div className="big-callout">
						<div className="big-callout-label">Your Total Cash Investment per Station</div>
						<div className="big-callout-num">$150,000</div>
						<div className="big-callout-sub">Out of a $1,500,000 fully built, commissioned, and maintained charging station</div>
						<div className="big-callout-note">That&apos;s 10% of the project — the grant and your existing land cover the rest</div>
					</div>

					<div className="budget-stack">
						<div className="budget-card">
							<h3>What the Grant Covers (80%)</h3>
							<div className="budget-line"><span>EVSE hardware (8 dual-port 180kW chargers)</span><span>$480,000</span></div>
							<div className="budget-line"><span>Civil, electrical, and installation</span><span>$240,000</span></div>
							<div className="budget-line"><span>Engineering, permitting, project management</span><span>$240,000</span></div>
							<div className="budget-line"><span>Utility interconnection</span><span>$80,000</span></div>
							<div className="budget-line"><span>5-year warranty, O&amp;M, and networking</span><span>$160,000</span></div>
							<div className="budget-line total"><span>CEC Grant Award</span><span>$1,200,000</span></div>
						</div>

						<div className="budget-card">
							<h3>Your 20% Match</h3>
							<div className="match-bar-wrap">
								<div className="match-bar">
									<div className="match-grant">CEC Grant — 80%</div>
									<div className="match-inkind">10%</div>
									<div className="match-cash">10%</div>
								</div>
								<div className="match-labels">
									<span>$1,200,000</span>
									<span>In-kind</span>
									<span>Cash</span>
								</div>
							</div>

							<div style={{marginTop: "1rem"}}>
								<div style={{fontWeight: 600, fontSize: "0.88rem", color: "var(--sage)", marginBottom: "0.5rem"}}>In-Kind — $150,000 (value you already hold)</div>
								<div className="budget-line"><span>Use of your land for the station</span><span>$100,000</span></div>
								<div className="budget-line"><span>Staff time (facilities, environmental, admin)</span><span>$50,000</span></div>
							</div>

							<div style={{marginTop: "1rem"}}>
								<div style={{fontWeight: 600, fontSize: "0.88rem", color: "var(--gold)", marginBottom: "0.5rem"}}>Cash — $150,000</div>
								<div className="budget-line"><span>Your $50K deposit (applied post-award)</span><span>$50,000</span></div>
								<div className="budget-line"><span>Remaining balance</span><span>$100,000</span></div>
								<div className="budget-line" style={{fontSize: "0.82rem", color: "var(--muted)"}}><span>Payable at award, or financed against grant</span><span></span></div>
							</div>

							<div className="budget-line total"><span>Total Match</span><span>$300,000</span></div>
						</div>
					</div>

					<div className="section-header" style={{marginBottom: "1rem"}}>
						<h2 style={{fontFamily: "'Fraunces',serif", fontSize: "1.3rem"}}>How Fast Does $150,000 Pay for Itself?</h2>
						<p style={{color: "var(--muted)", fontSize: "0.92rem"}}>Your station earns revenue from every vehicle that charges. At California DCFC pricing ($0.40–$0.60/kWh) and 1,080 kW of total station capacity, the math works quickly.</p>
					</div>
					<div className="roi-scenarios">
						<div className="roi-card conservative">
							<div className="roi-scenario-label">Conservative</div>
							<div className="roi-payback">14</div>
							<div className="roi-payback-unit">months to payback</div>
							<div className="roi-detail"><strong>10%</strong> utilization</div>
							<div className="roi-detail"><strong>$0.40</strong>/kWh pricing</div>
							<div className="roi-detail" style={{marginTop: "0.4rem", paddingTop: "0.4rem", borderTop: "1px dashed rgba(0,0,0,0.08)"}}><strong>$146K</strong> net revenue/yr</div>
						</div>
						<div className="roi-card moderate">
							<div className="roi-scenario-label">Expected</div>
							<div className="roi-payback">8</div>
							<div className="roi-payback-unit">months to payback</div>
							<div className="roi-detail"><strong>15%</strong> utilization</div>
							<div className="roi-detail"><strong>$0.44</strong>/kWh pricing</div>
							<div className="roi-detail" style={{marginTop: "0.4rem", paddingTop: "0.4rem", borderTop: "1px dashed rgba(0,0,0,0.08)"}}><strong>$256K</strong> net revenue/yr</div>
						</div>
						<div className="roi-card aggressive">
							<div className="roi-scenario-label">Strong Market</div>
							<div className="roi-payback">4</div>
							<div className="roi-payback-unit">months to payback</div>
							<div className="roi-detail"><strong>20%</strong> utilization</div>
							<div className="roi-detail"><strong>$0.48</strong>/kWh pricing</div>
							<div className="roi-detail" style={{marginTop: "0.4rem", paddingTop: "0.4rem", borderTop: "1px dashed rgba(0,0,0,0.08)"}}><strong>$465K</strong> net revenue/yr</div>
						</div>
					</div>

					<div className="retainer-callout">
						<strong>After payback, the station keeps earning.</strong> Your charging station has a useful life of 10+ years. Once you&apos;ve recouped your $168,750 investment — typically within the first year — the ongoing revenue is yours. At the expected utilization level, that&apos;s over $250,000 per year in net station revenue to your tribe, from an asset that was 80% grant-funded and built on land you already own.
					</div>

					<div className="phase2-callout">
						<span className="phase2-label">Phase 2 &middot; Battery Storage</span>
						<div className="phase2-title">Add a Battery System — Capture Every Kilowatt at the Best Rate</div>
						<p className="phase2-desc">Once your station is operational, we help you apply for California&apos;s Self-Generation Incentive Program (SGIP) to install a battery storage system. For qualifying tribal sites in high fire-threat districts or disadvantaged communities, SGIP can cover <strong>up to 100% of the battery cost</strong>. The battery charges overnight at low off-peak rates, then powers your chargers during expensive peak hours — eliminating demand charges and capturing pricing arbitrage.</p>
						<div className="phase2-grid">
							<div className="phase2-metric">
								<div className="phase2-val">+$300K</div>
								<div className="phase2-unit">Additional annual revenue</div>
								<div className="phase2-desc" style={{marginTop: "0.5rem", fontSize: "0.82rem"}}>From demand charge avoidance and TOU arbitrage on the same charging load</div>
							</div>
							<div className="phase2-metric">
								<div className="phase2-val">~$550K</div>
								<div className="phase2-unit">Total annual revenue (expected)</div>
								<div className="phase2-desc" style={{marginTop: "0.5rem", fontSize: "0.82rem"}}>Chargers + battery arbitrage combined, net of all operating costs</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* PRICING WINDOWS */}
			<div className="pricing-strip">
				<h2>Engagement Windows</h2>
				<p className="pricing-strip-sub">Your deposit secures your spot and covers application preparation. Earlier commitment means a lower rate.</p>
				<div className="pricing-cards">
					<div className="price-card early">
						<div className="price-window">Early Commitment</div>
						<div className="price-dates">Before June 15</div>
						<div className="price-amount">$40,000</div>
						<div className="price-per">deposit per site</div>
						<div className="price-savings">Save $10,000</div>
					</div>
					<div className="price-card standard">
						<div className="price-window">Standard</div>
						<div className="price-dates">June 15 – July 15</div>
						<div className="price-amount">$50,000</div>
						<div className="price-per">deposit per site</div>
					</div>
					<div className="price-card rush">
						<div className="price-window">Late Entry</div>
						<div className="price-dates">July 15 – Aug 15</div>
						<div className="price-amount">$60,000</div>
						<div className="price-per">deposit per site</div>
						<div className="price-savings">+$10,000 expedite fee</div>
					</div>
					<div className="price-card closed">
						<div className="price-window">Closed</div>
						<div className="price-dates">After Aug 15</div>
						<div className="price-amount">Not accepting new participants</div>
					</div>
				</div>
				<div className="retainer-callout" style={{fontSize: "0.85rem"}}>
					<strong>Your deposit is a long-term commitment to your tribe&apos;s energy future.</strong> The deposit is held in trust and not applied to any work until the CEC awards the grant and the contract is fully executed. If this particular application is not awarded, your deposit rolls forward — we apply it toward the next qualifying opportunity for your site, whether that&apos;s a future NEVI round, a SGIP battery storage project, or other federal and state energy programs. Your investment stays working until we secure a result.
				</div>
			</div>

			{/* TIMELINE */}
			<div className="timeline">
				<h2>Program Timeline</h2>
				<div className="tl-items">
					<div className="tl-item">
						<div className="tl-date">Now – June 14</div>
						<div className="tl-desc">Early commitment window — reserve your spot at the best rate</div>
					</div>
					<div className="tl-item">
						<div className="tl-date">June 15</div>
						<div className="tl-desc">CEC begins accepting applications</div>
					</div>
					<div className="tl-item">
						<div className="tl-date">August 15</div>
						<div className="tl-desc">Last day to join — no new participants after this date</div>
					</div>
					<div className="tl-item">
						<div className="tl-date">September 25</div>
						<div className="tl-desc">Application deadline — 11:59 PM, no exceptions</div>
					</div>
					<div className="tl-item">
						<div className="tl-date">December 2026</div>
						<div className="tl-desc">Anticipated award announcements</div>
					</div>
					<div className="tl-item">
						<div className="tl-date">Q2 2027</div>
						<div className="tl-desc">Project start — construction and station buildout begins</div>
					</div>
				</div>
			</div>

			{/* CTA */}
			<section className="cta-section">
				<h2>Ready to Claim Your Station?</h2>
				<p>Your site was selected because it&apos;s in the right location, with the right traffic, and the right infrastructure potential. Let&apos;s put the funding to work.</p>
				<div className="cta-buttons">
					<a href="https://calendly.com/ampace" className="btn btn-light">Schedule a Call →</a>
					<a href="mailto:pace@amerindnation.com" className="btn btn-outline">Email Us</a>
					<a href="tel:+17036720267" className="btn btn-outline">Call (703) 672-0267</a>
				</div>
			</section>

			{/* WHAT TO HAVE READY */}
			<div className="section">
				<div className="section-header">
					<h2>What to Have Ready</h2>
				</div>
				<div className="needs-grid">
					<div className="need-card">
						<strong>Site Address</strong>
						Confirmed location with public access and 24/7 availability
					</div>
					<div className="need-card">
						<strong>Site Ownership</strong>
						Documentation showing your tribe owns or leases the property
					</div>
					<div className="need-card">
						<strong>Utility Contact</strong>
						Your electricity provider name and any existing account info
					</div>
					<div className="need-card">
						<strong>Authorized Signer</strong>
						Tribal council member or administrator authorized to sign agreements
					</div>
					<div className="need-card">
						<strong>CA Registration</strong>
						Active registration with the California Secretary of State
					</div>
					<div className="need-card">
						<strong>Decision Timeline</strong>
						Ability to commit within 30 days — spots are limited and time-sensitive
					</div>
				</div>
			</div>

			{/* FOOTER */}
			<div className="footer">
				&copy; 2026 Tribal Energy Network &middot; Amerind Nation LLC &middot; <a href="mailto:pace@amerindnation.com">pace@amerindnation.com</a><br />
				This is informational, not tax or legal advice. Program terms subject to CEC solicitation manual GFO-25-603. Revenue and Phase 2 projections are illustrative and based on industry data; actual results will vary by location, utilization, and SGIP program availability.
			</div>
		</>
	);
}

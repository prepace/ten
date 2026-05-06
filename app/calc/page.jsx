"use client";

import { useMemo, useState } from "react";

const fmtCurrency = (value) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(Number.isFinite(value) ? value : 0);

const fmtNumber = (value, digits = 0) =>
	new Intl.NumberFormat("en-US", {
		maximumFractionDigits: digits,
	}).format(Number.isFinite(value) ? value : 0);

const fmtKwh = (value) => `${fmtNumber(value, 0)} kWh`;
const fmtMwh = (value) => `${fmtNumber(value / 1000, 2)} MWh`;

function NumberField({
	label,
	value,
	setValue,
	step = 1,
	min = 0,
	suffix,
	helper,
}) {
	return (
		<label className="grid gap-1.5">
			<span className="flex items-center justify-between gap-3">
				<span className="text-sm font-medium text-stone-800">{label}</span>
				{suffix ? (
					<span className="text-xs text-stone-500">{suffix}</span>
				) : null}
			</span>
			<input
				className="min-h-11 rounded-xl border border-stone-300 bg-white px-3 py-2 text-stone-950 shadow-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
				type="number"
				min={min}
				step={step}
				value={value}
				onChange={(event) => setValue(Number(event.target.value))}
			/>
			{helper ? (
				<span className="text-xs leading-snug text-stone-500">{helper}</span>
			) : null}
		</label>
	);
}

function SliderField({
	label,
	value,
	setValue,
	min,
	max,
	step,
	helper,
	suffix = "%",
}) {
	return (
		<label className="grid gap-2">
			<span className="flex justify-between gap-3">
				<span className="text-sm font-medium text-stone-800">{label}</span>
				<span className="text-sm font-semibold text-stone-900">
					{value}
					{suffix}
				</span>
			</span>
			<input
				className="accent-emerald-700"
				type="range"
				value={value}
				min={min}
				max={max}
				step={step}
				onChange={(event) => setValue(Number(event.target.value))}
			/>
			{helper ? <span className="text-xs text-stone-500">{helper}</span> : null}
		</label>
	);
}

function Panel({ children, className = "" }) {
	return (
		<div
			className={`rounded-2xl border border-stone-200 bg-white shadow-sm ${className}`}
		>
			{children}
		</div>
	);
}

function StatCard({ icon, label, value, sub }) {
	return (
		<Panel className="h-full p-5">
			<div className="mb-3 flex items-center gap-2 text-stone-500">
				<span aria-hidden="true">{icon}</span>
				<span className="text-xs font-semibold uppercase tracking-wide">
					{label}
				</span>
			</div>
			<div className="text-2xl font-bold tracking-tight text-stone-950">
				{value}
			</div>
			{sub ? <div className="mt-1 text-xs text-stone-500">{sub}</div> : null}
		</Panel>
	);
}

function Row({ label, value, note, bold = false }) {
	return (
		<div className="grid grid-cols-12 gap-3 border-b border-stone-100 py-3 last:border-b-0">
			<div
				className={`col-span-7 text-sm ${
					bold ? "font-semibold text-stone-950" : "text-stone-700"
				}`}
			>
				{label}
				{note ? (
					<div className="mt-0.5 text-xs font-normal text-stone-500">
						{note}
					</div>
				) : null}
			</div>
			<div
				className={`col-span-5 text-right text-sm ${
					bold ? "font-bold text-stone-950" : "font-medium text-stone-800"
				}`}
			>
				{value}
			</div>
		</div>
	);
}

export default function CalcPage() {
	const [chargerCount, setChargerCount] = useState(8);
	const [chargerKw, setChargerKw] = useState(150);
	const [kwhPerChargerDay, setKwhPerChargerDay] = useState(750);

	const [retailRate, setRetailRate] = useState(0.45);
	const [deliveredEnergyCost, setDeliveredEnergyCost] = useState(0.16);
	const [networkCost, setNetworkCost] = useState(0.04);
	const [lcfsValue, setLcfsValue] = useState(0.06);
	const [sessionFee, setSessionFee] = useState(2.0);
	const [avgSessionKwh, setAvgSessionKwh] = useState(60);
	const [membershipAnnualRevenue, setMembershipAnnualRevenue] = useState(50000);
	const [amenitiesAnnualNet, setAmenitiesAnnualNet] = useState(25000);

	const [bessMwh, setBessMwh] = useState(6);
	const [cyclePct, setCyclePct] = useState(100);
	const [evDrainPct, setEvDrainPct] = useState(60);
	const [offPeakRate, setOffPeakRate] = useState(0.1);
	const [onPeakAvoidedRate, setOnPeakAvoidedRate] = useState(0.32);
	const [roundTripEfficiency, setRoundTripEfficiency] = useState(88);
	const [bessOpexAnnual, setBessOpexAnnual] = useState(50000);
	const [evOpexAnnual, setEvOpexAnnual] = useState(90000);

	const outputs = useMemo(() => {
		const evKwhDay = chargerCount * kwhPerChargerDay;
		const evKwhYear = evKwhDay * 365;
		const chargerCapacityKwhDay = chargerCount * chargerKw * 24;
		const utilizationPct =
			chargerCapacityKwhDay > 0 ? evKwhDay / chargerCapacityKwhDay : 0;

		const sessionsYear = avgSessionKwh > 0 ? evKwhYear / avgSessionKwh : 0;
		const chargingGrossRevenue = evKwhYear * retailRate;
		const energyCost = evKwhYear * deliveredEnergyCost;
		const networkFees = evKwhYear * networkCost;
		const chargingMargin = chargingGrossRevenue - energyCost - networkFees;
		const lcfsRevenue = evKwhYear * lcfsValue;
		const sessionFeeRevenue = sessionsYear * sessionFee;

		const bessKwhPerFullCycle = bessMwh * 1000;
		const bessDischargeKwhDay = bessKwhPerFullCycle * (cyclePct / 100);
		const bessDischargeKwhYear = bessDischargeKwhDay * 365;
		const evBessKwhYear = bessDischargeKwhYear * (evDrainPct / 100);
		const siteArbKwhYear = bessDischargeKwhYear - evBessKwhYear;

		const efficiency = roundTripEfficiency / 100 || 1;
		const chargeKwhNeededYear =
			roundTripEfficiency > 0 ? bessDischargeKwhYear / efficiency : 0;
		const bessChargingCost = chargeKwhNeededYear * offPeakRate;
		const bessAvoidedValue = bessDischargeKwhYear * onPeakAvoidedRate;
		const bessGrossValue = bessAvoidedValue - bessChargingCost;

		const spread = onPeakAvoidedRate - offPeakRate / efficiency;
		const evDrainValue = evBessKwhYear * spread;
		const siteArbValue = siteArbKwhYear * spread;

		const totalGrossBenefit =
			chargingMargin +
			lcfsRevenue +
			sessionFeeRevenue +
			membershipAnnualRevenue +
			amenitiesAnnualNet +
			bessGrossValue;
		const totalOpex = evOpexAnnual + bessOpexAnnual;
		const netAnnualValue = totalGrossBenefit - totalOpex;
		const monthlyNet = netAnnualValue / 12;

		return {
			evKwhDay,
			evKwhYear,
			utilizationPct,
			sessionsYear,
			chargingGrossRevenue,
			energyCost,
			networkFees,
			chargingMargin,
			lcfsRevenue,
			sessionFeeRevenue,
			bessDischargeKwhDay,
			bessDischargeKwhYear,
			evBessKwhYear,
			siteArbKwhYear,
			chargeKwhNeededYear,
			bessChargingCost,
			bessAvoidedValue,
			bessGrossValue,
			evDrainValue,
			siteArbValue,
			totalGrossBenefit,
			totalOpex,
			netAnnualValue,
			monthlyNet,
		};
	}, [
		chargerCount,
		chargerKw,
		kwhPerChargerDay,
		retailRate,
		deliveredEnergyCost,
		networkCost,
		lcfsValue,
		sessionFee,
		avgSessionKwh,
		membershipAnnualRevenue,
		amenitiesAnnualNet,
		bessMwh,
		cyclePct,
		evDrainPct,
		offPeakRate,
		onPeakAvoidedRate,
		roundTripEfficiency,
		bessOpexAnnual,
		evOpexAnnual,
	]);

	return (
		<main className="min-h-screen bg-stone-50 p-4 text-stone-900 md:p-8">
			<div className="mx-auto max-w-7xl space-y-6">
				<Panel className="rounded-3xl p-6 md:p-8">
					<div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-700">
						<span aria-hidden="true">▣</span> EVSE + BESS Business Value
						Calculator
					</div>
					<div className="grid gap-5 md:grid-cols-[1.3fr_.7fr] md:items-end">
						<div>
							<h1 className="text-3xl font-bold tracking-tight md:text-5xl">
								Annual value model for Tribal EV charging + 6MWh BESS
							</h1>
							<p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600 md:text-base">
								Change charger count, kWh/day per charger, rates, LCFS, fees,
								and BESS dispatch split. The battery assumes off-peak charging
								and on-peak/demand-charge replacement on discharge.
							</p>
						</div>
						<div className="rounded-2xl bg-stone-100 p-4 text-sm text-stone-700">
							<div className="font-semibold text-stone-900">Core formula</div>
							<div className="mt-1">
								Net Annual Value = EV margin + LCFS + fees + memberships +
								amenities + BESS spread - O&M
							</div>
						</div>
					</div>
				</Panel>

				<div className="grid gap-4 md:grid-cols-4">
					<StatCard
						icon="$"
						label="Net annual value"
						value={fmtCurrency(outputs.netAnnualValue)}
						sub={`${fmtCurrency(outputs.monthlyNet)} / month`}
					/>
					<StatCard
						icon="EV"
						label="EV kWh sold"
						value={fmtKwh(outputs.evKwhYear)}
						sub={`${fmtKwh(outputs.evKwhDay)} / day`}
					/>
					<StatCard
						icon="B"
						label="BESS discharged"
						value={fmtMwh(outputs.bessDischargeKwhYear)}
						sub={`${fmtMwh(outputs.bessDischargeKwhDay)} / day`}
					/>
					<StatCard
						icon="%"
						label="Charger utilization"
						value={`${fmtNumber(outputs.utilizationPct * 100, 1)}%`}
						sub="Based on nameplate x 24h"
					/>
				</div>

				<div className="grid gap-6 lg:grid-cols-[420px_1fr]">
					<div className="space-y-6">
						<Panel className="p-5">
							<div className="mb-5 flex items-center gap-2 border-b border-stone-100 pb-3 font-semibold">
								<span aria-hidden="true">⚡</span> EV charging assumptions
							</div>
							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
								<NumberField
									label="Number of chargers"
									value={chargerCount}
									setValue={setChargerCount}
									step={1}
								/>
								<NumberField
									label="Charger power"
									value={chargerKw}
									setValue={setChargerKw}
									suffix="kW each"
									step={25}
								/>
								<NumberField
									label="Energy sold per charger per day"
									value={kwhPerChargerDay}
									setValue={setKwhPerChargerDay}
									suffix="kWh/day"
									step={25}
								/>
								<NumberField
									label="Retail charging price"
									value={retailRate}
									setValue={setRetailRate}
									suffix="$/kWh"
									step={0.01}
								/>
								<NumberField
									label="Delivered energy cost"
									value={deliveredEnergyCost}
									setValue={setDeliveredEnergyCost}
									suffix="$/kWh"
									step={0.01}
								/>
								<NumberField
									label="Network / CPO / processing cost"
									value={networkCost}
									setValue={setNetworkCost}
									suffix="$/kWh"
									step={0.01}
								/>
								<NumberField
									label="LCFS value"
									value={lcfsValue}
									setValue={setLcfsValue}
									suffix="$/kWh dispensed"
									step={0.01}
								/>
								<NumberField
									label="Session fee"
									value={sessionFee}
									setValue={setSessionFee}
									suffix="$/session"
									step={0.25}
								/>
								<NumberField
									label="Average session size"
									value={avgSessionKwh}
									setValue={setAvgSessionKwh}
									suffix="kWh/session"
									step={5}
								/>
								<NumberField
									label="Annual membership revenue"
									value={membershipAnnualRevenue}
									setValue={setMembershipAnnualRevenue}
									suffix="$/year"
									step={5000}
								/>
								<NumberField
									label="Amenities annual net"
									value={amenitiesAnnualNet}
									setValue={setAmenitiesAnnualNet}
									suffix="$/year"
									step={5000}
								/>
								<NumberField
									label="EVSE annual O&M / overhead"
									value={evOpexAnnual}
									setValue={setEvOpexAnnual}
									suffix="$/year"
									step={5000}
								/>
							</div>
						</Panel>

						<Panel className="p-5">
							<div className="mb-5 flex items-center gap-2 border-b border-stone-100 pb-3 font-semibold">
								<span aria-hidden="true">▰</span> BESS assumptions
							</div>
							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
								<NumberField
									label="BESS usable capacity"
									value={bessMwh}
									setValue={setBessMwh}
									suffix="MWh"
									step={0.5}
								/>
								<SliderField
									label="Cycle per day"
									value={cyclePct}
									setValue={setCyclePct}
									min={0}
									max={150}
									step={5}
									helper="100% = one full 6MWh discharge per day. 150% = 1.5 cycles/day."
								/>
								<SliderField
									label="BESS discharge used by EV load"
									value={evDrainPct}
									setValue={setEvDrainPct}
									min={0}
									max={100}
									step={5}
									helper="Remainder is site behind-the-meter arbitrage / peak shaving with the local Tribal entity."
								/>
								<NumberField
									label="Off-peak recharge cost"
									value={offPeakRate}
									setValue={setOffPeakRate}
									suffix="$/kWh"
									step={0.01}
								/>
								<NumberField
									label="On-peak avoided value"
									value={onPeakAvoidedRate}
									setValue={setOnPeakAvoidedRate}
									suffix="$/kWh"
									step={0.01}
									helper="Use blended on-peak energy replacement + demand charge equivalent."
								/>
								<NumberField
									label="Round-trip efficiency"
									value={roundTripEfficiency}
									setValue={setRoundTripEfficiency}
									suffix="%"
									step={1}
								/>
								<NumberField
									label="BESS annual O&M / reserves"
									value={bessOpexAnnual}
									setValue={setBessOpexAnnual}
									suffix="$/year"
									step={5000}
								/>
							</div>
						</Panel>
					</div>

					<div className="space-y-6">
						<Panel className="p-5">
							<div className="mb-4 flex items-center gap-2 font-semibold">
								<span aria-hidden="true">↯</span> Annual revenue and savings
								summary
							</div>
							<Row
								label="EV charging gross revenue"
								value={fmtCurrency(outputs.chargingGrossRevenue)}
								note={`${fmtKwh(outputs.evKwhYear)} x $${retailRate.toFixed(2)}/kWh`}
							/>
							<Row
								label="Less delivered energy cost"
								value={`- ${fmtCurrency(outputs.energyCost)}`}
								note={`$${deliveredEnergyCost.toFixed(2)}/kWh`}
							/>
							<Row
								label="Less network/CPO/processing cost"
								value={`- ${fmtCurrency(outputs.networkFees)}`}
								note={`$${networkCost.toFixed(2)}/kWh`}
							/>
							<Row
								label="EV kWh margin"
								value={fmtCurrency(outputs.chargingMargin)}
								bold
							/>
							<Row
								label="LCFS revenue"
								value={fmtCurrency(outputs.lcfsRevenue)}
								note={`$${lcfsValue.toFixed(2)}/kWh dispensed`}
							/>
							<Row
								label="Session fee revenue"
								value={fmtCurrency(outputs.sessionFeeRevenue)}
								note={`${fmtNumber(outputs.sessionsYear, 0)} sessions/year x ${fmtCurrency(sessionFee)}`}
							/>
							<Row
								label="Annual membership revenue"
								value={fmtCurrency(membershipAnnualRevenue)}
							/>
							<Row
								label="Amenities annual net"
								value={fmtCurrency(amenitiesAnnualNet)}
							/>
							<Row
								label="BESS avoided on-peak / demand value"
								value={fmtCurrency(outputs.bessAvoidedValue)}
								note={`${fmtMwh(outputs.bessDischargeKwhYear)} discharged x $${onPeakAvoidedRate.toFixed(2)}/kWh`}
							/>
							<Row
								label="Less off-peak recharge cost"
								value={`- ${fmtCurrency(outputs.bessChargingCost)}`}
								note={`${fmtMwh(outputs.chargeKwhNeededYear)} charged accounting for efficiency`}
							/>
							<Row
								label="BESS gross value"
								value={fmtCurrency(outputs.bessGrossValue)}
								bold
							/>
							<Row
								label="Total gross benefit"
								value={fmtCurrency(outputs.totalGrossBenefit)}
								bold
							/>
							<Row
								label="Less EVSE O&M / overhead"
								value={`- ${fmtCurrency(evOpexAnnual)}`}
							/>
							<Row
								label="Less BESS O&M / reserves"
								value={`- ${fmtCurrency(bessOpexAnnual)}`}
							/>
							<Row
								label="Net annual business value"
								value={fmtCurrency(outputs.netAnnualValue)}
								bold
							/>
						</Panel>

						<div className="grid gap-6 md:grid-cols-2">
							<Panel className="p-5">
								<div className="mb-4 font-semibold">BESS dispatch split</div>
								<Row label="EV load drain share" value={`${evDrainPct}%`} />
								<Row
									label="EV load BESS discharge"
									value={fmtMwh(outputs.evBessKwhYear)}
								/>
								<Row
									label="EV load BESS value"
									value={fmtCurrency(outputs.evDrainValue)}
								/>
								<Row
									label="Site BTM arbitrage share"
									value={`${100 - evDrainPct}%`}
								/>
								<Row
									label="Site BTM discharge"
									value={fmtMwh(outputs.siteArbKwhYear)}
								/>
								<Row
									label="Site BTM value"
									value={fmtCurrency(outputs.siteArbValue)}
								/>
							</Panel>

							<Panel className="p-5">
								<div className="mb-4 font-semibold">Operating diagnostics</div>
								<Row
									label="Charger nameplate"
									value={`${fmtNumber(chargerCount * chargerKw)} kW`}
								/>
								<Row
									label="Max theoretical daily kWh"
									value={fmtKwh(chargerCount * chargerKw * 24)}
								/>
								<Row
									label="Modeled daily kWh"
									value={fmtKwh(outputs.evKwhDay)}
								/>
								<Row
									label="Utilization"
									value={`${fmtNumber(outputs.utilizationPct * 100, 1)}%`}
									bold
								/>
								<Row
									label="Sessions per year"
									value={fmtNumber(outputs.sessionsYear, 0)}
								/>
								<Row
									label="Net value per EV kWh sold"
									value={`$${fmtNumber(outputs.netAnnualValue / (outputs.evKwhYear || 1), 3)}/kWh`}
								/>
							</Panel>
						</div>

						<div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950 shadow-sm">
							<div className="mb-1 font-semibold">Interpretation</div>
							This model treats the BESS as charging off-peak and discharging
							into either EV load or the host/site behind-the-meter load. The
							on-peak avoided value should include the tariff-specific value of
							energy replacement plus any demand-charge equivalent. For
							lender-grade modeling, replace this blended value with a tariff
							study and interval-load dispatch model.
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

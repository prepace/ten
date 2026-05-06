import { motion } from "framer-motion";
import {
	BatteryCharging,
	Bolt,
	Calculator,
	Car,
	DollarSign,
	Gauge,
	Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

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
		<div className="space-y-1.5">
			<div className="flex items-center justify-between gap-3">
				<Label className="text-sm font-medium text-stone-800">{label}</Label>
				{suffix && <span className="text-xs text-stone-500">{suffix}</span>}
			</div>
			<Input
				type="number"
				min={min}
				step={step}
				value={value}
				onChange={(e) => setValue(Number(e.target.value))}
				className="rounded-xl border-stone-300 bg-white"
			/>
			{helper && (
				<p className="text-xs leading-snug text-stone-500">{helper}</p>
			)}
		</div>
	);
}

function StatCard({ icon: Icon, label, value, sub }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25 }}
		>
			<Card className="h-full rounded-2xl border-stone-200 bg-white shadow-sm">
				<CardContent className="p-5">
					<div className="mb-3 flex items-center gap-2 text-stone-500">
						<Icon className="h-4 w-4" />
						<span className="text-xs font-semibold uppercase tracking-wide">
							{label}
						</span>
					</div>
					<div className="text-2xl font-bold tracking-tight text-stone-900">
						{value}
					</div>
					{sub && <div className="mt-1 text-xs text-stone-500">{sub}</div>}
				</CardContent>
			</Card>
		</motion.div>
	);
}

function Row({ label, value, note, bold = false }) {
	return (
		<div className="grid grid-cols-12 gap-3 border-b border-stone-100 py-3 last:border-b-0">
			<div
				className={`col-span-7 text-sm ${bold ? "font-semibold text-stone-950" : "text-stone-700"}`}
			>
				{label}
				{note && (
					<div className="mt-0.5 text-xs font-normal text-stone-500">
						{note}
					</div>
				)}
			</div>
			<div
				className={`col-span-5 text-right text-sm ${bold ? "font-bold text-stone-950" : "font-medium text-stone-800"}`}
			>
				{value}
			</div>
		</div>
	);
}

export default function EvBessBusinessValueCalculator() {
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

		const chargeKwhNeededYear =
			roundTripEfficiency > 0
				? bessDischargeKwhYear / (roundTripEfficiency / 100)
				: 0;
		const bessChargingCost = chargeKwhNeededYear * offPeakRate;
		const bessAvoidedValue = bessDischargeKwhYear * onPeakAvoidedRate;
		const bessGrossValue = bessAvoidedValue - bessChargingCost;

		const evDrainValue =
			evBessKwhYear *
			(onPeakAvoidedRate - offPeakRate / (roundTripEfficiency / 100 || 1));
		const siteArbValue =
			siteArbKwhYear *
			(onPeakAvoidedRate - offPeakRate / (roundTripEfficiency / 100 || 1));

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
		<div className="min-h-screen bg-stone-50 p-4 text-stone-900 md:p-8">
			<div className="mx-auto max-w-7xl space-y-6">
				<div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-8">
					<div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-700">
						<Calculator className="h-4 w-4" /> EVSE + BESS Business Value
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
								amenities + BESS spread − O&M
							</div>
						</div>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-4">
					<StatCard
						icon={DollarSign}
						label="Net annual value"
						value={fmtCurrency(outputs.netAnnualValue)}
						sub={`${fmtCurrency(outputs.monthlyNet)} / month`}
					/>
					<StatCard
						icon={Car}
						label="EV kWh sold"
						value={fmtKwh(outputs.evKwhYear)}
						sub={`${fmtKwh(outputs.evKwhDay)} / day`}
					/>
					<StatCard
						icon={BatteryCharging}
						label="BESS discharged"
						value={fmtMwh(outputs.bessDischargeKwhYear)}
						sub={`${fmtMwh(outputs.bessDischargeKwhDay)} / day`}
					/>
					<StatCard
						icon={Gauge}
						label="Charger utilization"
						value={`${fmtNumber(outputs.utilizationPct * 100, 1)}%`}
						sub="Based on nameplate × 24h"
					/>
				</div>

				<div className="grid gap-6 lg:grid-cols-[420px_1fr]">
					<div className="space-y-6">
						<Card className="rounded-2xl border-stone-200 bg-white shadow-sm">
							<CardContent className="space-y-5 p-5">
								<div className="flex items-center gap-2 border-b border-stone-100 pb-3 font-semibold">
									<Zap className="h-4 w-4 text-emerald-700" /> EV charging
									assumptions
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
							</CardContent>
						</Card>

						<Card className="rounded-2xl border-stone-200 bg-white shadow-sm">
							<CardContent className="space-y-5 p-5">
								<div className="flex items-center gap-2 border-b border-stone-100 pb-3 font-semibold">
									<BatteryCharging className="h-4 w-4 text-emerald-700" /> BESS
									assumptions
								</div>
								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
									<NumberField
										label="BESS usable capacity"
										value={bessMwh}
										setValue={setBessMwh}
										suffix="MWh"
										step={0.5}
									/>
									<div className="space-y-2">
										<div className="flex justify-between gap-3">
											<Label className="text-sm font-medium text-stone-800">
												Cycle per day
											</Label>
											<span className="text-sm font-semibold text-stone-900">
												{cyclePct}%
											</span>
										</div>
										<Slider
											value={[cyclePct]}
											min={0}
											max={150}
											step={5}
											onValueChange={(v) => setCyclePct(v[0])}
										/>
										<p className="text-xs text-stone-500">
											100% = one full 6MWh discharge per day. 150% = 1.5
											cycles/day.
										</p>
									</div>
									<div className="space-y-2">
										<div className="flex justify-between gap-3">
											<Label className="text-sm font-medium text-stone-800">
												BESS discharge used by EV load
											</Label>
											<span className="text-sm font-semibold text-stone-900">
												{evDrainPct}%
											</span>
										</div>
										<Slider
											value={[evDrainPct]}
											min={0}
											max={100}
											step={5}
											onValueChange={(v) => setEvDrainPct(v[0])}
										/>
										<p className="text-xs text-stone-500">
											Remainder is site behind-the-meter arbitrage / peak
											shaving with the local Tribal entity.
										</p>
									</div>
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
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card className="rounded-2xl border-stone-200 bg-white shadow-sm">
							<CardContent className="p-5">
								<div className="mb-4 flex items-center gap-2 font-semibold">
									<Bolt className="h-4 w-4 text-emerald-700" /> Annual revenue
									and savings summary
								</div>
								<Row
									label="EV charging gross revenue"
									value={fmtCurrency(outputs.chargingGrossRevenue)}
									note={`${fmtKwh(outputs.evKwhYear)} × ${retailRate.toFixed(2)}/kWh`}
								/>
								<Row
									label="Less delivered energy cost"
									value={`− ${fmtCurrency(outputs.energyCost)}`}
									note={`${deliveredEnergyCost.toFixed(2)}/kWh`}
								/>
								<Row
									label="Less network/CPO/processing cost"
									value={`− ${fmtCurrency(outputs.networkFees)}`}
									note={`${networkCost.toFixed(2)}/kWh`}
								/>
								<Row
									label="EV kWh margin"
									value={fmtCurrency(outputs.chargingMargin)}
									bold
								/>
								<Row
									label="LCFS revenue"
									value={fmtCurrency(outputs.lcfsRevenue)}
									note={`${lcfsValue.toFixed(2)}/kWh dispensed`}
								/>
								<Row
									label="Session fee revenue"
									value={fmtCurrency(outputs.sessionFeeRevenue)}
									note={`${fmtNumber(outputs.sessionsYear, 0)} sessions/year × ${fmtCurrency(sessionFee)}`}
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
									note={`${fmtMwh(outputs.bessDischargeKwhYear)} discharged × ${onPeakAvoidedRate.toFixed(2)}/kWh`}
								/>
								<Row
									label="Less off-peak recharge cost"
									value={`− ${fmtCurrency(outputs.bessChargingCost)}`}
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
									value={`− ${fmtCurrency(evOpexAnnual)}`}
								/>
								<Row
									label="Less BESS O&M / reserves"
									value={`− ${fmtCurrency(bessOpexAnnual)}`}
								/>
								<Row
									label="Net annual business value"
									value={fmtCurrency(outputs.netAnnualValue)}
									bold
								/>
							</CardContent>
						</Card>

						<div className="grid gap-6 md:grid-cols-2">
							<Card className="rounded-2xl border-stone-200 bg-white shadow-sm">
								<CardContent className="p-5">
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
								</CardContent>
							</Card>

							<Card className="rounded-2xl border-stone-200 bg-white shadow-sm">
								<CardContent className="p-5">
									<div className="mb-4 font-semibold">
										Operating diagnostics
									</div>
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
								</CardContent>
							</Card>
						</div>

						<Card className="rounded-2xl border-emerald-200 bg-emerald-50 shadow-sm">
							<CardContent className="p-5 text-sm leading-6 text-emerald-950">
								<div className="mb-1 font-semibold">Interpretation</div>
								This model treats the BESS as charging off-peak and discharging
								into either EV load or the host/site behind-the-meter load. The
								on-peak avoided value should include the tariff-specific value
								of energy replacement plus any demand-charge equivalent. For
								lender-grade modeling, replace this blended value with a tariff
								study and interval-load dispatch model.
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

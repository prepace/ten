import "./globals.css";

export const metadata = {
	title: "Tribal Energy Network — CALeVIP Fundraiser",
	description:
		"Help 10 California Tribes secure clean energy for generations. $360,000 goal by Aug 31, 2025 to unlock $18.6M+ in chargers, credits, and sponsorships.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body className="bg-bg text-fg font-[Inter,system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]">
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				{children}
			</body>
		</html>
	);
}

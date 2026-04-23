import "./globals.css";

export const metadata = {
	title: "Tribal Energy Network — EV Charging for California Tribes",
	description:
		"The Tribal Energy Network (TEN) is a coalition of California tribes working together to accelerate the deployment of electric vehicle (EV) charging infrastructure on tribal lands. Our mission is to empower tribes with the resources, knowledge, and partnerships needed to build a sustainable and equitable EV charging network that benefits tribal communities and the environment.",
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

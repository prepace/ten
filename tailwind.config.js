// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				bg: "#0b1020",
				fg: "#ffffff",
				muted: "#c9d1d9",
				primary: "#21c55d",
				accent: "#00d0ff",
				card: "#121833",
				ring: "#31418b",
			},
			boxShadow: {
				glow: "0 8px 24px rgba(33,197,93,.25)",
			},
		},
	},
	plugins: [],
};

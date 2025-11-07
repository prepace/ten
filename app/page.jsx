"use client";

import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
					<Link
						href="/ca"
						className="px-6 py-3 rounded-lg font-bold transition-all bg-gradient-to-r from-[#6ee7b7] to-[#22c55e] text-[#051b12] hover:opacity-90"
					>
						CA Tribes - CALeVIP
					</Link>
					<Link
						href="/wa"
						className="px-6 py-3 rounded-lg font-bold transition-all bg-gradient-to-r from-[#60a5fa] to-[#8b5cf6] text-[#041224] hover:opacity-90"
					>
						WA Tribes - WAEVCP2
					</Link>
				</div>
			</div>
		</main>
	);
}

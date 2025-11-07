"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WAPage() {
	const router = useRouter();

	useEffect(() => {
		router.push("/?tribe=wa");
	}, [router]);

	return null;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CAPage() {
	const router = useRouter();

	useEffect(() => {
		router.push("/?tribe=ca");
	}, [router]);

	return null;
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CAPage() {
	const router = useRouter();

	useEffect(() => {
		router.push("/?tribe=ca");
	}, [router]);

	return null;
}

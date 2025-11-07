"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WAPage() {
	const router = useRouter();

	useEffect(() => {
		router.push("/?tribe=wa");
	}, [router]);

	return null;
}

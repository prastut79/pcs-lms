"use client";

import { P_LOAN } from "@/config/siteConfig";
import { API_LOAN } from "@/config/apiConfig";
import { useSession } from "next-auth/react";
import { toastifyResponse } from "@/app/api/utils";
import LoanForm, { LoanProps } from "../_forms/LoanForm";
import { useRouter } from "next/navigation";

export default function LoanAdd() {
	const session = useSession();
	const { push, refresh } = useRouter();

	const onSubmit = async (data: LoanProps) => {
		const req = await fetch(API_LOAN, {
			method: "POST",
			body: JSON.stringify({
				...data,
				userId: session.data?.user?.id,
			}),
		});
		await toastifyResponse(req);
		push(P_LOAN.href);
		refresh();
	};

	return <LoanForm onSubmit={onSubmit} />;
}

"use client";

import { P_LOAN_ADD, P_LOAN_PENDING } from "@/config/siteConfig";
import DashContainer from "../../../component/Dashcontainer";
import { API_LOAN, API_VERIFY } from "@/config/apiConfig";
import { useSession } from "next-auth/react";
import { toastifyResponse } from "@/app/api/utils";
import LoanForm, { LoanProps } from "../../_forms/LoanForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoanEditForm(value: { value: LoanProps }) {
	const session = useSession();
	const { push, refresh } = useRouter();

	const onSubmit = async (data: LoanProps) => {
		try {
			const req = await fetch(API_VERIFY, {
				method: "PUT",
				body: JSON.stringify({
					...data,
					updatedBy: session.data?.user?.id,
				}),
			});
			await toastifyResponse(req);
			push(P_LOAN_PENDING.href);
			refresh();
		} catch (e) {}
	};

	return <LoanForm value={value.value} onSubmit={onSubmit} action="verify" />;
}

"use client";

import { P_LOAN_ADD } from "@/config/siteConfig";
import DashContainer from "../../../component/Dashcontainer";
import { API_LOAN } from "@/config/apiConfig";
import { useSession } from "next-auth/react";
import { toastifyResponse } from "@/app/api/utils";
import LoanForm, { LoanProps } from "../../_forms/LoanForm";

export default function LoanEditForm(value: { value: LoanProps }) {
	const session = useSession();

	const onSubmit = async (data: LoanProps) => {
		try {
			const req = await fetch(API_LOAN, {
				method: "PUT",
				body: JSON.stringify({
					...data,
					userId: session.data?.user?.id,
					retry:
						value.value.status === "rejected" &&
						value.value.userId === session.data?.user?.id,
				}),
			});
			const res = await req.json();
			await toastifyResponse(res);
		} catch (e) {}
	};

	return <LoanForm value={value.value} onSubmit={onSubmit} action="edit" />;
}

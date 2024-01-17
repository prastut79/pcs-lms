"use client";

import { P_LOAN, P_LOAN_ADD } from "@/config/siteConfig";
import DashContainer from "../../../component/Dashcontainer";
import { API_LOAN } from "@/config/apiConfig";
import { useSession } from "next-auth/react";
import { toastifyResponse } from "@/app/api/utils";
import LoanForm, { LoanProps } from "../../_forms/LoanForm";
import { useRouter } from "next/navigation";

export default function LoanEditForm(value: { value: LoanProps }) {
	const session = useSession();
	const { push, refresh } = useRouter();

	const onSubmit = async (data: LoanProps) => {
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

		await toastifyResponse(req);
		if (req.ok) {
			push(P_LOAN.href);
			refresh();
		}
	};

	return <LoanForm value={value.value} onSubmit={onSubmit} action="edit" />;
}

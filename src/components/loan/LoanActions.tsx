"use client";

import { LoanProps } from "@/app/dashboard/loan/_forms/LoanForm";
import React from "react";
import LoanViewModal from "./LoanViewModal";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { P_LOAN_EDIT, P_LOAN_VERIFY } from "@/config/siteConfig";
import LoanDeleteAction from "./LoanDeleteAction";
import { useSession } from "next-auth/react";
import { capitalize } from "@/app/utils/text";
import { TranVerificationProps } from "@/app/dashboard/loan/admin/approved/page";

export default function LoanActions({
	loan,
	action,
	tran,
}: {
	loan: LoanProps;
	action?: string;
	tran?: TranVerificationProps;
}) {
	const { data } = useSession();
	return (
		<div className="flex gap-3 text-base ">
			<LoanViewModal loan={loan} tran={tran} />
			{(loan.status === "rejected" || data?.user?.role === "admin") && (
				<Link
					href={
						(action === "verify"
							? P_LOAN_VERIFY.href
							: P_LOAN_EDIT.href) +
						"/" +
						loan.id
					}
					title={capitalize(action || "edit") + " Loan"}
					className="bc_x"
				>
					<MdEdit className="text-blue-400" />
				</Link>
			)}
			<LoanDeleteAction loan={loan} />
		</div>
	);
}

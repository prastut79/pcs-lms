"use client";

import { LoanProps } from "@/app/dashboard/loan/_forms/LoanForm";
import React from "react";
import LoanViewModal from "./LoanViewModal";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { P_LOAN_EDIT, P_LOAN_VERIFY } from "@/config/siteConfig";
import LoanDeleteAction from "./LoanDeleteAction";
import { useSession } from "next-auth/react";

export default function LoanActions({
	loan,
	action,
}: {
	loan: LoanProps;
	action?: string;
}) {
	const { data } = useSession();
	return (
		<div className="flex gap-3 text-base ">
			<LoanViewModal loan={loan} />
			{(loan.status === "rejected" || data?.user?.role === "admin") && (
				<Link
					href={
						(action === "verify"
							? P_LOAN_VERIFY.href
							: P_LOAN_EDIT.href) +
						"/" +
						loan.id
					}
					title="Edit Loan"
					className="bc_x"
				>
					<MdEdit className="text-blue-400" />
				</Link>
			)}
			<LoanDeleteAction loan={loan} />
		</div>
	);
}

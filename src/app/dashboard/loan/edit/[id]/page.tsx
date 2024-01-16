import { P_LOAN_EDIT } from "@/config/siteConfig";
import DashContainer from "../../../component/Dashcontainer";
import { API_LOAN } from "@/config/apiConfig";
import LoanEditForm from "./LoanEditForm";
import { NextOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: P_LOAN_EDIT.title,
};

export default async function LoanEdit({ params }: { params: { id: string } }) {
	const req = await fetch(API_LOAN + "/" + params.id, {
		cache: "no-store",
		headers: { cookie: cookies().toString() },
	});
	const loan = await req.json();
	const session = await getServerSession(NextOptions);

	if (!loan?.data) {
		return notFound();
	}

	// Validation
	if (session?.user?.role !== "admin") {
		if (
			loan.data?.status !== "rejected" ||
			loan?.data?.userId !== session?.user?.id
		) {
			return notFound();
		}
	}

	return (
		<DashContainer title={P_LOAN_EDIT.title}>
			<LoanEditForm value={loan?.data} />
		</DashContainer>
	);
}

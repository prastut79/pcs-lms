import { API_LOAN } from "@/config/apiConfig";
import { LoanProps } from "./_forms/LoanForm";
import DashContainer from "../component/Dashcontainer";
import { P_LOAN } from "@/config/siteConfig";
import LoanList from "@/components/loan/LoanList";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { NextOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: P_LOAN.title,
};

export default async function page() {
	const req = await fetch(API_LOAN, {
		headers: { cookie: cookies().toString() },
	});

	const loans = (await req.json()) as { data: LoanProps[] };

	return (
		<DashContainer title={P_LOAN.title}>
			<div>
				<LoanList loans={loans.data} />
			</div>
		</DashContainer>
	);
}

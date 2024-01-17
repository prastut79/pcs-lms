import { API_LOAN } from "@/config/apiConfig";
import { LoanProps } from "../../../loan/_forms/LoanForm";
import DashContainer from "../../../component/Dashcontainer";
import { P_LOAN, P_LOAN_PENDING } from "@/config/siteConfig";
import LoanList from "@/components/loan/LoanList";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: P_LOAN_PENDING.title,
};

export default async function page() {
	const req = await fetch(API_LOAN + "?status=pending", {
		cache: "no-store",
		headers: { cookie: cookies().toString() },
	});

	const loans = (await req.json()) as { data: LoanProps[] };

	return (
		<DashContainer title={P_LOAN_PENDING.title}>
			<div>
				<LoanList loans={loans.data} action="verify" />
			</div>
		</DashContainer>
	);
}

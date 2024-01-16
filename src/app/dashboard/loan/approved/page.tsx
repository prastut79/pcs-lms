import { API_LOAN, API_VERIFY } from "@/config/apiConfig";
import { LoanProps, UserProps } from "../_forms/LoanForm";
import DashContainer from "../../component/Dashcontainer";
import { P_LOAN, P_LOAN_APPROVED } from "@/config/siteConfig";
import { Metadata } from "next";
import { cookies } from "next/headers";
import ApprovedList from "./ApprovedList";

export const metadata: Metadata = {
	title: P_LOAN_APPROVED.title,
};

export default async function page() {
	const req = await fetch(API_VERIFY, {
		cache: "no-store",
		headers: {
			cookie: cookies().toString(),
		},
	});

	const trans = (await req.json()) as { data: TranVerificationProps[] };

	return (
		<DashContainer title={P_LOAN.title}>
			<div>
				<ApprovedList trans={trans.data} />
			</div>
		</DashContainer>
	);
}
export interface TranVerificationProps {
	id: number;
	verifiedAt: string;
	verifiedBy: number;
	tranId: number;
	tran: LoanProps;
	user: UserProps;
}

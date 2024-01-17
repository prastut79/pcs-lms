import { P_LOAN_VERIFY } from "@/config/siteConfig";
import DashContainer from "@/app/dashboard/component/Dashcontainer";
import { API_LOAN } from "@/config/apiConfig";
import LoanVerifyForm from "./LoanVerifyForm";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { NextOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: P_LOAN_VERIFY.title,
};
export default async function LoanEdit({ params }: { params: { id: string } }) {
	const session = await getServerSession(NextOptions);

	if (!(session?.user?.role === "admin")) {
		return notFound();
	}

	const req = await fetch(API_LOAN + "/" + params.id, {
		cache: "no-store",
		headers: { cookie: cookies().toString() },
	});
	const loan = await req.json();

	return (
		<DashContainer title={P_LOAN_VERIFY.title}>
			<LoanVerifyForm value={loan?.data} />
		</DashContainer>
	);
}

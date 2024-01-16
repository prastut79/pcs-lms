import { getServerSession } from "next-auth";
import { NextOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardSidebar, { DashboardButtonProps } from "./DashboardSidebar";
import {
	P_LOAN,
	P_LOAN_ADD,
	P_LOAN_APPROVED,
	P_LOAN_PENDING,
	P_LOAN_VERIFY,
} from "@/config/siteConfig";

export default async function Sidebar() {
	const session = await getServerSession(NextOptions);

	const role = session?.user?.role;

	return (
		<DashboardSidebar
			DASHBOARD_BUTTONS={role === "admin" ? ADMIN_BUTTON : MEMBER_BUTTON}
		/>
	);
}

const MEMBER_BUTTON: DashboardButtonProps[] = [
	{
		label: "Loan",
		buttons: [P_LOAN, P_LOAN_ADD],
	},
];

const ADMIN_BUTTON: DashboardButtonProps[] = [
	{
		label: "Loan",
		buttons: [P_LOAN_PENDING, P_LOAN_APPROVED, P_LOAN, P_LOAN_ADD],
	},
];

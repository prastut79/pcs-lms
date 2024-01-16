import { P_LOAN_ADD } from "@/config/siteConfig";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import DashContainer from "../../component/Dashcontainer";

export const metadata: Metadata = {
	title: P_LOAN_ADD.title,
};

export default function layout({ children }: PropsWithChildren<any>) {
	return <DashContainer title={P_LOAN_ADD.title}>{children}</DashContainer>;
}

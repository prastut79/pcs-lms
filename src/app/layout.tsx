import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "./Provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
	title: {
		default: " Loan Management System",
		template: "%s | Loan Management System",
	},
	description: "A loan management system.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className + " max-w-[2040px] mx-auto"}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

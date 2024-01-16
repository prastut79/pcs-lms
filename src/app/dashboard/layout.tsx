import Sidebar from "./component/sidebar/Sidebar";

export const metadata = {
	title: {
		default: "",
		template: "%s | Dashboard | Loan Management System",
	},
};

export default function Dashboard({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex w-full h-full">
			<Sidebar />
			{children}
		</div>
	);
}

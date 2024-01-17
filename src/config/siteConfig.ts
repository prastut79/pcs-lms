export const P_DASHBOARD = {
	href: "/dashboard",
};
export const P_LOGIN = { href: "/login", label: "Login" };
export const P_REGISTER = { href: "/register", label: "Register" };

export const P_LOAN = {
	href: P_DASHBOARD.href + "/loan",
	label: "List",
	title: "Loan List",
};

export const P_LOAN_ADD = {
	href: P_LOAN.href + "/add",
	label: "Add",
	title: "Loan Add",
};
export const P_LOAN_EDIT = {
	href: P_LOAN.href + "/edit",
	label: "Edit",
	title: "Loan Edit",
};
export const P_LOAN_ADMIN = {
	href: P_LOAN.href + "/admin",
};
export const P_LOAN_VERIFY = {
	href: P_LOAN_ADMIN.href + "/verify",
	label: "Verification",
	title: "Loan Verification",
};
export const P_LOAN_PENDING = {
	href: P_LOAN_ADMIN.href + "/pending",
	label: "Pending",
	title: "Loans Pending",
};
export const P_LOAN_APPROVED = {
	href: P_LOAN_ADMIN.href + "/approved",
	label: "Approved",
	title: "Loans Approved",
};

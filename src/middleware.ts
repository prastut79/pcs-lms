import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";
import { P_LOAN_ADMIN } from "./config/siteConfig";
import { notFound } from "next/navigation";

export default withAuth((req: NextRequest) => {
	if (
		req.url.startsWith(P_LOAN_ADMIN.href) &&
		//@ts-expect-error
		req.nextauth.token.role !== "admin"
	) {
		notFound();
	}
});

export const config = {
	matcher: ["/dashboard/:path*", "/api/((?!auth).*)"],
};

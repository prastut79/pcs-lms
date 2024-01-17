import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { P_LOAN_ADMIN } from "./config/siteConfig";

export default withAuth((req: NextRequest) => {
	if (
		req.nextUrl.pathname.startsWith(P_LOAN_ADMIN.href) &&
		//@ts-expect-error
		req.nextauth.token.role !== "admin"
	) {
		return NextResponse.rewrite(new URL("/404", req.url));
	}
});

export const config = {
	matcher: ["/dashboard/:path*", "/api/((?!auth).*)"],
};

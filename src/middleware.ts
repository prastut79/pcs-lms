import { withAuth } from "next-auth/middleware";

export { default } from "next-auth/middleware";

// export default withAuth(() => {
// 	console.log("middleware hit");
// });

export const config = {
	matcher: ["/dashboard/:path*", "/api/((?!auth|user).*)"],
};

import Image from "next/image";
import Link from "next/link";
import { P_LOGIN, P_REGISTER } from "../config/siteConfig";

export default function Home() {
	return (
		<main className="">
			<div
				className="w-full min-h-screen px-4 object-center object-cover py-20 relative"
				style={{ background: `url("/cover-img.jpg")` }}
			>
				<div className="inset-0 absolute bg-black/30" />
				<h1 className=" text-center text-5xl text-theme font-bold z-10 relative">
					Welcome to Loan Management System
				</h1>
				{/* <div className="fc_xy"> */}
				<div className="mx-auto fc_xy gap-4 mt-40 relative">
					<Link
						href={P_LOGIN.href}
						className="px-6 py-3 bg-theme text-tb rounded bc_x"
					>
						{P_LOGIN.label}
					</Link>
					<span className="text-white">or</span>
					<Link
						href={P_REGISTER.href}
						className="px-6 py-3 bg-theme text-tb rounded bc_x"
					>
						{P_REGISTER.label}
					</Link>
				</div>
				{/* </div> */}
			</div>
		</main>
	);
}

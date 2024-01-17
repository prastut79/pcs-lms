"use client";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/nativeButton";
import { API_UNEXPECTED_ERROR } from "@/config/apiConfig";
import { P_LOAN_ADD, P_REGISTER } from "@/config/siteConfig";
import Link from "next/link";

interface LoginProps {
	email: string;
	password: string;
}

export default function LoginForm() {
	const { push } = useRouter();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: LoginProps) => {
		setLoading(true);
		await signIn("credentials", {
			...data,
			redirect: false,
		})
			.then((data) => {
				if (data?.error) {
					toast.error(`${data?.error || API_UNEXPECTED_ERROR}`);
				} else {
					toast.success("Login Sucessfull.");
					push(P_LOAN_ADD.href);
				}
			})
			.catch((err) => {
				toast.error(<>{err.error}</>);
			});
		setLoading(false);
	};

	const { register, handleSubmit } = useForm<LoginProps>({});

	return (
		<div>
			<div className="fc_xy h-full max-w-lg mx-auto mt-20">
				<div className="px-10 py-14 shadow-xl w-full">
					<h1 className="font-bold text-xl">Login</h1>
					<div className="title-under"></div>
					<form
						className="mt-10 flex flex-col gap-7"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Input
							label="Email Address"
							required
							type="email"
							{...register("email")}
						/>

						<Input
							label="Password"
							type="password"
							required
							{...register("password")}
						/>
						<Button className="mt-5" loading={loading}>
							Login
						</Button>
						<Link
							href={P_REGISTER.href}
							className="font-semibold text-sm text-theme bc_x text-center"
						>
							New? Register Here
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}

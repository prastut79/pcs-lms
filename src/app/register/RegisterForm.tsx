"use client";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/nativeButton";
import { API_REGISTER, API_UNEXPECTED_ERROR } from "../../config/apiConfig";
import { P_LOGIN } from "@/config/siteConfig";
import Link from "next/link";

interface RegisterProps {
	email: string;
	name: string;
	phone: string;
	address: string;
	password: string;
	confirmPassword: string;
}

export default function RegisterForm() {
	const { push } = useRouter();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: RegisterProps) => {
		setLoading(true);

		try {
			const req = await fetch(API_REGISTER, {
				body: JSON.stringify({
					...data,
					email: data.email.toLowerCase(),
				}),
				method: "POST",
			});

			const res = await req.json();

			if (req.ok) {
				toast.success(res.message);
				push(P_LOGIN.href);
			} else {
				toast.error(res.message);
			}
		} catch (e: any) {
			toast.error(API_UNEXPECTED_ERROR, e.message);
		}
		setLoading(false);
	};

	const { register, handleSubmit } = useForm<RegisterProps>({});

	return (
		<div>
			<div className="fc_xy h-full max-w-4xl mx-auto mt-20">
				<div className="px-10 py-14 shadow-xl w-full">
					<h1 className="font-bold text-xl">Register</h1>
					<div className="title-under"></div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mt-10 form-grid-sm">
							<Input
								label="Email Address"
								required
								type="email"
								{...register("email")}
							/>
							<Input
								label="Name"
								required
								type="text"
								{...register("name")}
							/>
							<Input
								label="Phone Number "
								required
								type="number"
								min={9000000000}
								max={9999999999}
								{...register("phone")}
							/>

							<Input
								label="Address"
								type="text"
								required
								{...register("address")}
							/>
							<Input
								label="Password"
								type="password"
								minLength={6}
								required
								{...register("password")}
							/>
							<Input
								label="Confirm Password"
								type="password"
								minLength={6}
								required
								{...register("confirmPassword")}
							/>
						</div>
						<div className="fc_x justify-between py-6">
							<Link
								href={P_LOGIN.href}
								className="font-semibold text-sm text-theme bc_x"
							>
								Proceed to login?
							</Link>
							<Button className="mt-5" loading={loading}>
								Register
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

"use client";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/nativeButton";
import { API_REGISTER } from "../../config/apiConfig";

interface RegisterProps {
	email: string;
	name: string;
	phone: string;
	address: string;
	password: string;
	confirmPassword: string;
}

export default function Login() {
	const { push } = useRouter();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: RegisterProps) => {
		setLoading(true);
		console.log("Submitted", data);

		const req = await fetch(API_REGISTER, {
			body: JSON.stringify(data),
			method: "POST",
		});
		const res = await req.json();
		if (req.ok) {
			toast.success(res.message);
		} else {
			toast.error(res.message);
		}
		setLoading(false);
	};

	const { register, handleSubmit } = useForm<RegisterProps>({});

	return (
		<div>
			<div className="fc_xy h-full max-w-4xl mx-auto mt-20">
				<div className="px-10 py-14 shadow-xl">
					<h1 className="font-bold text-xl">Register</h1>
					<div className="title-under"></div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mt-10 form-grid-sm">
							<Input
								label="Email "
								required
								type="email"
								{...register("email")}
							/>
							<Input
								label="Name "
								required
								type="text"
								{...register("name")}
							/>
							<Input
								label="Phone Number "
								required
								type="text"
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
								required
								{...register("password")}
							/>
							<Input
								label="Confirm Password"
								type="password"
								required
								{...register("confirmPassword")}
							/>
						</div>
						<Button className="mt-5" loading={loading}>
							Login
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

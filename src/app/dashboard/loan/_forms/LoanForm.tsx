"use client";

import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/nativeButton";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Combobox } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { API_LOAN } from "@/config/apiConfig";
import { capitalize } from "@/app/utils/text";
import { DatePicker } from "@/components/ui/datepicker";
import { getFormatedDate } from "@/app/utils/date";

export default function LoanForm({
	value,
	onSubmit,
	action = "add",
}: {
	value?: LoanProps;
	onSubmit: (data: LoanProps) => any;
	action?: "add" | "edit" | "verify";
}) {
	const { register, handleSubmit, control } = useForm<LoanProps>({
		defaultValues: {
			...value,
			returnedAt: value?.returnedAt?.substring(0, 10),
		},
	});
	const [isLoading, setIsLoading] = useState(false);
	const session = useSession();

	const formSubmit = async (data: LoanProps) => {
		setIsLoading(true);
		try {
			await onSubmit({
				...data,
				returnedAt: new Date(data.returnedAt).toISOString(),
				userId: session.data?.user?.id,
			});
		} catch (e) {}
		setIsLoading(false);
	};

	const isAdmin = session.data?.user?.role === "admin";

	return (
		<form onSubmit={handleSubmit(formSubmit)} className="grid gap-8">
			<div className="form-grid">
				<Input
					label="Loan Amount"
					required
					type="number"
					placeholder="Loan Amount"
					max={99999999999}
					disabled={action === "verify"}
					{...register("amount")}
				/>
				<Input
					value={
						getFormatedDate(
							value?.requestedAt || (new Date() as any)
						) || "-"
					}
					label="Request Date"
					disabled
				/>
				{/* <Controller
					control={control}
					name="returnedAt"
					render={({ field: { onChange, value } }) => ( */}
				<Input
					type="date"
					label="Return Date"
					disabled={action === "verify"}
					{...register("returnedAt")}
				/>
				{/* )}
				/> */}
			</div>
			<Textarea
				label="Purpose"
				maxLength={1000}
				required
				placeholder="Breifly descibe the purpose of the loan..."
				disabled={action === "verify"}
				{...register("purpose")}
			/>
			{isAdmin && action !== "add" && (
				<Input type="number" label="Late Fine" {...register("fine")} />
			)}
			{action === "verify" && isAdmin && (
				<>
					<div className="">
						<Controller
							control={control}
							name="status"
							render={({ field: { name, onChange, value } }) => (
								<Combobox
									options={[
										{
											value: "pending",
											label: "Pending",
										},
										{
											value: "approved",
											label: "Approved",
										},
										{
											value: "rejected",
											label: "Rejected",
										},
									]}
									onChange={onChange}
									value={value}
									label="Status"
									placeholder="Select a Loan Status"
								/>
							)}
						/>
					</div>
					<Textarea
						label="Remark"
						required
						maxLength={1000}
						placeholder="Leave a remark for the loan"
						{...register("remarks")}
					/>
				</>
			)}
			<div className=" flex justify-end">
				<Button className="mt-8 min-w-32" loading={isLoading}>
					{capitalize(action)}
				</Button>
			</div>
		</form>
	);
}

export interface LoanProps {
	id?: number;
	amount: string;
	purpose: string;
	requestedAt: string;
	returnedAt: string;
	status: string;
	remarks: string;
	userId?: number;
	fine?: number;
	user?: UserProps;
}

export interface UserProps {
	id: number;
	name: string;
	email: string;
	phone: string;
	address: string;
}

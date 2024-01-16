"use client";

import { useState } from "react";
import Loading from "@/components/Loading";

import Modal from "@/components/modal";

export default function DialogBox({
	onClose,
	title = "Confirm",
	message = "Are you sure you want to perform this action?",
	onConfirm,
	open,
}: DialogBox) {
	const [isLoading, setIsLoading] = useState(false);

	async function handleConfirm(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		setIsLoading(true);
		await onConfirm?.(e);
		onClose?.();
	}

	function handleClose() {
		if (!isLoading) {
			onClose?.();
		}
	}
	if (!open) return <></>;
	return (
		<Modal onClose={handleClose} className="w-full" maxWidth={400}>
			<div className="px-4 py-3 border-t-4 border-theme w-full ">
				<h2 className="text-lg text-ts font-bold">{title}</h2>
				<p className="text-tp pt-4">{message}</p>
				<div className="text-right text-xs font-bold mt-4 border-t border-bl pt-4">
					<button className="bc_x text-tp " onClick={onClose}>
						CANCEL
					</button>
					<button
						className="bc_x ml-5 px-2 py-2 rounded bg-theme text-tb"
						onClick={handleConfirm}
						disabled={isLoading}
					>
						<span className="fc_x gap-x-1">
							{isLoading && <Loading size="xs" />}
							CONFIRM
						</span>
					</button>
				</div>
			</div>
		</Modal>
	);
}

interface DialogBox {
	title?: string;
	message?: React.ReactNode;
	onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => any;
	open?: boolean;
	onClose: () => any;
}

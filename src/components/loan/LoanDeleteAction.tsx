import { MdDeleteOutline } from "react-icons/md";
import DialogBox from "../DialogBox";
import { useState } from "react";
import { LoanProps } from "@/app/dashboard/loan/_forms/LoanForm";
import { toast } from "react-toastify";
import { API_LOAN, API_UNEXPECTED_ERROR } from "@/config/apiConfig";
import { toastifyResponse } from "@/app/api/utils";

export default function LoanDeleteAction({ loan }: { loan: LoanProps }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
	};

	const onDelete = async () => {
		try {
			const req = await fetch(API_LOAN + "/" + loan.id, {
				method: "DELETE",
			});
			await toastifyResponse(req);
		} catch (e) {
			toast.error(API_UNEXPECTED_ERROR);
		}
	};

	return (
		<>
			<DialogBox
				onClose={handleClose}
				onConfirm={onDelete}
				message="Do you want to delete this loan?"
				open={isOpen}
			/>
			<button
				title="Delete Loan"
				className="bc_x"
				onClick={() => setIsOpen(true)}
			>
				<MdDeleteOutline className="text-red-500" />
			</button>
		</>
	);
}

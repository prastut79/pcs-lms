import { useState } from "react";
import { LoanProps } from "../../app/dashboard/loan/_forms/LoanForm";
import { FaEye } from "react-icons/fa";
import Modal from "@/components/modal";
import { getFormatedDate } from "@/app/utils/date";
import LoanStatus from "@/components/loan/LoanStatus";
import Button from "../ui/nativeButton";
import { TranVerificationProps } from "@/app/dashboard/loan/admin/approved/page";
import { capitalize } from "@/app/utils/text";

export default function LoanViewModal({
	loan,
	tran,
}: {
	loan: LoanProps;
	tran?: TranVerificationProps;
}) {
	const [isOpen, setIsOpen] = useState(false);
	function handleClose() {
		setIsOpen(false);
	}
	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				title="View"
				className="bc_x"
			>
				<FaEye className="text-yellow-600" />
			</button>
			{isOpen && (
				<Modal
					onClose={handleClose}
					fullWidth
					className="w-full"
					maxWidth={900}
				>
					<div className="px-6 py-8 w-full">
						<h1 className=" text-xl font-bold">Loan Details</h1>
						<div className="title-under mb-8" />
						<div className="grid w-full gap-6">
							<div className="flex justify-between">
								<div>
									<LoanStatus status={loan.status} />
								</div>
								{loan.fine && (
									<div className="text-red-400 bg-red-100 px-4 py-2 rounded w-max  mb-4">
										<h6 className="text-xs">Fine</h6>
										<h3>Rs. {loan.fine}</h3>
									</div>
								)}
							</div>

							<div className="flex gap-4 justify-between">
								<div>
									<h6 className="text-xs">Amount</h6>
									<h3 className="font-semibold">
										Rs. {loan.amount}
									</h3>
								</div>

								<div>
									<h6 className="text-xs">Requested On</h6>
									<h3 className="font-semibold">
										{getFormatedDate(
											loan.requestedAt,
											true
										) || "-"}
									</h3>
								</div>
								<div>
									<h6 className="text-xs">Return By</h6>
									<h3 className="font-semibold">
										{getFormatedDate(
											loan.returnedAt,
											true
										) || "-"}
									</h3>
								</div>
							</div>
							<div>
								<h6 className="text-xs">Purpose</h6>
								<h3 className="font-semibold">
									{loan.purpose}
								</h3>
							</div>
							<div>
								<h6 className="text-xs">Requested By</h6>
								<div className="">
									<h3 className="font-semibold">
										{loan.user?.name}
									</h3>
									<p className="text-xs">
										{loan.user?.email} | {loan.user?.phone}
									</p>
									<p className="text-xs py-0.5">
										{loan.user?.address}
									</p>
								</div>
							</div>
							{loan.remarks && (
								<div className="py-4">
									<h6 className="text-xs">Remarks</h6>
									<h3 className="font-semibold">
										{loan.remarks}
									</h3>
								</div>
							)}
						</div>
						{tran && loan.status === "approved" && (
							<>
								<div className="w-full h-0.5 bg-black/10 my-5 rounded-full" />
								<div className="flex justify-between my-4">
									<div className="py-4">
										<h6 className="text-xs">Approved by</h6>
										<h3 className="font-semibold">
											{tran?.user?.name}
										</h3>
									</div>
									<div className="py-4">
										<h6 className="text-xs">Approved On</h6>
										<h3 className="font-semibold">
											{getFormatedDate(
												tran?.verifiedAt,
												true
											)}
										</h3>
									</div>
								</div>
							</>
						)}
						<div className="flex justify-end">
							<Button onClick={handleClose}>Close</Button>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}

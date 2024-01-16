import { LoanProps } from "@/app/dashboard/loan/_forms/LoanForm";
import { getFormatedDate } from "@/app/utils/date";
import LoanActions from "@/components/loan/LoanActions";
import LoanStatus from "@/components/loan/LoanStatus";
import { TranVerificationProps } from "./page";

export default function ApprovedList({
	trans,
	action,
}: {
	trans: TranVerificationProps[];
	action?: "verify" | "edit";
}) {
	if (!trans) {
		return (
			<div className="fc_xy min-h-32 w-full">
				<p>No Approvals found</p>
			</div>
		);
	}
	return (
		<table className="w-full px overflow-auto">
			<thead className="border-b border-bl bg-bp text-sm font-semibold text-tp">
				<tr>
					<td className="p-4">#</td>
					<td className="p-4 ">Loan Amount</td>
					<td className="p-4">Request Date</td>
					<td className="p-4">Status</td>
					<td className="p-4">Requested By</td>
					<td className="p-4">Verified By</td>
					<td className="p-4">Actions</td>
				</tr>
			</thead>
			<tbody className="text-sm font-semibold text-ts">
				{trans?.map((tran, i) => (
					<tr
						key={i}
						className="border-b border-bl whitespace-nowrap hover:bg-bl/40"
					>
						<td className="p-4 truncate">{i + 1}</td>
						<td className="p-4 truncate">Rs. {tran.tran.amount}</td>
						<td className="p-4 truncate">
							{getFormatedDate(tran.tran.requestedAt)}
						</td>
						<td className="p-4 truncate">
							{<LoanStatus status={tran.tran.status} />}
						</td>
						<td className="p-4 truncate">
							<p>{tran.tran.user?.name}</p>
							<p className="text-xs opacity-70">
								{tran.tran.user?.email}
							</p>
						</td>
						<td className="p-4 truncate">
							<p>{tran.user?.name}</p>
							<p className="text-xs opacity-70">
								{tran.user?.email}
							</p>
						</td>
						<td className="p-4">
							<LoanActions loan={tran.tran} action={"verify"} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

import { LoanProps } from "@/app/dashboard/loan/_forms/LoanForm";
import { getFormatedDate } from "@/app/utils/date";
import LoanStatus from "./LoanStatus";
import LoanActions from "./LoanActions";

export default function LoanList({
	loans,
	action,
}: {
	loans: LoanProps[];
	action?: "verify" | "edit";
}) {
	if (!loans || loans.length === 0) {
		return (
			<div className="fc_xy min-h-32 w-full">
				<p>No Loans found</p>
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
					<td className="p-4">Returned Date</td>
					<td className="p-4">Status</td>
					<td className="p-4">Requested By</td>
					<td className="p-4">Fine</td>
					<td className="p-4">Actions</td>
				</tr>
			</thead>
			<tbody className="text-sm font-semibold text-ts">
				{loans?.map((loan, i) => (
					<tr
						key={i}
						className="border-b border-bl whitespace-nowrap hover:bg-bl/40"
					>
						<td className="p-4 truncate">{i + 1}</td>
						<td className="p-4 truncate">Rs. {loan.amount}</td>
						<td className="p-4 truncate">
							{getFormatedDate(loan.requestedAt)}
						</td>
						<td className="p-4 truncate">
							{getFormatedDate(loan.returnedAt) || "-"}
						</td>
						<td className="p-4 truncate">
							{<LoanStatus status={loan.status} />}
						</td>
						<td className="p-4 truncate">
							<p>{loan.user?.name}</p>
							<p className="text-xs opacity-70">
								{loan.user?.email}
							</p>
						</td>
						<td className="p-4 truncate">
							{loan.fine ? `Rs. ${loan.fine}` : "-"}
						</td>

						<td className="p-4">
							<LoanActions loan={loan} action={action} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

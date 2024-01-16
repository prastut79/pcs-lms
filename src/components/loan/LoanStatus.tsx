import { cn } from "@/lib/utils";

const STATUS_COLOR = {
	pending: "bg-yellow-100 text-yellow-500",
	approved: "bg-green-100 text-green-500",
	rejected: "bg-red-100 text-red-500",
	default: "bg-theme/10 text-theme",
};

export default function LoanStatus({ status }: { status: string }) {
	return (
		<span
			className={cn(
				"px-2 py-1 rounded text-xs",
				//@ts-ignore
				STATUS_COLOR[status] || STATUS_COLOR.default
			)}
		>
			{status.toUpperCase()}
		</span>
	);
}

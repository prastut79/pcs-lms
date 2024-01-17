import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { IoMdClose } from "react-icons/io";

export default function DashboardRole({
	setIsOpen,
	isFixed,
}: {
	isFixed: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const { data } = useSession();

	return (
		<div>
			<div className=" fc_x justify-between">
				<h1 className="font-semibold text-t">DASHBOARD</h1>
				{!isFixed && (
					<button onClick={() => setIsOpen(false)}>
						<IoMdClose size={21} className="text-tp" />
					</button>
				)}
			</div>

			<p
				className={`text-[10px] flex gap-1 font-semibold ${
					/**@ts-ignore */
					"text-tl"
				}`}
			>
				<span className="block text-theme truncate">
					{data?.user?.name || ""}
				</span>
				|<span>{data?.user?.role?.toUpperCase() || ""}</span>
			</p>
		</div>
	);
}

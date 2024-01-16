"use client";

import { useState } from "react";
import ActiveLink from "@/components/ActiveLink";
import { IoMdArrowDropdown } from "react-icons/io";
import { DashboardButtonProps } from "./DashboardSidebar";

export function SidebarButton({ Icon, label, href }: DashboardButtonProps) {
	return (
		<ActiveLink
			className="fc_x gap-x-3 text-md font-bold text-ts"
			active="!text-theme"
			href={href || ""}
			prefetch={false}
		>
			{label}
		</ActiveLink>
	);
}

export function SidebarButtons({
	label,
	buttons,
	open = true,
}: DashboardButtonProps) {
	const [isOpen, setIsOpen] = useState<boolean>(open);

	function toggleOpen() {
		setIsOpen((prev) => !prev);
	}
	return (
		<div>
			<div className="fc_x gap-x-2 cursor-pointer" onClick={toggleOpen}>
				<div className="!flex -m-1">
					<IoMdArrowDropdown
						className={`text-bs p-0 transition  ${
							isOpen ? "rotate-0" : "-rotate-90"
						}`}
						size={22}
					/>
				</div>
				<h5 className="cursor-pointer text-sm font-bold text-t">
					{label.toUpperCase()}
				</h5>
			</div>

			{isOpen && (
				<div className="px-3">
					<div className="mt-2 flex flex-col gap-y-3 border-l-2 border-bl">
						{buttons?.map(({ label, href }, j) => (
							<ActiveLink
								active="!text-theme !border-theme !font-bold"
								href={href}
								key={j}
								className="pl-4 py-1 text-sm text-tl font-semibold -m-[2px] border-l-2 border-transparent hover:border-ts"
								prefetch={false}
							>
								{label}
							</ActiveLink>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

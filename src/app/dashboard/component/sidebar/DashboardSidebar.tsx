"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { signOut } from "next-auth/react";
import { IconType } from "react-icons";
import { SidebarButtons } from "./SidebarButtons";
import { HiMenu } from "react-icons/hi";
import DashboardRole from "./SidebarRole";
import useWindowSize from "@/app/utils/hooks/useWindowSize";
import { CiLogout } from "react-icons/ci";
import { cn } from "@/lib/utils";

export type SubButtonType = { label: string; href: string };
export interface DashboardButtonProps {
	Icon?: IconType;
	label: string;
	buttons?: SubButtonType[];
	open?: boolean;
	href?: string;
}

export default function DashboardSidebar({
	DASHBOARD_BUTTONS,
}: {
	DASHBOARD_BUTTONS: DashboardButtonProps[];
}) {
	const [isOpen, setIsOpen] = useState(true);
	const [isFixed, setIsFixed] = useState(true);

	const SideMenu = useMemo(
		() => (
			<>
				<div
					className={`${
						!isFixed &&
						"bg-black/20 fixed top-0 left-0 w-full h-full z-40 backdrop-blur-sm"
					} `}
					onClick={() => setIsOpen(false)}
				/>
				<div
					className={cn(
						"px-6 whitespace-nowrap z-50 transition overflow-auto top-0 left-0 h-full",
						isFixed
							? "sticky py-6 sb-h mr-6 w-[16rem]"
							: "slideright fixed bg-bp px-4 pt-6  shadow w-[18rem]",
						isFixed && "border-r-2 border-black/30 border-dashed"
					)}
					// onClick={(e) => e.stopPropagation()}
				>
					<button
						className="fc_x gap-2 absolute bottom-10 left-2  hover:text-theme font-bold px-4 py-3  bc_x text-tp text-sm "
						onClick={() => signOut()}
						title="Logout"
					>
						<span>
							<CiLogout />
						</span>
						Logout
					</button>
					<div className="py-6">
						<DashboardRole {...{ isFixed, setIsOpen }} />

						<nav className="flex flex-col gap-y-5 select-none py-8">
							{DASHBOARD_BUTTONS.map((data, i) => (
								<SidebarButtons {...data} key={i} />
							))}
						</nav>
					</div>
				</div>
			</>
		),
		[isFixed, DASHBOARD_BUTTONS]
	);
	return (
		<section className="relative">
			{isOpen && SideMenu}
			{!isFixed && (
				<div className="relative ">
					<button
						className="absolute top-11 left-3"
						onClick={() => setIsOpen((p) => !p)}
					>
						<HiMenu size={24} className="text-tp" />
					</button>
				</div>
			)}
			<SidebarResize {...{ isOpen, isFixed, setIsOpen, setIsFixed }} />
		</section>
	);
}

function SidebarResize({
	setIsOpen,
	isFixed,
	setIsFixed,
}: {
	isOpen: boolean;
	isFixed: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsFixed: Dispatch<SetStateAction<boolean>>;
}) {
	const isDesktop = useWindowSize(1024);

	if (isDesktop && !isFixed) {
		setIsFixed(true);
		setIsOpen(true);
	} else if (!isDesktop && isFixed) {
		setIsFixed(false);
		setIsOpen(false);
	}

	return <></>;
}

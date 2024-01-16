"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface ActiveLinksProps extends LinkProps {
	children: React.ReactNode;
	active: string;
	className: string;
}

export default function ActiveLink({
	children,
	active,
	href,
	className,
	...props
}: ActiveLinksProps) {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={` ${className} ${pathname === href ? active : ""}`}
			{...props}
		>
			{children}
		</Link>
	);
}

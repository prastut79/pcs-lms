"use client";

import { HTMLAttributes, PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MODAL_ID } from "./ModalProvider";

export default function Modal({
	children,
	onClose,
	maxWidth = 800,
	fullWidth,
	className,
	...props
}: PropsWithChildren<ModalProps>) {
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		divRef.current?.focus();
	}, []);

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key === "Escape") {
			onClose();
		}
	}
	const element = document.getElementById(MODAL_ID);
	if (!element) {
		return <></>;
	}
	return createPortal(
		<div ref={divRef} tabIndex={-1} onKeyDown={handleKeyDown}>
			<div
				className="fadein fixed inset-0 w-full h-full bg-black/20 backdrop-blur-sm z-[999]"
				onClick={onClose}
			></div>
			<div className="absolute left-0 right-0 px-4 py-12 fc_xy ">
				<div
					{...props}
					className={`flex fadein bg-bs rounded z-[1000] overflow-x-auto ${
						className ? className : ""
					} `}
					style={{ maxWidth }}
				>
					{children}
				</div>
			</div>
		</div>,
		element
	);
}

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	onClose: () => any;
	maxWidth?: number;
	fullWidth?: boolean;
}

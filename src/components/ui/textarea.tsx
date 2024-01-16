import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, label, ...props }, ref) => {
		return (
			<div>
				{label && <p className="text-sm  pb-1">{label}</p>}
				<textarea
					className={cn(
						"flex min-h-[80px] w-full rounded border border-gray-400 focus:border-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:opacity-40",
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };

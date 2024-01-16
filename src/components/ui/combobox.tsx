"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function Combobox({
	options,
	value,
	onChange,
	placeholder = "Select...",
	label,
}: {
	options: { value: string; label: string }[];
	value: string;
	onChange: (value: string) => any;
	label?: string;
	placeholder?: string;
}) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<div>
					<p className="text-sm pb-1">{label}</p>
					<button
						aria-expanded={open}
						className="flex h-10 w-full px-3 py-2 border rounded border-gray-400 focus-within:border-black justify-between text-sm"
						type="button"
						tabIndex={0}
					>
						{value ? (
							options.find(
								(framework) => framework.value === value
							)?.label
						) : (
							<span className="opacity-40">{placeholder}</span>
						)}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</button>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 z-30 bg-white">
				<Command>
					{/* <CommandInput placeholder={placeholder} /> */}
					<CommandEmpty>No Options found.</CommandEmpty>
					<CommandGroup>
						{options.map((framework) => (
							<CommandItem
								key={framework.value}
								value={framework.value}
								onSelect={(currentValue) => {
									onChange(
										currentValue === value
											? ""
											: currentValue
									);
									setOpen(false);
								}}
								className={cn(
									"hover:!bg-theme/10 hover:cursor-pointer",
									framework.value === value && "!text-theme"
								)}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === framework.value
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								{framework.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

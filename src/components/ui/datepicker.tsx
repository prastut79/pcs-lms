"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
	value,
	onChange,
	label,
}: {
	value: string | Date;
	onChange: (date: Date) => any;
	label: string;
}) {
	const [date, setDate] = React.useState<Date>();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div>
					{label && <p className="text-sm pb-1">{label}</p>}

					<Button
						variant={"outline"}
						className={cn(
							"rounded border border-gray-400 focus:border-black w-full justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
						tabIndex={0}
						type="button"
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, "PPP") : <span>Pick a date</span>}
					</Button>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
					disabled={(date) => date <= new Date()}
				/>
			</PopoverContent>
		</Popover>
	);
}

export function getFormatedDate(dateString: string, withTime = false) {
	if (!dateString) return null;
	try {
		const date = new Date(dateString);

		const options: Intl.DateTimeFormatOptions = {
			month: "short",
			day: "numeric",
			year: "numeric",
		};

		if (withTime) {
			options.hour = "numeric";
			options.minute = "numeric";
		}

		const formattedDate = date.toLocaleDateString("en-US", options);
		return formattedDate;
	} catch (e) {
		return dateString;
	}
}

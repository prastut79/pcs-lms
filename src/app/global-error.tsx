"use client";

import Button from "@/components/ui/nativeButton";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<html>
			<title>Error - {error.name}</title>
			<body>
				<div className="text-tp grid w-full gap-3 px-10 py-20">
					<h1>Error: {error.name}</h1>
					<h2>Message: {error.message}</h2>
					<h4>{`${error.cause}`}</h4>
					<details>
						<summary>Stack</summary>
						<p>{error.stack}</p>
					</details>
					<Button onClick={() => reset()}>Try again</Button>
				</div>
			</body>
		</html>
	);
}

export default function DashContainer({
	children,
	title,
}: {
	children?: React.ReactNode;
	title: string;
}) {
	return (
		<section className="w-full h-full py-10 px-4 pr-8">
			<div className="pl-8 lg:pl-0">
				<h1 className="text-tp font-bold py-1 uppercase text-xl ">
					{title}
				</h1>
				<div className={`title-under`}></div>
			</div>
			<div className="pt-14 pb-20 w-full h-full ">{children}</div>
		</section>
	);
}

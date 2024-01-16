import Loading from "../Loading";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
}

export default function Button({
	children,
	loading,
	disabled,
	className,
	...props
}: ButtonProps) {
	return (
		<button
			disabled={disabled || loading}
			className={`fc_xy rounded bg-theme px-5 py-3 text-tb font-bold  
			${loading || disabled ? "gap-x-2" : "bc_x"} ${className ? className : ""}`}
			{...props}
		>
			{loading && <Loading size="xs" />}
			{children}
		</button>
	);
}

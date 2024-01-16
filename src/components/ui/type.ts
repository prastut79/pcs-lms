export type SizeType = "xs" | "sm" | "md" | "lg" | "xl";
export type SizeObjectType = { [key in SizeType]?: any };
export type OptionType = { id: string; name: React.ReactNode };

export interface PageMetaProps {
	total: number;
	page: number;
	current: number;
	length: number;
}
export type ObjectType = { [x: string]: string };

export interface DatabaseBaseProps {
	_id: string;
	createdAt?: string;
	updatedAt?: string;
}

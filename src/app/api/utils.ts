import { Prisma } from "@prisma/client";
import { toast } from "react-toastify";

export function getApiError(err: any) {
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === "P2002") {
			return err.message;
		}
		return err.message;
	}
	return err.message || "An unexpected error occcured";
}

export async function toastifyResponse(req: Response) {
	const res = await req.json();
	if (req.ok) {
		toast.success(res.message || "Successful");
	} else {
		toast.error(res.message || "An Error Occured");
	}
}

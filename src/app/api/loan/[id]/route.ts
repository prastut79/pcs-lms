import { prisma } from "@/db/prisma";
import { getApiError } from "../../utils";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const loan = await prisma.loan.findUnique({
			where: { id: Number(params.id) },
		});
		return NextResponse.json({ data: loan });
	} catch (e) {
		return NextResponse.json({ message: getApiError(e) }, { status: 400 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const loan = await prisma.loan.update({
			where: { id: Number(params.id) },
			data: { isRemoved: true },
		});
		return NextResponse.json({ message: "Loan Request has been removed." });
	} catch (e) {
		return NextResponse.json({ message: getApiError(e) }, { status: 400 });
	}
}

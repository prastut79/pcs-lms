import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";
import { getApiError } from "../utils";
import { getServerSession } from "next-auth";
import { NextOptions } from "../auth/[...nextauth]/route";

export async function GET() {
	try {
		const session = await getServerSession(NextOptions);

		const loans = await prisma.tranVerification.findMany({
			where: { verifiedBy: session?.user?.id || 2 },
			include: {
				tran: {
					include: { user: true },
					// select: { amount: true, requestedAt: true, status: true },
				},
				user: true,
			},
		});

		return NextResponse.json({ data: loans });
	} catch (e) {
		return NextResponse.json(
			{
				message: getApiError(e),
			},
			{ status: 400 }
		);
	}
}

export async function PUT(req: Request) {
	try {
		const session = await getServerSession(NextOptions);

		const body = await req.json();

		const { id, status, remarks, updatedBy, fine } = body;
		const loan = await prisma.loan.update({
			where: { id },
			data: {
				status,
				remarks,
				fine,
			},
		});

		if (status === "approved") {
			await prisma.tranVerification.create({
				data: {
					tranId: id,
					verifiedBy: updatedBy,
				},
			});
		}

		return NextResponse.json({
			loan,
			message: `Loan has been ${status}.`,
		});
	} catch (e) {
		return NextResponse.json(
			{
				message: getApiError(e),
			},
			{ status: 400 }
		);
	}
}

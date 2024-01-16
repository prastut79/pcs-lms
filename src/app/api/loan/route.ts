import { prisma } from "@/db/prisma";
import { getApiError } from "../utils";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NextOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const session = await getServerSession(NextOptions);

		console.log("userid-api-sess ", session);

		const filters: any = {
			isRemoved: false,
			userId: session?.user?.id,
		};

		if (
			searchParams.get("status")
			// && session?.user?.role === "admin"
		) {
			filters.status = searchParams.get("status");
			delete filters["userId"];
		}

		const loans = await prisma.loan.findMany({
			where: { ...filters },
			include: {
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

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { amount, purpose, userId, returnedAt } = body;
		const loan = await prisma.loan.create({
			data: {
				amount: Number(amount),
				purpose,
				userId,
				returnedAt,
			},
		});
		return NextResponse.json({ message: "Loan has been requested.", loan });
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
		const body = await req.json();
		const { id, amount, purpose, status, remarks, userId, retry } = body;
		const loan = await prisma.loan.update({
			where: { id },
			data: {
				amount: Number(amount) || undefined,
				purpose,
				returnedAt: new Date(),
				status: retry ? "pending" : status,
				remarks,
				userId,
			},
		});
		return NextResponse.json({ message: "Loan has been requested.", loan });
	} catch (e) {
		return NextResponse.json(
			{
				message: getApiError(e),
			},
			{ status: 400 }
		);
	}
}

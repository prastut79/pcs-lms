import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getApiError } from "../../utils";

const createHash = async (password: string) => {
	return await bcrypt.hash(password, 8);
};

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, email, phone, password, confirmPassword, address } = body;

		//Password Validation
		if (password !== confirmPassword) {
			return NextResponse.json(
				{
					message: "Passwords donot match.",
				},
				{ status: 400 }
			);
		}
		if (password.length < 6) {
			return NextResponse.json(
				{
					message: "password length should be more than 6 characters",
				},
				{ status: 400 }
			);
		}

		const user = await prisma.user.create({
			data: {
				name,
				email,
				phone,
				password: await createHash(password),
				role: "member",
				address,
			},
		});
		return NextResponse.json({
			user,
			message: "Member sucessfully registered",
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

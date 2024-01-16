import { prisma } from "@/db/prisma";
import { hash } from "bcryptjs";

async function addAdmin() {
	console.log("\n\nCreating Admin User...\n\n");

	const data = {
		email: "admin@admin.com",
		name: "Admin User",
		phone: "9841525152",
		role: "admin",
		address: "Kathmandu",
		password: await hash("admin", 8),
	};
	const req = await prisma.user.create({
		data,
	});
	console.log("Admin created");
	console.log("-" * 30);
	console.log("Email: ", req.email);
	console.log("Password: admin\n\n");
	console.log("-" * 30);
}

addAdmin();

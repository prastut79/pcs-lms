import { getApiError } from "@/app/api/utils";
import { prisma } from "@/db/prisma";
import { hash } from "bcryptjs";

const readline = require("readline");

/**Script to add an admin user */
async function addAdmin() {
	try {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		const prompt = (query) =>
			new Promise((resolve) => rl.question(query, resolve));

		console.log("\n\nCreating Admin User...\n\n");

		const data = {
			email: "",
			name: "",
			phone: "",
			role: "admin",
			address: "",
			password: "",
		};

		data.email = String(await prompt("Enter Email: "))
			.trim()
			.toLowerCase();
		data.name = String(await prompt("Enter Name: ")).trim();
		data.phone = String(await prompt("Enter Phone Number: ")).trim();
		data.address = String(await prompt("Enter Address: ")).trim();

		while (true) {
			const password = String(
				await prompt("Enter your password: ")
			).trim();
			const rePassword = String(
				await prompt("Re-enter the password: ")
			).trim();

			if (password !== rePassword) {
				console.log("\nPasswords must match. Try Again\n");
			} else {
				data.password = await hash(password, 8);
				break;
			}
		}

		const req = await prisma.user.create({
			data,
		});
		console.log();
		console.log("-".repeat(40));
		console.log("Admin created. You can now login");
		console.log("-".repeat(40));
		console.log();
	} catch (e) {
		console.log("\nAn Error Occured: ");
		console.log(getApiError(e));
	}
	process.exit();
}

addAdmin();

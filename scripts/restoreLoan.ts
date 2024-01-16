import { prisma } from "@/db/prisma";

async function restoreAllLoan() {
	console.log("\nRestoring Roles...\n\n");

	const req = await prisma.loan.updateMany({
		where: { isRemoved: true },
		data: { isRemoved: false },
	});

	console.log(req.count, "Roles Restored");
	console.log("-".repeat(30));
}

restoreAllLoan();

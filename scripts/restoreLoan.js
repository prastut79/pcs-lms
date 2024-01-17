import { prisma } from "@/db/prisma";

async function restoreAllLoans() {
	console.log("\nRestoring Deleted Loans...\n\n");

	const req = await prisma.loan.updateMany({
		where: { isRemoved: true },
		data: { isRemoved: false },
	});

	console.log(req.count, "Loans Restored");
	console.log("-".repeat(30));
}

restoreAllLoans();

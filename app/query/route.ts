import { prisma } from "@/libs/db";

async function listInvoices() {
  /* const data = await prisma.invoice.findMany(); */

  const data = await prisma.$queryRaw<
    { amount: number; name: string }[]
  >`SELECT i.amount, c.name
  FROM "Invoice" as i
  INNER JOIN "Customer" as c ON i.customer_id = c.id
  WHERE i.amount = 666;`;
  return data;
}

export async function GET() {
  /* return Response.json({
    message:
      'Uncomment this file and remove this line. You can delete this file when you are finished.',
  }); */
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    console.log(error);

    return Response.json({ error }, { status: 500 });
  }
}

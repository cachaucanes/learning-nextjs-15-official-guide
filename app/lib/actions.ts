"use server";
import { signIn } from "@/auth";
import { prisma } from "@/libs/db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { FormInvoiceSchema, signInSchema } from "./zod";
const sql = prisma.$queryRaw.bind(prisma); // seguir usando sql como alias, y evitar reescribir la función (prisma.$queryRaw<Revenue[]>`SELECT * ...`) en cada función

const CreateInvoice = FormInvoiceSchema.omit({ id: true, date: true });
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
  values?: {
    customerId: string;
    amount: string;
    status: string;
  };
};

export async function createInvoice(prevState: State, formData: FormData) {
  /* const rawFormData = Object.fromEntries(formData.entries()); */ // Or
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
      values: {
        customerId: formData.get("customerId") as string,
        amount: formData.get("amount") as string,
        status: formData.get("status") as string,
      },
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;

  const amountInCents = amount * 100;
  /* const date = new Date().toISOString().split("T")[0]; */
  const date = new Date();

  try {
    const customerExists = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customerExists) {
      throw new Error("Customer does not exist");
    }
    await prisma.invoice.create({
      data: {
        customer_id: customerId,
        amount: amountInCents,
        status,
        date,
      },
    });
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
  /* const data = await sql`
    INSERT INTO "Invoice" (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}::"InvoiceStatus", ${date})
  `; */
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

// Use Zod to update the expected types
const UpdateInvoice = FormInvoiceSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    /* await sql`
    UPDATE "Invoice"
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `; */
    await prisma.invoice.update({
      where: { id },
      data: {
        customer_id: customerId,
        amount: amountInCents,
        status,
      },
    });
  } catch (error) {
    // We'll log the error to the console for now
    return { message: "Database Error: Failed to Update Invoice." };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM "Invoice" WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}

export type StateLogin = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};
//auth
export async function authenticate(
  prevState: StateLogin | undefined,
  formData: FormData
) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }
  try {
    const user = await signIn("credentials", formData);
    console.log(user);

    return user;
  } catch (error) {
    // Filtrar el NEXT_REDIRECT
    if ((error as any).digest === "NEXT_REDIRECT") {
      return; // No hacer nada, redirección en curso
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials.", errors: {} };
        default:
          return { message: "Something went wrong.", errors: {} };
      }
    }
    throw error;
  }
}

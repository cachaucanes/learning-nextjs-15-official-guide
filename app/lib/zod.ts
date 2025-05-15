import { object, string, coerce, enum as enum_ } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const FormInvoiceSchema = object({
  id: string(),
  customerId: string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: enum_(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: string(),
});

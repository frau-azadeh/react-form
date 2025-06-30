// src/schemas/formSchema.ts
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(/^09\d{9}$/, "Phone must be 11 digits and start with 09"),
  postalCode: z.string().regex(/^\d{10}$/, "Postal code must be 10 digits"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, "Minimum age is 18")
    .max(65, "Maximum age is 65"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  resume: z.custom<File>(
    (file) => file instanceof File && file.type === "application/pdf",
    { message: "Only PDF files are allowed" },
  ),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(25, "Name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Only English letters are allowed")
    //.reges(/^[\u0600-\u06FF\s]+$, "فقط از حروف فارسی استفاده شود")
    //.reges(/^[a-zA-Z\s\0u600-\u06FF]+$/,"Only letters are allowed")
    .transform((val) => val.replace(/\s+/g, " ")),

  family: z
    .string()
    .trim()
    .min(2, "Family is too short")
    .max(50, "Family is too long")
    .regex(/^[a-zA-Z\s]+$/, "Only English letters are allowed")
    .transform(
      (val) =>
        val
          .replace(/\s+/g, " ") // " john doe "
          .split(" ") // ["john", "doe"] string to object
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" "), // "John Doe"
    ),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email format is invalid",
    ),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "Phone must be 11 digits and start with 09"),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Postal code must be 10 "),
  age: z.number({ invalid_type_error: "Age must be a number" }).min(18).max(65),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  resume: z
    .custom<File>(
      (file) => file instanceof File && file.type === "application/pdf",
      { message: "Only PDF files are allowed" },
    )
    .optional(),
  acceptTerms: z
    .boolean()
    .refine((val)=>val === true,{
      message: "You must accept the terms"
    })
});

export type FormSchemaType = z.infer<typeof formSchema>;

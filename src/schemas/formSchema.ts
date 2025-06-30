import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Only English letters are allowed")
    //.regex(/^[\u0600-\u06FF\s]+$/, "فقط از حروف فارسی استفاده کنید")
    //.regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, "Only letters are allowed")
    .transform((val) => val.replace(/\s+/g, " ")),
    family: z
  .string()
  .trim()
  .min(2, "Family is too short")
  .max(25, "Family is too long")
  .regex(/^[a-zA-Z\s]+$/, "Only English letters are allowed")
  .transform((val) =>
    val
      .replace(/\s+/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
  )

});

export type FormSchemaType = z.infer<typeof formSchema>;

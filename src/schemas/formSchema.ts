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
   .transform((val)=>val.replace(/\s+/g," ")),
})

export type FormSchemaType = z.infer<typeof formSchema>
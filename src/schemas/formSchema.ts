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

  family: z
    .string()
    .trim()
    .min(2, "Family is too short")
    .max(50, "Family is too long")
    .regex(/^[a-zA-Z\s]+$/,"Only English letters are allowed")
    .transform((val)=>
      val 
        .replace(/\s+/g," ")
        .split(" ")
        .map(
          (word)=> word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" "),
    ),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .regex(     
       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email format is invalid",)
  })

export type FormSchemaType = z.infer<typeof formSchema>
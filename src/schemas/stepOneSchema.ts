import { z } from "zod";

export const StepOneSchema = z.object({
  name: z
  .string()
  .trim()
  .min(1, "Name is too short")
  .max(25, "Name is too long")
  .regex(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است"),
family: z
  .string()
  .trim()
  .min(1, "Family name is too short")
  .max(50, "Family name is too long")
  .regex(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است"),
nationalCode: z
.string()
.regex(/^\d{10}$/, "کد ملی باید 10 رقم باشد"),
  phone: z
  .string()
  .regex(/^09\d{9}$/, "شماره موبایل باید 11 رقم و با 09 شروع شود"),
  email: z.string().email("ایمیل معتبر نیست"),
  
  })




export type StepOneSchemaType = z.infer<typeof StepOneSchema>;

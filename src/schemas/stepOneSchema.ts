import { z } from "zod";

export const StepOneSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1,"نام را به درستی وارد کنید")
    .max(25,"نام طولانی میباشد")
    .regex(/^[\u0600-\u06FF\s]+$/,"فقط حروف فارسی مجاز است"),
  family: z
    .string()
    .trim()
    .min(1,"نام خانوادگی را به درستی وارد کنید")
    .max(50,"نام خانوادگی طولانی میباشد")
    .regex(/^[\u0600-\u06FF\s]+$/,"فقط حروف فارسی مجاز است"),
  nationalCode: z
    .string()
    .regex(/^\d{10}$/,"کد ملی باید 10 رقم باشد")

})

export type StepOneSchemaType = z.infer<typeof StepOneSchema>
import { z } from "zod";

export const StepOneSchema = z.object({
  fullName: z.string().min(3, "نام و نام خانوادگی الزامی است"),
  nationalCode: z.string().length(10, "کد ملی باید ۱۰ رقم باشد"),
  phone: z.string().length(11, "شماره موبایل باید ۱۱ رقم باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
});

export type StepOneSchemaType = z.infer<typeof StepOneSchema>;

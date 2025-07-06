// openAccountSchema.ts
import { z } from "zod";

export const OpenAccountSchema = z.object({
  fullName: z.string().min(3, "نام کامل باید حداقل ۳ حرف باشد."),
  nationalCode: z
    .string()
    .length(10, "کد ملی باید ۱۰ رقم باشد.")
    .regex(/^\d+$/, "کد ملی باید فقط عدد باشد."),
  phoneNumber: z
    .string()
    .regex(/^09\d{9}$/, "شماره تماس معتبر نیست."),
  accountType: z.enum(["short-term", "long-term", "current"]),
  initialDeposit: z
    .number({ invalid_type_error: "عدد وارد کنید" })
    .min(100000, "حداقل واریزی ۱۰۰,۰۰۰ تومان است."),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "باید شرایط را بپذیرید.",
  }),
});

export type OpenAccountSchemaType = z.infer<typeof OpenAccountSchema>;

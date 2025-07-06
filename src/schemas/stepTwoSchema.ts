import { z } from "zod";

export const StepTwoSchema = z.object({
  accountType: z.enum(["short-term", "long-term", "current"]),
  initialDeposit: z
    .number({ invalid_type_error: "مبلغ باید عدد باشد" })
    .min(10000, "حداقل مبلغ ۱۰،۰۰۰ تومان است"),
});

export type StepTwoSchemaType = z.infer<typeof StepTwoSchema>;

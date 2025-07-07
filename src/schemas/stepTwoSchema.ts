import { z } from "zod";

export const StepTwoSchema = z.object({
  accountType: z.enum(["کوتاه مدت", "بلند مدت", "جاری"]),
  initialDeposit: z
    .number({ invalid_type_error: "مبلغ باید عدد باشد" })
    .min(100000, "حداقل مبلغ 100.000 تومان است")
    .max(10000000, "حداکثر مبلغ 10.000.000 تومان است"),
});
export type StepTwoSchemaType = z.infer<typeof StepTwoSchema>;

import { z } from "zod";

export const StepThreeSchema = z.object({
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: "باید شرایط را بپذیرید.",
      }),
});

export type StepThreeSchemaType = z.infer<typeof StepThreeSchema>;

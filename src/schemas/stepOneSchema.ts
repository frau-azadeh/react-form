import { z } from "zod";

export const StepOneSchema = z.object({

})

export type StepOneSchemaType = z.infer<typeof StepOneSchema>
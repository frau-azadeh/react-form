// schemas/mergedSchema.ts
import { z } from "zod";
import { StepOneSchema } from "./stepOneSchema";
import { StepTwoSchema } from "./stepTwoSchema";
import { StepThreeSchema } from "./stepThreeSchema";

export const mergedSchema =
  StepOneSchema.merge(StepTwoSchema).merge(StepThreeSchema);
export type FormData = z.infer<typeof mergedSchema>;

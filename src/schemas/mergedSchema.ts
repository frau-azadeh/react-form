import { z } from "zod";
import { StepOneSchema } from "./stepOneSchema";
import { StepThreeSchema } from "./stepThreeSchema";
import { StepTwoSchema } from "./stepTwoSchema";

export const mergedSchema =
  StepOneSchema.merge(StepTwoSchema).merge(StepThreeSchema);
export type FormData = z.infer<typeof mergedSchema>;

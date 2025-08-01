import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";

import { mergedSchema, FormData } from "../schemas/mergedSchema";
import { StepOneSchema } from "../schemas/stepOneSchema";
import { StepTwoSchema } from "../schemas/stepTwoSchema";
import { StepThreeSchema } from "../schemas/stepThreeSchema";
import Button from "../components/Button";

// مراحل به ترتیب
const stepSchemas = [StepOneSchema, StepTwoSchema, StepThreeSchema];

export const MultiStepForm = () => {
  const [step, setStep] = useState(0);

  const methods = useForm<FormData>({
    resolver: zodResolver(mergedSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      family: "",
      nationalCode: "",
      accountType: "کوتاه مدت",
      initialDeposit: 0,
      termsAccepted: false,
    },
  });

  // ⛳ رفع خطای TS اینجاست
  const goNext = async () => {
    const currentSchema = stepSchemas[step];
    const currentFields = Object.keys(
      currentSchema.shape,
    ) as (keyof FormData)[];

    const valid = await methods.trigger(currentFields);
    if (valid) setStep((prev) => prev + 1);
  };

  const goBack = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: FormData) => {
    toast.success("فرم با موفقیت ثبت شد ");
    console.log("✅ داده نهایی:", data);
    methods.reset();
    setStep(0);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-center">
          فرم افتتاح حساب بانکی - مرحله {step + 1}
        </h2>

        {step === 0 && <StepOne />}
        {step === 1 && <StepTwo />}
        {step === 2 && <StepThree />}

        <div className="flex justify-between gap-4 mt-10">
          {step > 0 && (
            <Button type="button" onClick={goBack} variant="destructive">
              مرحله قبل
            </Button>
          )}
          {step < stepSchemas.length - 1 ? (
            <Button type="button" onClick={goNext} variant="primary">
              ادامه
            </Button>
          ) : (
            <Button
              type="submit"
              variant="add"
              disabled={methods.formState.isSubmitting}
            >
              ثبت نهایی
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

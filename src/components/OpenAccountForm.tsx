// components/OpenAccountForm.tsx
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  OpenAccountSchema,
  OpenAccountSchemaType,
} from "../schemas/openAccountSchema";
import { errorToast, successToast } from "../utils/toast";
import Button from "./Button";
import FormField from "./FormField";
import Input from "./Input";
import LivePreview from "./LivePreview";
import Select from "./Select";
import TermsCheckbox from "./TermsCheckbox";

const OpenAccountForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OpenAccountSchemaType>({
    resolver: zodResolver(OpenAccountSchema),
    defaultValues: {
      fullName: "",
      nationalCode: "",
      phoneNumber: "",
      accountType: "short-term",
      initialDeposit: 0,
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: OpenAccountSchemaType) => {
    try {
      console.log("📤 ارسال موفق:", data);
      successToast("فرم با موفقیت ثبت شد ✅");
      reset();
    } catch {
      errorToast("خطایی رخ داده است ❌");
    }
  };

  const selectedAccountType = watch("accountType");
  const deposit = watch("initialDeposit");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        📄 افتتاح حساب بانکی
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="نام و نام خانوادگی" error={errors.fullName?.message}>
          <Input {...register("fullName")} aria-invalid={!!errors.fullName} />
        </FormField>

        <FormField label="کد ملی" error={errors.nationalCode?.message}>
          <Input
            {...register("nationalCode")}
            aria-invalid={!!errors.nationalCode}
          />
        </FormField>

        <FormField label="شماره تماس" error={errors.phoneNumber?.message}>
          <Input
            {...register("phoneNumber")}
            aria-invalid={!!errors.phoneNumber}
          />
        </FormField>

        <FormField label="نوع حساب" error={errors.accountType?.message}>
          <Controller
            name="accountType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { label: "کوتاه‌مدت", value: "short-term" },
                  { label: "بلندمدت", value: "long-term" },
                  { label: "جاری", value: "current" },
                ]}
                error={errors.accountType}
              />
            )}
          />
        </FormField>

        <FormField
          label="مبلغ واریزی اولیه"
          error={errors.initialDeposit?.message}
          className="md:col-start-1"
        >
          <Input
            type="number"
            {...register("initialDeposit", { valueAsNumber: true })}
            aria-invalid={!!errors.initialDeposit}
          />
        </FormField>

        <div className="md:col-span-2">
          <TermsCheckbox
            control={control}
            error={errors.termsAccepted?.message}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-6"
      >
        {isSubmitting ? "در حال ارسال..." : "ثبت فرم"}
      </Button>

      <LivePreview accountType={selectedAccountType} initialDeposit={deposit} />
    </form>
  );
};

export default OpenAccountForm;

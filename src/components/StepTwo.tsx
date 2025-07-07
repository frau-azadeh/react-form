import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Select from "./Select";
import Input from "./Input";

const StepTwo: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const accountType = useWatch({ name: "accountType", defaultValue: "" });
  const initialDeposit = useWatch({ name: "initialDeposit", defaultValue: 0 });
  

  const accountTypeOptions = [
    { label: "کوتاه مدت", value: "کوتاه مدت" },
    { label: "بلند مدت", value: "بلند مدت" },
    { label: "جاری", value: "جاری" },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-10 grid-cols-1">
      <div className="flex flex-col">
        <label className="mb-3 text-gray-600">نوع حساب</label>
        <Select
          options={accountTypeOptions}
          {...register("accountType", {
            required: "لطفاً نوع حساب را انتخاب کنید",
          })}
        />
        {errors.accountType && (
          <p className="mt-1 text-sm text-red-700">
            {errors.accountType.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-3 text-gray-600">مبلغ واریزی اولیه</label>
        <Input
          type="number"
          {...register("initialDeposit", { valueAsNumber: true })}
          placeholder="100.000"
        />
        {errors.initialDeposit && (
          <p className="mt-1 text-sm text-red-700">
            {errors.initialDeposit.message as string}
          </p>
        )}
      </div>
      <div className="md:col-span-2 mt-4 bg-gray-50 border border-gray-200 rounded p-4 text-gray-700">
        <p>
          <strong>نوع حساب انتخاب شده:</strong>{" "}
          <span className="text-blue-600">{accountType}</span>
        </p>
        <p>
          <strong>مبلغ واریزی اولیه: </strong>{" "}
          <span className="text-green-600">
            {initialDeposit ? initialDeposit.toLocaleString("fa-IR") : "0"}{" "}
            تومان
          </span>
        </p>
      </div>
    </div>
  );
};

export default StepTwo;

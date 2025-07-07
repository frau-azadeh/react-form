import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Input from "./Input";

const StepThree: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex items-center justify-start flex-row gap-2 mt-4">
      <Controller
        name="termsAccepted"
        control={control}
        render={({ field }) => (
          <>
            <Input
              id="termsAccepted"
              type="checkbox"
              {...field}
              checked={field.value}
            />
            <label>شرایط و قوانین را میپذیرم</label>
          </>
        )}
      />
      {errors.termsAccepted && (
        <p className="text-red-700 text-sm mt-1">
          {errors.termsAccepted.message as string}
        </p>
      )}
    </div>
  );
};

export default StepThree;

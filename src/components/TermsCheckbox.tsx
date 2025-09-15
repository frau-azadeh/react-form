// components/TermsCheckbox.tsx
import React from "react";

import { Control, Controller } from "react-hook-form";

import { OpenAccountSchemaType } from "../schemas/openAccountSchema";
import Input from "./Input";

type TermsCheckboxProps = {
  control: Control<OpenAccountSchemaType>;
  error?: string;
};

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ control, error }) => (
  <div className="flex items-center">
    <Controller
      name="termsAccepted"
      control={control}
      render={({ field: { onChange, onBlur, name, ref, value } }) => (
        <Input
          type="checkbox"
          name={name}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.checked)}
          checked={value}
          ref={ref}
        />
      )}
    />
    <label className="ml-2 text-sm text-gray-700 cursor-pointer">
      شرایط و قوانین را می‌پذیرم
    </label>
    {error && <p className="text-sm text-red-600 ml-4">{error}</p>}
  </div>
);

export default TermsCheckbox;

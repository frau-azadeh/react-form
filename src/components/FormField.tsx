// components/FormField.tsx
import React from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

const FormField: React.FC<FormFieldProps> = ({ label, error, children, className }) => (
  <div className={className}>
    <label className="block mb-1 font-medium text-gray-700">{label}</label>
    {children}
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

export default FormField;

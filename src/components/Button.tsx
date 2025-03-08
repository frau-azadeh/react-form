import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ isLoading, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`p-2 rounded text-white font-medium transition-all ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {isLoading ? "Loading ..." : children}
    </button>
  );
};

export default Button;

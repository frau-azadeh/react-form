import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button  from "./Button";
import Input from "./Input";
import { useState } from "react";

interface AuthFormProps {
  isRegister: boolean;
  onSubmit: SubmitHandler<AuthFormInputs>;
  switchForm: () => void;
}

interface AuthFormInputs {
  fullName?: string;
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const registerSchema = yup.object({
  fullName: yup.string().min(3, "Full name must be at least 3 characters").required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const AuthForm: React.FC<AuthFormProps> = ({ isRegister, onSubmit, switchForm }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(async (data) => {
      setLoading(true);
      await onSubmit(data);
      setLoading(false);
    })} className="flex flex-col gap-3 w-80">
      {isRegister && (
        <Input label="Full Name" {...register("fullName")} error={errors.fullName?.message} placeholder="Enter your full name" />
      )}
      <Input label="Email" {...register("email")} error={errors.email?.message} placeholder="Enter your email" />
      <Input label="Password" {...register("password")} error={errors.password?.message} type="password" placeholder="Enter your password" />
      <Button type="submit" isLoading={loading}>
        {isRegister ? "Register" : "Login"}
      </Button>
      <p className="mt-3 text-sm">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <span className="text-blue-500 cursor-pointer" onClick={switchForm}>
          {isRegister ? "Login here" : "Register here"}
        </span>
      </p>
    </form>
  );
};

export default AuthForm;

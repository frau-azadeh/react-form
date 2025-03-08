import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser, registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";

interface AuthFormInputs {
  email: string;
  password: string;
  fullName?: string; // این فقط برای ثبت‌نام لازمه
}

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const registerSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false); // تعیین وضعیت صفحه (ثبت‌نام یا لاگین)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    setLoading(true);
    try {
      if (isRegister) {
        // ثبت‌نام کاربر
        await registerUser(data.fullName!, data.email, data.password);
        showSuccess("Registration successful! Please log in.");
        setIsRegister(false);
      } else {
        // لاگین کاربر
        const user = await loginUser(data.email, data.password);
        localStorage.setItem("user", JSON.stringify(user));
        showSuccess("Login successful!");
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">
        {isRegister ? "Register" : "Login"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-80"
      >
        {isRegister && (
          <Input
            label="Full Name"
            {...register("fullName")}
            error={errors.fullName?.message}
            placeholder="Enter your full name"
          />
        )}
        <Input
          label="Email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          {...register("password")}
          error={errors.password?.message}
          type="password"
          placeholder="Enter your password"
        />
        <Button type="submit" isLoading={loading}>
          {isRegister ? "Register" : "Login"}
        </Button>
      </form>
      <p className="mt-3 text-sm">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login here" : "Register here"}
        </span>
      </p>
    </div>
  );
};

export default Auth;

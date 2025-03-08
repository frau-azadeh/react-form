import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "./Button";
import Input from "./Input";
import { registerUser } from "../api/auth";
import { showError, showSuccess } from "../utils/toast";
import { useState } from "react";

interface RegisterFormInputs {
  fullName: string;
  email: string;
  password: string;
}

const schema = yup.object({
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

interface Props {
  switchToLogin: () => void;
}

const RegisterForm: React.FC<Props> = ({ switchToLogin }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setLoading(true);
    try {
      await registerUser(data.fullName, data.email, data.password);
      showSuccess("Registration successful! Please log in.");
      switchToLogin();
    } catch (error) {
      showError("Registration failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-80"
    >
      <Input
        label="Full Name"
        {...register("fullName")}
        error={errors.fullName?.message}
        placeholder="Enter your full name"
      />
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
        Register
      </Button>
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={switchToLogin}>
          Login here
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "./Button";
import Input from "./Input";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
import { useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface Props {
  switchToRegister: () => void;
}

const LoginForm: React.FC<Props> = ({ switchToRegister }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const user = await loginUser(data.email, data.password);
      localStorage.setItem("user", JSON.stringify(user));
      showSuccess("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      showError("Invalid email or password");
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
        Login
      </Button>
      <p className="mt-3 text-sm">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={switchToRegister}
        >
          Register here
        </span>
      </p>
    </form>
  );
};

export default LoginForm;

import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Auth() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">
        {isRegister ? "Register" : "Login"}
      </h2>
      {isRegister ? (
        <RegisterForm switchToLogin={() => setIsRegister(false)} />
      ) : (
        <LoginForm switchToRegister={() => setIsRegister(true)} />
      )}
    </div>
  );
}

export default Auth;

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/redux/hooks/auth";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

type Field = {
  name: string;
  type?: string;
  placeholder?: string;
};

const loginFields: Field[] = [
  {
    name: "email",
    type: "text",
    placeholder: "Enter your email address",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
  },
];

export type LoginProps = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col items-center gap-5 border-2 p-5 shadow-md rounded-md w-full max-w-[400px]"
        onSubmit={login}
      >
        <Logo />
        {loginFields.map((each, i) => (
          <Input {...each} key={i} required />
        ))}
        <Button className="w-full">Login</Button>
      </form>
    </div>
  );
};

export default Login;

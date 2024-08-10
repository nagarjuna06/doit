import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem("__token");
  return token ? children : <Navigate to="/login" />;
};

export default AuthProvider;

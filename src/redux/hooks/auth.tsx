import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import { getSession, loginUser, logoutUser } from "../slice/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginProps } from "@/pages/login";

const useAuth = () => {
  const { pathname } = useLocation();
  const { error } = useAppSelector((s) => s.user);
  const navigate = useNavigate();
  const state = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as LoginProps;
    await dispatch(loginUser(form));
    if (!error) {
      navigate("/dashboard");
    }
  };
  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  useEffect(() => {
    if (!state.user) {
      dispatch(getSession());
    }
  }, [dispatch, state.user]);

  return { ...state, pathname, login, logout };
};

export default useAuth;

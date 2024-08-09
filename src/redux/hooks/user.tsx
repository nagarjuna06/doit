import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import { getUser } from "../slice/user";
import { useLocation } from "react-router-dom";

const useSession = () => {
  const { pathname } = useLocation();
  const state = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!state.user) {
      dispatch(getUser());
    }
  }, [dispatch, state.user]);

  return { ...state, pathname };
};

export default useSession;

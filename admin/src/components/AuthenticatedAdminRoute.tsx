import { ReactElement, useEffect } from "react";
import { useRecoilValue } from "recoil";
import {  isAdminLoggedInState } from "../store/atoms";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactElement;
};

const AuthenticatedAdminRoute = ({ children }: Props) => {
  const isAdminLoggedIn = useRecoilValue(isAdminLoggedInState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate("/app");
    }
  }, [isAdminLoggedIn, navigate]);

  return <>{children}</>;
};

export default AuthenticatedAdminRoute;
import { ReactElement, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loggedInState } from "../store/atoms/auth";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactElement;
};

const AuthenticatedRoute = ({ children }: Props) => {
  const isLoggedIn = useRecoilValue(loggedInState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/admin/sign-in");
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
};

export default AuthenticatedRoute;

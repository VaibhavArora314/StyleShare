import { ReactElement, useEffect } from "react";
// import { useRecoilValue } from "recoil";
// import { loggedInState } from "../store/atoms/auth";
import { useNavigate } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

type Props = {
  children: ReactElement;
};

const AuthenticatedRoute = ({ children }: Props) => {
  // const isLoggedIn = useRecoilValue(loggedInState);
  const {isAuthenticated} = useKindeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/app");
  }, [isAuthenticated, navigate]);
  // useEffect(() => {
  //   if (!isLoggedIn) navigate("/app");
  // }, [isLoggedIn, navigate]);

  return <>{children}</>;
};

export default AuthenticatedRoute;

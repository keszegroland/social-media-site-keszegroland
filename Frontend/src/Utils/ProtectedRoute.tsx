import { PropsWithChildren, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useAuth from "./UseAuth";

type ProtectedRouteProps = PropsWithChildren;

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/signin', { replace: true });
    }
  }, [navigate, token]);

  return children;
}

export default ProtectedRoute;
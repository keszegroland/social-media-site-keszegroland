import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { NavigateFunction, useNavigate } from "react-router-dom";

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
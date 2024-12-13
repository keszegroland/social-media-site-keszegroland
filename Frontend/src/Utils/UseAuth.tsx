import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('userAuth must be used within AuthProvider');
  }
  return context;
};

export default useAuth;
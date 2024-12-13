import { PropsWithChildren, createContext, useState } from "react"
import { JWTTokenType } from "../Types/PostTypes";

interface AuthContextType {
  token: JWTTokenType;
  setToken: (newToken: JWTTokenType) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<JWTTokenType>(localStorage.getItem('jwt'));

  function signIn(newToken: JWTTokenType) {
    if (newToken) {
      localStorage.setItem('jwt', newToken);
      setToken(newToken);
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    signIn(null);
  }

  return (
    <AuthContext.Provider value={{ token, setToken: signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
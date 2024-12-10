import { PropsWithChildren, createContext, useContext, useState } from "react"
import { JWTTokenType } from "../Types/PostTypes";

interface AuthContextType {
  token: JWTTokenType;
  setToken: (newToken: JWTTokenType) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<JWTTokenType>(localStorage.getItem('jwt'));

  function updateToken(newToken: JWTTokenType) {
    if (newToken) {
      localStorage.setItem('jwt', newToken);
    } else {
      localStorage.removeItem('jwt');
    }
    setToken(newToken);
  }

  function signOut() {
    updateToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('userAuth must be used within AuthProvider');
  }
  return context;
};
import { PropsWithChildren, createContext, useContext, useState } from "react"

const AuthContext = createContext<string | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [token] = useState<string | null>(localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null);

  return (
    <AuthContext.Provider value={token}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('userAuth must be used within AuthProvider');
  }
  return context;
};
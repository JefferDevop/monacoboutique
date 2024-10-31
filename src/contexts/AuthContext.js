import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { Token, User } from "@/api";

const tokenCtrl = new Token();
const userCtrl = new User();

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accesToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    tokenCtrl.removeToken();
    setAccessToken(null);
    setUser(null);
    setLoading(false); // Asegurarse de establecer loading a false en logout
  }, []);

  const login = useCallback(async (token) => {
    try {
      tokenCtrl.setToken(token);
      setAccessToken(token);
      const userData = await userCtrl.getMeAPi();
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      logout(); // Desloguear en caso de error.
    } finally {
      setLoading(false); // Asegurarse de que loading se establezca en false aquí
    }
  }, [logout]);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = tokenCtrl.getToken();

      if (!token || tokenCtrl.hasExpired(token)) {
        logout();
      } else {
        await login(token);
      }
    };

    initializeAuth();
  }, [login, logout]);

  const authData = useMemo(
    () => ({
      accesToken,
      user,
      login,
      logout,
      loading,
    }),
    [accesToken, user, login, logout, loading]
  );

  if (loading) return null; // No renderiza hasta que el estado de loading sea false.

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
}
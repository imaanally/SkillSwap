import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "skillswap_auth";

function getStoredAuth() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth);

  useEffect(() => {
    if (auth.user && auth.token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [auth]);

  const login = (userData, accessToken) => {
    setAuth({
      user: userData,
      token: accessToken,
    });
  };

  const logout = () => {
    setAuth({ user: null, token: null });
  };

  const updateUser = (updatedData) => {
    setAuth((currentAuth) => ({
      ...currentAuth,
      user: {
        ...currentAuth.user,
        ...updatedData,
      },
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

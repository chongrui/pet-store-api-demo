import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    await fetch(`/api/v3/user/login?username=${username}&password=${password}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('An error has occurred while logging in.');
        } else {
          return response.text();
        }
      }).then((userSessionId) => {
        setUser(userSessionId.split(":")[1].trim());
      }).catch((err) => {
        console.log(err);
        throw new Error('An error has occurred while logging in.');
      });;
    navigate("/pets", { replace: true });
  };

  const logout = async () => {
    setUser(null);
    await fetch('/api/v3/user/logout')
      .then((response) => {
        if (!response.ok) {
          throw new Error('An error has occurred while logging out.');
        } else {
          navigate("/login", { replace: true });
        }
      }).catch((err) => {
        console.log(err);
        throw new Error('An error has occurred while logging out.');
      });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

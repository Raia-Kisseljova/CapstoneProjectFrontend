import { axios } from "api";
import decode from "jwt-decode";
import React from "react";
import { TTokenPayload, TUser } from "types";


type TUserData = TUser | null | undefined;

type TUserContext = {
  user: TUserData;
  logout(): void;
};

const UserContext = React.createContext<TUserContext>({
  user: undefined,
  logout: () => { },
});

export function useUser() {
  return React.useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<TUserData>();

  React.useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");

    if (accessToken === null) {
      setUser(null);
      return;
    }

    const { _id, nickname } = decode(accessToken) as TTokenPayload;
    console.log('HERE', { nickname })

    async function fetchUser() {
      try {
        const res = await axios.get(`user/${nickname}`);
        setUser(res.data);
      } catch (err) {
        setUser(null);
        window.localStorage.removeItem("accessToken");
      }
    }

    fetchUser();
  }, []);

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}

import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { AdminContextType } from "./types";

export const AdminContext = createContext<AdminContextType>({ isAdmin: false });

export default function AdminProvider({ children }: PropsWithChildren) {
  const adminKey = "admin";
  const unAdminKey = "unadmin";
  const [adminState, setAdminState] = useState({
    isAdmin: false,
    enteredKey: "",
  });

  useEffect(() => {
    const checkKey = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();
      setAdminState((prevAdminState) => {
        const newState = { ...prevAdminState };
        let newKey = newState.enteredKey + pressedKey;

        if (
          newKey.length ===
          (!newState.isAdmin ? adminKey : unAdminKey).length + 1
        ) {
          newKey = newKey.slice(1);
        }

        newState.enteredKey = newKey;

        if (!newState.isAdmin && newKey === adminKey) {
          newState.enteredKey = "";
          newState.isAdmin = true;
        } else if (newState.isAdmin && newKey === unAdminKey) {
          newState.enteredKey = "";
          newState.isAdmin = false;
        }
        return newState;
      });
    };

    document.addEventListener("keydown", checkKey);
    return () => {
      document.removeEventListener("keydown", checkKey);
    };
  }, [adminState]);

  return (
    <AdminContext.Provider value={{ isAdmin: adminState.isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

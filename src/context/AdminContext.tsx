import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { AdminContextType } from "./types";

export const AdminContext = createContext<AdminContextType>({ isAdmin: false });

export default function AdminProvider({ children }: PropsWithChildren) {
  const adminKey = "admin";
  const [isAdmin, setIsAdmin] = useState(false);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    if (isAdmin) return;
    const checkKey = (e: KeyboardEvent) => {
      console.log(e.key.toLowerCase(), adminKey.charAt(lastIndex));
      const pressedKey = e.key.toLowerCase();
      if (pressedKey === adminKey.charAt(lastIndex)) {
        setLastIndex((prev) => prev + 1);
      } else if (pressedKey === adminKey.charAt(0)) {
        setLastIndex(() => 1);
      }
    };

    document.addEventListener("keydown", checkKey);
    return () => {
      document.removeEventListener("keydown", checkKey);
    };
  }, [isAdmin, lastIndex]);

  useEffect(() => {
    if (lastIndex === 5) setIsAdmin(() => true);
  }, [lastIndex]);

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

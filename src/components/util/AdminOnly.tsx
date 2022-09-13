import { PropsWithChildren, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function AdminOnly({ children }: PropsWithChildren) {
  const { isAdmin } = useContext(AdminContext);
  return <>{isAdmin && children}</>;
}

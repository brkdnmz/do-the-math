import React from "react";
import { IoPricetags } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

interface HeaderProps {
  pageHeader: React.ReactNode;
}

export default function Header({ pageHeader }: HeaderProps) {
  const location = useLocation();

  return (
    <div className="grid grid-cols-6 lg:grid-cols-4 grid-flow-col mb-3">
      <div className="flex col-span-full lg:col-span-1 items-center justify-center lg:justify-start">
        <NavLink
          className="fs-4 text-decoration-none fw-bolder"
          style={{ color: "#8950fc" }}
          to="/"
          title="Go to the problem list page"
        >
          #DoTheMath
        </NavLink>
      </div>

      <div className="flex col-span-4 lg:col-span-2 col-start-2 items-center justify-center text-center fs-5">
        {pageHeader}
      </div>

      <div className="flex col-span-1 col-start-6 lg:col-start-4 items-center justify-end">
        {location.pathname !== "/tags" && (
          <NavLink to={"/tags"}>
            <IoPricetags color="#8950fc" size={24} />
          </NavLink>
        )}
      </div>
    </div>
  );
}

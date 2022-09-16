import React from "react";
import { IoPricetags } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

interface HeaderProps {
  pageHeader: React.ReactNode;
}

export default function Header({ pageHeader }: HeaderProps) {
  const location = useLocation();

  return (
    <div className="grid grid-flow-col grid-cols-6 mb-3 lg:grid-cols-4">
      <div className="flex items-center justify-center col-span-full lg:col-span-1 lg:justify-start">
        <NavLink
          className="fs-4 text-decoration-none fw-bolder"
          style={{ color: "#8950fc" }}
          to="/"
          title="Go to the problem list page"
        >
          #DoTheMath
        </NavLink>
      </div>

      <div className="flex items-center justify-center col-span-4 col-start-2 text-center lg:col-span-2 fs-5">
        {pageHeader}
      </div>

      <div className="flex items-center justify-end col-span-1 col-start-6 lg:col-start-4">
        {location.pathname !== "/tags" && (
          <NavLink to={"/tags"}>
            <IoPricetags
              color="#8950fc"
              size={24}
            />
          </NavLink>
        )}
      </div>
    </div>
  );
}

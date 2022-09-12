import React from "react";
import { Col, Row } from "react-bootstrap";
import { IoPricetags } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import FlexCol from "./util/CenteringCol";

interface HeaderProps {
  pageHeader: React.ReactNode;
}

export default function Header({ pageHeader }: HeaderProps) {
  const location = useLocation();

  return (
    <Row className="mb-3">
      <FlexCol className="col-lg-3 col-12 align-items-center justify-content-center justify-content-lg-start">
        <NavLink
          className="fs-4 text-decoration-none fw-bolder"
          style={{ color: "#8950fc" }}
          to="/"
          title="Go to the problem list page"
        >
          #DoTheMath
        </NavLink>
      </FlexCol>

      <Col className="col-lg-auto m-0 p-0 col-2" />

      <FlexCol className="col-lg-6 col-8 fs-5 align-items-center justify-content-center text-center">
        {pageHeader}
      </FlexCol>

      <FlexCol className="col-lg-3 col-2 align-items-center justify-content-end">
        {location.pathname !== "/tags" && (
          <NavLink to={"/tags"}>
            <IoPricetags color="#8950fc" size={24} />
          </NavLink>
        )}
      </FlexCol>
    </Row>
  );
}

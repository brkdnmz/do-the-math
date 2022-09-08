import React from "react";
import { Col, Row } from "react-bootstrap";
import TagDropdown from "./TagDropdown";

interface HeaderProps {
  pageHeader: string | React.ReactNode;
}

export default function Header({ pageHeader }: HeaderProps) {
  return (
    <Row className="mb-3">
      <Col className="col-lg-3 col-12 text-lg-start text-center">
        <a
          className="display-6 fs-3 link-primary text-decoration-none"
          href="https://algoleague.com/contest/dothemath-1/description"
          target="_blank"
          title="Go to the first #DoTheMath contest"
        >
          #DoTheMath
        </a>
      </Col>
      <Col className="d-flex col-lg-6 col-12 justify-content-center">
        <Row className="justify-content-center">
          <Col className="d-flex col-auto align-items-center fs-5">
            {pageHeader}
          </Col>
        </Row>
      </Col>
      <Col className="d-flex justify-content-end col-lg-3">
        <TagDropdown />
      </Col>
    </Row>
  );
}

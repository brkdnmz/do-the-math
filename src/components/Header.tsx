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
      <Col className="col-lg-auto m-0 p-0 col-2" />
      <Col className="col-lg-6 col-8 d-flex justify-content-center">
        <Row className="justify-content-center">
          <Col className="col-auto fs-5 d-flex align-items-center">
            {pageHeader}
          </Col>
        </Row>
      </Col>
      <Col className="col-lg-3 col-2 d-flex justify-content-end">
        <TagDropdown />
      </Col>
    </Row>
  );
}

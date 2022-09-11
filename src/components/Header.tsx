import React from "react";
import { Col, Row } from "react-bootstrap";
import TagDropdown from "./TagDropdown";
import FlexCol from "./util/CenteringCol";

interface HeaderProps {
  pageHeader: React.ReactNode;
}

export default function Header({ pageHeader }: HeaderProps) {
  return (
    <Row className="mb-3">
      <FlexCol className="col-lg-3 col-12 align-items-center justify-content-center justify-content-lg-start">
        <a
          className="display-6 fs-3 text-decoration-none"
          style={{ color: "#8950fc" }}
          href="https://algoleague.com/contest/dothemath-1/description"
          target="_blank"
          rel="noreferrer"
          title="Go to the first #DoTheMath contest"
        >
          #DoTheMath
        </a>
      </FlexCol>
      <Col className="col-lg-auto m-0 p-0 col-2" />
      <FlexCol className="col-lg-6 col-8 fs-5 align-items-center justify-content-center text-center">
        {pageHeader}
      </FlexCol>
      <FlexCol className="col-lg-3 col-2 align-items-center justify-content-end">
        <TagDropdown />
      </FlexCol>
    </Row>
  );
}

import { PropsWithChildren } from "react";
import { Col } from "react-bootstrap";

interface CenteringColProps extends PropsWithChildren {
  className?: string;
}

export default function FlexCol({ className, children }: CenteringColProps) {
  return <Col className={"d-flex " + className}>{children}</Col>;
}

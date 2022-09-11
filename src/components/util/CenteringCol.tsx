import { Col } from "react-bootstrap";

interface CenteringColProps {
  className?: string;
  children: React.ReactNode;
}

export default function FlexCol({ className, children }: CenteringColProps) {
  return <Col className={"d-flex " + className}>{children}</Col>;
}

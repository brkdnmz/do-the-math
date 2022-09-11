import { Alert } from "react-bootstrap";

interface AutoDismissingAlertProps {
  show: boolean;
  alertText: string;
  opacity: number;
}

export default function AutoDismissingAlert({
  show,
  alertText,
  opacity,
}: AutoDismissingAlertProps) {
  return (
    <Alert
      show={show}
      className="position-fixed end-0 bottom-0 mb-3 me-3 alert-warning"
      style={{ opacity: opacity, maxWidth: "40%" }}
    >
      {alertText}
    </Alert>
  );
}

import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AutoDismissingAlert from "./AutoDismissingAlert";

interface AlertButtonProps extends PropsWithChildren {
  variant?: string;
  className?: string;
  alertText: string;
  onClick: () => Promise<void>;
  disabled?: boolean;
}

interface FaderProps {
  timeoutId: number;
  intervalId: number;
}

export default function AlertButton({
  variant,
  className,
  alertText,
  onClick,
  disabled,
  children,
}: AlertButtonProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertOpacity, setAlertOpacity] = useState(0); // Also controls whether to show
  const [, setAlertFadeTimer] = useState<FaderProps>({
    timeoutId: 0,
    intervalId: 0,
  });

  /**
   * Clears the previous timer interval & timeout.
   */
  const clearPrevFadeTimer = useCallback(() => {
    setAlertFadeTimer((prev) => {
      clearTimeout(prev.timeoutId);
      clearInterval(prev.intervalId);
      return { ...prev };
    });
  }, []);

  const onAlert = useCallback(() => {
    clearPrevFadeTimer();
    setAlertOpacity(() => 0.75);

    const setFadeInterval = () => {
      const interval = window.setInterval(
        () => setAlertOpacity((prevOpacity) => Math.max(0, prevOpacity - 0.01)),
        10
      );

      setAlertFadeTimer((prev) => {
        return { ...prev, intervalId: interval };
      });
    };

    const timeout = window.setTimeout(setFadeInterval, 500);

    setAlertFadeTimer((prev) => {
      return { ...prev, timeoutId: timeout };
    });
  }, [clearPrevFadeTimer]);

  useEffect(() => {
    setShowAlert(alertOpacity > 0);
  }, [alertOpacity]);

  useEffect(() => {
    onAlert();
  }, [alertText, onAlert]);

  return (
    <>
      <Button
        variant={variant}
        className={className}
        disabled={disabled}
        onClick={() => onClick().then(() => onAlert())}
      >
        {children}
      </Button>
      <AutoDismissingAlert
        show={showAlert && alertText?.length > 0}
        alertText={alertText}
        opacity={alertOpacity}
      />
    </>
  );
}

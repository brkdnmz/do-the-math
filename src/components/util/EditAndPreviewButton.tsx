import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEye, FaPen } from "react-icons/fa";

interface EditAndPreviewButtonProps {
  whatToShow: "edit" | "preview";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export default function EditAndPreviewButton({
  whatToShow,
  onClick,
}: EditAndPreviewButtonProps) {
  const [opacity, setOpacity] = useState("50%");

  const onHover = () => {
    setOpacity(() => "100%");
  };
  const onLeave = () => {
    setOpacity(() => "50%");
  };

  return (
    <Button
      variant="link"
      className="position-absolute top-0 end-0"
      style={{ opacity: opacity }}
      onMouseOver={() => onHover()}
      onMouseOut={() => onLeave()}
      onClick={onClick}
    >
      {whatToShow === "edit" ? (
        <FaEye size={30} pointerEvents="none" />
      ) : (
        <FaPen size={30} pointerEvents="none" />
      )}
    </Button>
  );
}

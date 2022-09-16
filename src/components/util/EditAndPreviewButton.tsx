import { Button } from "react-bootstrap";
import { FaEye, FaPen } from "react-icons/fa";
import DynamicOpacity from "./DynamicOpacity";

interface EditAndPreviewButtonProps {
  whatToShow: "edit" | "preview";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export default function EditAndPreviewButton({
  whatToShow,
  onClick,
}: EditAndPreviewButtonProps) {
  return (
    <DynamicOpacity>
      <Button
        variant="link"
        className="top-0 position-absolute end-0"
        onClick={onClick}
      >
        {whatToShow === "edit" ? (
          <FaEye
            size={30}
            pointerEvents="none"
          />
        ) : (
          <FaPen
            size={30}
            pointerEvents="none"
          />
        )}
      </Button>
    </DynamicOpacity>
  );
}

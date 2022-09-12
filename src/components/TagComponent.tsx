import { FaTrash } from "react-icons/fa";
import { Tag } from "../db/collections/Tag";
import DynamicOpacity from "./util/DynamicOpacity";

interface TagComponentProps {
  tag: Tag;
  onDelete: (tag: string) => void;
}

export default function TagComponent({ tag, onDelete }: TagComponentProps) {
  return (
    <div
      className="px-1 d-flex border-1 rounded align-items-center"
      style={{
        backgroundColor: "#ddd",
      }}
    >
      <pre className="m-0 pe-1 border-end border-1 border-secondary">
        {tag.name}
      </pre>
      <DynamicOpacity>
        <FaTrash
          className="ms-1"
          role="button"
          size={15}
          color="red"
          title="Delete"
          onClick={() => onDelete(tag.name)}
        />
      </DynamicOpacity>
    </div>
  );
}

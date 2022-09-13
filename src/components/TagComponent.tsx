import { FaTrash } from "react-icons/fa";
import { Tag } from "../db/collections/Tag";
import AdminOnly from "./util/AdminOnly";
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
      <pre className="m-0 pe-1">{tag.name}</pre>
      <AdminOnly>
        <DynamicOpacity>
          <FaTrash
            className="ps-1 border-start border-1 border-secondary"
            role="button"
            size={15}
            color="red"
            title="Delete"
            onClick={() => onDelete(tag.name)}
          />
        </DynamicOpacity>
      </AdminOnly>
    </div>
  );
}

import { useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import DynamicOpacity from "./util/DynamicOpacity";

interface TagAdderProps {
  onAdd: (tag: string) => void;
  onCancel: () => void;
}

export default function TagAdder({ onAdd, onCancel }: TagAdderProps) {
  const [tag, setTag] = useState("");

  return (
    <div
      className="px-1 d-flex border-1 rounded align-items-center"
      style={{
        backgroundColor: "#ddd",
      }}
    >
      <pre className="m-0 pe-1 border-end border-1 border-secondary">
        <div
          contentEditable
          className="px-1"
          style={{
            width: "auto",
            minWidth: "5ch",
            outline: "none",
            borderTopLeftRadius: "3px",
            borderBottomLeftRadius: "3px",
            backgroundColor: "#ccc",
          }}
          onInput={(e) => setTag(e.currentTarget.textContent!)}
          onFocus={(e) => {
            e.target.style.backgroundColor = "#aaa";
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = "#ccc";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (!e.shiftKey) onAdd(tag);
            }
          }}
        />
      </pre>
      <DynamicOpacity>
        <IoCheckmark
          className="ms-1"
          role="button"
          size={20}
          color="green"
          title="Add"
          onClick={() => onAdd(tag)}
        />
      </DynamicOpacity>
      <DynamicOpacity>
        <IoClose
          className="ms-1"
          role="button"
          size={20}
          color="red"
          title="Cancel"
          onClick={() => onCancel()}
        />
      </DynamicOpacity>
    </div>
  );
}

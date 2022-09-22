import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: string | "no-bg";
  disabled?: boolean;
}

export default function Button({
  variant,
  disabled,
  className,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${className} px-4 py-2 text-white ${
        variant !== "no-bg" ? "bg-blue-600" : ""
      } rounded ${disabled ? "hidden" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}
    >
      {children}
    </button>
  );
}

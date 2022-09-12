import { PropsWithChildren } from "react";

interface DynamicOpacityProps extends PropsWithChildren {
  blurOpacity?: string;
  focusOpacity?: string;
}

export default function DynamicOpacity({
  blurOpacity,
  focusOpacity,
  children,
}: DynamicOpacityProps) {
  const defaultBlurOpacity = "50%";
  const defaultFocusOpacity = "100%";
  return (
    <div
      className="d-flex"
      style={{ opacity: blurOpacity || defaultBlurOpacity }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = focusOpacity || defaultFocusOpacity;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = blurOpacity || defaultBlurOpacity;
      }}
    >
      {children}
    </div>
  );
}

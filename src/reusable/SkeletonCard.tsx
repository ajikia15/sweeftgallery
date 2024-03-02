import { forwardRef } from "react";

const SkeletonCard = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="break-inside-avoid bg-neutral-900 opacity-90 animate-pulse"
    ></div>
  );
});

export default SkeletonCard;

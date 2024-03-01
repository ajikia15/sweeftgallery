import { useState, useEffect, RefObject } from "react";
import ReactDOM from "react-dom";

interface TooltipProps {
  hoverRef: RefObject<HTMLElement>;
  tooltipText: string;
}
export function Tooltip({ hoverRef, tooltipText }: TooltipProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hoverEl = hoverRef.current;
    const handleMouseOver = () => setVisible(true);
    const handleMouseOut = () => setVisible(false);

    if (hoverEl) {
      const rect = hoverEl.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left });
      hoverEl.addEventListener("mouseover", handleMouseOver);
      hoverEl.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (hoverEl) {
        hoverEl.removeEventListener("mouseover", handleMouseOver);
        hoverEl.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, [hoverRef]);
  return ReactDOM.createPortal(
    <div
      className={`fixed bg-black text-white rounded-lg shadow-lg p-2 transition-opacity duration-100 ${
        visible ? "opacity-100" : "opacity-0"
      } ${visible ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{
        top: `${position.top + 10}px`,
        left: `${position.left}px`,
      }}
    >
      {tooltipText}
      <div
        className="absolute w-3 h-3 bg-black transform -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{ top: "2px", left: "50%" }}
      ></div>
    </div>,
    document.body
  );
}

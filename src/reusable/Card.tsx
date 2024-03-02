import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import { Photo } from "../types/Photo";
interface CardProps {
  photo: Photo;
}
export default function Card({ photo }: CardProps) {
  const [activePortal, setActivePortal] = useState(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActivePortal(false);
    }
  };

  useEffect(() => {
    if (activePortal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown); // :S
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activePortal]);
  return (
    <div
      className="break-inside-avoid cursor-pointer relative group"
      onClick={() => {
        setActivePortal(true);
      }}
    >
      <img
        src={photo.urls.small}
        className="h-full w-full  rounded-2xl"
        alt=""
      />
      <div
        className={`${
          activePortal ? "opacity-50" : " opacity-0 group-hover:opacity-50"
        } bg-gray-800 transition-opacity absolute inset-0  rounded-2xl`}
      ></div>
      {activePortal &&
        createPortal(
          <Modal photo={photo} togglePortal={setActivePortal} />,
          document.body
        )}
    </div>
  );
}

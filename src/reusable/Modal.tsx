import { Photo } from "../types/Photo";

interface ModalProps {
  togglePortal: (active: boolean) => void;
  photo: Photo;
}
export default function Modal({ togglePortal, photo }: ModalProps) {
  // call an individual pic here

  return (
    <div
      className=" bg-black bg-opacity-70 transition-all z-20 fixed inset-0 grid place-items-center"
      onClick={(e) => {
        e.stopPropagation();
        togglePortal(false);
      }}
    >
      <div
        className="opacity-100 p-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src={photo.urls.small} alt="" />
      </div>
      <div
        className="fixed bottom-0 p-6 text-white items-center  bg-black bg-opacity-90 left-0 right-0 flex justify-end gap-x-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="font-bold">{photo.likes}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="text-white "
        >
          <path
            fill="currentColor"
            d="M12.001 4.529a5.998 5.998 0 0 1 8.242.228a6 6 0 0 1 .236 8.236l-8.48 8.492l-8.478-8.492a6 6 0 0 1 8.48-8.464"
          ></path>
        </svg>
        <a href={photo.links.download} download className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 22 22"
            className="text-white "
          >
            <path
              fill="currentColor"
              d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

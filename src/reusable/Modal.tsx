interface ModalProps {
  togglePortal: (active: boolean) => void;
  photo: any;
}
export default function Modal({ togglePortal, photo }: ModalProps) {
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
    </div>
  );
}

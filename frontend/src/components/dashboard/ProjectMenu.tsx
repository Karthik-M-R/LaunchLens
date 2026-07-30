import { useEffect, useRef, useState } from "react";

interface Props {
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ProjectMenu = ({
  onOpen,
  onEdit,
  onDelete,
}: Props) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        className="
          rounded-lg
          p-2
          transition
          hover:bg-gray-100
        "
      >
        ⋮
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-10
            z-20
            w-40
            overflow-hidden
            rounded-xl
            border
            bg-white
            shadow-lg
          "
        >
          <button
            onClick={() => {
              setOpen(false);
              onOpen();
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50"
          >
            Open
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50"
          >
            Edit
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="
              w-full
              px-4
              py-3
              text-left
              text-red-600
              hover:bg-red-50
            "
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectMenu;
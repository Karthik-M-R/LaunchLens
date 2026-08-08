import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";

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
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          rounded-lg
          border
          border-[#243342]
          bg-[#111923]
          p-1.5
          text-[#94A3B8]
          transition-all
          duration-200
          ease-in-out
          hover:border-[#38BDF8]
          hover:text-[#F1F5F9]
        "
        type="button"
        aria-label="Open project actions"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-9
            z-20
            w-36
            overflow-hidden
            rounded-lg
            border
            border-[#243342]
            bg-[#16222E]
            shadow-xl
          "
        >
          <button
            onClick={() => {
              setOpen(false);
              onOpen();
            }}
            className="block w-full px-4 py-2 text-left text-sm text-[#94A3B8] transition-colors hover:bg-[#243342] hover:text-[#F1F5F9]"
            type="button"
          >
            Open
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="block w-full px-4 py-2 text-left text-sm text-[#94A3B8] transition-colors hover:bg-[#243342] hover:text-[#F1F5F9]"
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className="block w-full px-4 py-2 text-left text-sm text-[#FB7185] transition-colors hover:bg-[#243342]"
            type="button"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectMenu;

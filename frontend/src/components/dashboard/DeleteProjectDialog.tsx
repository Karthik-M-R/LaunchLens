import Button from "../ui/Button";

interface Props {
  open: boolean;
  projectName?: string;
  loading: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

const DeleteProjectDialog = ({
  open,
  projectName,
  loading,
  onClose,
  onDelete,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Delete Project
        </h2>
        
        <p className="mt-3 text-slate-600">
          Are you sure you want to delete
          <span className="font-semibold text-slate-900"> {projectName}</span>?
        </p>
        
        <p className="mt-2 text-sm text-rose-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            loading={loading}
            onClick={onDelete}
            className="border-transparent! bg-rose-600! text-white! hover:bg-rose-700!"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectDialog;

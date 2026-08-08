import Button from "../ui/Button";

interface Props {
  open: boolean;
  campaignName: string;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteCampaignDialog = ({
  open,
  campaignName,
  loading,
  onClose,
  onDelete,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080D14]/80 p-4">
      <div className="w-full max-w-md rounded-lg border border-[#243342] bg-[#16222E] p-6 shadow-2xl sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-[#F1F5F9]">
          Delete Campaign
        </h2>

        <p className="mt-4 text-[#94A3B8]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#F1F5F9]">
            {campaignName}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onDelete}
            loading={loading}
            className="border-transparent! bg-[#FB7185]! text-[#080D14]! hover:bg-[#E11D48]!"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCampaignDialog;

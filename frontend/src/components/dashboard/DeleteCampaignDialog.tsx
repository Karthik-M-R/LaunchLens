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
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-8
          shadow-2xl
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            text-gray-900
          "
        >
          Delete Campaign
        </h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {campaignName}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={onDelete}
            loading={loading}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCampaignDialog;
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../ui/Button";

import {
  campaignSchema,
  type CampaignFormData,
} from "../../validation/campaign";

import type { Campaign } from "../../types/campaign";

interface Props {
  open: boolean;

  mode: "create" | "edit";

  campaign?: Campaign | null;

  onClose: () => void;

  onSubmit: (
    data: CampaignFormData
  ) => Promise<void>;
}

const CampaignFormModal = ({
  open,
  mode,
  campaign,
  onClose,
  onSubmit,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),

    defaultValues: {
      name: "",
      destinationUrl: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && campaign) {
      reset({
        name: campaign.name,
        destinationUrl: campaign.destinationUrl,
      });
    } else {
      reset({
        name: "",
        destinationUrl: "",
      });
    }
  }, [open, mode, campaign, reset]);

  if (!open) return null;

  const submit = async (
  data: CampaignFormData
) => {
  

  await onSubmit(data);

  reset();
};

  const handleClose = () => {
    reset();

    onClose();
  };

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
          max-w-lg
          rounded-2xl
          bg-white
          p-8
          shadow-2xl
        "
      >
        <h2
          className="
            mb-6
            text-2xl
            font-bold
            text-gray-900
          "
        >
          {mode === "create"
            ? "Create Campaign"
            : "Edit Campaign"}
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          LaunchLens will automatically generate a unique
          tracking link after the campaign is created.
        </p>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">
              Campaign Name
            </label>

            <input
              {...register("name")}
              placeholder="Reddit Marketing"
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-gray-300
                p-3
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-200
              "
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Destination URL
            </label>

            <input
              {...register("destinationUrl")}
              placeholder="https://example.com"
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-gray-300
                p-3
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-200
              "
            />

            {errors.destinationUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.destinationUrl.message}
              </p>
            )}
          </div>

          <div className="rounded-xl bg-indigo-50 p-4">
            <p className="text-sm text-indigo-700">
              A unique tracking link will be generated
              automatically when this campaign is created.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={isSubmitting}
            >
              {mode === "create"
                ? "Create Campaign"
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignFormModal;
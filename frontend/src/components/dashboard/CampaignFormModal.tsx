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
  onSubmit: (data: CampaignFormData) => Promise<void>;
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
    formState: { errors, isSubmitting },
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

  const submit = async (data: CampaignFormData) => {
    await onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">
          {mode === "create" ? "Create Campaign" : "Edit Campaign"}
        </h2>

        <p className="mb-6 text-sm leading-6 text-slate-600">
          LaunchLens will automatically generate a unique tracking link after the campaign is created.
        </p>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700">Campaign Name</label>
            <input
              {...register("name")}
              placeholder="Reddit Marketing"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white text-slate-900 p-3 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-rose-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Destination URL</label>
            <input
              {...register("destinationUrl")}
              placeholder="https://example.com"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white text-slate-900 p-3 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
            />
            {errors.destinationUrl && (
              <p className="mt-1 text-sm text-rose-500">{errors.destinationUrl.message}</p>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 flex gap-3">
             <div className="text-sky-500 mt-0.5">ℹ️</div>
             <p className="text-sm leading-6 text-slate-600">
              A unique tracking link will be generated automatically when this campaign is created.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {mode === "create" ? "Create Campaign" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignFormModal;

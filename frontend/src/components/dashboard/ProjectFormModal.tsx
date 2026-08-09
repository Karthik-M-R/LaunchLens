import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../ui/Button";

import {
  createProjectSchema,
  type CreateProjectFormData,
} from "../../validation/project";

interface Project {
  id: string;
  name: string;
  website: string;
  description?: string;
}

interface Props {
  open: boolean;
  mode: "create" | "edit";
  project?: Project;
  onClose: () => void;
  onSubmit: (data: CreateProjectFormData) => Promise<void>;
}

const ProjectFormModal = ({
  open,
  mode,
  project,
  onClose,
  onSubmit,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      website: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && project) {
      reset({
        name: project.name,
        website: project.website,
        description: project.description ?? "",
      });
    } else {
      reset({
        name: "",
        website: "",
        description: "",
      });
    }
  }, [open, mode, project, reset]);

  if (!open) return null;

  const submit = async (data: CreateProjectFormData) => {
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
          {mode === "create" ? "Create Project" : "Edit Project"}
        </h2>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700">Project Name</label>
            <input
              {...register("name")}
              placeholder="LaunchLens"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white text-slate-900 p-3 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-rose-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Website</label>
            <input
              {...register("website")}
              placeholder="https://launchlens.com"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white text-slate-900 p-3 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-rose-500">{errors.website.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              rows={4}
              {...register("description")}
              placeholder="Short description about the project..."
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white text-slate-900 p-3 outline-none transition-all focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {mode === "create" ? "Create Project" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;

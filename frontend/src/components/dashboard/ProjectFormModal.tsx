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

  onSubmit: (
    data: CreateProjectFormData
  ) => Promise<void>;
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
    formState: {
      errors,
      isSubmitting,
    },
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

  const submit = async (
    data: CreateProjectFormData
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
            ? "Create Project"
            : "Edit Project"}
        </h2>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">
              Project Name
            </label>

            <input
              {...register("name")}
              placeholder="LaunchLens"
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
              Website
            </label>

            <input
              {...register("website")}
              placeholder="https://launchlens.com"
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

            {errors.website && (
              <p className="mt-1 text-sm text-red-600">
                {errors.website.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows={4}
              {...register("description")}
              placeholder="Short description about the project..."
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
                ? "Create Project"
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
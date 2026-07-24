import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createProjectSchema,
  type CreateProjectFormData,
} from "../../../validation/project";

type Props = {
    open: boolean;
    onClose: () => void;
    onCreate: (data: CreateProjectFormData) => void;
};

const CreateProjectModal = ({
  open,
  onClose,
  onCreate,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = async (
    data: CreateProjectFormData
  ) => {
    onCreate(data);


    // later
    // await createProject(data)

    reset();

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

      <div className="w-full max-w-xl rounded-3xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-black">

              Create Project

            </h2>

            <p className="mt-2 text-gray-500">

              Start a new marketing workspace.

            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl border-2 border-black p-2"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          {/* Project Name */}

          <div>

            <label className="mb-2 block font-black">

              Project Name *

            </label>

            <input
              {...register("name")}
              placeholder="LaunchLens"
              className="w-full rounded-2xl border-4 border-black p-4 outline-none"
            />

            <p className="mt-2 text-sm text-red-600">

              {errors.name?.message}

            </p>

          </div>

          {/* Website */}

          <div>

            <label className="mb-2 block font-black">

              Website

            </label>

            <input
              {...register("website")}
              placeholder="https://launchlens.app"
              className="w-full rounded-2xl border-4 border-black p-4 outline-none"
            />

          </div>

          {/* Description */}

          <div>

            <label className="mb-2 block font-black">

              Description

            </label>

            <textarea
              rows={4}
              {...register("description")}
              placeholder="Short description..."
              className="w-full rounded-2xl border-4 border-black p-4 outline-none"
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border-4 border-black bg-white px-6 py-3 font-black"
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              className="rounded-2xl border-4 border-black bg-indigo-500 px-6 py-3 font-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {isSubmitting
                ? "Creating..."
                : "Create Project"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateProjectModal;
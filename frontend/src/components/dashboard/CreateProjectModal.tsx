import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../ui/Button";

import {
  createProjectSchema,
  type CreateProjectFormData,
} from "../../validation/project";

interface Props {

  open: boolean;

  onClose: () => void;

  onCreate: (data: CreateProjectFormData) => Promise<void>;

}

const CreateProjectModal = ({
  open,
  onClose,
  onCreate,
}: Props) => {

  const {

    register,

    handleSubmit,

    formState: {
      errors,
      isSubmitting,
    },

    reset,

  } = useForm<CreateProjectFormData>({

    resolver:
      zodResolver(createProjectSchema),

  });

  if (!open) return null;

  const submit = async (
    data: CreateProjectFormData
  ) => {

    await onCreate(data);

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
        rounded-xl
        bg-white
        p-8
        shadow-xl
      "
      >

        <h2
          className="
          mb-6
          text-2xl
          font-bold
        "
        >

          Create Project

        </h2>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-5"
        >

          <div>

            <label>Name</label>

            <input
              {...register("name")}
              className="mt-2 w-full rounded-lg border p-3"
            />

            <p className="text-red-600">

              {errors.name?.message}

            </p>

          </div>

          <div>

            <label>Website</label>

            <input
              {...register("website")}
              className="mt-2 w-full rounded-lg border p-3"
            />

            <p className="text-red-600">

              {errors.website?.message}

            </p>

          </div>

          <div>

            <label>Description</label>

            <textarea
              rows={4}
              {...register("description")}
              className="mt-2 w-full rounded-lg border p-3"
            />

          </div>

          <div
            className="
            flex
            justify-end
            gap-3
            pt-3
          "
          >

            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >

              Cancel

            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >

              {isSubmitting
                ? "Creating..."
                : "Create Project"}

            </Button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default CreateProjectModal;
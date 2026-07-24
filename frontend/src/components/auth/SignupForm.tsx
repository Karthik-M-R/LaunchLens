import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import {
  signupSchema,
  type SignupFormData,
} from "../../validation/auth";

const SignupForm = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    data: SignupFormData
  ) => {

    console.log(data);

    // Later
    // await signup(data)

    navigate("/dashboard");

  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      {/* Name */}

      <div>

        <label className="mb-2 block font-black">

          Full Name

        </label>

        <input
          {...register("name")}
          placeholder="John Doe"
          className="w-full rounded-2xl border-4 border-black p-4 font-semibold outline-none focus:bg-yellow-50"
        />

        {errors.name && (
          <p className="mt-2 font-bold text-red-600">
            {errors.name.message}
          </p>
        )}

      </div>

      {/* Email */}

      <div>

        <label className="mb-2 block font-black">

          Email

        </label>

        <input
          {...register("email")}
          type="email"
          placeholder="john@gmail.com"
          className="w-full rounded-2xl border-4 border-black p-4 font-semibold outline-none focus:bg-yellow-50"
        />

        {errors.email && (
          <p className="mt-2 font-bold text-red-600">
            {errors.email.message}
          </p>
        )}

      </div>

      {/* Password */}

      <div>

        <label className="mb-2 block font-black">

          Password

        </label>

        <input
          {...register("password")}
          type="password"
          placeholder="********"
          className="w-full rounded-2xl border-4 border-black p-4 font-semibold outline-none focus:bg-yellow-50"
        />

        {errors.password && (
          <p className="mt-2 font-bold text-red-600">
            {errors.password.message}
          </p>
        )}

      </div>

      {/* Confirm Password */}

      <div>

        <label className="mb-2 block font-black">

          Confirm Password

        </label>

        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="********"
          className="w-full rounded-2xl border-4 border-black p-4 font-semibold outline-none focus:bg-yellow-50"
        />

        {errors.confirmPassword && (
          <p className="mt-2 font-bold text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}

      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl border-4 border-black bg-green-500 py-4 font-black text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1 disabled:opacity-60"
      >
        {isSubmitting
          ? "Creating Account..."
          : "Create Account"}
      </button>

      <p className="text-center font-semibold">

        Already have an account?

        {" "}

        <Link
          to="/login"
          className="font-black text-indigo-600"
        >
          Login
        </Link>

      </p>

    </form>

  );

};

export default SignupForm;
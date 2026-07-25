import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import api from "../../api/axios";

import {
  signupSchema,
  type SignupFormData,
} from "../../validation/auth";

const SignupForm = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  /*
  ==================================================

  Signup Flow

  React

      ↓

  POST /auth/signup

      ↓

  Backend

      ↓

  Validate

      ↓

  Hash Password

      ↓

  Store User

      ↓

  Success

      ↓

  Redirect Login

  ==================================================
  */

  const onSubmit = async (
    data: SignupFormData
  ) => {

    try {

      await api.post(
        "/auth/signup",
        data
      );

      alert(
        "Account created successfully!"
      );

      navigate("/login");

    } catch (error) {

      if (axios.isAxiosError(error)) {

        alert(
          error.response?.data?.message ??
          "Signup Failed"
        );

      } else {

        alert(
          "Something went wrong."
        );

      }

    }

  };

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >

      {/* Name */}

      <div>

        <label className="mb-2 block font-black">

          Name

        </label>

        <input
          type="text"
          placeholder="Karthik"
          {...register("name")}
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
          type="email"
          placeholder="karthik@gmail.com"
          {...register("email")}
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
          type="password"
          placeholder="********"
          {...register("password")}
          className="w-full rounded-2xl border-4 border-black p-4 font-semibold outline-none focus:bg-yellow-50"
        />

        {errors.password && (

          <p className="mt-2 font-bold text-red-600">

            {errors.password.message}

          </p>

        )}

      </div>

      {/* Button */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl border-4 border-black bg-indigo-500 py-4 font-black text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1 disabled:opacity-60"
      >

        {

          isSubmitting

            ? "Creating Account..."

            : "Create Account"

        }

      </button>

      {/* Footer */}

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import {
  loginSchema,
  type LoginFormData,
} from "../../validation/auth";

const LoginForm = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {

    console.log(data);

    // Later

    // await login(data)

    navigate("/dashboard");

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >

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

      {/* Forgot */}

      <div className="text-right">

        <button
          type="button"
          className="font-bold text-indigo-600 hover:underline"
        >
          Forgot Password?
        </button>

      </div>

      {/* Login */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl border-4 border-black bg-indigo-500 py-4 font-black text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition hover:-translate-y-1 disabled:opacity-60"
      >

        {isSubmitting

          ? "Logging in..."

          : "Login"}

      </button>

      {/* Bottom */}

      <p className="text-center font-semibold">

        Don't have an account?

        {" "}

        <Link
          to="/signup"
          className="font-black text-indigo-600"
        >

          Sign Up

        </Link>

      </p>

    </form>
  );
};

export default LoginForm;










/**
 * ============================================================================
📌 QUICK REVISION CHEATSHEET
============================================================================

• RE-RENDER
  What it is : React running your component function again to recalculate UI.
  The Problem: Standard state (useState) re-renders the WHOLE component 
               on EVERY single keystroke, causing lag in large forms.

• useForm (React Hook Form)
  What it is : A hook that manages forms using HTML refs instead of state.
  Why use it : 0 re-renders while typing. Fast, smooth, and handles submit/errors.

• ZOD
  What it is : A runtime data validator for JavaScript & TypeScript.
  Why use it : TypeScript types disappear when compiled to JS. Zod checks real 
               data at runtime (e.g., valid email, min length) and automatically 
               gives you the TypeScript types.

• zodResolver
  What it is : The glue/bridge that connects your Zod validation rules 
               directly into useForm.

============================================================================
FLOW: User Types (Fast/No re-render) ➔ User Clicks Submit ➔ Zod Validates ➔ Data Processed
============================================================================
 */
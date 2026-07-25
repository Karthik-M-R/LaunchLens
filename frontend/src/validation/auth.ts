import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({

  name: z
    .string()
    .min(3),

  email: z
    .email(),

  password: z
    .string()
    .min(8),

});;

export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * ==============================================================================
 * 📌 WHAT IS ZOD & WHY ARE WE USING IT IN THIS FILE? (REVISION GUIDE)
 * ==============================================================================
 *
 * 1. THE PROBLEM ZOD SOLVES:
 * --------------------------
 * TypeScript is "invisible" at runtime. It checks for type errors while you write
 * code in your editor, but once compiled to JavaScript for the browser, TypeScript 
 * completely disappears. 
 *
 * TypeScript CANNOT validate live user inputs (e.g., stopping a user from typing 
 * "abc" into an email field or submitting an empty password).
 *
 *
 * 2. WHAT IS ZOD?
 * ---------------
 * Zod is a RUNTIME DATA VALIDATOR. It stays alive in the browser while the user 
 * interacts with your application. It acts as a security guard between user 
 * inputs and your backend API.
 *
 *
 * 3. WHAT DOES THIS FILE (`validation/auth.ts`) DO?
 * -------------------------------------------------
 * This file performs two critical functions:
 *
 *   a) Runtime Validation (`loginSchema`):
 *      Defines the shape and validation rules for the login form:
 *      - Checks if 'email' is a non-empty, properly formatted email string.
 *      - Checks if 'password' is a string with a minimum length of 6 characters.
 *      - Provides human-readable error messages if validation fails.
 *
 *   b) Compile-Time Type Generation (`LoginFormData`):
 *      `z.infer<typeof loginSchema>` automatically generates a TypeScript 
 *      type directly from the Zod schema.
 *
 *      Equivalent TypeScript type created under the hood:
 *      type LoginFormData = {
 *        email: string;
 *        password: string;
 *      }
 *
 *      Benefits: If you update `loginSchema` (e.g., adding a new field), the 
 *      TypeScript type updates AUTOMATICALLY across your whole app. No duplicate 
 *      type declarations!
 *
 *
 * 4. HOW IT CONNECTS TO REACT HOOK FORM (`LoginForm.tsx`):
 * -------------------------------------------------------
 * In `LoginForm.tsx`, we pass this schema into React Hook Form via `zodResolver`:
 * 
 *   const { register, handleSubmit } = useForm<LoginFormData>({
 *     resolver: zodResolver(loginSchema),
 *   });
 *
 * Flow when user clicks "Login":
 *   [ User Submits Form ]
 *           │
 *           ▼
 *   [ zodResolver intercepts input ]
 *           │
 *           ├──► Validation FAILS ──► Fills `errors` object (e.g., `errors.email.message`)
 *           │                         and stops form submission.
 *           │
 *           └──► Validation PASSES ──► Calls `onSubmit(data)` with guaranteed, 
 *                                      strictly typed form data.
 * ==============================================================================
 


============================================================================
📌 ZOD .refine() CHEATSHEET
============================================================================

• WHAT IT IS
  Zod's tool for custom validation logic that standard Zod rules don't cover.

• WHEN TO USE IT
  1. Comparing two fields (e.g., Password === Confirm Password).
  2. Async checks (e.g., Checking if a username is already taken in DB).
  3. Complex business logic (e.g., Date of Birth must be at least 18 years ago).

• HOW IT WORKS
  .refine((value) => boolean, { message: "Error text", path: ["fieldName"] })
  - First argument  : A function returning true (valid) or false (invalid).
  - Second argument : An options object with the error message (and optional path).

============================================================================


*/


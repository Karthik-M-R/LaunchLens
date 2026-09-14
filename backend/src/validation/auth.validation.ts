import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50),

  email: z
    .email("Invalid email")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32),
});

export const loginSchema = z.object({
  email: z
    .email("Invalid email")
    .transform((email) => email.toLowerCase()),

  password: z.string().min(1, "Password is required"),
});

// TypeScript
//        ↓
// Compile-time safety

// while:

// Zod
//        ↓
// Runtime validation



// Simple analogy

// Think of TypeScript as:

// Blueprint

// and Zod as:

// Security guard checking the actual package against the blueprint.


// Blueprint:

// User must have:
// name → string
// email → string
// password → string

// Package arrives:

// name → 123
// email → hello
// password → true

// Zod says:

// ❌ Doesn't match schema



// "parse() returns the validated value when successful and throws a ZodError when validation fails.
//  safeParse() never throws for validation failure; instead 
// it returns a discriminated result with either success: true and data or success: false
//  and the validation error."


//                 ZOD
//                  │
//        ┌─────────┴─────────┐
//        │                   │
//     DEFINE               VALIDATE
//     SCHEMA                DATA
//        │                   │
//        ▼                   ▼
//  z.object({...})      schema.parse(data)
//        │                   │
//        │             ┌─────┴─────┐
//        │             │           │
//        │           valid       invalid
//        │             │           │
//        │             ▼           ▼
//        │          continue    ZodError
//        │                         │
//        │                         ▼
//        │                       400
//        │
//        ▼
//  TypeScript inference
//  z.infer<typeof schema>
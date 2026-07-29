import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary";
}

const Button = ({
  children,
  loading = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses = `
    inline-flex
    items-center
    justify-center
    rounded-xl
    px-5
    py-2.5
    text-sm
    font-semibold
    transition
    disabled:cursor-not-allowed
    disabled:opacity-50
  `.replace(/\s+/g, " ").trim();

  const variantClasses =
    variant === "primary"
      ? "bg-indigo-600 text-white hover:bg-indigo-700"
      : "bg-gray-100 text-gray-900 hover:bg-gray-200";

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;
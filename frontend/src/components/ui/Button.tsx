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
    rounded-lg
    border
    px-5
    py-2.5
    text-sm
    font-semibold
    transition-all
    duration-200
    ease-in-out
    disabled:cursor-not-allowed
    disabled:opacity-50
  `.replace(/\s+/g, " ").trim();

  const variantClasses =
    variant === "primary"
      ? "border-transparent bg-teal-600 text-white hover:bg-teal-700 shadow-sm"
      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm";

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

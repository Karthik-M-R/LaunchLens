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
      ? "border-transparent bg-[#22D3C5] text-[#080D14] hover:bg-[#14B8A6]"
      : "border-[#243342] bg-[#111923] text-[#F1F5F9] hover:bg-[#16222E]";

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

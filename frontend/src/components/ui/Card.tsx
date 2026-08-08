import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({
  children,
  className = "",
}: CardProps) => {
  return (
    <div
      className={`
        rounded-lg
        border
        border-[#243342]
        bg-[#111923]
        p-6
        transition-all
        duration-200
        ease-in-out
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;

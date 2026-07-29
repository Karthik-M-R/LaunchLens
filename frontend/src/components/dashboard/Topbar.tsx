import { useAuth } from "../../context/AuthContext";
import type { ReactNode } from "react";

interface TopbarProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

const Topbar = ({
  title,
  subtitle,
  action,
}: TopbarProps) => {

  const { user } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (

    <header
      className="
        flex
        flex-col
        gap-5
        border-b
        border-gray-200
        bg-white
        px-8
        py-6

        md:flex-row
        md:items-center
        md:justify-between
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
          "
        >

          {title}

        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >

          {subtitle}

        </p>

      </div>

      <div
        className="
          flex
          items-center
          gap-6
        "
      >
        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}

        {action && (
          <div className="h-8 w-px bg-gray-200 hidden md:block" />
        )}

        <div className="flex items-center gap-4">
          <div
            className="
              text-right
            "
          >

            <p
              className="
                font-semibold
                text-gray-900
              "
            >

              {user?.name}

            </p>

            <p
              className="
                text-sm
                text-gray-500
              "
            >

              {user?.email}

            </p>

          </div>

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-indigo-600
              font-semibold
              text-white
            "
          >

            {initials}

          </div>
        </div>

      </div>

    </header>

  );

};

export default Topbar;
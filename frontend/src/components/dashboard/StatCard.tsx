import Card from "../ui/Card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
}: StatCardProps) => {
  return (
    <Card>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-gray-500">

            {title}

          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">

            {value.toLocaleString()}

          </h2>

        </div>

        <div
          className="
            rounded-xl
            bg-indigo-50
            p-3
          "
        >

          <Icon
            className="text-indigo-600"
            size={24}
          />

        </div>

      </div>

    </Card>
  );
};

export default StatCard;
import Card from "../ui/Card";
import EmptyState from "../ui/EmptyState";

interface Activity {
  id: string;
  message: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({
  activities,
}: RecentActivityProps) => {

  return (

    <Card>

      <h2 className="mb-6 text-xl font-semibold text-gray-900">

        Recent Activity

      </h2>

      {activities.length === 0 ? (

        <EmptyState

          title="No Activity"

          description="Activity will appear here as you use LaunchLens."

        />

      ) : (

        <div className="space-y-4">

          {activities.map((activity) => (

            <div

              key={activity.id}

              className="border-l-2 border-indigo-500 pl-4"

            >

              {activity.message}

            </div>

          ))}

        </div>

      )}

    </Card>

  );

};

export default RecentActivity;
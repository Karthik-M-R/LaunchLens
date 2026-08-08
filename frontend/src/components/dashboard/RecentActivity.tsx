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
    <div className="flex flex-col">
      <h2 className="text-xs font-semibold tracking-wider text-[#94A3B8] uppercase mb-3">
        RECENT ACTIVITY
      </h2>
      <div className="h-px bg-[#243342] w-full mb-2" />

      {activities.length === 0 ? (
        <div className="py-4">
          <p className="text-[#F1F5F9] font-medium mb-1">No recent activity</p>
          <p className="text-sm text-[#94A3B8]">
            Activity will appear as your campaigns receive traffic.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`py-4 ${index !== activities.length - 1 ? 'border-b border-[#243342]' : ''}`}
            >
              <p className="text-sm leading-6 text-[#94A3B8]">
                {activity.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;

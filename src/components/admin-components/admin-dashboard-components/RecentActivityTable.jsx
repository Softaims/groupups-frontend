import React from "react";

const RecentActivityTable = ({ activities }) => {
  return (
    <div className="bg-[#1a1e24] rounded-lg border border-[#2a2e34]">
      <div className="flex items-center justify-between p-4 border-b border-[#2a2e34]">
        <h2 className="font-semibold text-white">Recent Activity</h2>
        {/* <button className="flex items-center gap-1 text-sm bg-[#0f1216] px-3 py-1.5 rounded-md hover:bg-[#2a2e34] text-white">
              <Plus className="h-3.5 w-3.5" />
              <span>Add New</span>
            </button> */}
      </div>
      <div className="p-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="rounded-full bg-[#0f1216] p-2">
              <activity.icon className="h-4 w-4 text-[#3CBFAE]" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">
                  {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}{" "}
                  <span className="font-normal text-gray-400">{activity.type}:</span> {activity.name}
                </p>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
              <p className="text-xs text-gray-400">by {activity.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityTable;

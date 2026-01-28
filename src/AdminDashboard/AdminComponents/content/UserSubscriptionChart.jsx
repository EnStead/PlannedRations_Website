import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function UserSubscriptionChart({ analytics }) {
  const data = [
    { name: "Premium Users", value: analytics?.premium_users?.count || 0, color: "#8B5CF6" },
    { name: "Family Heads", value: analytics?.family_heads?.count || 0, color: "#A78BFA" },
    { name: "Family Members", value: analytics?.family_members?.count || 0, color: "#1F1B3A" },
    { name: "Free Users", value: analytics?.free_users?.count || 0, color: "#E5E7EB" },
  ];

  const totalUsers = analytics?.total_users || 0;

  return (
    <div className="bg-white rounded-2xl p-4 flex items-center gap-4">
      {/* Chart */}
      <div className="relative w-56 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              dataKey="value"
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold font-dash">{totalUsers.toLocaleString()}</p>
          <span className="text-sm text-brand-planmid">Total Users</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col justify-center gap-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-400">
                {item.value.toLocaleString()} Active •{" "}
                {Math.round((item.value / totalUsers) * 100)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

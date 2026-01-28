import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const tabs = [
  { key: "total", label: "Total Signups" },
  { key: "active", label: "Active subscribers" },
];

const ALL_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function UserGrowthChart({ totalSignups, activeSubscribers }) {
  const [activeTab, setActiveTab] = useState("total");
  const currentMonth = ALL_MONTHS[new Date().getMonth()];

  const processData = (data) => {
    const map = new Map((data || []).map((d) => [d.month, d.value]));
    return ALL_MONTHS.map((month) => ({
      month,
      value: map.get(month) || 0,
    }));
  };

  const chartData = {
    total: processData(totalSignups),
    active: processData(activeSubscribers),
  };

  return (
    <div className="bg-white rounded-2xl p-4 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-dash text-brand-cardhead font-medium">User Growth Chart</h3>
          <p className="text-xs text-brand-muted">
            Tracks overall platform growth
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-2 py-1.5 text-xs font-medium rounded-full transition
                ${
                  activeTab === tab.key
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData[activeTab]} barSize={32}>
            <CartesianGrid
                vertical={false}
                strokeDasharray="4 6"
                stroke="#E5E7EB"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#333333", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#333333", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={(val) => [val.toLocaleString(), ""]}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                textAlign:"center",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData[activeTab].map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.month === currentMonth ? "#B091F7" : "#E7DEFC"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

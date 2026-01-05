import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

const chartData = {
  total: [
    { month: "Jan", value: 6200 },
    { month: "Feb", value: 3400 },
    { month: "Mar", value: 4900 },
    { month: "Apr", value: 2700 },
    { month: "May", value: 4400 },
    { month: "Jun", value: 2300 },
    { month: "Jul", value: 3800 },
    { month: "Aug", value: 4400 },
    { month: "Sep", value: 5600 },
    { month: "Oct", value: 7200 },
    { month: "Nov", value: 600 },
    { month: "Dec", value: 200 },
  ],
  active: [
    { month: "Jan", value: 4200 },
    { month: "Feb", value: 2800 },
    { month: "Mar", value: 3600 },
    { month: "Apr", value: 2100 },
    { month: "May", value: 3100 },
    { month: "Jun", value: 1900 },
    { month: "Jul", value: 2600 },
    { month: "Aug", value: 3000 },
    { month: "Sep", value: 3800 },
    { month: "Oct", value: 4200 },
    { month: "Nov", value: 400 },
    { month: "Dec", value: 150 },
  ],
  signup: [
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 900 },
    { month: "Mar", value: 1100 },
    { month: "Apr", value: 700 },
    { month: "May", value: 1400 },
    { month: "Jun", value: 600 },
    { month: "Jul", value: 800 },
    { month: "Aug", value: 1000 },
    { month: "Sep", value: 1200 },
    { month: "Oct", value: 1600 },
    { month: "Nov", value: 200 },
    { month: "Dec", value: 90 },
  ],
};

const tabs = [
  { key: "total", label: "Total users" },
  { key: "active", label: "Active subscribers" },
  { key: "signup", label: "New signups" },
];

export default function UserGrowthChart() {
  const [activeTab, setActiveTab] = useState("total");

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
              {chartData[activeTab].map((entry) => (
                <Cell
                  key={entry.month}
                  fill={
                    entry.month === "May"
                      ? "#B091F7"
                      : "#E7DEFC"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

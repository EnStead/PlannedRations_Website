import { useEffect, useState } from "react";
import api from "../../../Utility/api";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

function Header({ title, link }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-dash font-semibold">{title}</h3>
      <Link to={link} className="text-sm text-brand-secondary hover:underline font-medium">
        View All
      </Link>
    </div>
  );
}

const DashboardCards = () => {
  const [tops, setTops] = useState({
    recent_users: [],
    top_recipes: [],
    top_posts: [],
  });

  useEffect(() => {
    const fetchTops = async () => {
      try {
        const res = await api.get("/admin/dashboard-recent-tops");
        if (res.data.success) {
          setTops(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard tops", error);
      }
    };
    fetchTops();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-4">
      {/* Recent Signups */}
      <div className="bg-white rounded-2xl p-5  h-[320px] flex flex-col">
        <Header title="Recent Signups" link="/admin/users" />

        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 p-1">
          {tops.recent_users.slice(0, 4).map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center hover:scale-105 transition-transform duration-300 cursor-default bg-brand-offwhite p-1 rounded-lg"
            >
              <div className="flex gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium line-clamp-1">{user.name}</p>
                  <p className="text-xs text-gray-400 line-clamp-1">{user.email}</p>
                </div>
              </div>

              <div className="text-right min-w-fit">
                <p className="text-xs font-medium">{user.plan_name}</p>
                <p className="text-xs text-gray-400">{formatDate(user.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Recipes */}
      <div className="bg-white rounded-2xl p-5 h-[320px] flex flex-col">
        <Header title="Top Recipes" link="/admin/recipes" />

        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 p-1">
          {tops.top_recipes.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between hover:scale-105 transition-transform duration-300 cursor-default bg-brand-offwhite p-1 rounded-lg"
            >
              <div className="flex gap-3">
                <img
                  src={item.image || "https://placehold.co/100x100?text=Recipe"}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                  <p className="text-xs text-gray-400">
                    {item.cook_count} cooked • {item.saves} saves
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  item.percentage_increase >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.percentage_increase >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(item.percentage_increase)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Posts */}
      <div className="bg-white rounded-2xl p-5 h-[320px] flex flex-col">
        <Header title="Top Blog / Article Performance" link="/admin/posts" />

        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 p-1">
          {tops.top_posts.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between hover:scale-105 transition-transform duration-300 cursor-default bg-brand-offwhite p-1 rounded-lg"
            >
              <div className="flex gap-3">
                <img
                  src={item.image || "https://placehold.co/100x100?text=Post"}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                  <p className="text-xs text-gray-400">
                    {item.type} • {item.metric_value} {item.metric_label}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  item.percentage_increase >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.percentage_increase >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(item.percentage_increase)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;

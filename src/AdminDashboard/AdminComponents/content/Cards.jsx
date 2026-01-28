import TotalUser from "../../../assets/TotalUser.svg";
import ActiveUser from "../../../assets/ActiveUser.svg";
import PostImpr from "../../../assets/PostImpr.svg";
import TotalRec from "../../../assets/TotalRec.svg";
import { MoveRight, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../../Utility/api";

const Cards = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard-card");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  const users = stats?.users_card;
  const subs = stats?.subscribers_card;
  const posts = stats?.posts_card;
  const recipes = stats?.recipes_card;

  const cardData = [
    {
      image: TotalUser,
      title: "Total Users",
      text: "New Customer",
      number: users?.total_users?.toLocaleString() || "0",
      subNumb: users?.new_users?.toLocaleString() || "0",
      percentage: `${users?.percentage_increase || 0}%`,
      isPositive: (users?.percentage_increase || 0) >= 0,
      link: "/admin/users",
      linkText: "View Details",
    },
    {
      image: ActiveUser,
      title: "Active Subscribers",
      text: "Premium",
      subText: "Family",
      number: subs?.active_sub?.toLocaleString() || "0",
      subNumb: subs?.premium_subscribers?.toLocaleString() || "0",
      subNumb2: subs?.family_subscribers?.toLocaleString() || "0",
      percentage: `${subs?.percentage_increase || 0}%`,
      isPositive: (subs?.percentage_increase || 0) >= 0,
      link: "/admin/users",
      linkText: "View Details",
    },
    {
      image: PostImpr,
      title: "Post Impressions",
      text: "Reads",
      subText: "Likes",
      number: posts?.impressions?.toLocaleString() || "0",
      subNumb: posts?.reads || "0",
      subNumb2: posts?.likes || "0",
      percentage: `${posts?.likes_pct || 0}%`,
      isPositive: (posts?.likes_pct || 0) >= 0,
      link: "/admin/posts",
      linkText: "View Posts",
    },
    {
      image: TotalRec,
      title: "Total Recipes Published",
      text: "vs Last month",
      number: recipes?.total_recipes?.toLocaleString() || "0",
      percentage: `${recipes?.percentage_increase || 0}%`,
      isPositive: (recipes?.percentage_increase || 0) >= 0,
      link: "/admin/recipes",
      linkText: "View Recipes",
    },
  ];

  //   const renderChange = (value) => {
  //     const isNegative = value < 0;
  //     const absValue = Math.abs(value);

  //     return (
  //       <span
  //         className={`flex items-center gap-1 text-sm font-medium ${
  //           isNegative ? "text-brand-red" : "text-brand-green"
  //         }`}
  //       >
  //         {isNegative ? (
  //           <TrendingDown size={16} className="text-brand-red" />
  //         ) : (
  //           <TrendingUp size={16} className="text-brand-green" />
  //         )}
  //         {absValue}%
  //         <span className="text-brand-muted font-light ml-1">vs yesterday</span>
  //       </span>
  //     );
  //   };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-4 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl py-4 px-4 w-full flex flex-col justify-between items-start hover:shadow-lg transition-shadow"
        >
          {/* Header */}
          <div className="flex items-center gap-3 justify-between w-full mb-4">
            <h3 className="text-brand-primary font-dash font-medium text-sm">
              {card.title}
            </h3>
            <div className="p-2 bg-purple-50 rounded-full">
              <img src={card.image} alt={card.title} className="w-5 h-5" />
            </div>
          </div>

          {/* Main Number */}
          <div className="w-full">
            <h2 className="text-brand-primary font-dash font-semibold text-3xl mb-2">
              {card.number}
            </h2>

            {/* Details Section */}
            <div className="mb-2">
              {card.subNumb2 ? (
                // For cards with multiple sub-numbers (Active Subscribers, Post Impressions)
                <span className="text-brand-muted text-xs font-light">
                  {card.subNumb} {card.text} | {card.subNumb2} {card.subText}
                </span>
              ) : card.subNumb ? (
                // For cards with one sub-number (Total Users)
                <span className="text-brand-muted text-xs font-light">
                  {card.subNumb} {card.text}
                </span>
              ) : (
                // For cards without sub-numbers (Total Recipes)
                <span className="text-brand-muted text-xs font-light">
                  {card.text}
                </span>
              )}
            </div>

            {/* Footer with percentage and link */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                {card.isPositive ? (
                  <TrendingUp size={14} className="text-green-500" />
                ) : (
                  <TrendingDown size={14} className="text-red-500" />
                )}
                <span
                  className={`text-xs font-medium ${
                    card.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {card.percentage}
                </span>
              </div>

              <Link
                to={card.link}
                className="text-brand-muted font-medium text-xs flex items-center gap-2 hover:text-brand-secondary transition-colors cursor-pointer"
              >
                {card.linkText} <MoveRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Cards;

import TotalUser from "../../../assets/TotalUser.svg";
import ActiveUser from "../../../assets/ActiveUser.svg";
import PostImpr from "../../../assets/PostImpr.svg";
import TotalRec from "../../../assets/TotalRec.svg";
import { MoveRight, UserRound } from "lucide-react";
import { Link } from "react-router";
import { TrendingUp, TrendingDown } from "lucide-react";

const Cards = () => {

    const cardData = [
        {
            image: TotalUser,
            title: "Total Users",
            text: "New Customer",
            number: "2322",
            subNumb: "1888",
            link:"/",
            linkText: "View Details",
        },
        {
            image: ActiveUser,
            title: "Active Subscribers",
            text: "Premium",
            subText:"Family",
            number: "5012",
            subNumb: "2589",
            subNumb2: "2589",
            link:"/",
            linkText: "View Details",
        },
        {
            image: PostImpr,
            title: "Post Impressions",
            text: "Reads",
            subText:"Likes",
            number: "14.3k",
            subNumb: "7938",
            subNumb2: "4390",
            link:"/",
            linkText: "View Posts",

        },
        {
            image: TotalRec,
            title: "Total Recipes Published", 
            text: "vs Last month",
            number: "462",
            link:"/",
            linkText: "View Recipes",
        },
    ]



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
                            card.isPositive ? 'text-green-500' : 'text-red-500'
                        }`}
                        >
                        {card.percentage}
                        </span>
                    </div>

                    <a
                        href={card.link}
                        className="text-brand-muted font-medium text-xs flex items-center gap-2 hover:text-brand-secondary transition-colors cursor-pointer"
                    >
                        {card.linkText} <MoveRight size={16} />
                    </a>
                    </div>
                </div>
                </div>
            ))}




        {/* CARD 3 */}
        {/* <div
          className="bg-brand-white border border-brand-offwhite 
          rounded-2xl py-8 px-4 w-full h-50 flex flex-col justify-between items-start "
        >
          <div className="flex text-left gap-4 justify-start">
            <div className="">
              <img src={Completed} alt="image" />
            </div>
            <h3 className="text-brand-primary font-semibold font-park">
              Completed Today
            </h3>
          </div>

          <div className="">
            <h2 className="text-brand-primary font-bold text-4xl font-park ">
              {completedToday}
            </h2>
            {renderChange(adminDashboardData?.completedTodayChangePct)}
          </div>
        </div> */}

        {/* CARD 4 */}
        {/* <div
          className="bg-brand-white border border-brand-offwhite 
          rounded-2xl py-8 px-4 w-full h-50 flex flex-col justify-between items-start "
        >
          <div className="flex text-left gap-4 justify-start">
            <div className="">
              <img src={Leads} alt="image" />
            </div>
            <h3 className="text-brand-primary font-semibold font-park">
              Leads Delivered today
            </h3>
          </div>

          <div className="">
            <h2 className="text-brand-primary font-bold text-4xl font-park ">
              {leadsDeliveredToday}
            </h2>
            {renderChange(adminDashboardData?.leadsDeliveredTodayChangePct)}
          </div>
        </div> */}
    
    </section>
  );
};

export default Cards;





// data/dashboardCards.js

const recentSignups = [
  {
    id: 1,
    name: "Laila Bellisa",
    email: "bellisa@gmail.com",
    plan: "Premium Plan",
    date: "Nov 09, 2025",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 2,
    name: "Marcus Holt",
    email: "marcus.holt@email.com",
    plan: "Family Plan",
    date: "Nov 09, 2025",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 3,
    name: "Sophia Tran",
    email: "sophia.tran@example.com",
    plan: "Family Plan",
    date: "Nov 09, 2025",
    avatar: "https://i.pravatar.cc/100?img=48",
  },
  {
    id: 4,
    name: "Jasper Liu",
    email: "jasper.liu@domain.com",
    plan: "Premium Plan",
    date: "Nov 08, 2025",
    avatar: "https://i.pravatar.cc/100?img=56",
  },
];

const topRecipes = [
  {
    id: 1,
    title: "Avocado Toast",
    cooked: "12.4k cooked",
    saved: "3.8k saves",
    image: "https://source.unsplash.com/100x100/?avocado,toast",
    trend: "+8%",
    positive: true,
  },
  {
    id: 2,
    title: "Chia Pudding",
    cooked: "8.2k cooked",
    saved: "2.1k saves",
    image: "https://source.unsplash.com/100x100/?chia,pudding",
    trend: "+12%",
    positive: true,
  },
  {
    id: 3,
    title: "Quinoa Salad",
    cooked: "10.5k cooked",
    saved: "4.7k saves",
    image: "https://source.unsplash.com/100x100/?quinoa,salad",
    trend: "-4.2%",
    positive: false,
  },
  {
    id: 4,
    title: "Matcha Latte",
    cooked: "15.3k cooked",
    saved: "5.9k saves",
    image: "https://source.unsplash.com/100x100/?matcha,latte",
    trend: "+12%",
    positive: true,
  },
];

const topBlogs = [
  {
    id: 1,
    title: "5 Snacks for Energy During Workouts",
    metric: "12.4k views",
    image: "https://source.unsplash.com/100x100/?healthy,food",
    trend: "+8%",
    positive: true,
    type: "Blog",
  },
  {
    id: 2,
    title: "Healthy Smoothie Recipes",
    metric: "9.1k likes",
    image: "https://source.unsplash.com/100x100/?smoothie",
    trend: "+5%",
    positive: true,
    type: "Article",
  },
  {
    id: 3,
    title: "Top 10 Superfoods to Boost Immunity",
    metric: "14.2k views",
    image: "https://source.unsplash.com/100x100/?superfood",
    trend: "+10%",
    positive: true,
    type: "Blog",
  },
  {
    id: 4,
    title: "Quick Lunch Ideas for Busy Professionals",
    metric: "10.3k views",
    image: "https://source.unsplash.com/100x100/?lunch,meal",
    trend: "-4.2%",
    positive: false,
    type: "Blog",
  },
];

function Header({ title }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-dash font-semibold">{title}</h3>
      <button className="text-sm text-brand-secondary hover:underline font-medium">
        View All
      </button>
    </div>
  );
}



const DashboardCards = () => {
  return (
    <div  className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-4">
      <div className="bg-white rounded-2xl p-5  h-[320px] flex flex-col">
          <Header title="Recent Signups" />

          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4">
              {recentSignups.map((user) => (
              <div key={user.id} className="flex justify-between">
                  <div className="flex gap-3">
                  <img
                      src={user.avatar}
                      className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  </div>

                  <div className="text-right">
                  <p className="text-xs font-medium">{user.plan}</p>
                  <p className="text-xs text-gray-400">{user.date}</p>
                  </div>
              </div>
              ))}
          </div>
      </div>
      <div className="bg-white rounded-2xl p-5 h-[320px] flex flex-col">
          <Header title="Top Recipes" />

          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4">
              {topRecipes.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                  <div className="flex gap-3">
                  <img
                      src={item.image}
                      className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-400">
                      {item.cooked} • {item.saved}
                      </p>
                  </div>
                  </div>

                  <span
                  className={`text-xs font-medium ${
                      item.positive ? "text-green-500" : "text-red-500"
                  }`}
                  >
                  {item.trend}
                  </span>
              </div>
              ))}
          </div>
      </div>
      <div className="bg-white rounded-2xl p-5 h-[320px] flex flex-col">
          <Header title="Top Blog / Article Performance" />

          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4">
              {topBlogs.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                  <div className="flex gap-3">
                  <img
                      src={item.image}
                      className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                      <p className="text-sm font-medium line-clamp-1">
                      {item.title}
                      </p>
                      <p className="text-xs text-gray-400">
                      {item.type} • {item.metric}
                      </p>
                  </div>
                  </div>

                  <span
                  className={`text-xs font-medium ${
                      item.positive ? "text-green-500" : "text-red-500"
                  }`}
                  >
                  {item.trend}
                  </span>
              </div>
              ))}
          </div>
      </div>
    </div>
  )
}

export default DashboardCards
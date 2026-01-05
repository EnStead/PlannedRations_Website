import CardButtons from "../content/CardButton"
import Cards from "../content/Cards"
import DashboardCards from "../content/DashboardCards"
import UserGrowthChart from "../content/UserGrowthChart"
import UserSubscriptionChart from "../content/UserSubscriptionChart"

const Dashboard = () => {
  return (
    <section className="bg-brand-background1 min-h-screen p-10">
      <CardButtons/>
      <Cards/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UserGrowthChart />
        <UserSubscriptionChart />
      </div>
      <DashboardCards/>
    </section>
  )
}

export default Dashboard
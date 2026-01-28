import CardButtons from "../content/CardButton"
import Cards from "../content/Cards"
import DashboardCards from "../content/DashboardCards"
import DashboardCharts from "../content/DashboardCharts"
import UserGrowthChart from "../content/UserGrowthChart"
import UserSubscriptionChart from "../content/UserSubscriptionChart"

const Dashboard = () => {
  return (
    <section className="bg-brand-background1 min-h-screen p-10">
      <CardButtons/>
      <Cards/>
      <DashboardCharts/>
      <DashboardCards/>
    </section>
  )
}

export default Dashboard
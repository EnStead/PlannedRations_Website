import React, { useEffect, useState } from 'react'
import UserGrowthChart from './UserGrowthChart'
import UserSubscriptionChart from './UserSubscriptionChart'
import api from '../../../Utility/api'

const DashboardCharts = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await api.get("/admin/dashboard-chart");
        if (res.data.success) {
          setChartData(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard charts", error);
      }
    };
    fetchChartData();
  }, []);

  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UserGrowthChart totalSignups={chartData?.total_signups} activeSubscribers={chartData?.active_subscribers} />
        <UserSubscriptionChart analytics={chartData?.subscription_analytics} />
      </div>
  )
}

export default DashboardCharts
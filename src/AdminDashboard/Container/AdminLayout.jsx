import { Outlet } from 'react-router-dom'
import AdminNavbar from '../Container/AdminNavbar'
import { DashboardProvider } from '../Context/DashboardContext'

const AdminLayout = ({isScrolled}) => {
  return (
    <>
      <AdminNavbar />
      <DashboardProvider>
        <Outlet />
      </DashboardProvider>

    </>
  )
}

export default AdminLayout
import AdminNavbar from './AdminComponents/AdminNavbar'

const AdminLayout = ({isScrolled, children}) => {
  return (
    <>
      <AdminNavbar isScrolled={isScrolled} />
        <main>{children}</main>

    </>
  )
}

export default AdminLayout
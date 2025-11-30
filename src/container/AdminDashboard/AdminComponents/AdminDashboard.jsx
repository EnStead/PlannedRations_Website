import { Route, Routes } from "react-router-dom"
import AdminLayout from "../AdminLayout"
import AdminLogin from "./AdminLogin"
import Dashboard from "./pages/Dashboard"
import Ingredients from "./pages/Ingredients"
import Recipes from "./pages/Recipes"
import AddRecipes from "./pages/AddRecipes"


const AdminDashboard = ({isScrolled}) => {
  return (
    <>
        <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route
                path="/dashboard"
                element={
                    <AdminLayout isScrolled={isScrolled}>
                        <Dashboard  />
                    </AdminLayout>
                }
            />
            <Route
                path="/ingredients"
                element={
                    <AdminLayout isScrolled={isScrolled}>
                        <Ingredients  />
                    </AdminLayout>
                }
            />
            <Route
                path="/recipes"
                element={
                    <AdminLayout isScrolled={isScrolled}>
                        <Recipes  />
                    </AdminLayout>
                }
            />
            <Route
                path="/recipes/add-recipe"
                element={
                    <AdminLayout isScrolled={isScrolled}>
                        <AddRecipes  />
                    </AdminLayout>
                }
            />
        </Routes>
    </>
  )
}

export default AdminDashboard
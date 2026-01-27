import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Ingredients from "./pages/Ingredients";
import Recipes from "./pages/Recipes";
import AddRecipes from "./pages/AddRecipes";
import AdminRoute from "../Container/AdminRoute";
import ForgotPassword from "./pages/ForgotPassword";
import AuthLayout from "../Container/AuthLayout";
import ChangePassword from "./pages/ChangePassword";
import Users from "./pages/Users";
import AdminLayout from "../Container/AdminLayout";
import Posts from "./pages/Posts";
import CreatePosts from "./pages/CreatePosts";
import Tags from "./pages/Tags";

const AdminDashboard = ({ isScrolled }) => {
  return (
    <Routes>
      {/* PUBLIC ADMIN ROUTE */}
        {/* AUTH ROUTES */}
        <Route element={<AuthLayout />}>
            <Route path="/" element={<AdminLogin />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="change-password" element={<ChangePassword />} />
        </Route>

      {/* PROTECTED ADMIN ROUTES */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout isScrolled={isScrolled} />
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="ingredients" element={<Ingredients />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/add-recipe" element={<AddRecipes />} />
        <Route path="recipes/edit-recipe/:id" element={<AddRecipes />} />
        <Route path="users" element={<Users />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/create" element={<CreatePosts />} />
        <Route path="posts/edit/:id" element={<CreatePosts />} />
        <Route path="tags" element={<Tags />} />

      </Route>
    </Routes>
  );
};

export default AdminDashboard;

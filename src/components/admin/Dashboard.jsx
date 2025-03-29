import { Routes, Route } from "react-router-dom";
import Users from "./Users";
import CategoryPage from "../categories/categorypage";
import EditCategoryPage from "../categories/Editable";
import AdminDashboard from "../../pages/adminDashBoard";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex-1 bg-white p-6 m-4 rounded-xl">
      <Routes>
        <Route path="/" element={<AdminDashboard/>} />
        <Route path="users" element={<Users />} />
        <Route path="category" element={<CategoryPage />} />
        <Route path="edit-category" element={<EditCategoryPage />} />
      </Routes>
    </div>
  );
}

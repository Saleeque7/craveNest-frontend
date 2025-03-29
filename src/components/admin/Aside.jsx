import React, { useState, useEffect } from "react";
import { FiHome } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const [activeTask, setActiveTask] = useState("");
  const [showSubCategories, setShowSubCategories] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeTask) {
      setActiveTask("dashboard");
      navigate("/admin/home");
    }
  }, []);

  const handleNavigation = (task, route) => {
    setActiveTask(task);
    navigate(route);
  };

  return (
    <aside
      className={`bg-gray-600 rounded-lg m-4 mr-0 text-white w-14 transition-all duration-300 md:w-64`}
    >
      <div className="flex flex-col items-center md:items-start p-4">
        <ul className="space-y-6 pt-8">
          <li
            className={`flex items-center ${
              activeTask === "dashboard" ? "text-customPeach font-bold" : ""
            }`}
            onClick={() => handleNavigation("dashboard", "/admin/home")}
          >
            <FiHome className="mr-2" />
            <span className="hidden md:inline">Dashboard</span>
          </li>

          <li
            className={`flex items-center ${
              activeTask === "users" ? "text-customYellow font-bold" : ""
            }`}
            onClick={() => handleNavigation("users", "/admin/home/users")}
          >
            <FaUsers className="mr-2" />
            <span className="hidden md:inline">Users</span>
          </li>

          <li
            className={`flex items-center cursor-pointer ${
              activeTask === "categories" ? "text-customYellow font-bold" : ""
            }`}
            onClick={() => setShowSubCategories(!showSubCategories)}
          >
            <IoFastFoodOutline className="mr-2" />
            <span className="hidden md:inline">Categories</span>
          </li>

        
          {showSubCategories && (
            <ul className="ml-6 space-y-4">
              <li
                className={`flex items-center ${
                  activeTask === "view_categories" ? "text-customYellow font-bold" : ""
                }`}
                onClick={() => handleNavigation("view_categories", "/admin/home/category")}
              >
                <span className="hidden md:inline">View Categories</span>
              </li>

              <li
                className={`flex items-center ${
                  activeTask === "edit_categories" ? "text-customYellow font-bold" : ""
                }`}
                onClick={() => handleNavigation("edit_categories", "/admin/home/edit-category")}
              >
                <span className="hidden md:inline">Edit/Delete Categories</span>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;

import React, { useState, memo } from "react";
import { FaUser , FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../helpers/redux/adminSlice";
import { FiLogOut } from "react-icons/fi";
export default memo(function AdminNavbar({ admin}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dispatch = useDispatch()
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="flex justify-between h-16 items-center px-4 sm:px-6 lg:px-32">
          <div className="flex items-center">
            <span className="text-xl text-primary font-bold shadow-2xl">
              craveNest
            </span>
          </div>

          {admin && (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <span className="text-hover-primary flex items-center">
                  Welcome, {admin.name} <IoMdArrowDropdown size={20} className="ml-1" />
                </span>
              </div>

              {isDropdownOpen && (
               <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
               <ul className="py-2">
                
                 <li
                   className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                   onClick={() => dispatch(adminLogout())}
                 >
                   <FiLogOut size={18} />
                   Logout
                 </li>
               </ul>
             </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
});

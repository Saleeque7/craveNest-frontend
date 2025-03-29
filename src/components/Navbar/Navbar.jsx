import React, { useState, useEffect, useRef, memo } from "react";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { userLogout } from "../../helpers/redux/slices";
import { FiLogOut } from "react-icons/fi";

export default memo(function Navbar({ handleSignIn, user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="flex justify-between h-16 items-center px-4 sm:px-6 lg:px-32">
          <div className="flex items-center">
            <span className="text-xl text-primary font-bold shadow-2xl">
              craveNest
            </span>
          </div>

          {user ? (
            <div className="relative">
              <div
                ref={buttonRef}
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <span className="text-hover-primary flex items-center">
                  Welcome, {user.name}{" "}
                  <IoMdArrowDropdown size={20} className="ml-1" />
                </span>
              </div>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10"
                >
                  <ul className="py-2">
                    <li
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => console.log("Profile Clicked")}
                    >
                      <FaUserCircle size={18} />
                      Profile
                    </li>
                    <li
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => dispatch(userLogout())}
                    >
                      <FiLogOut size={18} />
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div
              className="relative flex items-center h-20 cursor-pointer pl-7 group"
              onClick={handleSignIn}
            >
              <span className="absolute top-1/2 left-0 transform -translate-y-1/2 leading-none text-hover-primary">
                <FaUser size={19} />
              </span>
              <span className="text-hover-primary">Sign In</span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
});

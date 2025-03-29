import React, { useEffect, useRef, useState } from "react";
import { FaTimes, FaUserEdit } from "react-icons/fa";
import { userInstance } from "../../helpers/api/inteceptors";
import { Flip, Slide, toast } from "react-toastify";
import Avatar from "../helper/defaultImage";
import { setUserInfo } from "../../helpers/redux/slices";
import { useDispatch } from "react-redux";

export default function UserProfile({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(user);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const contentRef = useRef(null);

  useEffect(() => {
    setEditedData(user);
  }, [user]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailVerification = async () => {
    try {
      const response = await userInstance.post("/send-email-verification", {
        email: editedData.email,
      });

      if (response.data && response.data.success) {
        toast.info("Verification email sent. Please check your inbox.", {
          transition: Slide,
        });
        setIsOtpSent(true);
      } else {
        toast.error("Failed to send verification email.", { transition: Flip ,  autoClose: 1000, });
      }
    } catch (error) {
      toast.error("Error sending verification email.", { transition: Flip ,  autoClose: 1000, });
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await userInstance.post("/verify-otp", {
        email: editedData.email,
        otp,
      });

      if (response.data && response.data.success) {
        toast.success("Email verified successfully!", { transition: Slide ,  autoClose: 1000, });
        setIsEmailVerified(true);
        setIsOtpSent(false);
      } else {
        setIsOtpSent(false);
        toast.error("Invalid OTP. Please try again.", { transition: Flip , autoClose: 1000, });
      }
    } catch (error) {
      setIsOtpSent(false);
      console.error(error, "error in submitting form");
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(message, {
          transition: Flip,
          autoClose: 1000,
        });
        console.log("An unexpected error occurred.", error.response.data);
      }
    }
  };

  const handleSave = async () => {
    if (editedData.email !== user.email && !isEmailVerified) {
      await handleEmailVerification();
      return;
    }

    try {
      const response = await userInstance.post("/update-profile", editedData);
      if (response.data && response.data.success && response.data.user) {
        toast.success("Profile updated successfully!", { transition: Slide });
        setEditedData(response.data.user);
        dispatch(setUserInfo(response.data.user));
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Failed to update profile.", { transition: Flip });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div
        className="bg-white rounded-l-2xl shadow-xl w-[350px] p-6 h-full relative space-y-8"
        ref={contentRef}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <div className="flex flex-col items-center space-y-4">
          <Avatar name={user.name} size={96} />

          {isEditing ? (
            <div className="space-y-4 w-full">
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Email"
              />

              {editedData.email !== user.email && !isEmailVerified && (
                <>
                  <button
                    onClick={handleEmailVerification}
                    className="bg-yellow-500 text-white w-full p-2 rounded-md hover:bg-yellow-600"
                    disabled={isOtpSent}
                  >
                    Verify Email
                  </button>

                  {isOtpSent && (
                    <div className="flex flex-col space-y-2">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter OTP"
                      />
                      <button
                        onClick={handleOtpVerification}
                        className="bg-blue-500 text-white w-full p-2 rounded-md hover:bg-blue-600"
                      >
                        Verify OTP
                      </button>
                    </div>
                  )}
                </>
              )}

              <button
                onClick={handleSave}
                className={`w-full p-2 rounded-md ${
                  editedData.email !== user.email && !isEmailVerified
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                disabled={editedData.email !== user.email && !isEmailVerified}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <button
                onClick={handleEditToggle}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md flex items-center space-x-2 hover:bg-blue-600"
              >
                <FaUserEdit />
                <span>Edit Profile</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

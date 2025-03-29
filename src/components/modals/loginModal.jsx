import React, { memo, useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { userApi } from "../../helpers/api/axioscall";
import { Flip, Slide, toast } from "react-toastify";
import { setUserInfo ,setAuthenticate } from "../../helpers/redux/slices";
import { useDispatch } from "react-redux";

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const [currentState, setCurrentState] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setotp] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const contentRef = useRef(null);
  const dispatch  = useDispatch()
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response =  await userApi.post('signin',{ username })
      const token = response?.data?.accessToken
      if (response.data && response.data.success && token) {
        toast.success(response.data.message, {
          transition: Slide,
          autoClose: 1000,
        });
        onClose();
        console.log(response.data);
        
        localStorage.setItem("userTokenKey",token);
        dispatch(setUserInfo(response.data.user));
        dispatch(setAuthenticate());
        
      
      }
    } catch (error) {
      console.error(error, "error in submitting form");
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(message, {
          transition: Flip,
          autoClose: 2000,
        });
        console.log("An unexpected error occurred.", error.response.data);
      }
    }
  };

  const handleRegisteration = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email };
      const response = await userApi.post("/register", userData);
      if (response.data && response.data.success) {
        toast.success("please enter otp", {
          transition: Slide,
          autoClose: 1000,
        });
        setShow(!show);
      }
    } catch (error) {
      console.error(error, "error in submitting form");
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(message, {
          transition: Flip,
          autoClose: 2000,
        });
        console.log("An unexpected error occurred.", error.response.data);
      }
    }
  };

  const handleOtpverify = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, otp };
      const response = await userApi.post("/verify", userData);
      const token = response?.data?.accessToken
      if (response.data && response.data.success && token) {
        toast.success(response.data.message, {
          transition: Slide,
          autoClose: 1000,
        });
        localStorage.setItem("userTokenKey",token);
        dispatch(setUserInfo(response.data.user));
        dispatch(setAuthenticate());
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error(error, "error in submitting form");
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(message, {
          transition: Flip,
          autoClose: 2000,
        });
        console.log("An unexpected error occurred.", error.response.data);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50 ">
      <div
        className="bg-white rounded-l-2xl shadow-xl w-[550px] items-start p-6 h-full relative space-y-8 "
        ref={contentRef}
      >
        <div className="flex justify-between">
          <div>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={onClose}
              aria-label="Close"
              aria-required="true"
            >
              <FaTimes size={20} />
            </button>

            <div className="flex justify-between items-center  pt-20 ">
              <div>
                <h2 className="text-3xl font-semibold text-start mb-4">
                  {currentState === "login" ? "Login" : "Sign up"}
                </h2>

                <p className="text-start text-gray-500 mb-6">
                  or{" "}
                  <a
                    className="text-primary hover:underline cursor-pointer"
                    onClick={
                      currentState === "login"
                        ? () => setCurrentState("signup")
                        : () => setCurrentState("login")
                    }
                  >
                    {currentState === "login"
                      ? "create an account"
                      : "Login to your accont"}
                  </a>
                </p>
              </div>

              <div className="flex jutufy-center items-center">
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                  alt="Login Illustration"
                  className="w-24 h-24"
                />
              </div>
            </div>

            {currentState === "login" ? (
              <form onSubmit={handleLogin}>
                <div className="mb-4 ">
                  <label htmlFor="mobile" className="block text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={username}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none ring-secondary"
                    placeholder="Enter your Email"
                    autoComplete="on"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg bg-hover-primary transition-all cursor-pointer"
                >
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={show ? handleOtpverify : handleRegisteration}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    readOnly={show}
                    className={`w-full px-4 py-2 border ${
                      show
                        ? "bg-gray-200 cursor-not-allowed"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none ring-secondary`}
                    placeholder="Enter your Name"
                    autoComplete="on"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    readOnly={show}
                    className={`w-full px-4 py-2 border ${
                      show
                        ? "bg-gray-200 cursor-not-allowed"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none ring-secondary`}
                    placeholder="Enter your Email"
                    autoComplete="on"
                  />
                </div>

                {show && currentState === "signup" && (
                  <div className="mb-4">
                    <label htmlFor="otp" className="block text-gray-700 mb-1">
                      Onetime password
                    </label>
                    <input
                      type="password"
                      id="otp"
                      value={otp}
                      name="otp"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none ring-secondary"
                      placeholder="Enter your Otp"
                      autoComplete="on"
                      onChange={(e) => setotp(e.target.value)}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg bg-hover-primary transition-all cursor-pointer"
                >
                  {show ? "verify" : "Sign up"}
                </button>
              </form>
            )}

            <p className="text-center text-sm text-gray-500 mt-4">
              By clicking on Login, I accept the{" "}
              <a
                href="/terms-and-conditions"
                className="font-semibold hover:underline"
              >
                Terms & Conditions
              </a>{" "}
              &{" "}
              <a
                href="/privacy-policy"
                className="font-semibold hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
          <div className="pl-20"></div>
        </div>
      </div>
    </div>
  );
}

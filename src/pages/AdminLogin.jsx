import React, { useState } from "react";
import LoginImage from "../assets/bg.avif";
import PageBackground from "../assets/Login.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, Slide, Flip } from "react-toastify";
import { adminApi } from "../helpers/api/axioscall";
import { setAdminInfo, setAuthenticated } from "../helpers/redux/adminSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await adminApi.post("/adminLogin", { email });
      const accessToken = response.data.token;
      if (response.data && response.data.success) {
        toast.success("login successfull", {
          transition: Slide,
          autoClose: 1000,
        });
        setTimeout(() => {
          setLoading(false);
          localStorage.setItem("accessTokenAdmin", accessToken);
          dispatch(setAdminInfo(response.data.admin));
          dispatch(setAuthenticated());
          navigate("/admin/home");
        }, 2000);
      }
    } catch (error) {
      console.error(error, "error in submitting form");
      if (error.response && error.response.data) {
        setLoading(false);
        const { message } = error.response.data;
        toast.error(message, {
          transition: Flip,
          autoClose: 1000,
        });
        console.log("An unexpected error occurred.", error.response.data);
      }
    }
  };

  return (
    <div
      className="login min-h-screen relative"
      style={{
        backgroundImage: `url(${PageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute left-0 top-0 w-1/2 min-h-screen z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${LoginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col gap-7 p-12 text-white w-full max-w-md">
            <h1 className="text-5xl mb-2 mt-3  font-serif text-start">Login</h1>
            <form className="flex flex-col gap-5" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email"
                className="border-b border-gray-300 px-5 py-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex justify-end items-center">
                <button
                  className="w-1/2 px-4 py-2 bg-primary font-bold cursor-pointer rounded-lg"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="inline-flex items-center">
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-2 text-white animate-spin dark:text-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..."
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-white text-sm ">Loading...</span>
                    </div>
                  ) : (
                    <span className="text-white">Login</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

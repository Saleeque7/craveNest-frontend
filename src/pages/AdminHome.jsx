import React from "react";
import AdminNavbar from "../components/admin/AdminNavbar";
import Aside from "../components/admin/Aside";
import Dashboard from "../components/admin/Dashboard";
import PageBackground from "../assets/Login.jpg";
import { useSelector } from "react-redux";

export default function AdminHome() {
  const admin = useSelector((state) => state.persisted.admin.admin) || null;

  return (
    <>
      <AdminNavbar admin={admin} />
      <div
        className="min-h-screen bg-black flex flex-row "
        style={{
          backgroundImage: `url(${PageBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Aside className="w-full md:w-1/4 " />
        <Dashboard className="flex-grow" />
      </div>
    </>
  );
}

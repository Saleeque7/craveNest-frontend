import React, { useEffect, useState } from "react";
import { adminApi } from "../../helpers/api/axioscall";
import { useSelector } from "react-redux";

export default function Users() {
  const loggeduser =
    useSelector((state) => state.persisted.admin.admin) || null;
  const [users, setUsers] = useState([]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await adminApi.put(`/users/${userId}/role`, {
        isAdmin: newRole === "Admin",
      });
      if (response.data.success) {
        setUsers(
          users.map((user) =>
            user._id === userId
              ? { ...user, isAdmin: newRole === "Admin" }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminApi.get("/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto p-10">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Management</h1>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-4 py-3 text-center">S/N</th>
              <th className="border px-4 py-3 text-center">Name</th>
              <th className="border px-4 py-3 text-center">Email</th>
              <th className="border px-4 py-3 text-center">User Type</th>
              <th className="border px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-100 transition duration-200`}
              >
                <td className="border px-4 py-3 text-center">{index + 1}</td>
                <td className="border px-4 py-3 text-center">{user.name}</td>
                <td className="border px-4 py-3 text-center">{user.email}</td>
                <td
                  className={`border px-4 py-3 text-center font-medium ${
                    user.isAdmin ? "text-green-600" : "text-blue-600"
                  }`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </td>

                <td className="border px-4 py-3 text-center">
                  <select
                    value={user.isAdmin ? "Admin" : "User"}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                    className={`bg-gray-200 text-black px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      user._id === loggeduser?._id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={user._id === loggeduser?._id}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

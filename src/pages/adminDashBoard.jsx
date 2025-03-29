import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ShoppingBag, User, Utensils } from 'lucide-react';

const data = [
  { name: 'Jan', orders: 400, revenue: 2400 },
  { name: 'Feb', orders: 300, revenue: 2210 },
  { name: 'Mar', orders: 200, revenue: 2290 },
  { name: 'Apr', orders: 278, revenue: 2000 },
  { name: 'May', orders: 189, revenue: 2181 },
  { name: 'Jun', orders: 239, revenue: 2500 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-2xl shadow-md flex items-center gap-4">
          <ShoppingBag className="h-10 w-10" />
          <div>
            <p className="text-lg font-semibold">Total Orders</p>
            <p className="text-2xl font-bold">1,245</p>
          </div>
        </div>

        <div className="bg-green-500 text-white p-4 rounded-2xl shadow-md flex items-center gap-4">
          <Utensils className="h-10 w-10" />
          <div>
            <p className="text-lg font-semibold">Total Items</p>
            <p className="text-2xl font-bold">567</p>
          </div>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded-2xl shadow-md flex items-center gap-4">
          <User className="h-10 w-10" />
          <div>
            <p className="text-lg font-semibold">Total Users</p>
            <p className="text-2xl font-bold">3,210</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Revenue & Orders</h2>
        <BarChart width={500} height={300} data={data} className="w-full">
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#4F46E5" name="Orders" />
          <Bar dataKey="revenue" fill="#22C55E" name="Revenue" />
        </BarChart>
      </div>

     
    </div>
  );
}
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const backendurl = "http://localhost:5000";

const ClientDashboard = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendurl}/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const result = response.data;
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Header />

        <div className="p-8">
          {/* User Info Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center gap-12 hover:shadow-2xl transition-all duration-300">
            {/* Left Side - Image */}
            <div>
              <img
                src={
                  userData?.user?.client?.image ||
                  "https://i.ibb.co/SncFf7G/user.png"
                }
                alt="Profile"
                className="w-56 h-56 rounded-full border-4 border-blue-500 object-cover"
              />
            </div>

            {/* Right Side - Details */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800">
                {userData?.user?.name}
              </h2>
              <p className="text-xl text-gray-600">
                📧 {userData?.user?.email}
              </p>
              <p className="text-xl text-blue-600 font-semibold">
                🔖 Role: {userData?.user?.role}
              </p>

              {/* Total Users */}
              <div className="flex gap-6">
                <Link to={"/client/users"}>
                  <div className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-all cursor-pointer">
                    🙍‍♂️ Total Users:{" "}
                    <span className="font-bold">{data?.length || 0}</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
const backendurl = "http://localhost:5000";

const TotalUsers = () => {
  const token = localStorage.getItem("superAdmin");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendurl}/users/getall`, {
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
  console.log(data, "gagaga");
  return (
    <div className="flex gap-4">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 h-[calc(100vh-10px)] overflow-y-auto pr-4">
        <div className="grid  grid-cols-3  overflow-hidden  gap-10">
          {data &&
            data.map((item, index) => (
              // card
              <div
                className="w-80 h-auto border cursor-pointer border-gray-200 rounded-2xl shadow-md bg-white p-5 hover:shadow-xl hover:scale-105 transition-all duration-300"
                key={index}
              >
                {/* Image */}
                <div className="flex justify-center">
                  <img
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8unA88y453WxwRtI5brdcCA6_tMFnMx6uQ&s"
                    alt="client"
                  />
                </div>

                {/* Info */}
                <div className="mt-5 space-y-2">
                  <p className="text-xl font-bold text-gray-800 text-center">
                    👤 {item.name}
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    ✨ Client:{" "}
                    <span className="font-semibold">{item.client.name}</span>
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    📧 Email:{" "}
                    <span className="font-semibold">{item.email}</span>
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    🏢 Created By:{" "}
                    <span className="font-semibold">{item.client.name}</span>
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    🔑 Super Admin:{" "}
                    <span className="font-semibold">
                      {item.client.superAdmin_id.name}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TotalUsers;

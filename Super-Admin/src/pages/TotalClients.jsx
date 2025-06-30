import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
const backendurl = "http://localhost:5000";

const TotalClients = () => {
  const token = localStorage.getItem("superAdmin");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendurl}/clients/`, {
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
    <div className="flex gap-4">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex gap-10">
          {data &&
            data.map((item, index) => (
              // card
              <div
                className="w-80 h-auto border rounded-2xl shadow-lg bg-white p-4 hover:shadow-2xl transition-all duration-300"
                key={index}
              >
                <div className="flex justify-center">
                  <img
                    className="w-40 h-40  "
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8unA88y453WxwRtI5brdcCA6_tMFnMx6uQ&s"
                    alt="client"
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-lg font-semibold text-gray-800">
                    👤 Client Name:{" "}
                    <span className="font-normal">{item.name}</span>
                  </p>
                  <p className="text-gray-600">
                    📧 Email: <span className="font-medium">{item.email}</span>
                  </p>
                  <p className="text-gray-600">
                    🏢 Created By:{" "}
                    <span className="font-medium">
                      {item.superAdmin_id.name}
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

export default TotalClients;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
const backendurl = "http://localhost:5000";

const ClientUsers = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
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
    console.log(data, "gagaga");
    return (
      <div className="flex ">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 h-[calc(100vh-10px)] overflow-y-auto pr-4">
          <Header />
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
                      src={item.image}
                      alt="client"
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-5 space-y-2">
                    <p className="text-xl font-bold text-gray-800 text-center">
                      👤 {item.name}
                    </p>
                    <p className="text-sm text-gray-600 text-center">
                      ⭐ Role:{" "}
                      <span className="font-semibold">{item.role}</span>
                    </p>
                   

                    {item.superAdmin_id ? (
                      <p className="text-sm text-gray-600 text-center">
                        ✨ Super-Admin:{" "}
                        <span className="font-semibold">
                          {item.client.name}
                        </span>
                      </p>
                    ) : item.client ? (
                      <p className="text-sm text-gray-600 text-center">
                        ✨ Client:{" "}
                        <span className="font-semibold">
                          {item.client.name}
                        </span>
                      </p>
                    ) : (
                      ""
                    )}
                    <p className="text-sm text-gray-600 text-center">
                      📧 Email:{" "}
                      <span className="font-semibold">{item.email}</span>
                    </p>
                    {item.superAdmin_id ? (
                      <p className="text-sm text-gray-600 text-center">
                        🏢 Created By:{" "}
                        <span className="font-semibold">
                          {item.superAdmin_id.name}
                        </span>
                      </p>
                    ) : item.client ? (
                      <p className="text-sm text-gray-600 text-center">
                        🏢 Created By:{" "}
                        <span className="font-semibold">
                          {item.client.name}
                        </span>
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
}

export default ClientUsers
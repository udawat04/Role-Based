import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const backendurl = "http://localhost:5000";

const ClientUsers = () => {
  const token = localStorage.getItem("token");
  const {user} = JSON.parse(localStorage.getItem("data"))
  const [data, setData] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendurl}/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const genOtp = async (id) => {
    try {
      setLoadingUserId(id);

      const response = await axios.post(
        `${backendurl}/users/otp/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("OTP sent:", response.data);

      // Optional short delay before navigation
      setTimeout(() => {
        navigate("/users/forget-password");
      }, 1000);
    } catch (error) {
      console.error("Error generating OTP:", error);
      alert("Failed to generate OTP. Please try again.");
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 h-[calc(100vh-10px)] overflow-y-auto pr-4">
        <Header />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-4">
          {data &&
            data.map((item, index) =>
              item.role !== "client" && item.role !== "admin" ? (
                <div
                  className="w-full h-auto border border-gray-200 rounded-2xl shadow-md bg-white p-5 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  key={index}
                >
                  <div className="flex justify-center">
                    <img
                      className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                      src={item.image}
                      alt="client"
                    />
                  </div>

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

                   {user.role==="admin"? <div>
                      <button
                        onClick={() => genOtp(item._id)}
                        disabled={loadingUserId === item._id}
                        className={`w-full mt-4 ${
                          loadingUserId === item._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                        } text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg`}
                      >
                        {loadingUserId === item._id ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              ></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          "🔄 Change Password"
                        )}
                      </button>
                    </div>
                    :""
                    }
                  </div>
                </div>
              ) : null
            )}
        </div>
      </div>
    </div>
  );
};

export default ClientUsers;

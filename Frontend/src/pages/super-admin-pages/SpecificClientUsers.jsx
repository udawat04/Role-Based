import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const backendurl = "http://localhost:5000";

const SpecificClientUsers = () => {
  const [userData, setUserData] = useState([]);
  const [allStaff, setAllStaff] = useState([]);

  const location = useLocation();
  const token = localStorage.getItem("token");

  const queryParams = new URLSearchParams(location.search);
  const indexes = parseInt(queryParams.get("index")); // 🔥 Convert index string to number

  console.log("Index 👉", indexes);

  // ✅ Fetching Data
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
        console.log("All Users 👉", result.allStaff);
        setUserData(result.allStaff);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong");
        }
      }
    };
    fetchData();
  }, []);

  // ✅ Filtering Staff
  useEffect(() => {
    const staff = userData.map((group) =>
      group.filter(
        (item) =>
          item.role === "admin" ||
          item.role === "HR" ||
          item.role === "trainer" ||
          item.role === "sub-admin"
      )
    );
    setAllStaff(staff);
  }, [userData]);

  console.log("All Staff 👉", allStaff);

  const currentStaff = allStaff[indexes] || [];

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 h-[calc(100vh-10px)] overflow-y-auto pr-4">
        <Header />
        <div className="grid grid-cols-3 gap-10 p-8">
          {currentStaff.length > 0 ? (
            currentStaff.map((item, index) => (
              <div
                key={index}
                className="w-80 h-auto border cursor-pointer border-gray-200 rounded-2xl shadow-md bg-white p-5 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {/* Image */}
                <div className="flex justify-center">
                  <img
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                    src={
                      item.image ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={item.name}
                  />
                </div>

                {/* Info */}
                <div className="mt-5 space-y-2">
                  <p className="text-xl font-bold text-gray-800 text-center">
                    👤 {item.name}
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    ⭐ Role: <span className="font-semibold">{item.role}</span>
                  </p>
                  {item.client && (
                    <p className="text-sm text-gray-600 text-center">
                      ✨ Client:{" "}
                      <span className="font-semibold">{item.client.name}</span>
                    </p>
                  )}
                  <p className="text-sm text-gray-600 text-center">
                    📧 Email:{" "}
                    <span className="font-semibold">{item.email}</span>
                  </p>
                  {item.client && (
                    <p className="text-sm text-gray-600 text-center">
                      🏢 Created By:{" "}
                      <span className="font-semibold">{item.client.name}</span>
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-xl font-semibold text-center col-span-3 text-gray-600">
              🚫 No staff found for this client.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecificClientUsers;

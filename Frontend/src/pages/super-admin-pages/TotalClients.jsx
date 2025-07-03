import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
const backendurl = "http://localhost:5000";

const TotalClients = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [userData,setUserData] = useState([])
  const [allStaff,setAllStaff] = useState([])
  const [allStudent,setAllStudent] = useState([])
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
        console.log(`rrrrrrrr`,result.result);
        console.log(`>>>>>>>>>`,result.allStaff);
        setData(result.result);
        setUserData(result.allStaff)
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.response) {
          console.log("[Response Data]:", error.response.data);
          alert(error.response.data);
        }  else {
          console.log("[Axios Config Error]:", error.message);
        }
      }
    };

    fetchData();
  }, []);

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

    const student = userData.map((group) =>
      group.filter((item) => item.role === "student")
    );
    setAllStudent(student);
  }, [userData]);
  
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <div className="grid grid-cols-3 gap-2">
          {data &&
            data.map((item, index) => (
              // card
              <Link to={`/super-admin/specific-client/${item._id}`} key={index}>
                <div className="w-90 h-auto border rounded-2xl shadow-lg bg-white p-4 hover:shadow-2xl transition-all duration-300">
                  <div className="flex justify-center">
                    <img
                      className="w-40 h-40  "
                      src={item.image}
                      alt="client"
                    />
                  </div>

                  <div className="mt-4 space-y-2">
                    <p className="text-lg font-semibold text-gray-800">
                      👤 Client Name:{" "}
                      <span className="font-normal">{item.name}</span>
                    </p>
                    <p className="text-gray-600">
                      📧 Email:{" "}
                      <span className="font-medium">{item.email}</span>
                    </p>
                    <p className="text-gray-600">
                      🏢 Created By:{" "}
                      <span className="font-medium">
                        {item.superAdmin_id.name}
                      </span>
                    </p>

                    <div className="flex justify-around ">
                      <Link
                        to={`/super-admin/specific-client-users?index=${index}`}
                        key={index}
                      >
                        <button className=" px-6 py-2 cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-xl transition-all">
                          👥 Staff - {allStaff[index]?.length || 0}
                        </button>
                      </Link>

                      <button className="px-6 py-2 cursor-pointer rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 shadow-md hover:shadow-xl transition-all">
                        🎓 Students - {allStudent[index]?.length || 0}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TotalClients;

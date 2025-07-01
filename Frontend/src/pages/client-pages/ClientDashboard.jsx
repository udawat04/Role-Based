import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';
const backendurl = "http://localhost:5000";

const ClientDashboard = () => {
   const [data, setData] = useState([]);
      const token = localStorage.getItem("token");
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
  
      console.log(data.length,"datatad")
  return (
    <div className="flex ">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <Link to={"/client/users"}>
          <div className="w-80 m-10 cursor-pointer  h-auto  border rounded-2xl shadow-lg bg-white p-4 hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center">
              <img
                className="w-40 h-40  "
                src="https://static.vecteezy.com/system/resources/thumbnails/022/705/701/small/customer-care-icon-management-support-and-help-client-illustration-symbol-patient-assistance-sign-or-logo-vector.jpg"
                alt="client"
              />
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-2xl text-center font-semibold text-gray-800">
                👤 Total Users
              </p>
              <p className="text-2xl text-center font-semibold text-gray-800">
                {data && data.length}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ClientDashboard
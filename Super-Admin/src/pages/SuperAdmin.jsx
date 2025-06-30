
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'
import axios from 'axios';
const backendurl = "http://localhost:5000";

const SuperAdmin = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem("superAdmin");
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

    console.log(data.length,"datatad")
  return (
    <div className="flex gap-10">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="w-80  h-auto  border rounded-2xl shadow-lg bg-white p-4 hover:shadow-2xl transition-all duration-300">
          <div className="flex justify-center">
            <img
              className="w-40 h-40  "
              src="https://static.vecteezy.com/system/resources/thumbnails/022/705/701/small/customer-care-icon-management-support-and-help-client-illustration-symbol-patient-assistance-sign-or-logo-vector.jpg"
              alt="client"
            />
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-2xl text-center font-semibold text-gray-800">
              👤 Total Clients 
            </p>
            <p className="text-2xl text-center font-semibold text-gray-800">
              {data && data.length} 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdmin
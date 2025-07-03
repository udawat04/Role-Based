import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
const backendurl = "http://localhost:5000";

const ShowBatch = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendurl}/batches/`, {
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
              <div
                key={index}
                className="relative group w-full cursor-pointer max-w-sm border border-gray-200 rounded-xl shadow-lg bg-white p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
              >
                {/* Profile Image */}
                <div className="flex justify-center">
                  <img
                    src={
                      item.image
                        ? item.image
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            item.batchName
                          )}&background=random`
                    }
                    alt={item.batchName}
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-md"
                  />
                </div>

                {/* Course Info */}
                <div className="mt-4 text-center space-y-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    📘 {item.course.courseName} <span className="ml-2">{item.batchName}</span>
                  </h3>

                  <p className="text-sm text-gray-600">
                    🧑 Created By:{" "}
                    <span className="font-semibold text-gray-800">
                      {item.user?.name}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600">
                    💼 Role:{" "}
                    <span className="inline-block bg-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded-md">
                      {item.user?.role}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    🔖 Course-Name:{" "}
                    <span className="inline-block bg-amber-100 text-indigo-600 font-semibold px-2 py-0.5 rounded-md">
                      {item.course?.courseName}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600">
                    🏢 Client:{" "}
                    <span className="inline-block bg-green-100 text-green-600 font-semibold px-2 py-0.5 rounded-md">
                      {item.client?.name}
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

export default ShowBatch;

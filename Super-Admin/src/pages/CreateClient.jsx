import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const backendurl = "http://localhost:5000";

const CreateClient = () => {
 
  const token = localStorage.getItem("superAdmin");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
        const response = await axios.post(
          `${backendurl}/clients/create`,
          { name, email, password },
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Add token here
              "Content-Type": "application/json",
            },
          }
        );

      console.log("[✅ Signup Response]:", response.data);

      if (response.status === 200) {
        toast.success(response.data.message || "Signup Successful");
        
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("❌ Error occurred in Signup API call");
      console.log("[Error Object]:", error);

      if (error.response) {
        console.log("[Backend Error Response]:", error.response);
        console.log("[Status Code]:", error.response.status);
        console.log("[Response Data]:", error.response.data);
      } else if (error.request) {
        console.log("[No Response Received]:", error.request);
      } else {
        console.log("[Axios Config Error]:", error.message);
      }

      toast.error(
        error?.response?.data?.message || "Signup error, try again later"
      );
    }
  };

  return (
    <div className="flex gap-4">
      <div>
        <Sidebar />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-green-300">
          <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
            <h2 className="text-3xl font-semibold text-white text-center mb-6">
              Client Signup
            </h2>

            <form onSubmit={onSubmitHandler}>
              {/* Name */}
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} alt="user icon" />
                <input
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="bg-transparent outline-none w-full"
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.mail_icon} alt="mail icon" />
                <input
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="bg-transparent outline-none w-full"
                  type="email"
                  placeholder="Email Id"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock_icon} alt="lock icon" />
                <input
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="bg-transparent outline-none w-full"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium"
              >
                Signup
              </button>
            </form>

            {/* <div className="text-center mt-5 text-gray-400 text-xs">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-400 font-bold text-sm cursor-pointer underline"
          >
            Login
          </Link>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClient;

import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const backendurl = "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

    try {
      let response;
      let data;

      // ✅ Frontend Field Validation

      if (!formData.email || !formData.password) {
        toast.error("All fields (Email, Password) are required");
        return;
      }

      response = await axios.post(`${backendurl}/users/login`, {
        email: formData.email,
        password: formData.password,
        
      });

      data = response.data;
      console.log("[✅ Response Data]:", data);
      console.log("[✅ Token Data]:", data.token);
      console.log("[✅ Token Data]:", data.user.role);

      if (response.status === 200) {
        localStorage.setItem("token",data.token)
        localStorage.setItem("data",JSON.stringify(data))
        alert("success")
        toast.success(data.message || "Success");
        if(data.user.role==="superAdmin"){

          navigate("/super-admin");
        }
        else if(data.user.role==="client"){
          navigate("/client");
        }
        else{
          navigate("/users");
        }
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      // ✅ Detailed Axios/Backend Error Logging
      console.error("❌ Error occurred in API call");
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

      // ✅ Friendly error toast for UI
      const message =
        error?.response?.data?.message ||
        "Server error, please try again later";
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-green-300">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-2xl font-semibold text-white text-center mb-8">
          Login Into Your Account
        </h2>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
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

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="bg-transparent outline-none w-full"
              type="password"
              placeholder="Password"
              autoComplete="password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r cursor-pointer from-indigo-500 to-indigo-900  hover:from-indigo-300 hover:to-indigo-100 hover:text-blue-950 text-white font-medium"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-gray-400 text-xs">
          <div className="text-lg mt-5">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-blue-400 font-bold text-lg cursor-pointer underline"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

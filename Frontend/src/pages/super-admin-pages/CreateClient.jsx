import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const backendurl = "http://localhost:5000";

const CreateClient = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("name", name);
    dataToSend.append("email", email);
    dataToSend.append("password", password);
    if (image) {
      dataToSend.append("image", image);
    }

    try {
      const response = await axios.post(
        `${backendurl}/clients/create`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Signup Successful");
        navigate("/super-admin/total-clients");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("❌ Error occurred in Signup API call", error);
      toast.error(
        error?.response?.data?.message || "Signup error, try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex ">
      <Sidebar />

      <div className="flex-1">
        <Header />

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
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
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

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block mb-2 text-indigo-200">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-600 file:text-white
                  hover:file:bg-indigo-700"
                />
              </div>

              {/* Button with Loader */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
                } transition-all`}
              >
                {loading ? (
                  <>
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
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Signup"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClient;

import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const backendurl = "http://localhost:5000";

const ForgetPassword = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, newPassword, confirmPassword, otp } = formData;

    if (!email || !newPassword || !confirmPassword || !otp) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
        const response = await axios.put(
          `${backendurl}/users/forget`,
          {
            email,
            newPassword,
            confirmPassword,
            otp,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

      toast.success(response.data.message || "Password changed successfully");
      alert("Password changed successfully");
      navigate("/clients/users")
    } catch (error) {
      console.error("❌ Error in reset password", error);
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-purple-200 to-blue-300">
          <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
            <h2 className="text-3xl font-semibold text-white text-center mb-6">
              Reset Password 🔒
            </h2>

            <form onSubmit={onSubmitHandler}>
              {/* Email */}
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.mail_icon} alt="mail icon" />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  className="bg-transparent outline-none w-full"
                  required
                />
              </div>

              {/* OTP */}
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock_icon} alt="otp icon" />
                <input
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter OTP"
                  className="bg-transparent outline-none w-full"
                  required
                />
              </div>

              {/* New Password */}
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock_icon} alt="password icon" />
                <input
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="New Password"
                  className="bg-transparent outline-none w-full"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-6 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.lock_icon} alt="confirm password icon" />
                <input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-transparent outline-none w-full"
                  required
                />
              </div>

              {/* Submit Button */}
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
                    Changing...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

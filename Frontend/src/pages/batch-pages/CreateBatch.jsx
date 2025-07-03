import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const backendurl = "http://localhost:5000";

const CreateBatch = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [batchName, setBatchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  // 🟡 Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${backendurl}/courses/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
      }
    };

    fetchCourses();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!batchName.trim() || !selectedCourseId) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${backendurl}/batches/create`,
        { batchName, course: selectedCourseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Batch created successfully");
        navigate("/batches/all-batches");
      } else {
        toast.error(response.data.message || "Batch creation failed");
      }
    } catch (error) {
      console.error("❌ Error in Batch API:", error);
      toast.error(
        error?.response?.data?.message || "Server error, try again later"
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
        <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-blue-200 to-green-300">
          <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
            <h2 className="text-3xl font-semibold text-white text-center mb-6">
              Create Batch
            </h2>

            <form onSubmit={onSubmitHandler}>
              {/* Batch Name Input */}
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <input
                  name="batchName"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="bg-transparent outline-none w-full text-white placeholder-indigo-300"
                  type="text"
                  placeholder="Enter Batch Name"
                  required
                />
              </div>

              {/* Course Dropdown */}
              <div className="mb-6 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="bg-transparent outline-none w-full text-white"
                  required
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  {courses.map((course) => (
                    <option
                      key={course._id}
                      value={course._id}
                      className="text-black"
                    >
                      {course.courseName}
                    </option>
                  ))}
                </select>
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
                    Creating...
                  </>
                ) : (
                  "Create Batch"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBatch;

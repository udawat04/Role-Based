import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const data = JSON.parse(localStorage.getItem("data"));
 

    const [isOpen , setIsOpen] = useState(true)
    const toogleSidebar =()=>{
        setIsOpen(!isOpen)
    }
    
  return (
    <div
      className={`${
        isOpen ? "w-52" : "w-30"
      } bg-amber-800 min-h-screen border-r-4 h-[100%]`}
    >
      <div className="bg-red-300 flex justify-end pr-7 ">
        <button
          onClick={toogleSidebar}
          className={`${
            isOpen
              ? "text-2xl cursor-pointer"
              : "text-4xl font-bold cursor-pointer"
          }`}
        >
          {isOpen ? "X" : "+"}
        </button>
      </div>

      <div className="h-full">
        <ul className="pt-10 h-full ">
          {data && data.user.role === "superAdmin" && (
            <>
              <Link to={"/super-admin"}>
                <li className="bg-red-100 mt-5 py-2">Admin</li>
              </Link>
              <Link to={"/super-admin/total-clients"}>
                <li className="bg-blue-100 mt-5 py-2">Total - Client</li>
              </Link>
              <Link to={"/super-admin/total-users"}>
                <li className="bg-yellow-100 mt-5 py-2">Total - Users</li>
              </Link>
              <Link to={"/super-admin/create-client"}>
                <li className="bg-green-100 mt-5 py-2">Create - Client</li>
              </Link>
            </>
          )}
          {data && data.user.role === "client" && (
            <>
              <Link to={"/client"}>
                <li className="bg-red-100 mt-5 py-2">Client</li>
              </Link>
              <Link to={"/client/users"}>
                <li className="bg-blue-100 mt-5 py-2">Total - User</li>
              </Link>

              <Link to={"/client/create-users"}>
                <li className="bg-green-100 mt-5 py-2">Create - User</li>
              </Link>
            </>
          )}

          {data &&
            (data.user.role === "admin" ||
              data.user.role === "sub-admin" ||
              data.user.role === "HR" ) && (
              <>
                <Link to={"/users"}>
                  <li className="bg-red-100 mt-5 py-2">User</li>
                </Link>
                <Link to={"/client/users"}>
                  <li className="bg-blue-100 mt-5 py-2">Total - User</li>
                </Link>
                <Link to={"/courses/create-courses"}>
                  <li className="bg-green-100 mt-5 py-2">Create - Course</li>
                </Link>
                <Link to={"/batches/create-batches"}>
                  <li className="bg-green-100 mt-5 py-2">Create - Batch</li>
                </Link>
                <Link to={"/courses/all-courses"}>
                  <li className="bg-green-100 mt-5 py-2">Show - Courses</li>
                </Link>
                <Link to={"/batches/all-batches"}>
                  <li className="bg-green-100 mt-5 py-2">Show - Batches</li>
                </Link>
              </>
            )}
          {data && data.user.role === "trainer" && (
            <>
              <Link to={"/users"}>
                <li className="bg-red-100 mt-5 py-2">User</li>
              </Link>
              <Link to={"/client/users"}>
                <li className="bg-blue-100 mt-5 py-2">Total - User</li>
              </Link>
              
              
              <Link to={"/courses/all-courses"}>
                <li className="bg-green-100 mt-5 py-2">Show - Courses</li>
              </Link>
              <Link to={"/batches/all-batches"}>
                <li className="bg-green-100 mt-5 py-2">Show - Batches</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar
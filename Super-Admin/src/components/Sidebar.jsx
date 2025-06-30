import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [isOpen , setIsOpen] = useState(true)
    const toogleSidebar =()=>{
        setIsOpen(!isOpen)
    }
    console.log(isOpen)
  return (
    <div className={`${isOpen ? "w-52" : "w-30"} bg-amber-800 min-h-screen border-r-4`}>
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
          <Link to={"/super-admin"} className=" ">
            <li className="bg-red-100 mt-5 py-2 ">Admin</li>
          </Link>
          <Link to={"/super-admin/total-clients"} className="">
            <li className="bg-blue-100 mt-5 py-2">Total - Client</li>
          </Link>
          <Link to={"/super-admin/total-users"} className="">
            <li className="bg-yellow-100 mt-5 py-2">Total - Users</li>
          </Link>
          <Link to={"/super-admin/create-client"} className="">
            <li className="bg-green-100 mt-5 py-2">Create - Client</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar
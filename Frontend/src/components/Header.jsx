import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const data = JSON.parse(localStorage.getItem("data"))
    

    const handleLogout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("data")
        navigate("/")
    }
  return (
    <div className="bg-red-400 flex justify-around">
      {data && data.user.role === "superAdmin" ? (
        <h1>
          {" "}
          Hello , {data.user.name}, Welcome To{" "}
          <span className="text-white font-bold px-2">
           Super-Admin 
          </span>{" "}
          Dashboard{" "}
        </h1>
      ) : data && data.user.role === "client" ? (
        <h1>
          {" "}
          Welcome To{" "}
          <span className="text-white font-bold px-2">
            {data.user.client.name}
          </span>{" "}
          Dashboard{" "}
        </h1>
      ) : (
        <h1>
          {" "}
          Hello , {data.user.name}, Welcome To{" "}
          <span className="text-white font-bold px-2">
            {data.user.client.name}
          </span>{" "}
          Dashboard{" "}
        </h1>
      )}
      <h1>Role:{data.user.role}</h1>
      <button onClick={handleLogout} className="cursor-pointer border-1 px-2">
        Logout
      </button>
    </div>
  );
}

export default Header
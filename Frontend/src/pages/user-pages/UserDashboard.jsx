import React from 'react'
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const UserDashboard = () => {
  const {user} = JSON.parse(localStorage.getItem("data"));

   

    // const user = JSON.parse(localStorage.getuser("data"))
    console.log(user,"itmes")
  return (
    <div className="flex ">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <div
          className="w-80 h-auto border cursor-pointer border-gray-200 rounded-2xl shadow-md bg-white p-5 hover:shadow-xl hover:scale-105 transition-all duration-300"
         
        >
          {/* Image */}
          <div className="flex justify-center">
            <img
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8unA88y453WxwRtI5brdcCA6_tMFnMx6uQ&s"
              alt="client"
            />
          </div>

          {/* Info */}
          <div className="mt-5 space-y-2">
            <p className="text-xl font-bold text-gray-800 text-center">
              👤 {user.name}
            </p>
            <p className="text-sm text-gray-600 text-center">
              ⭐ Role: <span className="font-semibold">{user.role}</span>
            </p>
            {user.client ? (
              <p className="text-sm text-gray-600 text-center">
                ✨ Client:{" "}
                <span className="font-semibold">{user.client.name}</span>
              </p>
            ) : (
              ""
            )}
            <p className="text-sm text-gray-600 text-center">
              📧 Email: <span className="font-semibold">{user.email}</span>
            </p>
            {user.client ? (
              <p className="text-sm text-gray-600 text-center">
                🏢 Created By:{" "}
                <span className="font-semibold">{user.client.name}</span>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
 
}

export default UserDashboard
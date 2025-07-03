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
        <div className="p-8">
          {/* User Info Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center gap-12 hover:shadow-2xl transition-all duration-300">
            {/* Left Side - Image */}
            <div>
              <img
                src={
                  user?.image ||
                  "https://i.ibb.co/SncFf7G/user.png"
                }
                alt="Profile"
                className="w-56 h-56 rounded-full border-4 border-blue-500 object-cover"
              />
            </div>

            {/* Right Side - Details */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800">
                {user?.name}
              </h2>
              <p className="text-xl text-gray-600">
                📧 {user?.email}
              </p>
              <p className="text-xl text-blue-600 font-semibold">
                🔖 Role: {user?.role}
              </p>

          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
 
}

export default UserDashboard
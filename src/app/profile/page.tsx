"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { UserIcon, LogOutIcon, IdCard, Shield } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(false);

  const logout = async() => {
    try {
      setLoading(true);
      await axios.get('/api/users/logout');
      toast.success("Logout successful");
      router.push('/login');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      console.log("Logout Failed", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/users/me');
      console.log(res.data);
      setData(res.data.data._id);
      toast.success("User details retrieved");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get user details';
      console.log("Get User Details Failed", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {/* Abstract shapes for decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-br-full opacity-80"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-orange-500 to-pink-500 rounded-tl-full opacity-70"></div>
      
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl relative z-10 border border-gray-100">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-md">
            <UserIcon size={32} className="text-white" />
          </div>
        </div>
        
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">My Profile</h1>
          <p className="text-gray-500">Manage your account information</p>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <Shield size={18} className="text-gray-400 mr-2" />
              <p className="text-sm font-medium text-gray-500">User ID</p>
            </div>
            {data === "nothing" ? (
              <div className="text-gray-400 font-medium py-2">Click the button below to retrieve your ID</div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="text-gray-600 font-medium py-2 px-6 bg-gray-100 rounded-lg max-w-full overflow-x-auto">
                  {data}
                </div>
                <Link 
                  href={`/profile/${data}`}
                  className="text-blue-600 hover:text-blue-500 text-sm font-medium transition-colors"
                >
                  View Full Profile
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={getUserDetails}
            disabled={loading}
            className={`w-full py-3 px-4 flex justify-center items-center text-white rounded-lg shadow-md font-medium transition duration-300 ${
              loading
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <IdCard size={18} className="mr-2" />
                Get User Details
              </>
            )}
          </button>
          
          <button 
            onClick={logout}
            disabled={loading}
            className="w-full py-3 px-4 flex justify-center items-center rounded-lg font-medium transition duration-200 border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          >
            <LogOutIcon size={18} className="mr-2" />
            {loading ? "Loading..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
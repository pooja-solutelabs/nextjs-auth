"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { UserIcon, LogOutIcon, IdCard } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-purple-800 to-indigo-900 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-orange-100 p-3 rounded-full">
            <UserIcon size={32} className="text-orange-600" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500">Manage your account information</p>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-gray-80 rounded-lg p-4 flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-2">User ID</p>
            {data === "nothing" ? (
              <div className="text-gray-400 font-medium">Not available</div>
            ) : (
              <Link 
                href={`/profile/${data}`}
                className="text-orange-600 hover:text-orange-800 font-medium transition-colors"
              >
                {data}
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-3 pt-4">
          <button 
            onClick={getUserDetails}
            disabled={loading}
            className="flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70"
          >
            <IdCard size={18} className="mr-2" />
            {loading ? "Loading..." : "Get User Details"}
          </button>
          
          <button 
            onClick={logout}
            disabled={loading}
            className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70"
          >
            <LogOutIcon size={18} className="mr-2" />
            {loading ? "Loading..." : "Logout"}
          </button>
        </div>
      </div>
      
    </div>
  );
}
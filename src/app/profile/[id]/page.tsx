"use client";

import { use } from "react";
import Link from "next/link";
import { UserIcon, ArrowLeft } from "lucide-react";

export default function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-br-full opacity-80"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-orange-500 to-pink-500 rounded-tl-full opacity-70"></div>
      
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl relative z-10 border border-gray-100">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-md">
            <UserIcon size={32} className="text-white" />
          </div>
        </div>
        
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">User Profile</h1>
          {/* <p className="text-gray-500">Detailed information</p> */}
        </div>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="bg-gray-50 rounded-xl p-5 flex flex-col items-center shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <UserIcon size={18} className="text-gray-400 mr-2" />
              <p className="text-sm font-medium text-gray-500">User ID</p>
            </div>
            <div className="text-gray-600 font-medium py-2 px-6 bg-gray-100 rounded-lg max-w-full overflow-x-auto">
              {unwrappedParams.id}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <p className="text-sm font-medium text-gray-500">Joined</p>
              </div>
              <p className="font-medium text-gray-700">May 16, 2025</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center shadow-sm">
              <div className="flex items-center justify-center mb-2">
                <p className="text-sm font-medium text-gray-500">Status</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <p className="font-medium text-gray-700">Active</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/profile"
            className="w-full py-3 px-4 flex justify-center items-center rounded-lg font-medium transition duration-200 border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

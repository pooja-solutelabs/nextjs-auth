"use client";

import { use } from "react";

export default function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-purple-800 to-indigo-900 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          <p className="text-gray-500">Detailed information</p>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500 mb-2">User ID</p>
              <div className="bg-indigo-100 px-4 py-2 rounded-md">
                <span className="font-mono text-orange-600 font-medium">{unwrappedParams.id}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Joined</p>
              <p className="font-medium text-gray-800">May 16, 2025</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <p className="font-medium text-gray-800">Active</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center pt-2">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
}
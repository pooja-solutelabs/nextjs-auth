"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    try { 
      setLoading(true);
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
      setLoading(false);
    } catch (error: unknown) {
      setError(true);
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {/* Abstract shapes for decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-br-full opacity-80"></div>
      <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-orange-500 to-pink-500 rounded-tl-full opacity-70"></div>
      
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl relative z-10 border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Email Verification</h1>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: '#4f46e5 transparent #4f46e5 #4f46e5' }}></div>
            <p className="text-gray-600">Verifying your email...</p>
          </div>  
        )}

        {!loading && verified && (
          <div className="rounded-lg bg-gray-50 p-6 text-center border border-gray-200">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-green-100 p-3 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">Email Verified Successfully!</h2>
            <p className="mb-6 text-gray-600">Your email has been verified. You can now log in to your account.</p>
            <Link href="/login">
              <span className="inline-block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Log In to Your Account
              </span>
            </Link>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg bg-gray-50 p-6 text-center border border-gray-200">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-red-100 p-3 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">Verification Failed</h2>
            <p className="mb-6 text-gray-600">We could not verify your email. The verification link may be expired or invalid.</p>
            <div className="space-y-4">
              <Link href="/login">
                <span className="inline-block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Try Logging In
                </span>
              </Link>
              <Link href="/help">
                <span className="inline-block w-full py-3 px-4 rounded-lg font-medium transition duration-200 border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
                  Get Help
                </span>
              </Link>
            </div>
          </div>
        )}

        {!loading && !verified && !error && token && (
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <p className="text-gray-600">Processing your verification...</p>
          </div>
        )}

        {!loading && !token && (
          <div className="rounded-lg bg-gray-50 p-6 text-center border border-gray-200">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-yellow-100 p-3 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">Missing Verification Token</h2>
            <p className="mb-6 text-gray-600">No verification token was found. Please check your email and click the verification link.</p>
            <div className="space-y-4">
              <Link href="/">
                <span className="inline-block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Return to Homepage
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
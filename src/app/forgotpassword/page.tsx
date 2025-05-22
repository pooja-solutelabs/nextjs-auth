"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [emailError, setEmailError] = useState("");

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        
        if (validateEmail(newEmail)) {
            setEmailError("");
        } else if (newEmail) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const onSubmit = async () => {
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", { email });
            console.log("Password reset email sent", response.data);
            toast.success("Password reset email sent");
            setEmailSent(true);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email';
            console.log("Failed to send reset email", errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-br-full opacity-80"></div>
            <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-orange-500 to-pink-500 rounded-tl-full opacity-70"></div>
    
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl relative z-10 border border-gray-100">
                <h1 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Forgot Password</h1>
                
                {!emailSent ? (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={() => {
                                        if (email && !validateEmail(email)) {
                                            setEmailError("Please enter a valid email address");
                                        }
                                    }}
                                    placeholder="you@example.com"
                                    className={`w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 rounded-lg border ${
                                        emailError ? 'border-red-500' : 'border-gray-200'
                                    } focus:outline-none focus:ring-2 ${
                                        emailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                    } focus:border-transparent transition duration-200`}
                                />   
                            </div>
                            {emailError && (
                                <p className="mt-2 text-sm text-red-600">
                                    <span className="flex items-center">
                                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {emailError}
                                    </span>
                                </p>
                            )}
                        </div>

                        <button 
                            onClick={onSubmit}
                            disabled={loading || !email || !!emailError}
                            className={`w-full py-3 px-4 flex justify-center items-center text-white rounded-lg shadow-md font-medium transition duration-300 ${
                                loading || !email || !!emailError
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
                                    Sending...
                                </>
                            ) : "Send Reset Link"}
                        </button>
                    </div>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="flex justify-center">
                            <svg className="h-16 w-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Email Sent!</h2>
                        <p className="text-gray-600">
                            We have sent a password reset link to <span className="font-medium">{email}</span>. 
                            Please check your inbox and follow the instructions.
                        </p>
                        <p className="text-gray-500 text-sm">
                            If you do not see the email, please check your spam folder.
                        </p>
                    </div>
                )}

                <div className="mt-8 pt-6 text-center border-t border-gray-100">
                    <p className="text-gray-600">
                        Remember your password?{" "}
                        <Link className="text-blue-600 hover:text-blue-500 font-medium" href="/login">
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
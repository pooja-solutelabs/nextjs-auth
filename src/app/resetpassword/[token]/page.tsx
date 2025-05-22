"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
    const router = useRouter();
    const resolvedParams = React.use(params);
    const { token } = resolvedParams;
    const [passwords, setPasswords] = useState({
        password: '',
        confirmPassword: '',
    });
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [tokenValid, setTokenValid] = useState(true);

    const validatePass = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    }

    const togglePassVisibility = () => {
        setShowPass((prev) => !prev)
    }

    const toggleConfirmPassVisibility = () => {
        setShowConfirmPass((prev) => !prev)
    }

    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPass = e.target.value;
        setPasswords({...passwords, password: newPass});

        if(validatePass(newPass)){
            setPasswordError("");
        } else if (newPass) {
            setPasswordError("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character");
        } else {
            setPasswordError("");
        }
    }

    const handleConfirmPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPass = e.target.value;
        setPasswords({...passwords, confirmPassword: confirmPass});

        if(confirmPass && confirmPass !== passwords.password){
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    }

    const onResetPassword = async() => {
        if(!validatePass(passwords.password)) {
            setPasswordError("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character");
            return; 
        }

        if (passwords.password !== passwords.confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            console.log("Sending reset request with token:", token);
            const response = await axios.post("/api/users/resetpassword", {
                token,
                password: passwords.password
            });
            console.log("Reset response:", response.data);
            toast.success("Password reset successful");
            router.push("/login");            
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Password Reset Failed';
            console.log("Password Reset Failed", errorMessage);
            toast.error(errorMessage);
            
            // Check if token is invalid or expired
            if (axios.isAxiosError(error) && error.response?.status === 400 && 
                error.response?.data?.error?.includes("Invalid or expired")) {
                setTokenValid(false);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!token) {
            setTokenValid(false);
            return;
        }

        if(passwords.password.length > 0 && 
           passwords.confirmPassword.length > 0 && 
           !passwordError && 
           !confirmPasswordError && 
           tokenValid) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [passwords, passwordError, confirmPasswordError, token, tokenValid]);

    if (!tokenValid) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-br-full opacity-80"></div>
                <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-orange-500 to-pink-500 rounded-tl-full opacity-70"></div>
        
                <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl relative z-10 border border-gray-100">
                    <div className="text-center space-y-6">
                        <div className="flex justify-center">
                            <svg className="h-16 w-16 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Invalid or Expired Link</h2>
                        <p className="text-gray-600">
                            This password reset link is invalid or has expired.
                        </p>
                        <p className="text-gray-500">
                            Please request a new password reset link.
                        </p>
                        <div className="pt-4">
                            <Link 
                                href="/forgotpassword"
                                className="w-full py-3 px-4 flex justify-center items-center text-white rounded-lg shadow-md font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            >
                                Request New Link
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-br-full opacity-80"></div>
            <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-orange-500 to-pink-500 rounded-tl-full opacity-70"></div>
    
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl relative z-10 border border-gray-100">
                <h1 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Reset Password</h1>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                id="password"
                                type={showPass ? "text" : "password"}
                                value={passwords.password}
                                onChange={handlePassChange}
                                onBlur={() => {
                                    if (passwords.password && !validatePass(passwords.password)) {
                                        setPasswordError("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character");
                                    }
                                }}
                                placeholder="Enter new password"
                                className={`w-full py-3 pl-10 pr-10 text-gray-700 bg-gray-50 rounded-lg border ${
                                    passwordError ? 'border-red-500' : 'border-gray-200'
                                } focus:outline-none focus:ring-2 ${
                                    passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                } focus:border-transparent transition duration-200`}
                            />
                            <span
                                onClick={togglePassVisibility}
                                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"                            
                            >
                                {showPass ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {passwordError && (
                            <p className="mt-2 text-sm text-red-600">
                                <span className="flex items-center">
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {passwordError}
                                </span>
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                id="confirmPassword"
                                type={showConfirmPass ? "text" : "password"}
                                value={passwords.confirmPassword}
                                onChange={handleConfirmPassChange}
                                onBlur={() => {
                                    if (passwords.confirmPassword && passwords.confirmPassword !== passwords.password) {
                                        setConfirmPasswordError("Passwords do not match");
                                    }
                                }}
                                placeholder="Confirm new password"
                                className={`w-full py-3 pl-10 pr-10 text-gray-700 bg-gray-50 rounded-lg border ${
                                    confirmPasswordError ? 'border-red-500' : 'border-gray-200'
                                } focus:outline-none focus:ring-2 ${
                                    confirmPasswordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                } focus:border-transparent transition duration-200`}
                            />
                            <span
                                onClick={toggleConfirmPassVisibility}
                                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"                            
                            >
                                {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {confirmPasswordError && (
                            <p className="mt-2 text-sm text-red-600">
                                <span className="flex items-center">
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {confirmPasswordError}
                                </span>
                            </p>
                        )}
                    </div>

                    <button 
                        onClick={onResetPassword}
                        disabled={loading || buttonDisabled}
                        className={`w-full py-3 px-4 flex justify-center items-center text-white rounded-lg shadow-md font-medium transition duration-300 ${
                            loading || buttonDisabled
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
                                Resetting...
                            </>
                        ) : "Reset Password"}
                    </button>
                </div>

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
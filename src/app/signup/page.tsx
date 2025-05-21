"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPass, setShowPass] = useState(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
        return regex.test(email);
    }

    const validatePass = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    }
    
    const togglePassVisibility = () => {
        setShowPass((prev) => !prev)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setUser({...user, email: newEmail});
        
        if (validateEmail(newEmail)) {
            setEmailError("");
        } else if (newEmail) {
            setEmailError("Please enter a valid email address");
        }
    };

    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPass = e.target.value;
        setUser({...user, password: newPass});

        if(validatePass(newPass)){
            setPasswordError("");
        } else if (newPass) {
            setPasswordError("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character");
        }
    }

    const onSignup = async() => {
        if (!validateEmail(user.email)) {
            setEmailError("Please enter a valid email address");
            return;
        }
        
        if (!validatePass(user.password)) {
            setPasswordError("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character");
            return;
        }
        
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            toast.success("Account created successfully");
            router.push("/login");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Signup failed';
            console.log("SignUp Failed");
            toast.error(errorMessage);
        } finally {  
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0 && 
           !emailError && !passwordError) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user, emailError, passwordError])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-br-full opacity-80"></div>
            <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-l from-orange-500 to-pink-500 rounded-tl-full opacity-70"></div>
            
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl relative z-10 border border-gray-100">
                <h1 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Create Account</h1>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                            Username
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                id="username"
                                type="text"
                                value={user.username}
                                onChange={(e) => setUser({...user, username: e.target.value})}
                                placeholder="johndoe"
                                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>
                    </div>

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
                                value={user.email}
                                onChange={handleEmailChange}
                                onBlur={() => {
                                    if (user.email && !validateEmail(user.email)) {
                                        setEmailError("Please enter a valid email address");
                                    }
                                }}
                                placeholder="you@example.com"
                                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
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

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                            Password
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
                                value={user.password}
                                onChange={handlePassChange}
                                onBlur={() => {
                                    if (user.password && !validatePass(user.password)) {
                                        setPasswordError("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character");
                                    }
                                }}
                                placeholder="password"
                                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
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

                    <button 
                        onClick={onSignup}
                        disabled={buttonDisabled || loading}
                        className={`w-full py-3 px-4 flex justify-center items-center text-white rounded-lg shadow-md font-medium transition duration-300 ${
                            buttonDisabled || loading
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
                                Creating account...
                            </>
                        ) : "Create Account"}
                    </button>
                </div>

                <div className="mt-8  text-center border-t border-gray-100">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link className="text-blue-600 hover:text-blue-500 font-medium" href="/login">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
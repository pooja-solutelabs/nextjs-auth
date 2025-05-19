"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async() => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            router.push("/login");
        }catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Signup failed';
            console.log("SignUp Failed");
            toast.error(errorMessage);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-800 via-purple-800 to-indigo-900 flex justify-center items-center p-4">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
                <h1 className="text-2xl text-black font-bold mb-6 text-center">{loading ? "Processing.." : "Signup"}</h1>

                <div className="mb-4">
                    <label className="block text-gray-900 text-sm font-semibold mb-2 font-sans tracking-wide" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="username"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="Enter your name"
                        className="w-full p-3 text-gray-800 bg-gray-50 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 font-sans"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-900 text-sm font-semibold mb-2 font-sans tracking-wide" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="Enter your email"
                        className="w-full p-3 text-gray-800 bg-gray-50 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 font-sans"
                    />   
                </div> 
                <div className="mb-6">
                    <label className="block text-gray-900 text-sm font-semibold mb-2 font-sans tracking-wide" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="Enter your password"
                        className="w-full p-3 text-gray-800 bg-gray-50 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 font-sans"
                    />
                </div>

                <button 
                    onClick={onSignup}
                    disabled={buttonDisabled}
                    className={`w-full p-3 text-white rounded-md shadow-sm font-medium transition duration-200 ${
                        buttonDisabled 
                            ? ' bg-orange-400 cursor-not-allowed' 
                            : 'bg-orange-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-2orange-500 focus:ring-offset-2'
                    }`}
                >
                    {loading ? "Creating your account" : "Sign up"}
                </button>

                <div className="mt-6 text-center">
                    <p className="text-gray-700 font-sans">
                        Already have an account?{" "}
                        <Link className="text-orange-500 hover:text-orange-400 font-medium" href="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            
        </div>
    )
    
}
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter(); 
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] =   useState(false);

    const onLogin = async() => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log(response.data);
            toast.success("Login success");
            router.push("/profile");            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            console.log("Login Failed", errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-800 via-purple-800 to-indigo-900 flex justify-center items-center p-4">
            <div className="bg-white backdrop-blur-sm p-8 rounded-lg w-full max-w-md shadow-xl">
                <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center font-sans">Login</h1>
                
                <div className="mb-4">
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
                    onClick={onLogin}
                    disabled={buttonDisabled}
                    className={`w-full p-3 text-white rounded-md shadow-sm font-medium transition duration-200 ${
                        buttonDisabled 
                            ? 'bg-orange-400 cursor-not-allowed' 
                            : 'bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
                    }`}
                >
                    {loading ? "Signing in..." : "Login"}
                </button>

                <div className="mt-6 text-center">
                    <p className="text-gray-700 font-sans">
                        Do not have an account?{" "}
                        <Link className="text-orange-500 hover:text-orange-400 font-medium" href="/signup">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
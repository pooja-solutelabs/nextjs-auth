"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function LoginPage() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const onLogin = () => {}

    return(
        <div className="min-h-screen bg-black text-white flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
                <h1 className="text-2xl text-black font-bold mb-6 text-center">Login</h1>

                <label className="text-black" htmlFor="email">email</label>
                <input
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email:e.target.value})}
                    placeholder="email"
                    className="w-full p-2 mb-4 text-black rounded border border-gray-600" />   

                <label className="text-black" htmlFor="password">password</label>
                <input
                    id="password"
                    type="text"
                    value={user.password}
                    onChange={(e) => setUser({...user, password:e.target.value})}
                    placeholder="password"
                    className="w-full p-2 mb-4 rounded text-black border border-gray-600" />

                <button 
                onClick={onLogin}
                className="w-full p-2 border text-white border-none bg-blue-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Signup
                </button>

                <Link className="text-black" href="/signup">Visit Signup Page</Link>
            </div>
            
        </div>
    )
    
}
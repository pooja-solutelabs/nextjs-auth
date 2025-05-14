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
        }catch (error: any) {
            console.log("SignUp Failed");
            toast.error(error.message);
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
        <div className="min-h-screen bg-black text-white flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
                <h1 className="text-2xl text-black font-bold mb-6 text-center">{loading ? "Processing.." : "Signup"}</h1>
                <label className="text-black" htmlFor="username">username</label>
                <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username:e.target.value})}
                    placeholder="username"
                    className="w-full p-2 mb-4 rounded text-black border border-gray-600" />

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
                onClick={onSignup}
                className="w-full p-2 border text-white border-none bg-blue-600 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                    {buttonDisabled ? "No Signup" : "Signup"}
                </button>

                <Link className="text-black" href="/login">Visit Login Page</Link>
            </div>
            
        </div>
    )
    
}
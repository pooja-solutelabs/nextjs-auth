"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ProfilePage () {

    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async() => {
        try{
            await axios.get('/api/users/logout')
            toast.success("logout successful")
            router.push('/login');
        }catch (error: unknown){
            const errorMessage = error instanceof Error ? error.message : 'Logout failed';
            console.log("Logout Failed", errorMessage);
            toast.error(errorMessage);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    }
    
    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <h1>Profile</h1>
            <p>Profile page</p>
            <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>

            <button 
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-3">
                Logout
            </button>

            <button 
            onClick={getUserDetails}
            className="bg-purple-800 hover:bg-purple-400 text-white font-bold py-1 px-2 rounded mt-3">
                GetUserDetail
            </button>
        </div>
    )
}
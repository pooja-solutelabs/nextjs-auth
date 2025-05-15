"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage () {

    const router = useRouter();
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
    
    return(
        <div className="h-screen flex flex-col justify-center items-center">
            <h1>Profile</h1>
            <p>Profile page</p>
            <button 
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-3">Logout</button>
        </div>
    )
}
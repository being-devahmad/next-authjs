'use client'

import axios from "axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useState} from "react";

export default function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState('')

    const getUserDetails = async () => {
        try {
            const res = await axios.post("/api/users/me")
            setData(res.data.data._id)
        } catch (error: any) {
            console.log("Error getting user's data", error.message)
        }
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("You've been logged out successfully")
            router.push("/login")
        } catch (error: any) {
            console.log("Error in logging out", error.message)
            toast.error(error.message)
        }
    }


    return <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className='text-4xl'>Profile</h1>
            <hr/>
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" :
                <Link href={`/profile/${data}`}>{data}
                </Link>}</h2>
            <hr/>
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout
            </button>

            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details
            </button>
        </div>
    </>
}
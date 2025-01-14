"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data);
        setData(res.data.data._id);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Profile</h1>
                <hr className="my-4" />
                <p className="text-center text-lg text-gray-700 mb-4">Welcome to your profile page!</p>

                <h2 className="p-3 text-lg font-semibold rounded bg-green-500 text-white text-center">
                    {data === 'nothing' ? "No User Data Available" : <Link href={`/profile/${data}`} className="text-white">{data}</Link>}
                </h2>

                <hr className="my-4" />

                <div className="flex flex-col space-y-4">
                    <button
                        onClick={logout}
                        className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Logout
                    </button>

                    <button
                        onClick={getUserDetails}
                        className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        Get User Details
                    </button>
                </div>
            </div>
        </div>
    );
}

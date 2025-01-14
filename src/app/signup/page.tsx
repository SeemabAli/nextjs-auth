"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = axios.post("/api/users/signup", user);
            console.log("SignUp Success", (await response).data);
            router.push("/login");
        } catch (error: any) {
            console.log("SignUp Failed", error.message);
            toast.error(error.message);
        } finally {

        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-600 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-4 bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-900">{loading ? "Processing" : "SignUp"}</h1>
                <hr className="" />
                <div className="space-y-3">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                            id="username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                </div>
                <div>
                    <button
                        onClick={onSignup}
                        className="w-full py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        {buttonDisabled ? "Please fill all fields" : "Signup"}
                    </button>
                </div>
                <div className="text-center mt-4">
                    <Link href="/login">
                        <button
                            className="w-full py-3  text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

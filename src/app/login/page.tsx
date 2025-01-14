"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/login", user);
            console.log("Login Success");
            toast.success("Login Successful");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login Failed", error.message);
            toast.error(error.message);

        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-900">{loading ? "Processing" : "Login"}</h1>
                <hr className="my-4" />
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        onClick={onLogin}
                        className="w-full py-3 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Login
                    </button>
                </div>
                <div className="text-center mt-4">
                    <Link href="/signup">
                        <button
                            className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            SignUp
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

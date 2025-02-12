"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "sonner";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending data:", JSON.stringify({ email, password })); // Debug log

        try {
            const res = await axios.post(
                "http://localhost/API/getBalance.php?action=login",
                new URLSearchParams({ email, password }) // Convert to URL encoded params
            );

            console.log("Response:", res.data); // Debug log

            if (res.data.role) {
                toast.success("Login successful!");
                router.push(res.data.role === "admin" ? "/home" : "/customer-home");
            } else {
                setError(res.data.error || "Login failed");
                toast.error("Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("An error occurred. Please try again.");
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div
            className="flex items-center justify-center h-screen bg-gradient-to-br from-lime-200 via-lime-300 to-lime-400 p-6"
        >
            <Toaster />
            <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-10 max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center text-lime-600">Login</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg bg-lime-100 border border-lime-300 focus:ring-2 focus:ring-lime-500 placeholder-gray-600 text-gray-700"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg bg-lime-100 border border-lime-300 focus:ring-2 focus:ring-lime-500 placeholder-gray-600 text-gray-700"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-lime-600 hover:bg-lime-500 text-white rounded-lg font-bold transition-all text-sm"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center text-gray-600">
                    Need an account?{" "}
                    <button
                        onClick={() => router.push("/register")}
                        className="text-lime-600 hover:underline text-sm"
                    >
                        Sign up here
                    </button>
                </div>
            </div>
        </div>
    );
}

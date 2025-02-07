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
        <div className="flex items-center justify-center h-screen bg-lime-200 text-gray-900 p-6">
            <Toaster />
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center text-lime-600">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg bg-lime-100 border border-lime-300 focus:ring-2 focus:ring-lime-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-lg bg-lime-100 border border-lime-300 focus:ring-2 focus:ring-lime-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-lime-600 hover:bg-lime-500 text-white rounded-lg py-2 text-sm">
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <button onClick={() => router.push("/register")} className="text-lime-600 hover:underline text-sm">
                            Need an account? Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

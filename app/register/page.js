"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "sonner";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost/API/login.php?action=register",
                { email, password, role: "customer" },
                { headers: { "Content-Type": "application/json" } }
            );
            
            if (res.data.success) {
                toast.success("Registration successful! You can now log in.");
                router.push("/");
            } else {
                setError(res.data.error || "Registration failed");
                toast.error("Registration failed. Please try again.");
            }
        } catch (err) {
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
        <h1 className="text-3xl font-bold mb-6 text-center text-lime-600">Sign Up</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg bg-lime-100 border border-lime-300 focus:ring-2 focus:ring-lime-500 placeholder-gray-600"
                    placeholder="Email"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg bg-lime-100 border border-lime-300 focus:ring-2 focus:ring-lime-500 placeholder-gray-600"
                    placeholder="Password"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 rounded-lg bg-lime-100 border border-lime-300 focus:ring-2 focus:ring-lime-500 placeholder-gray-600"
                    placeholder="Confirm Password"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-lime-600 hover:bg-lime-500 text-white rounded-lg font-bold transition-all text-sm"
            >
                Sign Up
            </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <button
                onClick={() => router.push("/")}
                className="text-lime-600 hover:underline text-sm"
            >
                Click here
            </button>
        </div>
    </div>
</div>

    );
}

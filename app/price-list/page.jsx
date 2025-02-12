"use client";

import { useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { Menu } from "@headlessui/react";


const navLinks = [
    { href: "/servicess", label: "Services", icon: "💆‍♀️" },
    { href: "/price-list", label: "Price List", icon: "📋" }, // New Price List link
    { href: "/items", label: "Item Groups", icon: "📂" },
];


const salesLinks = [
    { href: "/customers", label: "Customers", icon: "👥" },
    { href: "/invoices", label: "Invoices", icon: "📜" },
    { href: "/payments", label: "Payments", icon: "💰" },
];


export default function PriceList() {
    const [searchQuery, setSearchQuery] = useState("");
    const [priceList, setPriceList] = useState([
        { id: 1, name: "Membership Discount", details: "20% Markdown", description: "For loyal customers" },
        { id: 2, name: "Holiday Discount", details: "10% Markdown", description: "Seasonal discounts" },
    ]);
    const [newItem, setNewItem] = useState({ name: "", details: "", description: "" });
    const [editItem, setEditItem] = useState(null);

    const handleSearch = () => {
        toast(`Searching for: ${searchQuery}`);
    };

    const handleAdd = () => {
        if (!newItem.name || !newItem.details || !newItem.description) {
            toast.error("All fields are required.");
            return;
        }
        setPriceList([...priceList, { ...newItem, id: Date.now() }]);
        setNewItem({ name: "", details: "", description: "" });
        toast.success("Item added successfully.");
    };

    const handleDelete = (id) => {
        setPriceList(priceList.filter((item) => item.id !== id));
        toast.success("Item deleted successfully.");
    };

    const handleEdit = (id) => {
        const itemToEdit = priceList.find((item) => item.id === id);
        setEditItem({ ...itemToEdit });
    };

    const handleSaveEdit = () => {
        if (!editItem.name || !editItem.details || !editItem.description) {
            toast.error("All fields are required.");
            return;
        }
        setPriceList((prev) =>
            prev.map((item) => (item.id === editItem.id ? editItem : item))
        );
        setEditItem(null);
        toast.success("Item updated successfully.");
    };

    return (
        <div className="flex flex-col h-screen bg-[#77DD77] text-gray-900">
            <Toaster />

            {/* Header */}
            <header className="flex items-center justify-between bg-[#56A156] text-white p-4 w-full">
                {/* Left section: Home and Account Settings buttons */}
                <div className="flex items-center space-x-4">
                    <Link href="/home">
                        <button className="text-2xl">🏠</button>
                    </Link>
                </div>

                {/* Center section: Modal button, Search bar, and Search button */}
                <div className="flex items-center space-x-4 flex-grow justify-center">
                    <button className="text-2xl" onClick={() => setIsModalOpen(true)}>
                        ➕
                    </button>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-white text-gray-900 w-64 focus:outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-3 py-1.5 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-white text-sm"
                    >
                        Search
                    </button>
                </div>

                {/* Right section: User icon */}
                <div className="flex items-center space-x-4">
                    <Link href="/acc-settings">
                        <button className="text-xl">⚙️</button>
                    </Link>
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-lg font-bold">
                        A
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <nav className="w-64 bg-gradient-to-b from-[#77DD77] to-[#56A156] text-gray-900 flex flex-col items-center py-6">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Lizly Skin Care Clinic</h1>
                    {/* Navigation Menus */}
                    <Menu as="div" className="relative w-full px-4">
                        <Menu.Button className="w-full p-3 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-left font-normal md:font-bold flex items-center">
                            <span className="mr-2">🛒</span> POS ▾
                        </Menu.Button>
                        <Menu.Items className="absolute left-4 mt-2 w-full bg-[#66C466] text-gray-900 rounded-lg shadow-lg z-10">
                            {navLinks.map((link) => (
                                <Menu.Item key={link.href}>
                                    {({ active }) => (
                                        <Link
                                            href={link.href}
                                            className={`flex items-center space-x-4 p-3 rounded-lg ${active ? 'bg-[#4CAF4C] text-white' : ''}`}
                                        >
                                            <span className="text-xl">{link.icon}</span>
                                            <span className="font-normal md:font-bold">{link.label}</span>
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Menu>

                    <Menu as="div" className="relative w-full px-4 mt-4">
                        <Menu.Button className="w-full p-3 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-left font-normal md:font-bold flex items-center">
                            <span className="mr-2">📊</span> Sales ▾
                        </Menu.Button>
                        <Menu.Items className="absolute left-4 mt-2 w-full bg-[#66C466] text-gray-900 rounded-lg shadow-lg z-10">
                            {salesLinks.map((link) => (
                                <Menu.Item key={link.href}>
                                    {({ active }) => (
                                        <Link href={link.href} className={`flex items-center space-x-4 p-3 rounded-lg ${active ? 'bg-[#4CAF4C] text-white' : ''}`}>
                                            <span className="text-xl">{link.icon}</span>
                                            <span className="font-normal md:font-bold">{link.label}</span>
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Menu>

                    {/* Inventory Menu */}
                    <Menu as="div" className="relative w-full px-4 mt-4">
                        <Menu.Button className="w-full p-3 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-left font-normal md:font-bold flex items-center">
                            <span className="mr-2">📦</span> Inventory ▾
                        </Menu.Button>
                        <Menu.Items className="absolute left-4 mt-2 w-full bg-[#66C466] text-gray-900 rounded-lg shadow-lg z-10">
                            {[
                                { href: "/products", label: "Products", icon: "📦" },
                                { href: "/categories", label: "Product Category", icon: "📁" },
                                { href: "/stocks", label: "Stock Levels", icon: "📊" },
                                { href: "/suppliers", label: "Supplier Management", icon: "🏭" },
                                { href: "/purchase", label: "Purchase Order", icon: "🛒" },
                            ].map((link) => (
                                <Menu.Item key={link.href}>
                                    {({ active }) => (
                                        <Link href={link.href} className={`flex items-center space-x-4 p-3 rounded-lg ${active ? 'bg-[#4CAF4C] text-white' : ''}`}>
                                            <span className="text-xl">{link.icon}</span>
                                            <span className="font-normal md:font-bold">{link.label}</span>
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Menu>

                    <Link
                        href="/"
                        className="flex items-center space-x-4 p-3 rounded-lg bg-red-600 py-3 hover:bg-red-500 mt-auto"
                    >
                        <span className="text-xl">🚪</span>
                        <span className="ml-2 font-semibold">Logout</span>
                    </Link>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-8 bg-gradient-to-b from-[#77DD77] to-[#CFFFCF]">
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="text-lg font-bold mb-4">Price List</h2>

                        <table className="w-full border border-gray-300 mb-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2 text-left">Name</th>
                                    <th className="border px-4 py-2 text-left">Details</th>
                                    <th className="border px-4 py-2 text-left">Description</th>
                                    <th className="border px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {priceList.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                        <td className="border px-4 py-2">{item.name}</td>
                                        <td className="border px-4 py-2">{item.details}</td>
                                        <td className="border px-4 py-2">{item.description}</td>
                                        <td className="border px-4 py-2 space-x-2">
                                            <button
                                                onClick={() => handleEdit(item.id)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                className="px-4 py-2 rounded-lg border w-40 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Details"
                                value={newItem.details}
                                onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                                className="px-4 py-2 rounded-lg border w-40 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                className="px-4 py-2 rounded-lg border w-40 focus:outline-none"
                            />
                            <button
                                onClick={handleAdd}
                                className="px-4 py-2 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-white"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {editItem && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-[#66C466] p-6 rounded-lg shadow-lg w-[90%] max-w-xl">
                                <h2 className="text-lg font-bold mb-4">Edit Price List</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block font-medium mb-1">Name*</label>
                                        <input
                                            type="text"
                                            value={editItem.name}
                                            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex space-x-4">
                                        <label htmlFor="allItems" className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="allItems"
                                                name="priceListType"
                                                checked={editItem.priceListType === "allItems"} // Replace with your state logic
                                                onChange={() => setEditItem({ ...editItem, priceListType: "allItems" })}
                                                className="w-4 h-4"
                                            />
                                            <span>All Items</span>
                                        </label>
                                        <label htmlFor="individualItems" className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="individualItems"
                                                name="priceListType"
                                                checked={editItem.priceListType === "individualItems"} // Replace with your state logic
                                                onChange={() => setEditItem({ ...editItem, priceListType: "individualItems" })}
                                                className="w-4 h-4"
                                            />
                                            <span>Individual Items</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Description</label>
                                        <textarea
                                            value={editItem.description}
                                            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Percentage*</label>
                                        <div className="flex items-center space-x-2">
                                            <select
                                                className="px-3 py-2 border rounded-lg focus:outline-none"
                                            >
                                                <option value="Markdown">Markdown</option>
                                                <option value="Markup">Markup</option>
                                            </select>
                                            <input
                                                type="number"
                                                className="px-3 py-2 border rounded-lg w-full focus:outline-none"
                                                placeholder="%"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-1">Round Off To*</label>
                                        <select
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                        >
                                            <option>Nevermind</option>
                                            <option>Nearest Whole Number</option>
                                            <option>0.99</option>
                                            <option>0.50</option>
                                            <option>0.49</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        onClick={() => setEditItem(null)}
                                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveEdit}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

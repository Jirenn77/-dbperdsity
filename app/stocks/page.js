"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { Dialog } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { BarChart, Folder, ClipboardList, Factory, ShoppingBag, Home, Users, FileText, CreditCard, Package, Layers, ShoppingCart, Settings, LogOut, Plus } from "lucide-react";

const navLinks = [
    { href: "/services", label: "Services", icon: "💆‍♀️" },
    { href: "/price-list", label: "Price List", icon: "📋" },
    { href: "/items", label: "Item Groups", icon: "📂" },
];

const salesLinks = [
    { href: "/customers", label: "Customers", icon: "👥" },
    { href: "/invoices", label: "Invoices", icon: "📜" },
    { href: "/payments", label: "Payments", icon: "💰" },
];

export default function StockLevelsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [stockLevels, setStockLevels] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchStockLevels = async () => {
            try {
                const res = await fetch("http://localhost/API/getStockLevels.php?action=get_stock_levels");
                const data = await res.json();
                setStockLevels(data);
            } catch (error) {
                toast.error("Error fetching stock levels.");
                console.error("Error fetching stock levels:", error);
            }
        };

        fetchStockLevels();
    }, []);

    const handleSearch = () => {
        toast(`Searching for: ${searchQuery}`);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/";
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-[#77DD77] to-[#56A156] text-gray-900">
            <Toaster />

            {/* Header */}
            <header className="flex items-center justify-between bg-[#56A156] text-white p-4 w-full h-16 pl-64">
                <div className="flex items-center space-x-4">
                    <Link href="/home">
                        <button className="text-2xl">🏠</button>
                    </Link>
                </div>

                <div className="flex items-center space-x-4 flex-grow justify-center">
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
                <nav className="w-64 bg-gradient-to-b from-[#77DD77] to-[#56A156] text-gray-900 flex flex-col items-center py-4 fixed h-full">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Lizly Skin Care Clinic</h1>

                    <Menu as="div" className="relative w-full px-4 mt-2">
                        <Menu.Button className="w-full p-3 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-left font-normal md:font-bold flex items-center">
                            <ShoppingCart className="mr-2" size={20} /> POS ▾
                        </Menu.Button>
                        <Menu.Items className="absolute left-4 mt-2 w-full bg-[#66C466] text-gray-900 rounded-lg shadow-lg z-10">
                            {[
                                { href: "/services", label: "Services", icon: <Layers size={20} /> },
                                { href: "/price-list", label: "Price List", icon: <FileText size={20} /> },
                                { href: "/items", label: "Item Groups", icon: <Package size={20} /> },
                            ].map((link) => (
                                <Menu.Item key={link.href}>
                                    {({ active }) => (
                                        <Link href={link.href} className={`flex items-center space-x-4 p-3 rounded-lg ${active ? 'bg-[#4CAF4C] text-white' : ''}`}>
                                            {link.icon}
                                            <span className="font-normal md:font-bold">{link.label}</span>
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Menu>

                    <Menu as="div" className="relative w-full px-4 mt-2">
                        <Menu.Button className="w-full p-3 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-left font-normal md:font-bold flex items-center">
                            <BarChart className="mr-2" size={20} /> Sales ▾
                        </Menu.Button>
                        <Menu.Items className="absolute left-4 mt-2 w-full bg-[#66C466] text-gray-900 rounded-lg shadow-lg z-10">
                            {[
                                { href: "/customers", label: "Customers", icon: <Users size={20} /> },
                                { href: "/invoices", label: "Invoices", icon: <FileText size={20} /> },
                                { href: "/payments", label: "Payments", icon: <CreditCard size={20} /> },
                            ].map((link) => (
                                <Menu.Item key={link.href}>
                                    {({ active }) => (
                                        <Link href={link.href} className={`flex items-center space-x-4 p-3 rounded-lg ${active ? 'bg-[#4CAF4C] text-white' : ''}`}>
                                            {link.icon}
                                            <span className="font-normal md:font-bold">{link.label}</span>
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Menu>

                    {/* Inventory Menu */}
                    <Menu as="div" className="relative w-full px-4 mt-2">
                        <Menu.Button className="w-full p-3 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-left font-normal md:font-bold flex items-center">
                            <Package className="mr-2" size={20} /> Inventory ▾
                        </Menu.Button>
                        <Menu.Items className="absolute left-4 mt-2 w-full bg-[#66C466] text-gray-900 rounded-lg shadow-lg z-10">
                            {[
                                { href: "/products", label: "Products", icon: <Package size={20} /> },
                                { href: "/categories", label: "Product Category", icon: <Folder size={20} /> },
                                { href: "/stocks", label: "Stock Levels", icon: <ClipboardList size={20} /> },
                                { href: "/suppliers", label: "Supplier Management", icon: <Factory size={20} /> },
                                { href: "/purchase", label: "Purchase Order", icon: <ShoppingBag size={20} /> },
                            ].map((link) => (
                                <Menu.Item key={link.href}>
                                    {({ active }) => (
                                        <Link href={link.href} className={`flex items-center space-x-4 p-3 rounded-lg ${active ? 'bg-[#4CAF4C] text-white' : ''}`}>
                                            {link.icon}
                                            <span className="font-normal md:font-bold">{link.label}</span>
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Menu>

                    <Link
                        href="#"
                        onClick={handleLogout}
                        className="flex items-center space-x-4 p-3 rounded-lg bg-red-600 py-3 hover:bg-red-500 mt-auto"
                    >
                        <LogOut size={20} />
                        <span className="ml-2 font-semibold">Logout</span>
                    </Link>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gradient-to-b from-[#77DD77] to-[#CFFFCF] text-gray-900 flex ml-64">
                    {/* Table Section */}
                    <div className="flex-1 pr-4">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">Stock Levels</h1>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="form-checkbox" />
                                    <span>Hide inactive items</span>
                                </label>
                                <select className="px-4 py-2 rounded-lg bg-white text-gray-900">
                                    <option>Show 10 entries</option>
                                    <option>Show 25 entries</option>
                                    <option>Show 50 entries</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="px-4 py-2 rounded-lg bg-white text-gray-900 w-64 focus:outline-none"
                                />
                            </div>
                        </div>

                        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-[#77DD77] text-black">
                                <tr>
                                    <th className="text-left py-2 px-4">Product Name</th>
                                    <th className="text-left py-2 px-4">Category</th>
                                    <th className="text-right py-2 px-4">Stock Quantity</th>
                                    <th className="text-right py-2 px-4">Unit Price</th>
                                    <th className="text-right py-2 px-4">Total Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockLevels.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                    >
                                        <td className="py-2 px-4">{item.name}</td>
                                        <td className="py-2 px-4">{item.category}</td>
                                        <td className="py-2 px-4 text-right">{item.stockQty}</td>
                                        <td className="py-2 px-4 text-right">P{item.unitPrice}</td>
                                        <td className="py-2 px-4 text-right">P{(item.stockQty * item.unitPrice).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Selected Item Details Section */}
                    {selectedItem && (
                        <div className="w-96 bg-white rounded-lg shadow-md p-4 ml-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">{selectedItem.name}</h2>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="font-medium py-2">Category:</td>
                                        <td className="py-2">{selectedItem.category}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium py-2">Stock Quantity:</td>
                                        <td className="py-2">{selectedItem.stockQty}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium py-2">Unit Price:</td>
                                        <td className="py-2">P{selectedItem.unitPrice}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium py-2">Total Value:</td>
                                        <td className="py-2">P{(selectedItem.stockQty * selectedItem.unitPrice).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>

            {/* Modal Dialog */}
            {isModalOpen && (
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl">
                        <Dialog.Title className="text-lg font-bold mb-4">
                            View Item
                        </Dialog.Title>
                        <p>Name: {selectedItem?.name}</p>
                        <p>Category: {selectedItem?.category}</p>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Close
                        </button>
                    </Dialog.Panel>
                </Dialog>
            )}
        </div>
    );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link for navigation
import { Toaster, toast } from "sonner";
import { Dialog } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { BarChart } from "lucide-react";
import { User, Settings, LogOut } from "lucide-react";
import { Folder, ClipboardList, Factory, ShoppingBag } from "lucide-react";
import { Home, Users, FileText, CreditCard, Package, Layers, ShoppingCart, Plus } from "lucide-react";

const navLinks = [
    { href: "/servicess", label: "Services", icon: Layers },
    { href: "/price-list", label: "Price List", icon: FileText },
    { href: "/items", label: "Item Groups", icon: Package },
];

const salesLinks = [
    { href: "/customers", label: "Customers", icon: Users },
    { href: "/invoices", label: "Invoices", icon: FileText },
    { href: "/payments", label: "Payments", icon: CreditCard },
];

export default function Dashboard() {
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [upcomingAppointments, setUpcomingAppointments] = useState(0);
    const [productDetails, setProductDetails] = useState({});
    const [inventorySummary, setInventorySummary] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost/API/getAppointments.php?action=get_appointments");

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                console.log("Fetched Appointments Data:", data); // Debugging

                // Ensure the data structure is valid before using `filter`
                const appointments = Array.isArray(data.appointments) ? data.appointments : [];
                const totalAppointments = data.totalAppointments ?? 0;

                const upcoming = appointments.filter(
                    (appointment) => new Date(appointment.date) > new Date()
                ).length;

                setTotalAppointments(totalAppointments);
                setUpcomingAppointments(upcoming);
            } catch (error) {
                toast.error("Error fetching appointments.");
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };


        const fetchProductDetails = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost/API/getProducts.php?action=get_product_details");
                const data = await res.json();

                setProductDetails({
                    lowStockItems: data.lowStockItems || 0,
                    allItemsGroups: data.allItemsGroups || 0,
                    allItems: data.allItems || 0,
                });
            } catch (error) {
                toast.error("Error fetching product details.");
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchInventorySummary = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://localhost/API/getInventory.php?action=get_inventory_summary");
                const data = await res.json();

                setInventorySummary({
                    quantityInHand: data.quantity_in_hand || 0,
                    quantityToBeReceived: data.quantity_to_be_received || 0,
                });
            } catch (error) {
                toast.error("Error fetching inventory summary.");
                console.error("Error fetching inventory summary:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
        fetchProductDetails();
        fetchInventorySummary();

        const interval = setInterval(() => {
            fetchProductDetails();
            fetchInventorySummary();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            const res = await fetch(`http://localhost/API/search.php?q=${searchQuery}`);
            const data = await res.json();
            console.log("Search Results:", data);
            toast(`Searching for: ${searchQuery}`);
        }
    };

    const handleAddUser = () => {
        toast("Add User functionality triggered.");
        console.log("Add User clicked");
    };

    const handleAddService = () => {
        toast("Add Service functionality triggered.");
        console.log("Add Service clicked");
    };

    const handleAddServiceGroup = () => {
        toast("Add Service Item Group functionality triggered.");
        console.log("Add Service Item Group clicked");
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/";
    };

    return (
        <div className="flex flex-col h-screen bg-white text-gray-900">
            <Toaster />
            {/* Header */}
<header className="flex items-center justify-between bg-[#89C07E] text-white p-4 w-full h-16 pl-64 relative">
    <div className="flex items-center space-x-4">
        {/* Home icon removed from here */}
    </div>

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
            className="px-3 py-1.5 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-gray-800 text-md"
        >
            Search
        </button>
    </div>

    <div className="flex items-center space-x-4 relative">
        <div 
            className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-lg font-bold cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
            A
        </div>
        {isProfileOpen && (
            <div className="bg-[#6CAE5E] absolute top-12 right-0 text-white shadow-lg rounded-lg w-48 p-2 flex flex-col animate-fade-in text-start">
                <Link href="/acc-settings">
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#467750] rounded w-full justify-start">
                    <User size={16} /> Edit Profile
                </button>
                </Link>
                <Link href="/settings">
                    <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#467750] rounded w-full justify-start">
                        <Settings size={16} /> Settings
                    </button>
                </Link>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded justify-start" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                </button>
            </div>
        )}
    </div>
</header>

{/* Sidebar */}
<div className="flex flex-1">
    <nav className="w-64 h-screen bg-gradient-to-b from-[#467750] to-[#56A156] text-gray-900 flex flex-col items-center py-6 fixed top-0 left-0">
        <div className="flex items-center space-x-2 mb-4">
            <h1 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>Lizly Skin Care Clinic</span>
            </h1>
        </div>

        {/* Home Menu Button */}
        <Menu as="div" className="relative w-full px-4 mt-4">
            <Link href="/home" passHref>
                <Menu.Button as="div" className="w-full p-3 bg-[#467750] rounded-lg hover:bg-[#2A3F3F] text-white text-left font-normal md:font-bold flex items-center cursor-pointer">
                    <Home className="text-2xl"></Home>
                    <span className="ml-2">Dashboard</span>
                </Menu.Button>
            </Link>
        </Menu>

        <Menu as="div" className="relative w-full px-4 mt-4">
            <Menu.Button className="w-full p-3 bg-[#467750] rounded-lg hover:bg-[#2A3F3F] text-white text-left font-normal md:font-bold flex items-center">
                <ShoppingCart className="mr-2" size={20} /> POS ▾
            </Menu.Button>
            <Menu.Items className="absolute left-4 mt-2 w-full bg-[#467750] text-white rounded-lg shadow-lg z-10">
                {[
                    { href: "/servicess", label: "Services", icon: <Layers size={20} /> },
                    { href: "/price-list", label: "Price List", icon: <FileText size={20} /> },
                    { href: "/items", label: "Service Groups", icon: <Package size={20} /> },
                ].map((link) => (
                    <Menu.Item key={link.href}>
                        {({ active }) => (
                            <Link href={link.href} className={`flex items-center space-x-4 p-3 rounded-lg ${active ? 'bg-[#2A3F3F] text-white' : ''}`}>
                                {link.icon}
                                <span className="font-normal md:font-bold">{link.label}</span>
                            </Link>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>

        <Menu as="div" className="relative w-full px-4 mt-4">
            <Menu.Button className="w-full p-3 bg-[#467750] rounded-lg hover:bg-[#2A3F3F] text-white text-left font-normal md:font-bold flex items-center">
                <BarChart className="mr-2" size={20} /> Sales ▾
            </Menu.Button>
            <Menu.Items className="absolute left-4 mt-2 w-full bg-[#467750] text-white rounded-lg shadow-lg z-10">
                {[
                    { href: "/customers", label: "Customers", icon: <Users size={20} /> },
                    { href: "/invoices", label: "Invoices", icon: <FileText size={20} /> },
                    { href: "/payments", label: "Payments", icon: <CreditCard size={20} /> },
                ].map((link) => (
                    <Menu.Item key={link.href}>
                        {({ active }) => (
                            <Link href={link.href} className={`flex items-center space-x-4 p-3 rounded-lg ${active ? 'bg-[#2A3F3F] text-white' : ''}`}>
                                {link.icon}
                                <span className="font-normal md:font-bold">{link.label}</span>
                            </Link>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>

        {/* Inventory Menu */}
        <Menu as="div" className="relative w-full px-4 mt-4">
            <Menu.Button className="w-full p-3 bg-[#467750] rounded-lg hover:bg-[#2A3F3F] text-white text-left font-normal md:font-bold flex items-center">
                <Package className="mr-2" size={20} /> Inventory ▾
            </Menu.Button>
            <Menu.Items className="absolute left-4 mt-2 w-full bg-[#467750] text-white rounded-lg shadow-lg z-10">
                {[
                    { href: "/products", label: "Products", icon: <Package size={20} /> },
                    { href: "/categories", label: "Product Category", icon: <Folder size={20} /> },
                    { href: "/stocks", label: "Stock Levels", icon: <ClipboardList size={20} /> },
                    { href: "/suppliers", label: "Supplier Management", icon: <Factory size={20} /> },
                    { href: "/purchase", label: "Purchase Order", icon: <ShoppingBag size={20} /> },
                ].map((link) => (
                    <Menu.Item key={link.href}>
                        {({ active }) => (
                            <Link href={link.href} className={`flex items-center space-x-4 p-3 rounded-lg ${active ? 'bg-[#2A3F3F] text-white' : ''}`}>
                                {link.icon}
                                <span className="font-normal md:font-bold">{link.label}</span>
                            </Link>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    </nav>

                <main className="flex-1 p-8 max-w-screen-xl mx-auto ml-64">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Details */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-400">
            <h2 className="text-lg font-bold mb-4">Product Details</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className={`text-2xl ${productDetails.lowStockItems < 10 ? 'text-red-600' : 'text-blue-600'}`}>
                        {productDetails.lowStockItems}
                    </p>
                    <p className="text-sm">LOW STOCK ITEMS</p>
                </div>
                <div>
                <p className={`text-xl ${inventorySummary.quantityInHand < 10 ? 'text-red-600' : 'text-blue-600'}`}>
                        {inventorySummary.quantityInHand}
                    </p>
                    <p className="text-sm">ALL ITEMS GROUPS</p>
                </div>
                <div>
                <p className={`text-xl ${inventorySummary.quantityInHand < 10 ? 'text-red-600' : 'text-blue-600'}`}>
                        {inventorySummary.quantityInHand}
                    </p>
                    <p className="text-sm">ALL ITEMS</p>
                </div>
            </div>
        </div>

        {/* Inventory Summary */}
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-400">
            <h2 className="text-lg font-bold mb-4">Inventory Summary</h2>
            <div className="grid grid-rows-2 gap-4">
                <div className="flex justify-between">
                    <p className="text-sm">QUANTITY IN HAND</p>
                    <p className={`text-xl ${inventorySummary.quantityInHand < 10 ? 'text-red-600' : 'text-blue-600'}`}>
                        {inventorySummary.quantityInHand}
                    </p>
                </div>
                <div className="flex justify-between">
                    <p className="text-sm">QUANTITY TO BE RECEIVED</p>
                    <p className={`text-xl ${inventorySummary.quantityToBeReceived < 10 ? 'text-red-600' : 'text-blue-600'}`}>
                        {inventorySummary.quantityToBeReceived}
                    </p>
                </div>
            </div>
        </div>
    </div>
</main>

            </div>

            {/* Modal */}
            {isModalOpen && (
                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Dialog.Panel className="bg-gradient-to-b from-[#77DD77] to-[#56A156] text-gray-900 p-6 rounded-lg shadow-xl w-full max-w-lg">
                        <Dialog.Title id="modal-title" className="text-lg font-bold text-gray-900 mb-4">Select Option</Dialog.Title>
                        <div id="modal-description" className="grid grid-cols-2 gap-6">
                            {/* General Section */}
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="text-xl">📊</div>
                                    <h2 className="font-semibold text-[#FFFFFF]-700">General</h2>
                                </div>
                                <ul className="space-y-2">
                                    <li>
                                        <button
                                            onClick={handleAddUser}
                                            className="text-[#FFFFFF]-600 hover:underline hover:text-blue-600"
                                        >
                                            + Add Users
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleAddService}
                                            className="text-[#FFFFFF]-600 hover:underline hover:text-blue-600"
                                        >
                                            + Services
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleAddServiceGroup}
                                            className="text-[#FFFFFF]-600 hover:underline hover:text-blue-600"
                                        >
                                            + Services Item Groups
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Sales Section */}
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="text-xl">🛒</div>
                                    <h2 className="font-semibold text-[#FFFFFF]-700">Sales</h2>
                                </div>
                                <ul className="space-y-2">
                                    <li>
                                        <button
                                            onClick={() => toast("Customers functionality triggered.")}
                                            className="text-[#FFFFFF]-600 hover:underline hover:text-blue-600"
                                        >
                                            + Customers
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => toast("Invoices functionality triggered.")}
                                            className="text-[#FFFFFF]-600 hover:underline hover:text-blue-600"
                                        >
                                            + Invoices
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => toast("Payments functionality triggered.")}
                                            className="text-[#FFFFFF]-600 hover:underline hover:text-blue-600"
                                        >
                                            + Payments
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
                        >
                            Close
                        </button>
                    </Dialog.Panel>
                </Dialog>
            )}
        </div>
    );
}

"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { BarChart } from "lucide-react";
import { Folder, ClipboardList, Factory, ShoppingBag } from "lucide-react";
import { Home, Users, FileText, CreditCard, Package, Layers, ShoppingCart, Settings, LogOut, Plus } from "lucide-react";

const navLinks = [
    { href: "/servicess", label: "Services", icon: "💆‍♀️" },
    { href: "/price-list", label: "Price List", icon: "📋" },
    { href: "/items", label: "Service Groups", icon: "📂" },
];

const salesLinks = [
    { href: "/customers", label: "Customers", icon: "👥" },
    { href: "/invoices", label: "Invoices", icon: "📜" },
    { href: "/payments", label: "Payments", icon: "💰" },
];

export default function ServiceItemGroups() {
    const router = useRouter();
    const [groups, setGroups] = useState([
        { name: "Hair Services", description: "16 Active Services" },
        { name: "Body and Relaxing Services", description: "3 Active Services" },
        { name: "Disode Lazer Services", description: "8 Active Services" },
        { name: "Nails and Foot Services", description: "6 Active Services" },
    ]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false); // New state for Add Group modal
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [newGroup, setNewGroup] = useState({
        name: "",
        description: "",
        status: "active",
        priceListAdjustment: "",
        serviceLink: "",
    });

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        const filteredGroups = groups.filter(group =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setGroups(filteredGroups);
    };

    const handleAddGroup = () => {
        setIsAddGroupModalOpen(true); // Open the Add Group modal
    };

    const handleEditGroup = (index) => {
        setSelectedGroup({
            ...groups[index],
            index,
            status: groups[index].status || "active", // Default to "active" if not set
            priceListAdjustment: groups[index].priceListAdjustment || "",
            serviceLink: groups[index].serviceLink || "",
        });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        if (!selectedGroup) return;
        setGroups((prev) => {
            const updatedGroups = [...prev];
            updatedGroups[selectedGroup.index] = {
                name: selectedGroup.name,
                description: selectedGroup.description,
                status: selectedGroup.status,
                priceListAdjustment: selectedGroup.priceListAdjustment,
                serviceLink: selectedGroup.serviceLink,
            };
            return updatedGroups;
        });
        setIsEditModalOpen(false);
        toast.success("Group updated successfully!");
    };

    const handleDeleteGroup = (index) => {
        setGroups((prev) => prev.filter((_, i) => i !== index));
        toast.success("Group deleted successfully!");
    };

    const handleAddGroupSubmit = (e) => {
        e.preventDefault();
        // Add the new group to the groups array
        setGroups((prev) => [
            ...prev,
            {
                name: newGroup.name,
                description: newGroup.description,
                status: newGroup.status,
                priceListAdjustment: newGroup.priceListAdjustment,
                serviceLink: newGroup.serviceLink,
            },
        ]);
        toast.success("Group added successfully!");
        setIsAddGroupModalOpen(false); // Close the modal
        // Reset the form
        setNewGroup({ name: "", description: "", status: "active", priceListAdjustment: "", serviceLink: "" });
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/";
      };

    return (
        <div className="flex flex-col h-screen bg-[#77DD77] text-gray-900">
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

                {/* Main Content */}
                <main className="flex-1 p-6 bg-white text-gray-900 ml-64">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Service Groups</h2>
                        <button className="px-4 py-2 bg-[#5BBF5B] hover:bg-[#56AE57] text-white rounded-lg" onClick={handleAddGroup}>
                            New Group List
                        </button>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-400">
                        <div className="space-y-4">
                            {groups.map((group, index) => (
                                <div key={index} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">{group.name}</h3>
                                        <p className="text-sm text-gray-600">{group.description}</p>
                                    </div>
                                    <Menu as="div" className="relative inline-block text-left">
                                        <Menu.Button>
                                            <EllipsisVerticalIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
                                        </Menu.Button>
                                        <Menu.Items className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-10">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`block w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-200" : ""}`}
                                                        onClick={() => handleEditGroup(index)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`block w-full text-left px-4 py-2 text-sm text-red-500 ${active ? "bg-gray-200" : ""}`}
                                                        onClick={() => handleDeleteGroup(index)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && selectedGroup && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-[600px]">
            <h2 className="text-lg font-bold mb-4">Edit Group</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* Description Field */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={selectedGroup.description}
                        onChange={(e) => setSelectedGroup({ ...selectedGroup, description: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-lime-100 text-gray-900 border-lime-300"
                        placeholder="Description"
                    />
                </div>

                {/* Name Field */}
                <div>
                    <label className="block text-sm font-medium">Group Name</label>
                    <input
                        type="text"
                        value={selectedGroup.name}
                        onChange={(e) => setSelectedGroup({ ...selectedGroup, name: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-lime-100 text-gray-900 border-lime-300"
                        placeholder="Group Name"
                    />
                </div>

                {/* Status Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                        value={selectedGroup.status || "active"} 
                        onChange={(e) => setSelectedGroup({ ...selectedGroup, status: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-lime-100 text-gray-900 border-lime-300"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Price List Adjustment Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">Price List Adjustment</label>
                    <select
                        value={selectedGroup.priceListAdjustment || ""}
                        onChange={(e) => setSelectedGroup({ ...selectedGroup, priceListAdjustment: e.target.value })}
                        className="w-full p-2 border rounded-lg bg-lime-100 text-gray-900 border-lime-300"
                    >
                        <option value="">Select Adjustment</option>
                        <option value="membership">Membership</option>
                        <option value="discount">Discount</option>
                        <option value="promotion">Promotion</option>
                    </select>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
                <button
                    type="button"
                    className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-lg"
                    onClick={() => setIsEditModalOpen(false)}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-lime-600 hover:bg-lime-400 text-white rounded-lg"
                >
                    Save Changes
                </button>
            </div>
        </div>
    </div>
)
}

            {/* Add Group Modal */}
            {isAddGroupModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-[600px]">
            <h2 className="text-lg font-bold mb-4">Add New Group</h2>
            <form onSubmit={handleAddGroupSubmit}>
                <div className="grid grid-cols-2 gap-4">

                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium">Group Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newGroup.name}
                            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg bg-lime-100 text-gray-900 border-lime-300"
                            placeholder="Group Name"
                            required
                        />
                    </div>

                    {/* Description Field */}
                    <div className="col-span-1">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={newGroup.description}
                            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg bg-lime-100 text-gray-900 border-lime-300"
                            placeholder="Description"
                            required
                        ></textarea>
                    </div>

                    {/* Status Dropdown */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={newGroup.status || "active"}
                            onChange={(e) => setNewGroup({ ...newGroup, status: e.target.value })}
                            className="w-full p-2 border rounded-lg bg-lime-100 text-gray-900 border-lime-300"
                            required
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Price List Adjustment Dropdown */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Price List Adjustment</label>
                        <select
                            value={newGroup.priceListAdjustment || ""}
                            onChange={(e) => setNewGroup({ ...newGroup, priceListAdjustment: e.target.value })}
                            className="w-full p-2 border rounded-lg bg-lime-100 text-gray-900 border-lime-300"
                            required
                        >
                            <option value="">Select Adjustment</option>
                            <option value="membership">Membership</option>
                            <option value="discount">Discount</option>
                            <option value="promotion">Promotion</option>
                        </select>
                    </div>

                    {/* Service Link to Groups Fetch */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Service Link</label>
                        <select
                            value={newGroup.serviceLink || ""}
                            onChange={(e) => setNewGroup({ ...newGroup, serviceLink: e.target.value })}
                            className="w-full p-2 border rounded-lg bg-lime-100 text-gray-900 border-lime-300"
                            required
                        >
                            <option value="">Select Service Group</option>
                            {groups.map((group, index) => (
                                <option key={index} value={group.name}>{group.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-lg"
                        onClick={() => setIsAddGroupModalOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-lime-600 hover:bg-lime-400 text-white rounded-lg"
                    >
                        Add Group
                    </button>
                </div>
            </form>
        </div>
    </div>
)}
        </div>
    );
}
"use client";

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
    { href: "/items", label: "Item Groups", icon: "📂" },
];

const salesLinks = [
    { href: "/customers", label: "Customers", icon: "👥" },
    { href: "/invoices", label: "Invoices", icon: "📜" },
    { href: "/payments", label: "Payments", icon: "💰" },
];

export default function ProductCategoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false); // New state for Add Category modal
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([
        { name: "Hair Products", description: "Description", products: "16 Active Services" },
        { name: "Body and Relaxing Products", description: "Description", products: "3 Active Services" },
        { name: "Diode Laser Products", description: "Description", products: "8 Active Services" },
        { name: "Nails and Foot Services", description: "Description", products: "6 Active Services" },
    ]);
    const [newCategory, setNewCategory] = useState({ // State for new category
        name: "",
        description: "",
        products: "0 Active Services", // Default value
        status: "Active", // Default value
        serviceLink: "",
    });

    const handleSearch = () => {
        const filteredGroups = groups.filter(group =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setGroups(filteredGroups);
    };

    const handleAddCategory = () => {
        setIsAddCategoryModalOpen(true); // Open the Add Category modal
    };

    const handleEditCategory = (index) => {
        setSelectedCategory({ ...categories[index], index });
        setIsModalOpen(true);
    };

    const handleDeleteCategory = (index) => {
        setCategories((prev) => prev.filter((_, i) => i !== index));
        toast.success("Category deleted successfully!");
    };

    const handleSaveCategory = () => {
        if (selectedCategory) {
            const updatedCategories = [...categories];
            updatedCategories[selectedCategory.index] = {
                name: selectedCategory.name,
                description: selectedCategory.description,
                products: selectedCategory.products,
                status: selectedCategory.status,
                serviceLink: selectedCategory.serviceLink,
            };
            setCategories(updatedCategories);
            toast.success("Category updated successfully!");
        }
        setIsModalOpen(false);
    };

    const handleAddCategorySubmit = (e) => {
        e.preventDefault();
        // Add the new category to the categories array
        setCategories((prev) => [...prev, newCategory]);
        toast.success("Category added successfully!");
        setIsAddCategoryModalOpen(false); // Close the modal
        // Reset the form
        setNewCategory({
            name: "",
            description: "",
            products: "0 Active Services",
            status: "Active",
            serviceLink: "",
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/";
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 text-gray-900">
            <Toaster />

            {/* Header */}
            <header className="flex items-center justify-between bg-[#56A156] text-white p-4 w-full">
                <div className="flex items-center space-x-4">
                    <Link href="/home">
                        <button className="text-2xl">🏠</button>
                    </Link>
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
                <nav className="w-64 bg-gradient-to-b from-[#77DD77] to-[#56A156] text-gray-900 flex flex-col items-center py-6">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Lizly Skin Care Clinic</h1>

                    <Menu as="div" className="relative w-full px-4 mt-4">
                        <Menu.Button className="w-full p-3 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-left font-normal md:font-bold flex items-center">
                            <ShoppingCart className="mr-2" size={20} /> POS ▾
                        </Menu.Button>
                        <Menu.Items className="absolute left-4 mt-2 w-full bg-[#66C466] text-gray-900 rounded-lg shadow-lg z-10">
                            {[
                                { href: "/servicess", label: "Services", icon: <Layers size={20} /> },
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

                    <Menu as="div" className="relative w-full px-4 mt-4">
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
                    <Menu as="div" className="relative w-full px-4 mt-4">
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
                <main className="flex-1 p-8 bg-gradient-to-b from-[#77DD77] to-[#CFFFCF]">
                    {/* Header section */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">All Product Categories</h2>
                        <button
                            className="px-4 py-2 bg-[#5BBF5B] text-white rounded-lg hover:bg-[#56AE57]"
                            onClick={handleAddCategory}
                        >
                            Add Category List
                        </button>
                    </div>

                    {/* Categories Table */}
                    <div className="p-6 bg-white rounded-lg shadow">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-4 font-medium">Name and Description</th>
                                    <th className="py-2 px-4 font-medium">Product Linked</th>
                                    <th className="py-2 px-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 px-4">
                                            <h3 className="font-semibold">{category.name}</h3>
                                            <p className="text-sm text-gray-600">{category.description}</p>
                                        </td>
                                        <td className="py-2 px-4">{category.products}</td>
                                        <td className="py-2 px-4">
                                            <Menu as="div" className="relative inline-block">
                                                <Menu.Button>
                                                    <EllipsisVerticalIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
                                                </Menu.Button>
                                                <Menu.Items className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`block w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-200" : ""}`}
                                                                onClick={() => handleEditCategory(index)}
                                                            >
                                                                Edit
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${active ? "bg-gray-200" : ""}`}
                                                                onClick={() => handleDeleteCategory(index)}
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Menu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Edit Category Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-lg font-bold mb-4">Edit Category</h2>
                                <label className="block text-sm font-medium">Category Name</label>
                                <input
                                    type="text"
                                    value={selectedCategory?.name || ""}
                                    onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                                    className="w-full px-3 py-2 border bg-lime-100 border border-lime-300 rounded-lg mb-3"
                                />
                                <label className="block text-sm font-medium">Description</label>
                                <textarea
                                    value={selectedCategory?.description || ""}
                                    onChange={(e) => setSelectedCategory({ ...selectedCategory, description: e.target.value })}
                                    className="w-full px-3 py-2 border bg-lime-100 border border-lime-300 rounded-lg mb-3"
                                ></textarea>
                                <label className="block text-sm font-medium">Status</label>
                                <select
                                    value={selectedCategory?.status || "Active"}
                                    onChange={(e) => setSelectedCategory({ ...selectedCategory, status: e.target.value })}
                                    className="w-full px-3 py-2 border bg-lime-100 border border-lime-300 rounded-lg mb-3"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                <label className="block text-sm font-medium">Service Link</label>
                                <input
                                    type="text"
                                    value={selectedCategory?.serviceLink || ""}
                                    onChange={(e) => setSelectedCategory({ ...selectedCategory, serviceLink: e.target.value })}
                                    className="w-full px-3 py-2 border bg-lime-100 border border-lime-300 rounded-lg mb-3"
                                />
                                <button className="px-4 py-2 bg-gray-300 bg-lime-500 border border-lime-500 rounded-lg w-full mb-3">Edit Services</button>
                                <div className="flex justify-between">
                                    <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setIsModalOpen(false)}>
                                        Cancel
                                    </button>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={() => handleDeleteCategory(selectedCategory.index)}>
                                        Delete
                                    </button>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={handleSaveCategory}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add Category Modal */}
                    {isAddCategoryModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-96">
                                <h2 className="text-lg font-bold mb-4">Add New Category</h2>
                                <form onSubmit={handleAddCategorySubmit}>
                                    <label className="block text-sm font-medium">Category Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        className="w-full px-3 py-2 border bg-lime-100 border border-lime-300 rounded-lg mb-3"
                                        required
                                    />
                                    <label className="block text-sm font-medium">Description</label>
                                    <textarea
                                        name="description"
                                        value={newCategory.description}
                                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                        className="w-full px-3 py-2 border bg-lime-100 border border-lime-300 rounded-lg mb-3"
                                        required
                                    ></textarea>
                                    <label className="block text-sm font-medium">Status</label>
                                    <select
                                        name="status"
                                        value={newCategory.status}
                                        onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
                                        className="w-full px-3 py-2 border bg-lime-100 border border-lime-300 rounded-lg mb-3"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    <label className="block text-sm font-medium">Service Link</label>
                                    <input
                                        type="text"
                                        name="serviceLink"
                                        value={newCategory.serviceLink}
                                        onChange={(e) => setNewCategory({ ...newCategory, serviceLink: e.target.value })}
                                        className="w-full px-3 py-2 border bg-lime-100 border border-lime-300 rounded-lg mb-3"
                                    />
                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-gray-300 rounded-lg"
                                            onClick={() => setIsAddCategoryModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                        >
                                            Add Category
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
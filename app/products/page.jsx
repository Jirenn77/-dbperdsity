"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { Dialog } from "@headlessui/react";
import { Menu } from "@headlessui/react";
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

export default function InventoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalType, setModalType] = useState("view");
    const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

    const [newItem, setNewItem] = useState({ 
        name: "",
        category: "",
        type: "",
        stockQty: 0,
        service: "",
        description: "",
        unitPrice: 0,
        supplier: "",
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost/API/getInventory.php?action=get_products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                toast.error("Error fetching products.");
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = () => {
        toast(`Searching for: ${searchQuery}`);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleEdit = () => {
        toast.success("Edit button clicked!");
        // Add your edit logic here
    };

    const handleCloneItem = () => {
        toast.success("Item cloned!");
        setIsMoreModalOpen(false);
        // Add your clone logic here
    };

    const handleMarkAsInactive = () => {
        toast.success("Item marked as inactive!");
        setIsMoreModalOpen(false);
        // Add your mark as inactive logic here
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedItem.name}?`)) {
            toast.success("Item deleted!");
            setSelectedItem(null);
            setIsMoreModalOpen(false);
            // Add your delete logic here
        }
    };

    const handleAddToGroup = () => {
        toast.success("Item added to group!");
        setIsMoreModalOpen(false);
        // Add your add to group logic here
    };

    const handleCheckboxChange = (item) => {
        // If the clicked item is already selected, deselect it
        if (selectedItem?.name === item.name) {
            setSelectedItem(null);
        } else {
            // Otherwise, set the clicked item as the selected item
            setSelectedItem(item);
        }
    };

    const handleAddItem = () => {
        setIsAddItemModalOpen(true); // Open the "Add Item" modal
    };

    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddItemSubmit = (e) => {
        e.preventDefault();
        // Add the new item to the products array
        setProducts((prevProducts) => [...prevProducts, newItem]);
        toast.success("Item added successfully!");
        setIsAddItemModalOpen(false); // Close the modal
        // Reset the new item form
        setNewItem({
            name: "",
            category: "",
            type: "",
            stockQty: 0,
            service: "",
            description: "",
            unitPrice: 0,
            supplier: "",
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/";
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-[#77DD77] to-[#56A156] text-gray-900">
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
                <main className="flex-1 p-6 bg-gradient-to-b from-[#77DD77] to-[#CFFFCF] text-gray-900 flex">
                    {/* Table Section */}
                    <div className="flex-1 pr-4">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold">All Items</h1>
                            <button
                                onClick={handleAddItem}
                                className="bg-[#5BBF5B] text-white py-2 px-4 rounded hover:bg-[#56AE57]"
                            >
                                + New Item
                            </button>
                        </div>

                        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-[#77DD77] text-black">
                                <tr>
                                    <th className="text-center py-2 px-4 w-12"></th>
                                    <th className="text-left py-2 px-4">Name</th>
                                    <th className="text-left py-2 px-4">Category</th>
                                    <th className="text-left py-2 px-4">Type</th>
                                    <th className="text-right py-2 px-4">Stock Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        name: "Loreal Paris Elvive",
                                        category: "Hair Product",
                                        type: "Hair Services",
                                        stockQty: 45,
                                        service: "Hair Treatment",
                                        description: "Professional hair care product",
                                        unitPrice: 395,
                                        supplier: "James"
                                    },
                                    {
                                        name: "GiGi Honee Wax",
                                        category: "Skincare Product",
                                        type: "Underarm Services",
                                        stockQty: 56,
                                        service: "Waxing Service",
                                        description: "Professional waxing product",
                                        unitPrice: 18.50,
                                        supplier: "SkinCare Solutions"
                                    },
                                    {
                                        name: "Kerazon Brazilian Hair",
                                        category: "Hair Product",
                                        type: "Hair Services",
                                        stockQty: 56,
                                        service: "Hair Extension",
                                        description: "High-quality Brazilian hair",
                                        unitPrice: 120.00,
                                        supplier: "Hair World"
                                    },
                                    {
                                        name: "Majestic Hair Botox",
                                        category: "Hair Product",
                                        type: "Hair Services",
                                        stockQty: 56,
                                        service: "Hair Treatment",
                                        description: "Professional hair botox treatment",
                                        unitPrice: 85.00,
                                        supplier: "Luxury Hair Care"
                                    },
                                ].map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                    >
                                        <td className="py-2 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedItem?.name === item.name}
                                                onChange={() => handleCheckboxChange(item)}
                                                className="w-4 h-4 text-[#56A156] rounded focus:ring-[#56A156]"
                                            />
                                        </td>
                                        <td className="py-2 px-4 text-blue-600 underline cursor-pointer">
                                            {item.name}
                                        </td>
                                        <td className="py-2 px-4">{item.category}</td>
                                        <td className="py-2 px-4">{item.type}</td>
                                        <td className="py-2 px-4 text-right">{item.stockQty}</td>
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
                                    onClick={handleEdit}
                                    className="p-1 text-gray-700 hover:bg-gray-100 rounded"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => setIsMoreModalOpen(true)}
                                    className="p-1 text-gray-700 hover:bg-gray-100 rounded"
                                >
                                    More
                                </button>
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
                                        <td className="font-medium py-2">Service type:</td>
                                        <td className="py-2">{selectedItem.service || "Hair Services"}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium py-2">Description:</td>
                                        <td className="py-2">{selectedItem.description || "Professional hair care product"}</td>
                                    </tr>
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
                                        <td className="py-2">P{selectedItem.unitPrice || "395"}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium py-2">Total Value:</td>
                                        <td className="py-2">P{(selectedItem.stockQty * (selectedItem.unitPrice || 395)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium py-2">Supplier Name:</td>
                                        <td className="py-2">{selectedItem.supplier || "James"}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium py-2">Inventory Link:</td>
                                        <td className="py-2">
                                            <Link href="/inventory" className="text-blue-600 hover:underline">
                                                Hair Services
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-end space-x-2 mt-4">
                                
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Add Item Modal */}
            {isAddItemModalOpen && (
                <Dialog open={isAddItemModalOpen} onClose={() => setIsAddItemModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Dialog.Panel className="bg-white bg-opacity-90 p-6 rounded-lg shadow-xl w-96">
                        <Dialog.Title className="text-lg font-bold mb-4 text-gray-800">Add New Item</Dialog.Title>
                        <form onSubmit={handleAddItemSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newItem.name}
                                        onChange={handleNewItemChange}
                                        className="w-full px-3 py-2 border rounded-lg bg-lime-100 text-gray-900 border border-lime-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={newItem.category}
                                        onChange={handleNewItemChange}
                                        className="w-full px-3 py-2 border rounded-lg bg-lime-100 text-gray-900 border border-lime-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900">Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={newItem.type}
                                        onChange={handleNewItemChange}
                                        className="w-full px-3 py-2 border rounded-lg bg-lime-100 text-gray-900 border border-lime-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900">Stock Quantity</label>
                                    <input
                                        type="number"
                                        name="stockQty"
                                        value={newItem.stockQty}
                                        onChange={handleNewItemChange}
                                        className="w-full px-3 py-2 border rounded-lg bg-lime-100 text-gray-900 border border-lime-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900">Unit Price</label>
                                    <input
                                        type="number"
                                        name="unitPrice"
                                        value={newItem.unitPrice}
                                        onChange={handleNewItemChange}
                                        className="w-full px-3 py-2 border rounded-lg bg-lime-100 text-gray-900 border border-lime-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900">Supplier</label>
                                    <input
                                        type="text"
                                        name="supplier"
                                        value={newItem.supplier}
                                        onChange={handleNewItemChange}
                                        className="w-full px-3 py-2 border rounded-lg bg-lime-100 text-gray-900 border border-lime-300"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddItemModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#5BBF5B] text-white rounded hover:bg-[#4CAF4C]"
                                >
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </Dialog>
            )}

            {/* More Button Modal */}
            {isMoreModalOpen && (
                <Dialog open={isMoreModalOpen} onClose={() => setIsMoreModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl w-80">
                        <Dialog.Title className="text-lg font-bold mb-4 text-gray-800">
                            More Options
                        </Dialog.Title>
                        <div className="space-y-2">
                            <button
                                onClick={handleCloneItem}
                                className="w-full p-2 text-left hover:bg-gray-100 rounded text-gray-800"
                            >
                                Clone Item
                            </button>
                            <button
                                onClick={handleMarkAsInactive}
                                className="w-full p-2 text-left hover:bg-gray-100 rounded text-gray-800"
                            >
                                Mark as Inactive
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-full p-2 text-left hover:bg-gray-100 rounded text-red-600 text-gray-800"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleAddToGroup}
                                className="w-full p-2 text-left hover:bg-gray-100 rounded text-gray-800"
                            >
                                Add to Group
                            </button>
                        </div>
                        <button
                            onClick={() => setIsMoreModalOpen(false)}
                            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-gray-800"
                        >
                            Close
                        </button>
                    </Dialog.Panel>
                </Dialog>
            )}

            {/* Modal Dialog */}
            {isModalOpen && (
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl">
                        <Dialog.Title className="text-lg font-bold mb-4">
                            {modalType === "view" ? "View Item" : "Edit Item"}
                        </Dialog.Title>
                        <p>Name: {selectedItem?.name}</p>
                        <p>Category: {selectedItem?.category}</p>
                        {modalType === "edit" && (
                            <input
                                type="text"
                                className="border p-2 mt-2 w-full"
                                defaultValue={selectedItem?.name}
                            />
                        )}
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
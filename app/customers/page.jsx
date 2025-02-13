"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { Menu } from "@headlessui/react";
import { BarChart } from "lucide-react";
import { Folder, ClipboardList, Factory, ShoppingBag } from "lucide-react";
import { Home, Users, FileText, CreditCard, Package, Layers, ShoppingCart, Settings, LogOut, Plus } from "lucide-react";

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

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const fetchCustomers = async () => {
      const data = [
        {
          id: 1,
          name: "Lucy Anne",
          contact: "09123456789",
          email: "lucyy@gmail.com",
          address: "123 Main St, Anytown",
        },
        {
          id: 2,
          name: "Mrs. Garamuda",
          contact: "09876543210",
          email: "garamuds@gmail.com",
          address: "456 Elm St, Othertown",
        },
      ];
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  const handleSearch = () => {
    toast(`Searching for: ${searchQuery}`);
    console.log("Search query:", searchQuery);
};

  const handleEdit = () => {
    setEditMode(true);
    setFormData(selectedCustomer);
  };

  const handleSave = () => {
    setEditMode(false);
    // Add your save logic here
    toast.success("Changes saved successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
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
          <div className="grid grid-cols-3 gap-6">
            {/* Customers List */}
            <div className="col-span-1 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-bold mb-4">All Customers</h2>
              <ul className="space-y-2">
                {customers.map((customer) => (
                  <li
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className={`p-2 rounded-lg cursor-pointer hover:bg-[#E3F9E5] ${selectedCustomer?.id === customer.id ? "bg-[#C5F0C5]" : ""
                      }`}
                  >
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-green-600"
                      />
                      <span>{customer.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Details */}
            {selectedCustomer && (
              <div className="col-span-2 bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">{selectedCustomer.name}</h2>
                  <div className="space-x-2">
                    {!editMode ? (
                      <button
                        onClick={handleEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <p>{selectedCustomer.contact}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <p>{selectedCustomer.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    {editMode ? (
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <p>{selectedCustomer.address}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

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
  { href: "/price-list", label: "Price List", icon: "📋" },
  { href: "/items", label: "Item Groups", icon: "📂" },
];

const salesLinks = [
  { href: "/customers", label: "Customers", icon: "👥" },
  { href: "/invoices", label: "Invoices", icon: "📜" },
  { href: "/payments", label: "Payments", icon: "💰" },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Sample data
    const fetchPayments = async () => {
      const data = [
        { id: 1, customer: "Lucy Anne", amount: 500, date: "2024-02-10" },
        { id: 2, customer: "Mrs. Garamuda", amount: 1000, date: "2024-02-09" },
        { id: 3, customer: "John Doe", amount: 750, date: "2024-02-08" },
        { id: 4, customer: "Jane Smith", amount: 300, date: "2024-02-07" },
      ];
      setPayments(data);
    };
    fetchPayments();
  }, []);

  const handleSearch = () => {
    toast(`Searching for: ${searchQuery}`);
  };

  const handleCheckboxChange = (paymentId) => {
    setSelectedPayments((prevSelected) =>
      prevSelected.includes(paymentId)
        ? prevSelected.filter((id) => id !== paymentId)
        : [...prevSelected, paymentId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };


  const filteredPayments = payments.filter(payment =>
    payment.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                
        <main className="flex-1 p-8 bg-bg-gradient-to-b from-[#77DD77] to-[#CFFFCF]">
          <h2 className="text-lg font-bold mb-4">Payment Receipts</h2>
          <ul className="space-y-2">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <li key={payment.id} className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedPayments.includes(payment.id)}
                    onChange={() => handleCheckboxChange(payment.id)}
                    className="mr-4"
                  />
                  <div>
                    <p><strong>Customer:</strong> {payment.customer}</p>
                    <p><strong>Amount:</strong> ₱{payment.amount}</p>
                    <p><strong>Date:</strong> {payment.date}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="bg-white p-4 rounded-lg shadow">
                <p>No payments found</p>
              </li>
            )}
          </ul>
        </main>
      </div>
    </div>
  );
}

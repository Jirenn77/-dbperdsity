"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { Menu } from "@headlessui/react";

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

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      const data = [
        {
          id: 1,
          customer: "Lucy Anne",
          amount: "$150",
          date: "2025-02-10",
          status: "Paid",
        },
        {
          id: 2,
          customer: "Mrs. Garamuda",
          amount: "$200",
          date: "2025-02-09",
          status: "Unpaid",
        },
      ];
      setInvoices(data);
    };
    fetchInvoices();
  }, []);

  const handleSearch = () => {
    toast(`Searching for: ${searchQuery}`);
  };

  const handleEdit = () => {
    setEditMode(true);
    setFormData(selectedInvoice);
  };

  const handleSave = () => {
    setEditMode(false);
    toast.success("Invoice updated successfully");
  };

  return (
    <div className="flex flex-col h-screen bg-[#77DD77] text-gray-900">
      <Toaster />
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
          <button onClick={handleSearch} className="px-3 py-1.5 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-white text-sm">
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
        <main className="flex-1 p-8 bg-gradient-to-b from-[#77DD77] to-[#CFFFCF]">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-bold mb-4">All Invoices</h2>
              <ul className="space-y-2">
                {invoices.map((invoice) => (
                  <li
                    key={invoice.id}
                    onClick={() => setSelectedInvoice(invoice)}
                    className={`p-2 rounded-lg cursor-pointer hover:bg-[#E3F9E5] ${selectedInvoice?.id === invoice.id ? "bg-[#C5F0C5]" : ""}`}
                  >
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-green-600"
                      />
                      <span>{invoice.customer} - {invoice.amount}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {selectedInvoice && (
              <div className="col-span-2 bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Invoice for {selectedInvoice.customer}</h2>
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
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label className="font-medium">Amount:</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="px-4 py-2 rounded-lg bg-[#f1f1f1] text-gray-900"
                      />
                    ) : (
                      <span>{selectedInvoice.amount}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium">Date:</label>
                    {editMode ? (
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="px-4 py-2 rounded-lg bg-[#f1f1f1] text-gray-900"
                      />
                    ) : (
                      <span>{selectedInvoice.date}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium">Status:</label>
                    {editMode ? (
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="px-4 py-2 rounded-lg bg-[#f1f1f1] text-gray-900"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                      </select>
                    ) : (
                      <span>{selectedInvoice.status}</span>
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

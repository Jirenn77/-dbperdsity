"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { Menu } from "@headlessui/react";

const navLinks = [
  { href: "/servicess", label: "Services", icon: "💆‍♀️" },
  { href: "/price-list", label: "Price List", icon: "📋" },
];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchServices = async () => {
      const data = [
        {
          id: 1,
          name: "Haircut Rebond",
          type: "Hair Services",
          description: "Haircut and rebonding treatment.",
          price: "P999.00",
          adjustment: "Holiday Special",
          link: "Inventory Link 1",
        },
        {
          id: 2,
          name: "Hair Botox Treatment",
          type: "Hair Services",
          description: "Botox treatment for hair.",
          price: "P1200.00",
          adjustment: "Regular Price",
          link: "Inventory Link 2",
        },
      ];
      setServices(data);
    };
    fetchServices();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setFormData(selectedService);
  };

  const handleSave = () => {
    setEditMode(false);
    // Add your save logic here
    toast.success("Changes saved successfully");
  };

  return (
    <div className="flex flex-col h-screen bg-[#77DD77] text-gray-900">
      <Toaster />

      {/* Header */}
      <header className="flex items-center justify-between bg-[#56A156] text-white p-4 w-full">
        <Link href="/home">
          <button className="text-2xl">🏠</button>
        </Link>
        <h1 className="text-2xl font-bold">Services</h1>
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
        <nav className="w-64 bg-[#66C466] text-white flex flex-col items-center py-6">
          <h1 className="text-2xl font-bold mb-6">Lizly Skin Care Clinic</h1>
          <Menu as="div" className="relative w-full px-4">
            <Menu.Button className="w-full p-3 bg-[#5BBF5B] rounded-lg hover:bg-[#4CAF4C] text-left flex items-center">
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
                      <span className="font-medium">{link.label}</span>
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
        <main className="flex-1 p-8 bg-[#77DD77]">
          <div className="grid grid-cols-3 gap-6">
            {/* Services List */}
            <div className="col-span-1 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-bold mb-4">All Services</h2>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-2 rounded-lg cursor-pointer hover:bg-[#E3F9E5] ${
                      selectedService?.id === service.id ? "bg-[#C5F0C5]" : ""
                    }`}
                  >
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-green-600"
                      />
                      <span>{service.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Details */}
            {selectedService && (
              <div className="col-span-2 bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">{selectedService.name}</h2>
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
                    <label className="block text-sm font-medium mb-1">Service Type</label>
                    {editMode ? (
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full p-2 border rounded"
                      >
                        <option>Hair Services</option>
                        <option>Skin Services</option>
                        <option>Nail Services</option>
                      </select>
                    ) : (
                      <p>{selectedService.type}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    {editMode ? (
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <p>{selectedService.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Price</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          className="w-full p-2 border rounded"
                        />
                      ) : (
                        <p>{selectedService.price}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Price Adjustment</label>
                      {editMode ? (
                        <select
                          value={formData.adjustment}
                          onChange={(e) => setFormData({...formData, adjustment: e.target.value})}
                          className="w-full p-2 border rounded"
                        >
                          <option>Holiday Special</option>
                          <option>Regular Price</option>
                          <option>Seasonal Discount</option>
                        </select>
                      ) : (
                        <p>{selectedService.adjustment}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Inventory Link</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={formData.link}
                        onChange={(e) => setFormData({...formData, link: e.target.value})}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      <a href="#" className="text-blue-600 hover:underline">
                        {selectedService.link}
                      </a>
                    )}
                  </div>
                </div>

                {/* More Section */}
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-medium mb-2">More</h3>
                  <button className="text-blue-600 hover:text-blue-800">
                    + Add Additional Option
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
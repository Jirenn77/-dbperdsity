"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const navLinks = [
    { href: "/services", label: "Services", icon: "\uD83D\uDC86\u200D♀️" },
    { href: "/price-list", label: "Price List", icon: "\uD83D\uDCCB" },
    { href: "/items", label: "Item Groups", icon: "📂" },
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
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleAddGroup = () => {
        router.push("/new-group");
    };

    const handleEditGroup = (index) => {
        setSelectedGroup({ ...groups[index], index });
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        setGroups((prev) => {
            const updatedGroups = [...prev];
            updatedGroups[selectedGroup.index] = {
                name: selectedGroup.name,
                description: selectedGroup.description,
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

    return (
        <div className="flex flex-col h-screen bg-[#77DD77] text-gray-900">
            <Toaster />

            {/* Header */}
            <header className="flex items-center justify-between bg-[#56A156] text-white p-4 w-full">
                <div className="flex items-center space-x-4">
                    <Link href="/home">
                        <button className="text-2xl">🏠</button>
                    </Link>
                </div>
                <div className="flex items-center space-x-4 flex-grow justify-center">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-64"
                    />
                    <Button className="bg-[#5BBF5B] hover:bg-[#4CAF4C]">Search</Button>
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
                                            className={`flex items-center space-x-4 p-3 rounded-lg ${active ? "bg-[#4CAF4C] text-white" : ""}`}
                                        >
                                            <span className="text-xl">{link.icon}</span>
                                            <span className="font-medium">{link.label}</span>
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Menu>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Service Item Groups</h2>
                        <Button
                            className="bg-[#5BBF5B] hover:bg-[#4CAF4C]"
                            onClick={handleAddGroup}
                        >
                            New Group List
                        </Button>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow">
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
                                                        className={`block w-full text-left px-4 py-2 text-sm ${active ? "bg-gray-200" : ""}`}
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
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Group</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Group Name"
                            value={selectedGroup?.name || ""}
                            onChange={(e) => setSelectedGroup({ ...selectedGroup, name: e.target.value })}
                        />
                        <Textarea
                            placeholder="Description"
                            value={selectedGroup?.description || ""}
                            onChange={(e) => setSelectedGroup({ ...selectedGroup, description: e.target.value })}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEdit}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

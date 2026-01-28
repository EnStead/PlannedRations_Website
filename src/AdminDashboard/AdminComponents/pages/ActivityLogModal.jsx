import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { X, MoreVertical, Filter, Download, Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import api from "../../../Utility/api";
import { useQuery } from "@tanstack/react-query";
import MealSpoon from '../../../assets/MealSpoon.svg'

const FILTER_OPTIONS = [
  "User Management",
  "Subscriptions",
  "Content Management",
  "Recipes & Ingredient", 
  "Tags & Category",
  "Challenges",
  "System & Settings",
];

const MODULE_MAPPING = {
  "User Management": ["User", "Profile"],
  "Subscriptions": ["Subscription", "Plan"],
  "Content Management": ["Post", "Article", "Blog"],
  "Recipes & Ingredient": ["Recipe", "Ingredient"],
  "Tags & Category": ["Tag", "Category"],
  "Challenges": ["Challenge", "Badge"],
  "System & Settings": ["Auth", "System", "Admin"],
};

const ActivityLogModal = ({ open, onOpenChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["audits"],
    queryFn: async () => {
      const res = await api.get("/admin/audits");
      return res.data.data;
    },
    enabled: open,
  });

  const allAudits = data?.audits?.data || [];

  // Client-side filtering
  const filteredAudits = selectedFilters.length === 0 
    ? allAudits 
    : allAudits.filter(audit => {
        return selectedFilters.some(filter => 
            MODULE_MAPPING[filter]?.includes(audit.module)
        );
    });

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleDownloadCSV = () => {
    if (!filteredAudits.length) return;

    const headers = ["Date", "Admin", "Action", "Module", "Description", "IP Address"];
    const rows = filteredAudits.map(audit => [
      new Date(audit.created_at).toLocaleString(),
      audit.admin?.name || "Unknown",
      audit.action,
      audit.module,
      audit.description,
      audit.ip_address
    ].map(e => `"${String(e || "").replace(/"/g, '""')}"`).join(","));

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "activity_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 604800;
    if (interval > 1) return Math.floor(interval) + " weeks ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50" />
        <Dialog.Content className="fixed z-50 top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-lg p-0 flex flex-col transform transition-transform duration-300 ease-in-out focus:outline-none">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="p-2 hover:bg-gray-100 rounded-full outline-none transition-colors">
                            <MoreVertical size={20} className="text-gray-600" />
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 min-w-[200px] z-[60]" align="start" sideOffset={5}>
                            
                            {/* Filter Submenu */}
                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer outline-none select-none">
                                    <div className="flex items-center gap-2">
                                        <Filter size={16} />
                                        <span>Filter Activity</span>
                                    </div>
                                    <ChevronRight size={14} />
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 min-w-[200px] z-[60]" sideOffset={2} alignOffset={-5}>
                                        {FILTER_OPTIONS.map((option) => (
                                            <DropdownMenu.Item 
                                                key={option}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer outline-none select-none"
                                                onSelect={(e) => {
                                                    e.preventDefault();
                                                    toggleFilter(option);
                                                }}
                                            >
                                                <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${selectedFilters.includes(option) ? 'bg-brand-secondary border-brand-secondary' : 'border-gray-300'}`}>
                                                    {selectedFilters.includes(option) && <Check size={10} className="text-white" />}
                                                </div>
                                                {option}
                                            </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Sub>

                            <DropdownMenu.Item 
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer outline-none select-none"
                                onSelect={handleDownloadCSV}
                            >
                                <Download size={16} />
                                <span>Download as CSV</span>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Activity Log
                </Dialog.Title>

                <Dialog.Close asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600 outline-none transition-colors">
                        <X size={20} />
                    </button>
                </Dialog.Close>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                    </div>
                ) : isError ? (
                    <p className="text-center text-red-500 mt-10">Failed to load activities.</p>
                ) : filteredAudits.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">No activity found.</p>
                ) : (
                    <div className="space-y-6">
                        {filteredAudits.map((audit) => (
                            <div key={audit.id} className="flex gap-4 items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-brand-offwhite flex items-center justify-center text-xs font-bold text-brand-primary border border-brand-planoff uppercase">
                                        <img src={MealSpoon} alt="" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-800 leading-relaxed">
                                        <span className="font-semibold text-brand-primary">{audit.admin?.name}</span> {audit.description.replace(audit.admin?.name, '').trim()}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {timeAgo(audit.created_at)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ActivityLogModal;
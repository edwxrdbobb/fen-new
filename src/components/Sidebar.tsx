import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Utensils, Hotel, MapPin, ShoppingBag, Clapperboard,
  Car, HeartPulse, GraduationCap, Landmark, Ticket,
  Music, Hammer, Globe, Briefcase, Trophy, Palette,
  Pizza, Users, Moon, TreePine, LayoutGrid
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "locations" | "events";
  onTabChange: (tab: "locations" | "events") => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  selectedCategory,
  onCategoryChange,
}: SidebarProps) {
  const locationCategories = useQuery(api.locations.getCategories) || [];
  const eventCategories = useQuery(api.events.getCategories) || [];

  const categories = activeTab === "locations" ? locationCategories : eventCategories;

  const getCategoryIcon = (id: string) => {
    const icons: Record<string, any> = {
      // Locations
      restaurant: Utensils,
      hotel: Hotel,
      attraction: MapPin,
      shopping: ShoppingBag,
      entertainment: Clapperboard,
      transport: Car,
      health: HeartPulse,
      education: GraduationCap,
      culture: Landmark,
      nature: TreePine,
      // Events
      festival: Ticket,
      concert: Music,
      workshop: Hammer,
      tour: Globe,
      conference: Briefcase,
      sports: Trophy,
      art: Palette,
      food: Pizza,
      community: Users,
      nightlife: Moon,
    };
    return icons[id] || MapPin;
  };

  return (
    <>
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Explore</h2>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="mt-4 flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => onTabChange("locations")}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${activeTab === "locations"
                  ? "bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                Locations
              </button>
              <button
                onClick={() => onTabChange("events")}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${activeTab === "events"
                  ? "bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                Events
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <button
                onClick={() => onCategoryChange("")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${selectedCategory === ""
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                <LayoutGrid className="w-5 h-5" />
                <span className="font-medium">All {activeTab === "locations" ? "Locations" : "Events"}</span>
              </button>

              {categories.map((category) => {
                const Icon = getCategoryIcon(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${selectedCategory === category.id
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="font-medium">Add New {activeTab === "locations" ? "Location" : "Event"}</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Create Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

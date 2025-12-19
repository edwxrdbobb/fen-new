import { useRef, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { LocationCard } from "../cards/LocationCard";
import { EventCard } from "../cards/EventCard";
import { DetailsModal } from "../DetailsModal";

interface CardViewProps {
  activeTab: "locations" | "events";
  searchQuery: string;
  selectedCategory: string;
}

export function CardView({ activeTab, searchQuery, selectedCategory }: CardViewProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const locations = useQuery(api.locations.list, {
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
    limit: 20,
  });

  const events = useQuery(api.events.list, {
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
    limit: 20,
  });

  const data = activeTab === "locations" ? locations : events;
  const isLoading = data === undefined;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeTab} found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : `No ${activeTab} available in this category`}
          </p>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Add New {activeTab === "locations" ? "Location" : "Event"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {activeTab === "locations" ? "Discover Locations" : "Upcoming Events"}
        </h2>
        <p className="text-gray-600">
          {data.length} {activeTab} found
          {selectedCategory && ` in ${selectedCategory}`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item) => (
          activeTab === "locations" ? (
            <LocationCard
              key={item._id}
              location={item}
              onClick={() => setSelectedItem(item)}
            />
          ) : (
            <EventCard
              key={item._id}
              event={item}
              onClick={() => setSelectedItem(item)}
            />
          )
        ))}
      </div>

      <DetailsModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        type={activeTab === "locations" ? "location" : "event"}
      />
    </div>
  );
}

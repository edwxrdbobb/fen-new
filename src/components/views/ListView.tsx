import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { LocationListItem } from "../list/LocationListItem";
import { EventListItem } from "../list/EventListItem";

interface ListViewProps {
  activeTab: "locations" | "events";
  searchQuery: string;
  selectedCategory: string;
}

export function ListView({ activeTab, searchQuery, selectedCategory }: ListViewProps) {
  const locations = useQuery(api.locations.list, {
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
    limit: 50,
  });

  const events = useQuery(api.events.list, {
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
    limit: 50,
  });

  const data = activeTab === "locations" ? locations : events;
  const isLoading = data === undefined;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeTab} found
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : `No ${activeTab} available in this category`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {activeTab === "locations" ? "All Locations" : "All Events"}
        </h2>
        <p className="text-gray-600">
          {data.length} {activeTab} found
        </p>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          activeTab === "locations" ? (
            <LocationListItem key={item._id} location={item} />
          ) : (
            <EventListItem key={item._id} event={item} />
          )
        ))}
      </div>
    </div>
  );
}

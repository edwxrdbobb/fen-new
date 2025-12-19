import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { TopNavigation } from "./TopNavigation";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import { AIChat } from "./AIChat";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"locations" | "events">("locations");
  const [viewMode, setViewMode] = useState<"card" | "list" | "map">("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [chatOpen, setChatOpen] = useState(false);

  const loggedInUser = useQuery(api.auth.loggedInUser);
  const seedLocations = useMutation(api.dummyData.seedLocations);
  const seedEvents = useMutation(api.dummyData.seedEvents);

  // Seed data on first load (you can remove this after initial setup)
  const handleSeedData = async () => {
    try {
      await seedLocations();
      await seedEvents();
      console.log("Dummy data seeded successfully");
    } catch (error) {
      console.log("Data already exists or error seeding:", error);
    }
  };

  // Auto-seed on component mount (remove this in production)
  useState(() => {
    handleSeedData();
  });

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onChatClick={() => setChatOpen(true)}
          user={loggedInUser}
        />

        {/* Main Content */}
        <MainContent
          activeTab={activeTab}
          viewMode={viewMode}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* AI Chat */}
      <AIChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

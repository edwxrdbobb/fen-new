import { CardView } from "./views/CardView";
import { ListView } from "./views/ListView";
import { MapView } from "./views/MapView";

interface MainContentProps {
  activeTab: "locations" | "events";
  viewMode: "card" | "list" | "map";
  searchQuery: string;
  selectedCategory: string;
}

export function MainContent({
  activeTab,
  viewMode,
  searchQuery,
  selectedCategory,
}: MainContentProps) {
  const commonProps = {
    activeTab,
    searchQuery,
    selectedCategory,
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      {viewMode === "card" && <CardView {...commonProps} />}
      {viewMode === "list" && <ListView {...commonProps} />}
      {viewMode === "map" && <MapView {...commonProps} />}
    </main>
  );
}

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Utensils, Hotel, MapPin, ShoppingBag, Clapperboard,
  Car, HeartPulse, GraduationCap, Landmark, Ticket,
  Music, Hammer, Globe, Briefcase, Trophy, Palette,
  Pizza, Users, Moon, TreePine
} from "lucide-react";
import ReactDOMServer from "react-dom/server";

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  activeTab: "locations" | "events";
  searchQuery: string;
  selectedCategory: string;
}

interface MapItem {
  _id: string;
  name?: string;
  title?: string;
  coordinates: { lat: number; lng: number };
  category: string;
  description: string;
  isVerified?: boolean;
  isFeatured?: boolean;
}

// Component to handle map centering
function MapUpdater({ center, zoom }: { center: { lat: number; lng: number }, zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([center.lat, center.lng], zoom);
  }, [center, zoom, map]);
  return null;
}

export function MapView({ activeTab, searchQuery, selectedCategory }: MapViewProps) {
  const [selectedItem, setSelectedItem] = useState<MapItem | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 8.484, lng: -13.23 }); // Freetown center ~ish
  const [zoom, setZoom] = useState(13);

  const locations = useQuery(api.locations.list, {
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
    limit: 100,
  });

  const events = useQuery(api.events.list, {
    category: selectedCategory || undefined,
    search: searchQuery || undefined,
    limit: 100,
  });

  const data = activeTab === "locations" ? locations : events;

  // Convert data to map items
  const mapItems: MapItem[] = data?.map(item => {
    if (activeTab === "locations") {
      const location = item as any;
      return {
        _id: location._id,
        name: location.name,
        title: undefined,
        coordinates: location.coordinates,
        category: location.category,
        description: location.description,
        isVerified: location.isVerified,
        isFeatured: undefined,
      };
    } else {
      const event = item as any;
      return {
        _id: event._id,
        name: undefined,
        title: event.title,
        coordinates: event.location.coordinates,
        category: event.category,
        description: event.description,
        isVerified: undefined,
        isFeatured: event.isFeatured,
      };
    }
  }) || [];

  const getCategoryIcon = (category: string) => {
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
    const IconComponent = icons[category] || MapPin;

    // Determine color based on category/status
    let colorClass = "text-emerald-600";
    if (category === 'restaurant') colorClass = "text-orange-500";
    if (category === 'hotel') colorClass = "text-blue-500";

    return L.divIcon({
      className: 'custom-marker',
      html: ReactDOMServer.renderToString(
        <div className={`w-8 h-8 bg-white rounded-full border-2 border-white shadow-lg flex items-center justify-center ${colorClass}`}>
          <IconComponent size={16} />
        </div>
      ),
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  return (
    <div className="flex-1 relative bg-gray-100 dark:bg-gray-800 z-0">
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapUpdater center={mapCenter} zoom={zoom} />

        {mapItems.map((item) => (
          <Marker
            key={item._id}
            position={[item.coordinates.lat, item.coordinates.lng]}
            icon={getCategoryIcon(item.category)}
            eventHandlers={{
              click: () => {
                setSelectedItem(item);
                setMapCenter(item.coordinates);
                setZoom(15);
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-semibold text-lg">{item.name || item.title}</h3>
                <p className="text-sm text-gray-600 my-1 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
                    {item.category}
                  </span>
                  {(item.isVerified || item.isFeatured) && (
                    <span className={`text-xs px-2 py-1 rounded-full text-white ${item.isVerified ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                      {item.isVerified ? 'Verified' : 'Featured'}
                    </span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Controls Overlay - kept some existing controls or custom ones if needed, but Leaflet has its own. 
          We can add a "Recenter" button. */}
      <div className="absolute top-4 right-4 z-[400] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
        <button
          onClick={() => {
            setMapCenter({ lat: 8.484, lng: -13.23 });
            setZoom(13);
          }}
          className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Reset View"
        >
          <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}

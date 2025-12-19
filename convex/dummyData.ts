import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedLocations = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingLocations = await ctx.db.query("locations").take(1);
    if (existingLocations.length > 0) {
      return "Data already exists";
    }

    // Create a dummy user for seeding
    const dummyUserId = await ctx.db.insert("users", {
      email: "admin@freetown.sl",
      name: "Admin User",
    });

    const locations = [
      {
        name: "Cotton Tree",
        description: "Historic cotton tree in the heart of Freetown, symbol of freedom and the city's most famous landmark.",
        category: "attraction",
        address: "Siaka Stevens Street, Central Freetown",
        coordinates: { lat: 8.4840, lng: -13.2299 },
        images: [],
        imageUrl: "/images/cutton-tree.jpg",
        rating: 4.5,
        reviewCount: 127,
        priceRange: "$",
        tags: ["historic", "landmark", "photography", "cultural"],
        isVerified: true,
        createdBy: dummyUserId,
      },
      {
        name: "Lumley Beach",
        description: "Beautiful sandy beach perfect for relaxation, swimming, and enjoying stunning sunsets over the Atlantic Ocean.",
        category: "nature",
        address: "Lumley Beach Road, Aberdeen",
        coordinates: { lat: 8.4200, lng: -13.2800 },
        images: [],
        imageUrl: "/images/lumley-beach.jpg",
        rating: 4.3,
        reviewCount: 89,
        priceRange: "$",
        tags: ["beach", "sunset", "swimming", "relaxation"],
        isVerified: true,
        createdBy: dummyUserId,
      },
      {
        name: "National Museum",
        description: "Explore Sierra Leone's rich history and cultural heritage through fascinating exhibits and artifacts.",
        category: "culture",
        address: "Siaka Stevens Street, Central Freetown",
        coordinates: { lat: 8.4851, lng: -13.2314 },
        images: [],
        imageUrl: "/images/gettyimages-1342344240-1024x1024 (1).jpg",
        rating: 4.1,
        reviewCount: 45,
        priceRange: "$$",
        openingHours: {
          monday: "9:00 AM - 5:00 PM",
          tuesday: "9:00 AM - 5:00 PM",
          wednesday: "9:00 AM - 5:00 PM",
          thursday: "9:00 AM - 5:00 PM",
          friday: "9:00 AM - 5:00 PM",
          saturday: "10:00 AM - 4:00 PM",
          sunday: "Closed",
        },
        tags: ["museum", "history", "culture", "education"],
        isVerified: true,
        createdBy: dummyUserId,
      },
      {
        name: "Big Market (Kissy Street)",
        description: "Bustling local market where you can find everything from fresh produce to traditional crafts and textiles.",
        category: "shopping",
        address: "Kissy Street, Central Freetown",
        coordinates: { lat: 8.4889, lng: -13.2342 },
        images: [],
        imageUrl: "/images/big-market.jpg",
        rating: 3.8,
        reviewCount: 156,
        priceRange: "$",
        openingHours: {
          monday: "6:00 AM - 7:00 PM",
          tuesday: "6:00 AM - 7:00 PM",
          wednesday: "6:00 AM - 7:00 PM",
          thursday: "6:00 AM - 7:00 PM",
          friday: "6:00 AM - 7:00 PM",
          saturday: "6:00 AM - 8:00 PM",
          sunday: "7:00 AM - 6:00 PM",
        },
        tags: ["market", "shopping", "local", "crafts", "food"],
        isVerified: true,
        createdBy: dummyUserId,
      },
      {
        name: "Radisson Blu Mammy Yoko Hotel",
        description: "Luxury beachfront hotel offering world-class amenities, stunning ocean views, and exceptional service.",
        category: "hotel",
        address: "Aberdeen Beach Road, Aberdeen",
        coordinates: { lat: 8.4167, lng: -13.2833 },
        images: [],
        imageUrl: "/images/radisson blue-mammy-yoko-poolside.jpg",
        rating: 4.6,
        reviewCount: 234,
        priceRange: "$$$$",
        contact: {
          phone: "+232 76 123456",
          email: "info@radissonblu-freetown.com",
          website: "www.radissonblu.com/freetown",
        },
        amenities: ["pool", "spa", "restaurant", "bar", "wifi", "parking", "gym"],
        tags: ["luxury", "beachfront", "hotel", "business"],
        isVerified: true,
        createdBy: dummyUserId,
      },
      {
        name: "Bintumani Hotel",
        description: "Historic hotel in the heart of Freetown, offering comfortable accommodation with panoramic city views.",
        category: "hotel",
        address: "Walpole Street, Central Freetown",
        coordinates: { lat: 8.4900, lng: -13.2400 },
        images: [],
        imageUrl: "/images/bintumani-hotel-general-421b6c4.jpg",
        rating: 3.9,
        reviewCount: 178,
        priceRange: "$$$",
        contact: {
          phone: "+232 22 227500",
          email: "reservations@bintumanihotel.sl",
        },
        amenities: ["restaurant", "bar", "wifi", "parking", "conference"],
        tags: ["historic", "city-center", "business", "conference"],
        isVerified: true,
        createdBy: dummyUserId,
      },
      {
        name: "The Place Restaurant",
        description: "Fine dining restaurant serving international cuisine with a focus on fresh seafood and local ingredients.",
        category: "restaurant",
        address: "Lumley Beach Road, Aberdeen",
        coordinates: { lat: 8.4180, lng: -13.2790 },
        images: [],
        imageUrl: "/images/The-place.jpg",
        rating: 4.4,
        reviewCount: 92,
        priceRange: "$$$",
        openingHours: {
          monday: "12:00 PM - 11:00 PM",
          tuesday: "12:00 PM - 11:00 PM",
          wednesday: "12:00 PM - 11:00 PM",
          thursday: "12:00 PM - 11:00 PM",
          friday: "12:00 PM - 12:00 AM",
          saturday: "12:00 PM - 12:00 AM",
          sunday: "12:00 PM - 10:00 PM",
        },
        contact: {
          phone: "+232 76 987654",
        },
        tags: ["fine-dining", "seafood", "international", "romantic"],
        isVerified: true,
        createdBy: dummyUserId,
      },
      {
        name: "Country Lodge Complex",
        description: "Popular entertainment complex featuring restaurants, bars, and nightlife venues with live music.",
        category: "entertainment",
        address: "Hill Station Road, Hill Station",
        coordinates: { lat: 8.4500, lng: -13.2100 },
        images: [],
        imageUrl: "/images/Country-Lodge-Complex-Exterior.webp",
        rating: 4.2,
        reviewCount: 167,
        priceRange: "$$",
        openingHours: {
          monday: "6:00 PM - 2:00 AM",
          tuesday: "6:00 PM - 2:00 AM",
          wednesday: "6:00 PM - 2:00 AM",
          thursday: "6:00 PM - 2:00 AM",
          friday: "6:00 PM - 3:00 AM",
          saturday: "6:00 PM - 3:00 AM",
          sunday: "6:00 PM - 1:00 AM",
        },
        amenities: ["live-music", "bar", "restaurant", "parking", "security"],
        tags: ["nightlife", "entertainment", "live-music", "bar"],
        isVerified: true,
        createdBy: dummyUserId,
      },
      {
        name: "Tacugama Chimpanzee Sanctuary",
        description: "Wildlife sanctuary dedicated to the rescue and rehabilitation of chimpanzees, offering educational tours.",
        category: "nature",
        address: "Western Area Peninsula Forest, Regent",
        coordinates: { lat: 8.4000, lng: -13.1500 },
        images: [],
        imageUrl: "/images/Takugama.jpg",
        rating: 4.7,
        reviewCount: 78,
        priceRange: "$$",
        openingHours: {
          monday: "Closed",
          tuesday: "9:00 AM - 4:00 PM",
          wednesday: "9:00 AM - 4:00 PM",
          thursday: "9:00 AM - 4:00 PM",
          friday: "9:00 AM - 4:00 PM",
          saturday: "9:00 AM - 4:00 PM",
          sunday: "9:00 AM - 4:00 PM",
        },
        contact: {
          phone: "+232 76 601979",
          website: "www.tacugama.com",
        },
        tags: ["wildlife", "sanctuary", "education", "conservation", "nature"],
        isVerified: true,
        createdBy: dummyUserId,
      },
      {
        name: "Aberdeen Ferry Terminal",
        description: "Main ferry terminal connecting Freetown to Lungi International Airport and other coastal destinations.",
        category: "transport",
        address: "Aberdeen Ferry Terminal, Aberdeen",
        coordinates: { lat: 8.4100, lng: -13.2900 },
        images: [],
        imageUrl: "/images/Abadeen.jpg",
        rating: 3.5,
        reviewCount: 203,
        priceRange: "$",
        openingHours: {
          monday: "5:00 AM - 10:00 PM",
          tuesday: "5:00 AM - 10:00 PM",
          wednesday: "5:00 AM - 10:00 PM",
          thursday: "5:00 AM - 10:00 PM",
          friday: "5:00 AM - 10:00 PM",
          saturday: "5:00 AM - 10:00 PM",
          sunday: "5:00 AM - 10:00 PM",
        },
        amenities: ["parking", "waiting-area", "ticketing", "security"],
        tags: ["transport", "ferry", "airport-connection", "travel"],
        isVerified: true,
        createdBy: dummyUserId,
      },
    ];

    for (const location of locations) {
      await ctx.db.insert("locations", location);
    }

    return `Inserted ${locations.length} locations`;
  },
});

export const seedEvents = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingEvents = await ctx.db.query("events").take(1);
    if (existingEvents.length > 0) {
      return "Data already exists";
    }

    // Get or create dummy user
    let dummyUser = await ctx.db.query("users").filter(q => q.eq(q.field("email"), "admin@freetown.sl")).first();
    if (!dummyUser) {
      const dummyUserId = await ctx.db.insert("users", {
        email: "admin@freetown.sl",
        name: "Admin User",
      });
      dummyUser = await ctx.db.get(dummyUserId);
    }

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;

    const events = [
      {
        title: "Freetown Music Festival 2024",
        description: "Annual music festival featuring local and international artists, celebrating Sierra Leone's rich musical heritage.",
        category: "festival",
        startDate: now + (7 * oneDay),
        endDate: now + (9 * oneDay),
        location: {
          name: "National Stadium",
          address: "Brookfields, Freetown",
          coordinates: { lat: 8.4600, lng: -13.2200 },
        },
        images: [],
        ticketPrice: {
          min: 50000,
          max: 200000,
          currency: "Le ",
        },
        organizer: {
          name: "Freetown Cultural Society",
          contact: "+232 76 555123",
        },
        capacity: 15000,
        attendeeCount: 3420,
        tags: ["music", "festival", "culture", "entertainment"],
        isPublic: true,
        isFeatured: true,
        createdBy: dummyUser!._id,
      },
      {
        title: "Sierra Leone Independence Day Celebration",
        description: "National celebration commemorating Sierra Leone's independence with parades, cultural performances, and festivities.",
        category: "festival",
        startDate: now + (14 * oneDay),
        endDate: now + (14 * oneDay),
        location: {
          name: "State House Grounds",
          address: "Hill Station, Freetown",
          coordinates: { lat: 8.4700, lng: -13.2100 },
        },
        images: [],
        organizer: {
          name: "Government of Sierra Leone",
        },
        capacity: 50000,
        attendeeCount: 12500,
        tags: ["national", "independence", "parade", "cultural"],
        isPublic: true,
        isFeatured: true,
        createdBy: dummyUser!._id,
      },
      {
        title: "Freetown Marathon 2024",
        description: "Annual marathon race through the streets of Freetown, promoting health, fitness, and community spirit.",
        category: "sports",
        startDate: now + (21 * oneDay),
        endDate: now + (21 * oneDay),
        location: {
          name: "Cotton Tree (Start/Finish)",
          address: "Siaka Stevens Street, Central Freetown",
          coordinates: { lat: 8.4840, lng: -13.2299 },
        },
        images: [],
        ticketPrice: {
          min: 25000,
          max: 100000,
          currency: "Le ",
        },
        organizer: {
          name: "Freetown Athletics Club",
          contact: "+232 77 888999",
        },
        capacity: 2000,
        attendeeCount: 567,
        tags: ["marathon", "running", "fitness", "sports"],
        isPublic: true,
        isFeatured: false,
        createdBy: dummyUser!._id,
      },
      {
        title: "Tech Innovation Workshop",
        description: "Workshop on emerging technologies and innovation opportunities in Sierra Leone's growing tech sector.",
        category: "workshop",
        startDate: now + (5 * oneDay),
        endDate: now + (5 * oneDay),
        location: {
          name: "Bintumani Conference Center",
          address: "Walpole Street, Central Freetown",
          coordinates: { lat: 8.4900, lng: -13.2400 },
        },
        images: [],
        ticketPrice: {
          min: 75000,
          max: 150000,
          currency: "Le ",
        },
        organizer: {
          name: "Sierra Leone Tech Hub",
          contact: "info@sltechhub.org",
        },
        capacity: 200,
        attendeeCount: 89,
        tags: ["technology", "innovation", "workshop", "entrepreneurship"],
        isPublic: true,
        isFeatured: false,
        createdBy: dummyUser!._id,
      },
      {
        title: "Lumley Beach Sunset Concert",
        description: "Intimate acoustic concert on the beach featuring local musicians as the sun sets over the Atlantic.",
        category: "concert",
        startDate: now + (3 * oneDay),
        endDate: now + (3 * oneDay),
        location: {
          name: "Lumley Beach",
          address: "Lumley Beach Road, Aberdeen",
          coordinates: { lat: 8.4200, lng: -13.2800 },
        },
        images: [],
        ticketPrice: {
          min: 30000,
          max: 80000,
          currency: "Le ",
        },
        organizer: {
          name: "Acoustic Vibes SL",
          contact: "+232 78 444555",
        },
        capacity: 500,
        attendeeCount: 234,
        tags: ["concert", "acoustic", "beach", "sunset"],
        isPublic: true,
        isFeatured: true,
        createdBy: dummyUser!._id,
      },
      {
        title: "Freetown Food Festival",
        description: "Culinary celebration showcasing Sierra Leone's diverse cuisine and local restaurants.",
        category: "food",
        startDate: now + (10 * oneDay),
        endDate: now + (12 * oneDay),
        location: {
          name: "Aberdeen Community Center",
          address: "Aberdeen Main Road, Aberdeen",
          coordinates: { lat: 8.4150, lng: -13.2750 },
        },
        images: [],
        ticketPrice: {
          min: 40000,
          max: 120000,
          currency: "Le ",
        },
        organizer: {
          name: "Freetown Culinary Association",
          contact: "info@freetownfood.sl",
        },
        capacity: 1000,
        attendeeCount: 445,
        tags: ["food", "festival", "cuisine", "local"],
        isPublic: true,
        isFeatured: false,
        createdBy: dummyUser!._id,
      },
      {
        title: "Art Exhibition: Contemporary Sierra Leone",
        description: "Showcase of contemporary art by Sierra Leonean artists exploring themes of identity, culture, and progress.",
        category: "art",
        startDate: now + (2 * oneDay),
        endDate: now + (16 * oneDay),
        location: {
          name: "National Museum Gallery",
          address: "Siaka Stevens Street, Central Freetown",
          coordinates: { lat: 8.4851, lng: -13.2314 },
        },
        images: [],
        ticketPrice: {
          min: 15000,
          max: 35000,
          currency: "Le ",
        },
        organizer: {
          name: "Sierra Leone Artists Union",
          contact: "gallery@slartists.org",
        },
        capacity: 150,
        attendeeCount: 67,
        tags: ["art", "exhibition", "contemporary", "culture"],
        isPublic: true,
        isFeatured: false,
        createdBy: dummyUser!._id,
      },
      {
        title: "Business Networking Conference",
        description: "Professional networking event bringing together entrepreneurs, investors, and business leaders.",
        category: "conference",
        startDate: now + (8 * oneDay),
        endDate: now + (8 * oneDay),
        location: {
          name: "Radisson Blu Conference Hall",
          address: "Aberdeen Beach Road, Aberdeen",
          coordinates: { lat: 8.4167, lng: -13.2833 },
        },
        images: [],
        ticketPrice: {
          min: 100000,
          max: 250000,
          currency: "Le ",
        },
        organizer: {
          name: "Sierra Leone Chamber of Commerce",
          contact: "events@slchamber.org",
        },
        capacity: 300,
        attendeeCount: 178,
        tags: ["business", "networking", "conference", "professional"],
        isPublic: true,
        isFeatured: false,
        createdBy: dummyUser!._id,
      },
    ];

    for (const event of events) {
      await ctx.db.insert("events", event);
    }

    return `Inserted ${events.length} events`;
  },
});

export const updateImages = mutation({
  args: {},
  handler: async (ctx) => {
    const locations = [
      { name: "Cotton Tree", imageUrl: "/images/cutton-tree.jpg" },
      { name: "Lumley Beach", imageUrl: "/images/lumley-beach.jpg" },
      { name: "National Museum", imageUrl: "/images/gettyimages-1342344240-1024x1024 (1).jpg" },
      { name: "Big Market (Kissy Street)", imageUrl: "/images/big-market.jpg" },
      { name: "Radisson Blu Mammy Yoko Hotel", imageUrl: "/images/radisson blue-mammy-yoko-poolside.jpg" },
      { name: "Bintumani Hotel", imageUrl: "/images/bintumani-hotel-general-421b6c4.jpg" },
      { name: "The Place Restaurant", imageUrl: "/images/The-place.jpg" },
      { name: "Country Lodge Complex", imageUrl: "/images/Country-Lodge-Complex-Exterior.webp" },
      { name: "Tacugama Chimpanzee Sanctuary", imageUrl: "/images/Takugama.jpg" },
      { name: "Aberdeen Ferry Terminal", imageUrl: "/images/Abadeen.jpg" },
    ];

    let count = 0;
    for (const loc of locations) {
      const existing = await ctx.db
        .query("locations")
        .withSearchIndex("search_locations", q => q.search("name", loc.name))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, { imageUrl: loc.imageUrl });
        count++;
      }
    }
    return `Updated ${count} locations with images`;
  },
});

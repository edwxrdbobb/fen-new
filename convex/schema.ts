import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  locations: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(), // restaurant, hotel, attraction, shopping, etc.
    subcategory: v.optional(v.string()),
    address: v.string(),
    coordinates: v.object({
      lat: v.number(),
      lng: v.number(),
    }),
    images: v.array(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    priceRange: v.optional(v.string()), // $, $$, $$$, $$$$
    openingHours: v.optional(v.object({
      monday: v.string(),
      tuesday: v.string(),
      wednesday: v.string(),
      thursday: v.string(),
      friday: v.string(),
      saturday: v.string(),
      sunday: v.string(),
    })),
    contact: v.optional(v.object({
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      website: v.optional(v.string()),
    })),
    amenities: v.optional(v.array(v.string())),
    tags: v.array(v.string()),
    isVerified: v.boolean(),
    createdBy: v.id("users"),
  })
    .index("by_category", ["category"])
    .index("by_created_by", ["createdBy"])
    .searchIndex("search_locations", {
      searchField: "name",
      filterFields: ["category", "isVerified"],
    }),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(), // festival, concert, workshop, tour, etc.
    startDate: v.number(),
    endDate: v.number(),
    location: v.object({
      name: v.string(),
      address: v.string(),
      coordinates: v.object({
        lat: v.number(),
        lng: v.number(),
      }),
    }),
    images: v.array(v.id("_storage")),
    ticketPrice: v.optional(v.object({
      min: v.number(),
      max: v.number(),
      currency: v.string(),
    })),
    organizer: v.object({
      name: v.string(),
      contact: v.optional(v.string()),
    }),
    capacity: v.optional(v.number()),
    attendeeCount: v.optional(v.number()),
    tags: v.array(v.string()),
    isPublic: v.boolean(),
    isFeatured: v.boolean(),
    createdBy: v.id("users"),
  })
    .index("by_date", ["startDate"])
    .index("by_category", ["category"])
    .index("by_created_by", ["createdBy"])
    .searchIndex("search_events", {
      searchField: "title",
      filterFields: ["category", "isPublic"],
    }),

  reviews: defineTable({
    locationId: v.optional(v.id("locations")),
    eventId: v.optional(v.id("events")),
    userId: v.id("users"),
    rating: v.number(),
    comment: v.string(),
    images: v.optional(v.array(v.id("_storage"))),
    isVerified: v.boolean(),
  })
    .index("by_location", ["locationId"])
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"]),

  favorites: defineTable({
    userId: v.id("users"),
    locationId: v.optional(v.id("locations")),
    eventId: v.optional(v.id("events")),
  })
    .index("by_user", ["userId"])
    .index("by_location", ["locationId"])
    .index("by_event", ["eventId"]),

  videoExports: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    locations: v.array(v.id("locations")),
    events: v.array(v.id("events")),
    duration: v.number(), // in seconds
    style: v.string(), // cinematic, documentary, social, etc.
    status: v.string(), // pending, processing, completed, failed
    videoUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  userProfiles: defineTable({
    userId: v.id("users"),
    displayName: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatar: v.optional(v.id("_storage")),
    location: v.optional(v.string()),
    interests: v.array(v.string()),
    isLocalGuide: v.boolean(),
    guideRating: v.optional(v.number()),
    socialLinks: v.optional(v.object({
      instagram: v.optional(v.string()),
      twitter: v.optional(v.string()),
      facebook: v.optional(v.string()),
    })),
  })
    .index("by_user", ["userId"])
    .index("by_local_guide", ["isLocalGuide"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});

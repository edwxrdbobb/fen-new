import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {
    category: v.optional(v.string()),
    search: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (args.search) {
      return await ctx.db
        .query("locations")
        .withSearchIndex("search_locations", (q) =>
          q.search("name", args.search!)
            .eq("isVerified", true)
        )
        .take(args.limit || 20);
    }

    if (args.category) {
      return await ctx.db
        .query("locations")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .filter((q) => q.eq(q.field("isVerified"), true))
        .order("desc")
        .take(args.limit || 20);
    }

    return await ctx.db
      .query("locations")
      .filter((q) => q.eq(q.field("isVerified"), true))
      .order("desc")
      .take(args.limit || 20);
  },
});

export const getById = query({
  args: { id: v.id("locations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.string(),
    subcategory: v.optional(v.string()),
    address: v.string(),
    coordinates: v.object({
      lat: v.number(),
      lng: v.number(),
    }),
    images: v.array(v.id("_storage")),
    imageUrl: v.optional(v.string()), // Added for local images
    priceRange: v.optional(v.string()),
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
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to create location");
    }

    return await ctx.db.insert("locations", {
      ...args,
      rating: 0,
      reviewCount: 0,
      isVerified: false,
      createdBy: userId,
    });
  },
});

export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    return [
      { id: "restaurant", name: "Restaurants", icon: "🍽️" },
      { id: "hotel", name: "Hotels", icon: "🏨" },
      { id: "attraction", name: "Attractions", icon: "🎯" },
      { id: "shopping", name: "Shopping", icon: "🛍️" },
      { id: "entertainment", name: "Entertainment", icon: "🎭" },
      { id: "transport", name: "Transport", icon: "🚗" },
      { id: "health", name: "Health & Wellness", icon: "🏥" },
      { id: "education", name: "Education", icon: "🎓" },
      { id: "culture", name: "Culture", icon: "🏛️" },
      { id: "nature", name: "Nature", icon: "🌿" },
    ];
  },
});

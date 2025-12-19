import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {
    category: v.optional(v.string()),
    search: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (args.search) {
      return await ctx.db
        .query("events")
        .withSearchIndex("search_events", (q) =>
          q.search("title", args.search!)
            .eq("isPublic", true)
        )
        .take(args.limit || 20);
    }
    
    let results;
    if (args.category) {
      results = await ctx.db
        .query("events")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .filter((q) => q.eq(q.field("isPublic"), true))
        .order("desc")
        .take(args.limit || 20);
    } else {
      results = await ctx.db
        .query("events")
        .withIndex("by_date")
        .filter((q) => q.eq(q.field("isPublic"), true))
        .order("desc")
        .take(args.limit || 20);
    }
    
    // Filter by date range if provided
    if (args.startDate || args.endDate) {
      results = results.filter(event => {
        if (args.startDate && event.startDate < args.startDate) return false;
        if (args.endDate && event.endDate > args.endDate) return false;
        return true;
      });
    }
    
    return results;
  },
});

export const getById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
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
    tags: v.array(v.string()),
    isPublic: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Must be logged in to create event");
    }

    return await ctx.db.insert("events", {
      ...args,
      attendeeCount: 0,
      isFeatured: false,
      createdBy: userId,
    });
  },
});

export const getCategories = query({
  args: {},
  handler: async (ctx) => {
    return [
      { id: "festival", name: "Festivals", icon: "🎪" },
      { id: "concert", name: "Concerts", icon: "🎵" },
      { id: "workshop", name: "Workshops", icon: "🛠️" },
      { id: "tour", name: "Tours", icon: "🗺️" },
      { id: "conference", name: "Conferences", icon: "💼" },
      { id: "sports", name: "Sports", icon: "⚽" },
      { id: "art", name: "Art & Culture", icon: "🎨" },
      { id: "food", name: "Food & Drink", icon: "🍷" },
      { id: "community", name: "Community", icon: "👥" },
      { id: "nightlife", name: "Nightlife", icon: "🌙" },
    ];
  },
});

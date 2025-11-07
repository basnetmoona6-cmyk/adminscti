import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Fetch the current news announcement (if any)
export const getNews = query({
  args: {},
  handler: async (ctx) => {
    const news = await ctx.db.query('news').collect();
    return news.length > 0 ? news[0] : null;
  },
});

// Update or create the single news announcement
export const updateNews = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const news = await ctx.db.query('news').collect();
    const newNews = {
      text: args.text,
      createdAt: new Date().toISOString(),
    };

    if (news.length > 0) {
      // Update existing news
      await ctx.db.patch(news[0]._id, newNews);
      return news[0]._id;
    } else {
      // Create new news
      return await ctx.db.insert('news', newNews);
    }
  },
});
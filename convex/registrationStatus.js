import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const initializeRegistrationStatus = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query('registrationStatus').first();
    if (!existing) {
      await ctx.db.insert('registrationStatus', { registrationOpen: true });
    }
  },
});

export const getRegistrationStatus = query({
  handler: async (ctx) => {
    const status = await ctx.db.query('registrationStatus').first();
    return status ? status.registrationOpen : true;
  },
});

export const closeRegistration = mutation({
  handler: async (ctx) => {
    const status = await ctx.db.query('registrationStatus').first();
    if (status) {
      await ctx.db.patch(status._id, { registrationOpen: false });
    } else {
      await ctx.db.insert('registrationStatus', { registrationOpen: false });
    }
    return { success: true };
  },
});

export const openRegistration = mutation({
  handler: async (ctx) => {
    const status = await ctx.db.query('registrationStatus').first();
    if (status) {
      await ctx.db.patch(status._id, { registrationOpen: true });
    } else {
      await ctx.db.insert('registrationStatus', { registrationOpen: true });
    }
    return { success: true };
  },
});
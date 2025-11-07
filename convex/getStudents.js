// convex/getStudents.js
import { query } from "./_generated/server";

export const getAllStudents = query({
  handler: async (ctx) => {
    // Fetch students from the database
    return await ctx.db.query("students").collect();
  },
});
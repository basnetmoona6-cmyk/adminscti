// convex/addUser.js
import { action } from "./_generated/server"; // IMPORTANT: `action` here
import { v } from "convex/values";
import { api } from "./_generated/api"; // IMPORTANT: `api` import

export const addUser = action({ // IMPORTANT: `action` here
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // This is the line that was problematic. It MUST use ctx.runQuery.
    const existingUser = await ctx.runQuery(api.users.getUserByUsername, {
      username: args.username,
    });

    if (existingUser) {
      throw new Error("Username already exists!");
    }

    // This calls the action in auth.js
    const hashedPassword = await ctx.runAction(api.auth.hashPassword, {
      password: args.password,
    });

    // This calls the mutation in users.js
    await ctx.runMutation(api.users.createUser, {
      username: args.username,
      password: hashedPassword,
    });
  },
});
// convex/login.js
import { action } from "./_generated/server"; // <--- IMPORTANT: Change `query` to `action`
import { v } from "convex/values";
import { api } from "./_generated/api"; // Import api to call other functions

export const checkLogin = action({ // <--- IMPORTANT: Change `query` to `action`
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Queries can still be run from actions using ctx.runQuery
    const user = await ctx.runQuery(api.users.getUserByUsername, {
      username: args.username,
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Now ctx.runAction is available because checkLogin is an action
    const passwordMatch = await ctx.runAction(api.auth.comparePassword, {
      plainPassword: args.password,
      hashedPassword: user.password,
    });

    if (!passwordMatch) {
      return { success: false, message: "Incorrect password" };
    }

    return { success: true, message: "Login successful" };
  },
});
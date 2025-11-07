// convex/auth.js
"use node"; // Must be the very first line after comments

import { action } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs"; // Ensure this is 'bcryptjs'

export const hashPassword = action({
  args: {
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const hashedPassword = await bcrypt.hash(args.password, 10);
    return hashedPassword;
  },
});

export const comparePassword = action({
  args: {
    plainPassword: v.string(),
    hashedPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const match = await bcrypt.compare(
      args.plainPassword,
      args.hashedPassword
    );
    return match;
  },
});
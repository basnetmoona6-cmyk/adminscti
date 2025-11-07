import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Custom validator for ISO 8601 date string
const isoDateString = v.string();

export default defineSchema({
  // Users (admin or system users)
  users: defineTable({
    username: v.string(),
    password: v.string(), // ⚠️ Hash passwords in production
  }).index("by_username", ["username"]),

 
  // Student Records
  students: defineTable({
    firstName: v.string(),
    middleName: v.optional(v.string()),
    lastName: v.string(),
    phone: v.string(),
    citizenshipImage: v.string(),
    admitCardImage: v.string(),
    seeCertificateImage: v.optional(v.string()),
    createdAt: isoDateString,
  }),

 

  // News Posts
  news: defineTable({
    text: v.string(),
    createdAt: isoDateString,
  }),



  // Registration Status Flag
  registrationStatus: defineTable({
    registrationOpen: v.boolean(),
  }),
});

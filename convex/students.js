import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

// Create a new student record
export const createStudent = mutation({
  args: {
    firstName: v.string(),
    middleName: v.optional(v.string()),
    lastName: v.string(),
    phone: v.string(),
    citizenshipImage: v.string(),
    admitCardImage: v.string(),
    seeCertificateImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const studentId = await ctx.db.insert("students", {
      firstName: args.firstName,
      middleName: args.middleName,
      lastName: args.lastName,
      phone: args.phone,
      citizenshipImage: args.citizenshipImage,
      admitCardImage: args.admitCardImage,
      seeCertificateImage: args.seeCertificateImage,
      createdAt: new Date().toISOString(),
    })

    return studentId
  },
})

// Get all students (for admin purposes)
export const getAllStudents = query({
  handler: async (ctx) => {
    return await ctx.db.query("students").collect()
  },
})

// Get students with pagination
export const getStudentsPaginated = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50

    let query = ctx.db.query("students").order("desc")

    if (args.cursor) {
      query = query.filter((q) => q.lt(q.field("_creationTime"), args.cursor))
    }

    const students = await query.take(limit + 1)

    const hasMore = students.length > limit
    const results = hasMore ? students.slice(0, limit) : students
    const nextCursor = hasMore ? students[limit]._creationTime : null

    return {
      students: results,
      hasMore,
      nextCursor,
    }
  },
})

// Get a single student by ID
export const getStudentById = query({
  args: { id: v.id("students") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

// Search students by name or phone
export const searchStudents = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const searchTerm = args.searchTerm.toLowerCase()

    const students = await ctx.db.query("students").collect()

    return students.filter((student) => {
      const fullName = `${student.firstName} ${student.middleName || ""} ${student.lastName}`.toLowerCase()
      const phone = student.phone.toLowerCase()

      return fullName.includes(searchTerm) || phone.includes(searchTerm)
    })
  },
})

// Update student information
export const updateStudent = mutation({
  args: {
    id: v.id("students"),
    firstName: v.optional(v.string()),
    middleName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    citizenshipImage: v.optional(v.string()),
    admitCardImage: v.optional(v.string()),
    seeCertificateImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args

    // Remove undefined values
    const cleanUpdates = Object.fromEntries(Object.entries(updates).filter(([_, value]) => value !== undefined))

    await ctx.db.patch(id, cleanUpdates)
    return id
  },
})

// Delete a student record
export const deleteStudent = mutation({
  args: { id: v.id("students") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
    return args.id
  },
})

// Get student count
export const getStudentCount = query({
  handler: async (ctx) => {
    const students = await ctx.db.query("students").collect()
    return students.length
  },
})

// Get recent students (last 10)
export const getRecentStudents = query({
  handler: async (ctx) => {
    return await ctx.db.query("students").order("desc").take(10)
  },
})

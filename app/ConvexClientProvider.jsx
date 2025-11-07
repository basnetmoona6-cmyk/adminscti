"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// 🔁 Replace this with your actual Convex deployment URL
const convex = new ConvexReactClient("https://kindly-gnat-109.convex.cloud");

export default function ConvexClientProvider({ children }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

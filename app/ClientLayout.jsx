"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { usePathname } from "next/navigation";
import Topbar from "./Topbar";
import Sidebar from "./SideBar";

// Initialize the Convex client
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Log Convex URL for debugging
  console.log("ClientLayout rendering with URL:", process.env.NEXT_PUBLIC_CONVEX_URL);

  // Hide TopBar and Sidebar on the root path (/)
  const hideLayout = pathname === "/";

  return (
    <ConvexProvider client={convex}>
      {!hideLayout && <Topbar />}
      {!hideLayout && <Sidebar />}
      {children}
    </ConvexProvider>
  );
}
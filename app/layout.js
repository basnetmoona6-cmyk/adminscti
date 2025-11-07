import { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

// Define metadata at the module level
export const metadata = {
  title: "SCTI",
  description:
    "To provide a comprehensive +2 Management curriculum aligned with NEB standards, develop essential skills in business, economics, and leadership, and prepare students for higher education and impactful careers while instilling ethical values and a commitment to social responsibility.",
  authors: [{ name: "Muna Basnet" }],
};

export default function RootLayout({ children }) {
  console.log("RootLayout rendering with URL:", process.env.NEXT_PUBLIC_CONVEX_URL);
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set in the environment variables.");
  }

  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
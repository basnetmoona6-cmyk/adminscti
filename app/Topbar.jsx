"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function Topbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentUser, setCurrentUser] = useState("Guest") // safe default
  const router = useRouter()

  // Logout unauthorized user
  const logoutUser = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser")
      localStorage.removeItem("userToken")
      localStorage.removeItem("authToken")
      localStorage.clear()
    }
  }

  useEffect(() => {
    // Scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Fetch current user from localStorage (client-only)
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser")
      if (!storedUser || storedUser === "undefined") {
        logoutUser()
        router.push("/")
      } else {
        setCurrentUser(storedUser)
      }
    }
  }, [router])

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-blue-600 text-white z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "h-16 shadow-lg opacity-90" : "h-20 opacity-100"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="https://i.ibb.co/99tSZyY0/scti-logo.jpg"
              alt="SCTI Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>
          <span className="ml-3 text-lg font-semibold">SCTI Admin</span>
        </div>

        {/* Welcome message */}
        <div className="flex items-center">
          <span className="text-sm font-medium">Welcome, {currentUser}!</span>
        </div>
      </div>
    </nav>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import {
  Users,
  Calendar,
  Clock,
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function AdminLanding() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Fetch data for dashboard stats
  const students = useQuery(api.students.getAllStudents)
  const registrationStatus = useQuery(api.registrationStatus.getRegistrationStatus)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const isLoading = students === undefined || registrationStatus === undefined

  const stats = {
    totalStudents: students?.length || 0,
    registrationOpen: registrationStatus ?? false,
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHr = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHr / 24)

    if (diffSec < 60) return `${diffSec}s ago`
    if (diffMin < 60) return `${diffMin}m ago`
    if (diffHr < 24) return `${diffHr}h ago`
    return `${diffDay}d ago`
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
        <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 md:ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-pulse">
              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
              <div className="h-12 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4"></div>
              <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 md:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6 shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
              Monitor and manage your system from this central hub
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          {/* Stats Grid (Only Students) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalStudents}</p>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Students</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-sm">
                  {stats.registrationOpen ? (
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-1 text-red-500" />
                  )}
                  <span className={stats.registrationOpen ? "text-green-600" : "text-red-600"}>
                    Registration {stats.registrationOpen ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* You can keep Quick Actions and Recent Activity here if needed */}

        </div>
      </main>
    </div>
  )
}

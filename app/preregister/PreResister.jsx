"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const PreRegister = () => {
  // Fixed: Use the correct API paths
  const studentsQuery = useQuery(api.students.getAllStudents)
  const registrationStatusQuery = useQuery(api.registrationStatus.getRegistrationStatus)

  const initializeRegistrationStatus = useMutation(api.registrationStatus.initializeRegistrationStatus)
  const openRegistration = useMutation(api.registrationStatus.openRegistration)
  const closeRegistration = useMutation(api.registrationStatus.closeRegistration)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [downloadStatus, setDownloadStatus] = useState({})

  const students = studentsQuery || []
  const isRegistrationOpen = registrationStatusQuery ?? false

  useEffect(() => {
    if (initializeRegistrationStatus) {
      initializeRegistrationStatus().catch((err) => {
        console.error("Failed to initialize registration status:", err)
      })
    }
  }, [initializeRegistrationStatus])

  useEffect(() => {
    if (studentsQuery === undefined || registrationStatusQuery === undefined) {
      setLoading(true)
    } else {
      setLoading(false)
      setError(null)
    }
  }, [studentsQuery, registrationStatusQuery])

  const toggleRegistration = async () => {
    if (!openRegistration || !closeRegistration) {
      toast.error("Registration functions not available")
      return
    }

    try {
      if (isRegistrationOpen) {
        await closeRegistration()
        toast.success("Registration closed successfully")
      } else {
        await openRegistration()
        toast.success("Registration opened successfully")
      }
    } catch (err) {
      console.error("Failed to toggle registration:", err)
      toast.error("Failed to toggle registration")
    }
  }

  const openModal = (student) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedStudent(null)
    setPreviewImage(null)
    setDownloadStatus({})
  }

  const openImagePreview = (imageUrl) => {
    setPreviewImage(imageUrl)
  }

  const downloadImage = async (imageUrl, fileName) => {
    setDownloadStatus((prev) => ({ ...prev, [fileName]: true }))

    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(url)
      toast.success(`Downloaded ${fileName}`)
    } catch (error) {
      console.error("Download failed:", error)
      toast.error("Failed to download image")
    } finally {
      setTimeout(() => {
        setDownloadStatus((prev) => ({ ...prev, [fileName]: false }))
      }, 1000)
    }
  }

  if (loading) {
    return (
      <div className="mt-8 px-4 md:px-8">
        {/* Skeleton Header with Statistics */}
        <div className="mb-8 text-center">
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
          <div className="flex justify-center items-center space-x-8 mb-6">
            <div className="bg-gray-200 rounded-lg p-4 w-32 h-24 animate-pulse"></div>
            <div className="bg-gray-200 rounded-lg p-4 w-32 h-24 animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton Toggle Button */}
        <div className="mb-6 flex justify-center">
          <div className="w-48 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Skeleton Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p ANSII-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 px-4 md:px-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl">
            <h3 className="text-yellow-800 font-semibold mb-2">Setup Instructions:</h3>
            <ol className="text-yellow-700 text-left space-y-1">
              <li>1. Run `npx convex dev` in your terminal</li>
              <li>2. Make sure your Convex functions are deployed</li>
              <li>3. Check that the API paths match your function names</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 px-4 md:px-8">
      {/* Header with Statistics */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Student Registration Dashboard</h1>
        <div className="flex justify-center items-center space-x-8 mb-6">
          <div className="bg-blue-100 rounded-lg p-4">
            <p className="text-2xl font-bold text-blue-600">{students.length}</p>
            <p className="text-sm text-blue-800">Total Registrations</p>
          </div>
          <div className={`rounded-lg p-4 ${isRegistrationOpen ? "bg-green-100" : "bg-red-100"}`}>
            <p className={`text-sm font-semibold ${isRegistrationOpen ? "text-green-800" : "text-red-800"}`}>
              Registration Status
            </p>
            <p className={`text-lg font-bold ${isRegistrationOpen ? "text-green-600" : "text-red-600"}`}>
              {isRegistrationOpen ? "OPEN" : "CLOSED"}
            </p>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={toggleRegistration}
          disabled={!openRegistration || !closeRegistration}
          className={`px-8 py-3 rounded-lg text-white font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 ${
            isRegistrationOpen ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isRegistrationOpen ? "🔒 Close Registration" : "🔓 Open Registration"}
        </button>
      </div>

      {/* Registration Status Message */}
      {!isRegistrationOpen && students.length > 0 && (
        <div className="mb-6 text-center bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-lg font-semibold">
            ⚠️ Registration is currently closed. You can view existing student data below.
          </p>
        </div>
      )}

      {/* Student Cards Grid */}
      {students.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center bg-gray-50 rounded-lg p-8">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600 text-xl mb-2">No students registered yet.</p>
            <p className="text-gray-500">Students will appear here once they register.</p>
            {!isRegistrationOpen && (
              <p className="text-blue-600 mt-4 font-medium">Open registration to allow new student submissions.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((student) => (
              <div
                key={student._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100"
                onClick={() => openModal(student)}
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={student.citizenshipImage || "/placeholder.svg?height=200&width=300"}
                    alt={`${student.firstName || "Unknown"} ${student.lastName || ""} Citizenship`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=200&width=300"
                      e.target.onerror = null
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
                    {student.firstName || "Unknown"} {student.middleName || ""} {student.lastName || ""}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">📞 {student.phone || "Not Provided"}</p>
                  <p className="text-xs text-gray-500">
                    📅 {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : "Unknown date"}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Full-Screen Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-start justify-center z-50 overflow-y-auto pt-4">
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-xl shadow-2xl w-full max-w-4xl p-8 m-4 transform transition-all duration-500 ease-in-out">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-200 pb-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedStudent.firstName || "Unknown"}{" "}
                  {selectedStudent.middleName && `${selectedStudent.middleName} `}
                  {selectedStudent.lastName || ""}
                </h2>
                <p className="text-gray-600">
                  Registered on{" "}
                  {selectedStudent.createdAt
                    ? new Date(selectedStudent.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition duration-200 mt-4 md:mt-0 p-2 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-3">Personal Information</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">First Name:</span> {selectedStudent.firstName || "Not Provided"}
                    </p>
                    {selectedStudent.middleName && (
                      <p>
                        <span className="font-medium">Middle Name:</span> {selectedStudent.middleName}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Last Name:</span> {selectedStudent.lastName || "Not Provided"}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {selectedStudent.phone || "Not Provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Documents Submitted</h3>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Citizenship/Birth Certificate
                    </p>
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Admit Card
                    </p>
                    {selectedStudent.seeCertificateImage && (
                      <p className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        SEE Pre-Certificate
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Images */}
            <div className="space-y-8">
              {/* Citizenship Image */}
              {selectedStudent.citizenshipImage && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Citizenship/Birth Certificate</h4>
                  <div className="flex flex-col items-center">
                    <img
                      src={selectedStudent.citizenshipImage || "/placeholder.svg?height=300&width=400"}
                      alt="Citizenship Image"
                      className="max-w-full h-64 object-contain rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity duration-300 shadow-md"
                      onClick={() => openImagePreview(selectedStudent.citizenshipImage)}
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=300&width=400"
                        e.target.onerror = null
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadImage(selectedStudent.citizenshipImage, `${selectedStudent.firstName}_citizenship.jpg`)
                      }}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center shadow-md"
                      disabled={downloadStatus[`${selectedStudent.firstName}_citizenship.jpg`]}
                    >
                      {downloadStatus[`${selectedStudent.firstName}_citizenship.jpg`] ? (
                        <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                      ) : (
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      )}
                      Download
                    </button>
                  </div>
                </div>
              )}

              {/* Admit Card Image */}
              {selectedStudent.admitCardImage && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Admit Card</h4>
                  <div className="flex flex-col items-center">
                    <img
                      src={selectedStudent.admitCardImage || "/placeholder.svg?height=300&width=400"}
                      alt="Admit Card Image"
                      className="max-w-full h-64 object-contain rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity duration-300 shadow-md"
                      onClick={() => openImagePreview(selectedStudent.admitCardImage)}
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=300&width=400"
                        e.target.onerror = null
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadImage(selectedStudent.admitCardImage, `${selectedStudent.firstName}_admit_card.jpg`)
                      }}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center shadow-md"
                      disabled={downloadStatus[`${selectedStudent.firstName}_admit_card.jpg`]}
                    >
                      {downloadStatus[`${selectedStudent.firstName}_admit_card.jpg`] ? (
                        <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                      ) : (
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      )}
                      Download
                    </button>
                  </div>
                </div>
              )}

              {/* SEE Pre-Certificate Image */}
              {selectedStudent.seeCertificateImage && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">SEE Pre-Certificate</h4>
                  <div className="flex flex-col items-center">
                    <img
                      src={selectedStudent.seeCertificateImage || "/placeholder.svg?height=300&width=400"}
                      alt="SEE Pre-Certificate Image"
                      className="max-w-full h-64 object-contain rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity duration-300 shadow-md"
                      onClick={() => openImagePreview(selectedStudent.seeCertificateImage)}
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=300&width=400"
                        e.target.onerror = null
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadImage(
                          selectedStudent.seeCertificateImage,
                          `${selectedStudent.firstName}_see_certificate.jpg`,
                        )
                      }}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center shadow-md"
                      disabled={downloadStatus[`${selectedStudent.firstName}_see_certificate.jpg`]}
                    >
                      {downloadStatus[`${selectedStudent.firstName}_see_certificate.jpg`] ? (
                        <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                      ) : (
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      )}
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Close Button */}
            <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition duration-200 font-semibold shadow-md"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Lightbox */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-60"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-[95vw] max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewImage || "/placeholder.svg?height=600&width=800"}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                e.target.src = "/placeholder.svg?height=600&width=800"
                e.target.onerror = null
              }}
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition duration-200 bg-black bg-opacity-50 rounded-full p-2"
              aria-label="Close preview"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PreRegister
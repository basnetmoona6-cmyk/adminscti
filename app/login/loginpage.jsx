"use client"
import { useState, useEffect } from "react"
import { useAction } from "convex/react"
import { useRouter } from "next/navigation"
import { api } from "@/convex/_generated/api"

// Enhanced Button Component
const Button = ({ children, onClick, disabled, className, variant = "primary", type = "button" }) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white focus:ring-blue-500",
    outline: "border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-800 focus:ring-blue-500",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white focus:ring-green-500",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className || ""}`}
    >
      {children}
    </button>
  )
}

// Enhanced Input Component
const Input = ({ type = "text", value, onChange, placeholder, disabled, className, id, onKeyPress }) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-300 ${className || ""}`}
    />
  )
}

// Enhanced Label Component
const Label = ({ children, htmlFor, className }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-semibold text-gray-800 mb-2 ${className || ""}`}>
      {children}
    </label>
  )
}

// Enhanced Card Components
const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 hover:shadow-3xl ${className || ""}`}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className }) => {
  return <div className={`px-8 py-6 border-b border-gray-100 ${className || ""}`}>{children}</div>
}

const CardContent = ({ children, className }) => {
  return <div className={`px-8 py-6 ${className || ""}`}>{children}</div>
}

const CardFooter = ({ children, className }) => {
  return <div className={`px-8 py-6 border-t border-gray-100 ${className || ""}`}>{children}</div>
}

const CardTitle = ({ children, className }) => {
  return <h2 className={`text-3xl font-extrabold text-gray-900 tracking-tight ${className || ""}`}>{children}</h2>
}

const CardDescription = ({ children, className }) => {
  return <p className={`text-gray-500 mt-3 text-base ${className || ""}`}>{children}</p>
}

// Enhanced Alert Component
const Alert = ({ children, className, variant = "error" }) => {
  const variants = {
    success: "border-green-300 bg-green-50/80",
    error: "border-red-300 bg-red-50/80",
    warning: "border-yellow-300 bg-yellow-50/80",
  }

  return (
    <div className={`border rounded-lg p-4 backdrop-blur-sm ${variants[variant]} ${className || ""}`}>{children}</div>
  )
}

const AlertDescription = ({ children, className, variant = "error" }) => {
  const variants = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-yellow-800",
  }

  return <p className={`text-sm font-medium ${variants[variant]} ${className || ""}`}>{children}</p>
}

// Icons with enhanced styling
const UserIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const LockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
)

const EyeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const EyeOffIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
    />
  </svg>
)

const LoaderIcon = ({ className }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const addUser = useAction(api.addUser.addUser)
  const checkLoginFunction = useAction(api.login.checkLogin)
  const router = useRouter()

  // Add useEffect to clear localStorage on tab/window close
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("currentUser")
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    if (message) {
      setMessage("")
      setMessageType("")
    }
  }

  const handleAddUser = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setMessage("")

    try {
      await addUser({
        username: formData.username.trim(),
        password: formData.password,
      })
      setMessage("Account created successfully! You can now log in.")
      setMessageType("success")
      setFormData({ username: "", password: "" })
    } catch (error) {
      console.error("Error adding user:", error)
      setMessage(error.message || "Failed to create account. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setMessage("")

    try {
      const result = await checkLoginFunction({
        username: formData.username.trim(),
        password: formData.password,
      })

      if (result.success) {
        setMessage(`Welcome back, ${formData.username}!`)
        setMessageType("success")
        localStorage.setItem("currentUser", formData.username)
        setTimeout(() => {
          router.push("/Adminpage")
        }, 1000)
      } else {
        setMessage(result.message || "Invalid credentials. Please try again.")
        setMessageType("error")
      }
    } catch (error) {
      console.error("Error during login:", error)
      setMessage("Login failed due to an unexpected error. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Welcome </CardTitle>
          <CardDescription>Login in to access your account securely</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                onKeyPress={handleKeyPress}
                className={`pl-10 ${errors.username ? "border-red-400" : ""}`}
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>
            {errors.username && <p className="text-sm text-red-600 font-medium">{errors.username}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onKeyPress={handleKeyPress}
                className={`pl-10 pr-10 ${errors.password ? "border-red-400" : ""}`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                disabled={isLoading}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-600 font-medium">{errors.password}</p>}
          </div>

          {/* Message Alert */}
          {message && (
            <Alert variant={messageType}>
              <AlertDescription variant={messageType}>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={handleLogin} disabled={isLoading} className="w-full">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoaderIcon className="mr-2 h-5 w-5" />
                login...
              </div>
            ) : (
              "Login"
            )}
          </Button>

          {/* {<Button
          onClick={handleAddUser}
          disabled={isLoading}
          variant="success"
          className="w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoaderIcon className="mr-2 h-5 w-5" />
              Creating Account...
            </div>
          ) : (
            "Create New Account"
          )}
        </Button> } */}

          {/* <div className="text-center">
          <Link href="/change-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all duration-200">
            Forgot Password?
          </Link>
        </div> */}
        </CardFooter>
      </Card>
    </div>
  )
}

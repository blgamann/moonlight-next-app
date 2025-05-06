"use client"

import { useState, useEffect } from "react"
import PasswordProtection from "@/components/password-protection"
import VersionHistory from "@/components/version-history"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem("auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleAuthentication = (success: boolean) => {
    if (success) {
      localStorage.setItem("auth", "true")
      setIsAuthenticated(true)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {!isAuthenticated ? <PasswordProtection onAuthenticate={handleAuthentication} /> : <VersionHistory />}
    </main>
  )
}

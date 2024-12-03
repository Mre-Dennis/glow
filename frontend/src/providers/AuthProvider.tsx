'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
    id: string
    email: string
    companyName: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    async function checkAuth() {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (response.ok) {
                    const userData = await response.json()
                    setUser(userData)
                } else {
                    localStorage.removeItem('token')
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    async function login(email: string, password: string) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            throw new Error('Login failed')
        }

        const { token, user } = await response.json()
        localStorage.setItem('token', token)
        setUser(user)
    }

    async function logout() {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            }
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            localStorage.removeItem('token')
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
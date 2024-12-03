// pages/auth.tsx

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // Import router for redirection
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Ensure required fields are not empty
    if (!email || !password || (!isLogin && !name)) {
      alert('All fields are required');
      setLoading(false);
      return;
    }

    // Prepare the form data
    const formData = { email, password, ...(isLogin ? {} : { name }) };
    console.log('Form Data:', formData); // Check if name is included
    try {
      const response = await fetch(
        isLogin ? 'http://localhost:5000/auth/login' : 'http://localhost:5000/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log('Authentication successful:', data);
        router.push('/dashboard');
      } else {
        console.error('Authentication failed:', data.error);
        alert(data.error || 'An error occurred during authentication.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Login' : 'Create Account'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Enter your credentials to access your account' : 'Sign up for a new account'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Submitting...' : isLogin ? 'Login' : 'Create Account'}
            </Button>
            <p className="text-sm text-center text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                type="button"
                variant="link"
                className="pl-1.5"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Login'}
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

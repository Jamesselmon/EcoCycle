// Account Login Page Component
"use client"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // State for showing form errors
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });
  
  // State for showing login loading
  const [isLoading, setIsLoading] = useState(false);
  
  // Check for success messages from registration
  useEffect(() => {
    if (searchParams?.get('registered') === 'true') {
      // Show success message for newly registered users
      alert('Registration successful! Please log in with your new account.');
    }
    
    if (searchParams?.get('required') === 'true') {
      // Show message for users who tried to access protected pages
      setErrors(prev => ({
        ...prev,
        general: 'Please log in to view your orders'
      }));
    }
  }, [searchParams]);
  
  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      email: '',
      password: '',
      general: ''
    });
    
    // Validate form
    let isValid = true;
    
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      isValid = false;
    }
    
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading
    setIsLoading(true);
    
    try {
      // In a real application, you would call your authentication API here
      // For this example, we'll just simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated successful login
      console.log('Login successful');
      
      // Store authentication state (in a real app, would store JWT token etc.)
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect after successful login
      // Check if there's a returnUrl parameter
      const returnUrl = searchParams?.get('returnUrl') || '/account';
      router.push(returnUrl);
    } catch (error) {
      // Handle login error
      setErrors(prev => ({ 
        ...prev, 
        general: 'Invalid email or password. Please try again.' 
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>Login - EcoCycle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your EcoCycle account</p>
            </div>
            
            <div className="bg-white py-8 px-6 shadow-lg rounded-xl mb-6">
              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  <p>{errors.general}</p>
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link href="/account/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-500">
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/account/signup" className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors duration-200">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LoginPage;
"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', general: '' });

    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.email,  // email as username
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Account created successfully!');
        router.push('/account/login?registered=true');
      } else {
        setErrors(prev => ({ ...prev, general: data.error || 'Registration failed' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, general: 'Server error. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Account - EcoCycle</title>
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
              <p className="text-gray-600">Join EcoCycle and start shopping sustainably</p>
            </div>

            <div className="bg-white py-8 px-6 shadow-lg rounded-xl mb-6">
              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  <p>{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input name="firstName" type="text" value={formData.firstName} onChange={handleChange}
                      className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg`} />
                    {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input name="lastName" type="text" value={formData.lastName} onChange={handleChange}
                      className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} text-gray-900  rounded-lg`} />
                    {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange}
                    className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900  rounded-lg`} />
                  {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input name="password" type="password" value={formData.password} onChange={handleChange}
                    className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg`} />
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
                    className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg`} />
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="terms" required className="h-4 w-4 text-emerald-600 border-gray-300 rounded" />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the <Link href="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <button type="submit" disabled={isLoading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium">
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/account/login" className="text-emerald-600 hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SignupPage;

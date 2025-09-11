'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import cookies from 'js-cookie' // Missing import added
import { useAuth } from '@/context/AuthContext' // Import AuthContext

const SignIn = () => {
    const router = useRouter();
    const { login } = useAuth(); // Get login function from context
    const [error, setError] = useState(''); // Add error state
    const [loading, setLoading] = useState(false); // Add loading state
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
        username: '',
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        // Clear error when user starts typing
        if (error) setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Client-side validation
        if (data.password !== data.password2) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (data.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    password: data.password,
                    username: data.username,
                    email: data.email,
                    password2: data.password2
                }),
            })

            const result = await response.json()

            if (response.ok) {
                console.log('Registration successful:', result)
                
                // Use AuthContext login function instead of manually setting cookie
                login(result.token);
                
                router.push('/')
            } else {
                console.log('Registration failed:', result)
                setError(result.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Network error:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-400">
            <div className="flex flex-col p-10 bg-gray-300 shadow-lg rounded-lg w-full max-w-lg">
                <div className="flex gap-5 justify-center items-center mb-6">
                    <Image src="/logo.jpeg" alt="logo" width={50} height={50} />
                    <h1 className="text-center underline font-bold text-2xl text-blue-600">
                        Welcome to HomeOfElectronics
                    </h1>
                </div>

                {/* Error display */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input 
                            type="text"
                            name="firstname"
                            value={data.firstname}
                            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input 
                            type="text"
                            name="username"
                            value={data.username}
                            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input 
                            type="text"
                            name="lastname"
                            value={data.lastname}
                            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={data.email}
                            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password"
                            name="password"
                            value={data.password}
                            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Re-enter Password</label>
                        <input 
                            type="password"
                            name="password2"
                            value={data.password2}
                            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link className="text-blue-600 hover:underline" href="/signUp">
                        <strong>Already registered?</strong> Click here to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn   
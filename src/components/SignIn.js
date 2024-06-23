'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SignIn = () => {
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
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input 
                            type="text"
                            name="firstname"
                            value={data.firstname}
                            className="border border-gray-300 p-2 rounded w-full"
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
                            className="border border-gray-300 p-2 rounded w-full"
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
                            className="border border-gray-300 p-2 rounded w-full"
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
                            className="border border-gray-300 p-2 rounded w-full"
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
                            className="border border-gray-300 p-2 rounded w-full"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Re-enter Password</label>
                        <input 
                            type="password"
                            name="password2"
                            value={data.password2}
                            className="border border-gray-300 p-2 rounded w-full"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link className="text-blue-600 hover:underline" href="/sign/signUp">
                        
                            <strong>Already registered?</strong> Click here to Login
                       
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn

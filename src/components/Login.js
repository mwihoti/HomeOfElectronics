'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import cookies from 'js-cookie'

const LoginPage = () => {
    const router = useRouter(); // Correctly call useRouter
    const [error, setError] = useState('')
    const [data, setData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            })
        });

        const result = await response.json()

        if (response.ok) {
            console.log('Login Successful', result)
            cookies.set('token', result.token, { expires: 30 })
            router.push('/') // Navigate to the home page after successful login
        } else {
            console.error('Login failed:', result);
            setError(result.message || 'Login failed')
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-400'>
            <div className='flex flex-col items-center justify-center bg-gray-300 p-10 rounded-lg shadow-lg w-full max-w-md'>
                <div className='flex gap-4 items-center mb-6'>
                    <Image src="/logo.jpeg" alt='logo' width={50} height={50} />
                    <h1 className='text-center underline font-bold text-2xl text-blue-600'>Welcome to HomeOfElectronics</h1>
                </div>
                <form className='w-full' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>
                            Username:
                            <input 
                                type='text' 
                                className='border mt-1 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600' 
                                name='username' 
                                value={data.username} 
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700'>
                            Password:
                            <input 
                                type='password' 
                                className='border mt-1 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600' 
                                name='password' 
                                value={data.password} 
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <button type='submit' className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300'>
                        Login
                    </button>
                </form>
                <div className='mt-4'>
                    <Link className='text-blue-600 hover:underline' href='/sign/signIn'>
                       Click here to register
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage

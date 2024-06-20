'use client'
import React, { useState } from 'react'


const SignIn = () => {
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div>
        <form className='grid grid-row items-center p-4 border border-black m-2'>
            <label >
                <strong>FirstName</strong>
                <input type="text"  name='firstname' value={data.firstname} onChange={handleChange} required />

            </label>

            <label>
                <strong>LastName:</strong>
                <input type='text' name='lastname' value={data.lastname} onChange={handleChange}  required />
            </label>

            <label>
                <strong>Email:</strong>
                <input type='text' name='email' value={data.email} onChange={handleChange}  required />
            </label>

            <label>
                <strong>Password:</strong>
                <input type='password' name='password' value={data.password} onChange={handleChange}  required />
            </label>

            <label>
                <strong>Re-enter Password:</strong>
                <input type='password' name='password' value={data.password} onChange={handleChange}  required />
            </label>

        </form>
    </div>
  )
}

export default SignIn
'use client'
import React, { useState } from 'react'


const SignIn = () => {
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
         password2: ''
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div>

    
    <div className=' flex  justify-center m-32'>
        <form className='grid grid-row items-center justify-center h-3/4 p-4 border w-1/2  '>
            <label className='items-center ' >
                <h3>
                <strong>FirstName</strong>
                </h3>
                <input type="text"  name='firstname' value={data.firstname} className='border m-2 p-2 border-black rounded' onChange={handleChange} required />

            </label>

            <label className=' justify-center'>
                <h3>
                <strong>LastName:</strong>
                </h3>
               
                <input type='text' name='lastname' value={data.lastname} className='border m-2 p-2 border-black rounded' onChange={handleChange}  required />
            </label>

            <label className='items-center'>
                <h3>
                <strong>Email:</strong>
                </h3>
               
                <input type='text' name='email' value={data.email} className='border m-2 p-2 border-black rounded' onChange={handleChange}  required />
            </label>

            <label className='items-center '>
                <h3> <strong>Password:</strong></h3>
               
                <input type='password' name='password' value={data.password} className='border m-2 p-2 border-black rounded' onChange={handleChange}  required />
            </label>

            <label className='items-center'>
                <h3><strong>Re-enter Password:</strong></h3>
                
                <input type='password' name='password2' value={data.password2} className='border m-2 p-2 border-black rounded' onChange={handleChange}  required />
            </label>

            <button type='submit' className='bg-gray-300 p-2 m-3 hover:bg-stone-950 hover:text-white rounded-2xl'>
                SignIn
            </button>

        </form>
    </div>
    </div>
  )
}

export default SignIn
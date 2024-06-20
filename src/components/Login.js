'use client'
import React, { useState } from 'react'

const LoginPage = () => {
    const [data, setData] = useState({
        username: '',
        password: '',

    })
  return (
    <div>
 <h1 className='text-center justify-center '>Welcome to HomeOfElectronics</h1>
        
    
    <div className='mx-auto  flex  justify-center m-32 border w-1/2' >
       
        <form className='grid grid-row items-center justify-center h-3/4 p-4 '>
            <label>
                Username:
                <input type='text' className='border m-2 p-2 border-black rounded' name='username' required/>
            </label> 
            <label>
                Password:
                <input type='password' className='border m-2 p-2 border-black rounded' name='password' required/>
            </label>

            <button type='submit' className='bg-gray-300 p-2 m-3 hover:bg-stone-950 hover:text-white rounded-2xl'>Login</button>

        </form>
    </div>

    </div>
  )
}

export default LoginPage
'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const LoginPage = () => {
    const [data, setData] = useState({
        username: '',
        password: '',

    })
  return (
    <div className='h-4/5 flex items-center justify-center'>
 
        
    
    <div className='flex flex-col items-center  justify-center m-32 border w-1/2 ' >
    <div className='flex gap-10 items-center'>
    <Image src="/logo.jpeg" alt='logo' width={50} height={50}/>

<h1 className='text center underline font-bold text-xl'>Welcome to HomeOfElectronics</h1>

    </div>




       
        <form className='grid grid-row w-full  gap-4 max-w-sm p-20'>
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

        <div>
            <Link href='/sign/signIn'>
                <h4>Click here to register</h4>
                </Link>
        
    </div>

    
    </div>
    

    </div>
  )
}

export default LoginPage
import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className='border items-center text-center p-4 justify-center gap-9  bg-zinc-800 flex text-white'>
            <Image
                src="/logo.jpeg"
                alt="shop Logo"
                className=''

                width={50}
                height={50} />
                <h3 className=''>HomeOfElectronics</h3>

                <div className='flex m-0'>
                    <ul className='flex gap-4'>
                        <li>
                        <Image src='/ig.png' 
                        alt='Ig logo' className='m-2' height={30} width={30}/>
                        </li>
                        <li>
                        <Image src='/fb.png' 
                        alt='fb logo' className='m-2' height={30} width={30}/>
                        </li>
                        <li>
                        <Image src='/x.png' 
                        alt='X logo' className='m-2' height={30} width={30}/>
                        </li>

                    </ul>
                </div>

                <h5>Call : 0723559412 </h5>
                <h5>Email: danielmwihoti@gmail.com</h5>
        </div>
    )
}

export default Footer
import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className='border bg-black flex text-white'>
            <Image
                src="/logo.jpeg"
                alt="shop Logo"
                className=''

                width={30}
                height={30} />
                <h3>HomeOfElectronics</h3>

                <div className='flex'>
                    <ul>
                        <li>
                        <Image src='/ig.png/' 
                        alt='Ig logo' height={30} width={30}/>
                        </li>
                        <li>
                        <Image src='/fb.png/' 
                        alt='fb logo' height={30} width={30}/>
                        </li>
                        <li>
                        <Image src='/x.png/' 
                        alt='X logo' height={30} width={30}/>
                        </li>

                    </ul>
                </div>
        </div>
    )
}

export default Footer
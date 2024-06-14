import Link from 'next/link'
import React from 'react'
import Image from "next/image";


const Navbar = () => {
    return (
        <div className='flex p-4 items-center justify-center border bg-black text-white' >

            <div className='flex items-center gap-5'>
                <Image
                    src="/logo.jpeg"
                    alt="shop Logo"
                    className=''

                    width={60}
                    height={50} />
                <h2 className="text-xl">HomeOfElctronics</h2>
                <div className=' flex ml-20'>
                    <ul className='flex gap-10 '>


                        <li>
                            <Link href='/home'>Home</Link>
                        </li>
                        <li>
                            <Link href='/home'>Orders</Link>
                        </li>
                        <li>
                            <Link href='/home'>About us</Link>
                        </li>
                    </ul>
                </div>



            </div>

        </div>
    )
}

export default Navbar
'use client'
import Link from 'next/link'
import React, {useState} from 'react'
import Image from "next/image";
import { useRouter} from 'next/navigation'



const Navbar = (wishlist) => {
    const router = useRouter();
    const [wishlistCount, setWishlistCount] = useState(0);

    const addToWishlist = () => {
        setWishlistCount(wishlistCount + 1);
    }
    const handleWishlistClick = () => {
        router.push('/wishlist')
    }

    return (
        <div className='flex p-4 justify-between   bg-[#406ca9] text-white' >

            <div className='flex justify-center  space-x-28'>
                <div className='flex gap-4 items-center'>
                    <Image
                        src="/logo.jpeg"
                        alt="shop Logo"
                        className=''

                        width={60}
                        height={50} />
                    <h2 className="text-2xl text-black font-bold ">HomeOfElctronics</h2>

                </div>
                </div>

                <div className=' flex  '>
                    <ul className='flex gap-10 '>


                        <li>
                            <Link href='/home'>Home</Link>
                        </li>
                        <li>
                            <Link href='/product'>Orders</Link>
                        </li>
                        <li>
                            <Link href='/home'>About us</Link>
                        </li>
                    </ul>
                </div>



       
            <div className='flex  gap-4'>
                <h4> 
                <Image className='rounded object-fill' src='/cart.gif' alt='cart' width={40} height={30} />
                Cart

                </h4>
                <h4>
                <Image className='rounded border bg-gray-300 p-1' src='/user.png' alt='cart' width={40} height={30} />
                User
                </h4>
                <h4>
                <Image className='rounded object-fill' src='/wishlist.png' alt='cart' width={40} height={30}onClick={handleWishlistClick} />
                Wishlist [{wishlistCount}]
                </h4>
                             
            </div>

        </div>
    )
}

export default Navbar
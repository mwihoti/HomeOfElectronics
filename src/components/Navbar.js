'use client'
import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import Image from "next/image";
import { useRouter} from 'next/navigation'



const Navbar = () => {
    const router = useRouter();
    const [wishlist, setWishlist] = useState(0);

    
    const handleWishlistClick = () => {
        router.push('/wishlist')
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            setWishlist(savedWishlist);

        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('wishlist', JSON.stringify('wishlist'));
        }
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist((prevWishlist) =>  {
            const isalreadyInWishlist = prevWishlist.some((item) => item._id === product._id);
            if (!isalreadyInWishlist) {
                const newWishlist = [...prevWishlist, product];
                localStorage.setItem('wishlist', JSON.stringify(newWishlist));
                return newWishlist

            }

            return prevWishlist;
        })
        
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
                <button className='flex items-center gap-1' onClick={handleWishlistClick}>
            <Image className='rounded object-fill' src='/wishlist.png' alt='wishlist' width={40} height={30} />
            Wishlist ({wishlist.length})
          </button>
          </h4>
                             
            </div>

        </div>
    )
}

export default Navbar
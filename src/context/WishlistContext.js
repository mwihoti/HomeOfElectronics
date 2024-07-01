'use client';
import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

const useWishlist = () => useContext(WishlistContext);

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist((prevWishlist) => {
            const isInWishlist = prevWishlist.some((item) => item._id === product._id);
            if (!isInWishlist) {
                return [...prevWishlist, product];
            }
            return prevWishlist;
        });
    }

    const removeFromWishlist = (productId) => {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));
    }

    return (
        <WishlistContext.Provider value={{ addToWishlist, removeFromWishlist, wishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export {WishlistProvider, useWishlist}

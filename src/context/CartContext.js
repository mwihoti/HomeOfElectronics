'use client'
import React, {createContext, useContext, useState, useEffect} from "react";

const cartContext = createContext();

export const cartProvider  = ({children}) => {
    const [cart, setCart] = useState('');

    useEffect (() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);

    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart] );

    const addToCart = (product, quantity) => {
        const exisitingItem = cart.find(item => item.id === product.id);

        if (exisitingItem) 
            {
                setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity} : item ))
            } else {
                setCart([ ...cart, {...product, quantity}])
            }
    }

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    }
    
    const clearCart = () => {
        setCart([])
    }
}


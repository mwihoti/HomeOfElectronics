"use client"
import React, { useState } from 'react'

const ProductForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        
        category: '',
        price: '',
        description: '',
        quantity: 0,

    })
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        for (let key in formData) {
            data.append(key, formData[key])
        }

        Array.from(images).forEach((file) => {
            data.append('images', file)
        })
        try {
            const response = await fetch('api/addProduct', {
                method: 'POST',

                body: data,

            });
            const result = await response.json();
            if (response.ok) {
                alert('Product added successfully!')
                setFormData({
                    name: '',   
                    category: '',
                    price: '',
                    description: '',
                    quantity: 0,
                });
                setImages([])
            }
            else {
                alert (`Failed to add Product : ${ result ? result.message : 'Unknown error'}`)
            }

        }
        catch (error) {
            console.error('Error adding product:', error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const handleFileChange = (e) => {
        setImages(e.target.files);
      };
    return (
        <div className='text-center'>
            <h3>Welcome To add Product page </h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label > Name:
                        <input className='border p-1' value={formData.name} type='text' name='name' onChange={handleChange} required />
                    </label>
                </div>

                <br />
                <div>
                    <label > Images:
                        <input className='border' type='file' name='images' onChange={handleFileChange} required multiple />
                    </label>
                </div>

                <br />
                <div>
                    <label > Category:
                        <input className='border' value={formData.category} type='text' onChange={handleChange} name='category' required />
                    </label>
                </div>

                <br />
                <div>
                    <label > Price:
                        <input className='border' value={formData.price} type='text' onChange={handleChange} name='price' required />
                    </label>

                </div>

                <br />
                <div>
                    <label > Description:
                        <input className='border' value={formData.description} type='text' onChange={handleChange} name='description' required />
                    </label>
                </div>

                <br />
                <div>
                    <label >Quantity:
                        <input className='border' type='text' value={formData.quantity} onChange={handleChange} name='quantity' required />
                    </label>
                </div>

                <br />

                <button className='border' type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default ProductForm
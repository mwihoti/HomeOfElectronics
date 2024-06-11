import React, {useState} from 'react'

const ProductForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: '',
        price: '',
        description: '',
        quantity: 0,

    })

    const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }
  return (
    <div className='text-center'>
        <h3>Welcome To add Product page </h3>
        <form>
            <div>
            <label > Name:
                <input className='border p-1' value={formData.name} type='text' name='name' onClick={handleChange} required />
            </label>
            </div>
          
            <br/>
            <div>
            <label > Images:
                <input className='border' value={formData.image} type='text' name='images' onClick={handleChange} required multiple/>
            </label>
            </div>
           
            <br/>
            <div>
            <label > Category:
                <input className='border' value={formData.category} type='text' onClick={handleChange} name='category' required />
            </label>
            </div>
           
            <br/>
            <div>
            <label > Price:
                <input className='border' value={formData.price} type='text' onClick={handleChange} name='price' required />
            </label>

            </div>
            
            <br/>
            <div>
            <label > Description:
                <input className='border' value={formData.description} type='text' onClick={handleChange} name='description' required />
            </label>
            </div>
            
            <br/>
            <div>
            <label >Quantity:
                <input className='border' type='text' value={formData.quantity} onClick={handleChange} name='quantity' required />
            </label>
            </div>
            
            <br/>

            <button className='border' type="submit">Add Product</button>
        </form>
    </div>
  )
}

export default ProductForm
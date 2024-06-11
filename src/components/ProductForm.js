import React, {useState} from 'react'

const ProductForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: '',
        price: '',
        description: '',
        quantity: 0,

    }

    )
  return (
    <div className='text-center'>
        <h3>Welcome To add Product page </h3>
        <form>
            <div>
            <label > Name:
                <input className='border p-1' value={formData.name} type='text' name='name' required />
            </label>
            </div>
          
            <br/>
            <div>
            <label > Images:
                <input className='border' value={formData.image} type='text' name='images' required multiple/>
            </label>
            </div>
           
            <br/>
            <div>
            <label > Category:
                <input className='border' value={formData.category} type='text' name='category' required />
            </label>
            </div>
           
            <br/>
            <div>
            <label > Price:
                <input className='border' value={formData.price} type='text' name='price' required />
            </label>

            </div>
            
            <br/>
            <div>
            <label > Description:
                <input className='border' value={formData.description} type='text' name='description' required />
            </label>
            </div>
            
            <br/>
            <div>
            <label >Quantity:
                <input className='border' type='text' value={formData.quantity} name='quantity' required />
            </label>
            </div>
            
            <br/>

            <button className='border' type="submit">Add Product</button>
        </form>
    </div>
  )
}

export default ProductForm
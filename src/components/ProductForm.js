import React from 'react'

const ProductForm = () => {
  return (
    <div>
        <h3>Welcome To add Product page </h3>
        <form>
            <label > Name:
                <input type='text' name='name' required />
            </label>
            <br/>
            <label > Images:
                <input type='text' name='images' required multiple/>
            </label>
            <br/>
            <label > Category:
                <input type='text' name='category' required />
            </label>
            <br/>
            <label > Price:
                <input type='text' name='price' required />
            </label>
            <br/>
            <label > Description:
                <input type='text' name='description' required />
            </label>
            <br/>
            <label >Quantity:
                <input type='text' name='quantity' required />
            </label>
            <br/>

            <button type="submit">Add Product</button>
        </form>
    </div>
  )
}

export default ProductForm
import React from 'react';

const Wishlist = ({ wishlist }) => {
    const wishlistArray = Array.isArray(wishlist) ? wishlist : [];
  return (
    <div className='mx-auto'>
      <h3>Your wishlist</h3>
      <div className='justify-center m-3'>
        {wishlistArray.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <ul className='p-3 m-2 space-between text-black gap-8 grid grid-cols-2 divide-x'>
            {wishlistArray.map((product) => (
              <li key={product._id} className='bg-gray-200 border m-2'>
                <div>
                  <img
                    src={`data:image/jpeg;base64,${product.currentImage || product.images[0]}`}
                    loading='lazy'
                    className='object-fill object-center h-40 w-full'
                    alt={product.name}
                  />
                </div>
                <h4>Product name: {product.name}</h4>
                <div className='flex gap-10 justify-center m-2'>
                  <p>
                    <strong>Price</strong>: {product.price}
                  </p>
                  <p>
                    <strong>Quantity</strong>: {product.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

// components/Product.js

import React from 'react';
import { urlFor } from '@/lib/client'; // Ensure this path is correct

const Product = ({ product }) => {
  const { images = [], name = '', slug = { current: '' }, price = '', quantity = 0 } = product || {};

  // Ensure you have a fallback for the image
  const imageUrl = images.length > 0 ? urlFor(images[0]) : '/default-product-image.jpg';

  return (
    <div className="product-card">
      <a href={`/product/${slug.current}`} className="product-link">
        <div className="product-image">
          <img
            src={imageUrl}
            alt={name}
            width={250}
            height={250}
            className="object-cover"
          />
        </div>
        <div className="product-details">
          <h2 className="product-name">{name}</h2>
          <p className="product-price">Ksh {price}</p>
          <p className="product-quantity">Quantity: {quantity}</p>
        </div>
      </a>
    </div>
  );
};

export default Product;

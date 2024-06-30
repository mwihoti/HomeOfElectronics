import React from 'react'
import Link from 'next/link';
import { urlFor } from '@/lib/client';

const Product  = ({product  }) => {
  const {images =[], name = '', slug = {current: ''}, price=''} = product || {}
  return (
    <div>(
        <Link href={`/product/${slug.current}`} >
        <div className=''>
            <img src={urlFor(images && images[0])}  width={250} height={250}/>
            <p className=''>{name}</p>
            <p className=''>ksh {price}</p>
        </div>
        </Link>

        )</div>
  )
}

export default Product
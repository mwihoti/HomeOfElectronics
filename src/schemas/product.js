import { sources } from "next/dist/compiled/webpack/webpack";

export default {
    name: 'product',
    title: 'Product',
    type: 'document',

    fields : [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options : {
                sources: 'name',
                maxLength: 90
            }
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{type: 'image'}]
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
    
     
    ]
}
import { type } from "os"
import {title } from  "process"
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
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'discount',
            title: 'discount',
            type: 'number'
        },
        {
            name: 'originalPrice',
            title: 'originalPrice',
            type:  'number'
        },
        
    
     
    ]
}
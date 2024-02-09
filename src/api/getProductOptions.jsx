import { baseURL } from "./baseURL"


export default async function getProductOptions() {
    const response = await fetch(`${baseURL}product-option`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}


export async function getProductOptionsAll() {
    const response = await fetch(`${baseURL}product-option/all`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}

export async function getProductOption(id) {
    const response = await fetch(`${baseURL}product-option/${id}`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}
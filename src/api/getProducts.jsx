import { baseURL } from "./baseURL"


export default async function getProducts() {
    const response = await fetch(`${baseURL}product`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}


export async function getFourProducts() {
    const response = await fetch(`${baseURL}product/four`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}


export async function getProduct(id) {
    const response = await fetch(`${baseURL}product/${id}`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}



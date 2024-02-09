import { baseURL } from "./baseURL"


export default async function getCategories() {
    const response = await fetch(`${baseURL}category`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}

export async function getCategory(id) {
    const response = await fetch(`${baseURL}category/${id}`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}

export async function getCategoryOne() {
    const response = await fetch(`${baseURL}category/one`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}


export async function getCategoryPriorityTwo() {
    const response = await fetch(`${baseURL}category/two`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}
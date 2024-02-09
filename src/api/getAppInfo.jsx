import { baseURL } from "./baseURL"



export default async function getAppInfo() {
    const response = await fetch(`${baseURL}app-info`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}


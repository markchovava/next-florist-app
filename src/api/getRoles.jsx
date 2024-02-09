import baseURL from "./baseURL"


export default async function getRoles() {
    const response = await fetch(`${baseURL}role`, { cache: 'no-store'})
 
    if(!response.ok) {
       throw new Error('failed to fetch App Info.')
    }

    return await response.json()

}


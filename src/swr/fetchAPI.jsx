"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/api/tokenAuth";


export default async function fetcherAPI (url) {
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };
    
    try {
        const response = await axiosClientAPI.get(url, config);
        return response.data;
      }  catch (error) {
        console.error(`Error: ${error}`)
      }   
  };


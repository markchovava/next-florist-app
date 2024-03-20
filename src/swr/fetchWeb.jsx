"use client"
import axios from "axios";


export default async function fetcherWeb(url){
    
  try {
        const response = await axios.get(url);
        return response.data;
      }  catch (error) {
        console.error(`Error: ${error}`)
      }   
  };



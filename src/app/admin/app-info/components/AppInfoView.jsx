"use client"

import axiosClientAPI from '@/api/axiosClientAPI';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import tokenAuth from '@/api/tokenAuth'
import Loader from '@/components/Loader';
import tokenRole  from '@/api/tokenRole';



export default function AppInfoView() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [image, setImage] = useState({});
    const { getAuthToken } = tokenAuth();
    const { getRoleToken } = tokenRole();

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
      }}


    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`app-info/`, config)
        .then((response) => {
            if(!response.data.data){
                console.log(response.data)
                return;
            }
            setData(response.data.data)
            response.data.data.image && setImage(baseURL + response.data.data.image);

        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    } 

    useEffect(() => {
        getData();
        setIsLoading(false);
    }, [])
    

  return (
    
    <>
    {   isLoading == true ? 
        <Loader /> :
        <section className='w-[100%] h-auto pb-[4rem]'>
        <div className='w-[80%] mx-auto lg:flex justify-start items-start gap-8'>
                <div className='lg:w-[100%]'>
                    
                        <div className='flex justify-between items-center pb-[1rem]'>
                            <div className='font-light text-[2rem] pb-4'>View App Info</div>
                            {getRoleToken() <= 2 && 
                                <Link href='/admin/app-info/edit' className=' py-3 px-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                                    Edit App Info
                                </Link>
                            }
                        </div>
                
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>Name: </div>
                        <div className='w-[80%] font-semibold'> {data.name} </div>
                    </div>
                    
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>Description: </div>
                        <div className='w-[80%] font-semibold'>{data.description}</div>
                    </div>
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>Address: </div>
                        <div className='w-[80%] font-semibold'>{data.address}</div>
                    </div>
                
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>Phone Number: </div>
                        <div className='w-[80%] font-semibold'>{data.phone}</div>
                    </div>
                
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>Email: </div>
                        <div className='w-[80%] font-semibold'>
                            {data.email}
                        </div>
                    </div>
                    
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>Website: </div>
                        <div className='w-[80%] font-semibold'>
                            {data.website}
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>WhatsApp: </div>
                        <div className='w-[80%] font-semibold'>
                            {data.whatsapp}
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>Twitter / X: </div>
                        <div className='w-[80%] font-semibold'>
                            {data.twitter}
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>Facebook: </div>
                        <div className='w-[80%] font-semibold'>
                            {data.facebook}
                        </div>
                    </div>
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>Instagram: </div>
                        <div className='w-[80%] font-semibold'>
                            {data.instagram}
                        </div>
                    </div>
                
                    
                </div>
                    
            </div>
            
        </section>
    }
    </>
       

 
  )
}

"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link'
import axiosClientAPI from '@/api/axiosClientAPI';
import tokenAuth from '@/api/tokenAuth';
import tokenRole  from '@/api/tokenRole';



export default function UserView() {
    const { getAuthToken } = tokenAuth();
    const { setRoleToken } = tokenRole();
    const [data, setData] = useState({})

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
      }}


    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`profile/`, config)
        .then((response) => {
            if(!response.data?.data){
                console.log(response.data)
                return;
            }
            setRoleToken(response.data.data.role.level);
            setData(response.data.data)
            console.log('USER INFO')
            console.log(response.data.data)

        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    } 

    useEffect(() => {
        getData();
    }, [])
    

  return (
       
    <section className='w-[100%] h-auto pb-[4rem]'>
       <div className='w-[80%] mx-auto lg:flex justify-start items-start gap-8'>
            <div className='lg:w-[100%]'>
                  
                    <div className='flex justify-between items-center pb-[1rem]'>
                        <div className='font-light text-[2rem] pb-4'>View User</div>
                        <Link href={`/admin/profile`} className=' py-3 px-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                            Edit Profile</Link>
                    </div>
               
                <div className='flex items-center justify-start gap-3 pb-6'>
                    <div className='w-[20%]'>Full Name: </div>
                    <div className='w-[80%] font-semibold flex justify-start items-center gap-1'> 
                        <span>{data.first_name ? data.first_name : 'Not added.'}</span>
                        <span>{data.last_name ? data.last_name : ''} </span>
                    </div>
                </div>
              
                <div className='flex items-center justify-start gap-3 pb-6'>
                    <div className='w-[20%]'>Role: </div>
                    <div className='w-[80%] font-semibold'>{data.role && data.role.name}</div>
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
                    <div className='w-[20%]'>Address: </div>
                    <div className='w-[80%] font-semibold'>{data.address}</div>
                </div>
                
                <div className='flex items-center justify-start gap-3 pb-6'>
                    <div className='w-[20%]'>Code: </div>
                    <div className='w-[80%] font-semibold'>
                        {data.code}
                    </div>
                </div>

                <div className='flex items-center justify-start gap-3 pb-6'>
                    <div className='w-[20%]'>City: </div>
                    <div className='w-[80%] font-semibold'>
                        {data.city}
                    </div>
                </div>
                <div className='flex items-center justify-start gap-3 pb-6'>
                    <div className='w-[20%]'>Country: </div>
                    <div className='w-[80%] font-semibold'>
                        {data.country}
                    </div>
                </div>
                
            
                
            </div>
                
        </div>
        
    </section>

 
  )
}

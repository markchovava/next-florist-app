"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axiosClientAPI from '@/api/axiosClientAPI'
import tokenAuth from '@/api/tokenAuth'
import tokenRole from '@/api/tokenRole'




export default function CategoryView({ id }) {
    const [data, setData] = useState({})
    const { getAuthToken } = tokenAuth();
    const { getRoleToken } = tokenRole();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
    }}
    
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`category/${id}`, config)
        .then((response) => {
            setData(response.data.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }    

    useEffect(() => { 
        getData()
    }, []);


  return (
    <section className='w-[100%] h-auto pb-[4rem]'>
         
    <div className='w-[80%] mx-auto lg:flex justify-start items-start gap-8'>
        <div className='lg:w-[100%]'>
             {/*  */}
             <div className='flex justify-between items-center pb-[1rem]'>
                <div className='font-light text-[2rem] pb-4'>View Category</div>
                { getRoleToken() <= 2 &&
                    <Link 
                        href={`/admin/category/edit/${id}`} 
                        className=' py-3 px-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                        Edit Category
                    </Link>
                }
             </div>
            {/*  */}
            <div className='flex items-center justify-start gap-3 pb-6'>
                <div className='w-[20%]'>Name: </div>
                <div className='w-[80%] font-semibold'> {data.name} </div>
            </div>
            {/*  */}
            <div className='flex items-center justify-start gap-3 pb-6'>
                <div className='w-[20%]'>Slug: </div>
                <div className='w-[80%] font-semibold text-green-800'> {data.slug} </div>
            </div>
            {/*  */}
            <div className='flex items-center justify-start gap-3 pb-6'>
                <div className='w-[20%]'>Priority: </div>
                <div className='w-[80%] font-semibold'> {data.priority} </div>
            </div>
            {/*  */}
            <div className='flex items-center justify-start gap-3 pb-6'>
                <div className='w-[20%]'>Description: </div>
                <div className='w-[80%] font-semibold'>{data.description}</div>
            </div>
            {/*  */}
            <div className='flex items-center justify-start gap-3 pb-6'>
                <div className='w-[20%]'>Author: </div>
                <div className='w-[80%] font-semibold'>
                    {data.user ?`${data.user.first_name} ${data.user.last_name}` : 'Not added...'}
                </div>
            </div>
            
        </div>       
    </div>
   
</section>
  )
}

"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { getToken } from '@/api/token';
import tokenAuth from '@/api/tokenAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'



export default function OptionAdd() {
    const { getAuthToken } = tokenAuth();
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState({});

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
      }}



    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    /* POST DATA */
  async function postData() {
    setIsSubmit(false)
    try{
        const result = await axiosClientAPI.post(`product-option/`, data, config)
        .then((response) => {
              router.push('/admin/product-option')
            }
        );    
      } catch (error) {
          console.error(`Error: ${error}`)
      }    
  }

  useEffect(() => {
    isSubmit == true && postData();
  }, [isSubmit])

  return (
    <section className='w-[100%] h-auto pb-[4rem]'>
            <div className='w-[90%] lg:w-[70%] mx-auto lg:flex justify-start items-start gap-8'>
                <div className='lg:w-[100%]'>
                    {/*  */}
                    <div className='flex items-start justify-start gap-3 pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Name:</h6>
                            <input type='text'
                                name='name' 
                                onChange={handleInput}
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                        </div> 
                    </div>
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Description:</h6>
                            <textarea 
                                name='description'
                                onChange={handleInput}
                                type='text' 
                                className='w-[100%] h-[5rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'></textarea>
                        </div>
                    </div>
                    {/*  */}
                    <div className='flex items-start justify-start gap-3 pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Price:</h6>
                            <input 
                                type='number'
                                name='price' 
                                onChange={handleInput}
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                        </div> 
                    </div>
                    {/*  */}
                    <div className='w-[100%] mx-auto flex items-center justify-center'>
                        <button
                            onClick={() => setIsSubmit(true) }
                            className='cursor-pointer px-14 py-4 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                            Submit</button>
                    </div>
                </div>
                   
            </div>
           
        </section>
  )
}


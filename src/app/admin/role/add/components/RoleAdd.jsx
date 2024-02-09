"use client";

import axiosClientAPI from '@/api/axiosClientAPI';
import tokenAuth from '@/api/tokenAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'




export default function RoleAdd() {
    const { getAuthToken } = tokenAuth();
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false)
    const [data, setData] = useState({
        name:'',
        description:'',
        level:0
    })

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
        const result = await axiosClientAPI.post(`role/`, data, config)
        .then((response) => {
              router.push('/admin/role')
            }
        );    
      } catch (error) {
        console.error(`Error: ${error}`);
        console.error(`Error Message: ${error.message}`);
        console.error(`Error Response: ${error.response}`);
      }    
  }

  useEffect(() => {
    isSubmit == true && postData();
  }, [isSubmit])

  return (
    <section className='w-[100%] h-auto pb-[4rem]'>
            <div className='w-[70%] mx-auto lg:flex justify-start items-start gap-8'>
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
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Level:</h6>
                            <select
                                name='level' 
                                onChange={handleInput} 
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'>
                                <option >Select Option...</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </select>
                        </div>
                    </div>
                    
            
                    <div className='w-[100%] mx-auto'>
                        <button
                            onClick={() => setIsSubmit(true) }
                            className='cursor-pointer w-[100%] py-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                            Submit</button>
                    </div>
                </div>
                   
            </div>
           
        </section>
  )
}

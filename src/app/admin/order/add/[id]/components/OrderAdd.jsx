"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { getToken } from '@/api/token';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function OrderAdd({ id }) {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState({});
    const [roles, setRoles] = useState([]);

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getToken()}`
      }}

    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`user/${id}`, config)
        .then((response) => {
            if(!response.data.data){
                console.log(response.data)
                return;
            }
            console.log(response.data.data)
            setData(response.data.data);

        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    } 

    

    /* POST DATA */
  async function postData() {
    setIsSubmit(false)
    console.log(data)
    try{
        const result = await axiosClientAPI.post(`user/${id}`, data, config)
        .then((response) => {
              router.push(`/admin/order/item/add/${id}`)
            }
        );    
      } catch (error) {
          console.error(`Error: ${error}`)
      } 
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    isSubmit == true && postData();
  }, [isSubmit])

  return (
    <section className='w-[100%] h-auto pb-[4rem]'>
            <div className='lg:w-[70%] w-[90%] mx-auto lg:flex justify-start items-start gap-8'>
                <div className='lg:w-[100%]'>
                    {/*  */}
                    <div className='flex flex-col lg:flex-row items-start justify-start gap-3 pb-6'>
                        <div className='lg:w-[50%] w-[100%]'>
                            <h6 className='mb-1 text-sm'>First Name:</h6>
                            <input type='text'
                                name='first_name' 
                                value={data.first_name}
                                onChange={(e) => setData({...data, first_name: e.target.value})}
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                        </div> 
                        <div className='lg:w-[50%] w-[100%]'>
                            <h6 className='mb-1 text-sm'>Last Name:</h6>
                            <input type='text'
                                name='last_name' 
                                value={data.last_name}
                                placeholder='Write your Last Name here... '
                                onChange={(e) => setData({...data, last_name: e.target.value})}
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                        </div> 
                    </div>
                    {/*  */}
                    <div className='flex items-start justify-start gap-3 pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Email</h6>
                            <input type='text'
                                name='email' 
                                value={data.email}
                                onChange={(e) => setData({...data, email: e.target.value})}
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                        </div> 
                    </div>
                    {/*  */}
                    <div className='flex items-start justify-start gap-3 pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Phone Number:</h6>
                            <input 
                                type='text'
                                name='phone' 
                                value={data.phone}
                                onChange={(e) => setData({...data, phone: e.target.value})}
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                        </div> 
                    </div>
                    {/*  */}
                    <div className='flex items-start justify-start gap-3 pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Address:</h6>
                            <input 
                                type='text'
                                name='address' 
                                value={data.address}
                                onChange={(e) => setData({...data, address: e.target.value})}
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                        </div> 
                    </div>
                    {/*  */}
                    <div className='flex items-start justify-start gap-3 pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>City:</h6>
                            <input 
                                type='text'
                                name='city' 
                                value={data.city}
                                onChange={(e) => setData({...data, city: e.target.value})}
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                        </div> 
                    </div>
                    {/*  */}
                    <div className='flex items-start justify-start gap-3 pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Country:</h6>
                            <input 
                                type='text'
                                name='country' 
                                value={data.country}
                                onChange={(e) => setData({...data, country: e.target.value})}
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                        </div> 
                    </div>
                    
                    
            
                    <div className='w-[100%] mx-auto flex items-center justify-center'>
                        <button
                            onClick={() => setIsSubmit(true) }
                            className='cursor-pointer px-[4rem] py-4 lg:py-4 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                            Submit</button>
                    </div>
                </div>
                   
            </div>
           
    </section>
  )
}

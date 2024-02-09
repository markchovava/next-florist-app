"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { getToken } from '@/api/token';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'




export default function DeliveryEdit({ id }) {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false)
    const [data, setData] = useState({})
    const [status, setStatus] = useState({})

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getToken()}`
      }}


    /* POST DATA */
  async function getData() {
    setIsSubmit(false)
    try{
        const result = await axiosClientAPI.get(`order/${id}`, config)
        .then((response) => {
              setData(response.data.data)
            }
        );    
      } catch (error) {
          console.error(`Error: ${error}`)
      }    
  }


  async function postData() {
    setIsSubmit(false)
    try{
        const result = await axiosClientAPI.post(`order/delivery/${id}`, status, config)
        .then((response) => {
              router.push(`/admin/order/${id}`)
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


  console.log(data)

  return (
    <section className='w-[100%] h-auto pb-[4rem]'>
            <div className='w-[70%] mx-auto lg:flex justify-start items-start gap-8'>
                <div className='lg:w-[100%]'>
                   
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Delivery Status:</h6>
                            <select
                                name='delivery_status'
                                onChange={(e) => {
                                    setStatus({delivery_status: e.target.value});
                                    console.log(e.target.value)
                                }} 
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'>
                                <option >Select Option...</option>
                                <option value='Processing' selected={data.delivery_status === 'Processing' && 'selected'}>
                                    Processing</option>
                                <option value='Dispatched' selected={data.delivery_status === 'Dispatched' && 'selected'}>
                                    Dispatched</option>
                                <option value='Delivered' selected={data.delivery_status === 'Delivered' && 'selected'}>
                                    Delivered</option>
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

"use client"

import axiosClientAPI from '@/api/axiosClientAPI';
import tokenAuth from '@/api/tokenAuth';
import tokenRole from '@/api/tokenRole';
import Link from 'next/link';
import { useEffect, useState } from 'react';



export default function ProductOptionView({ id }) {
  const [data, setData] = useState({});
  const { getAuthToken } = tokenAuth();
  const { getRoleToken } = tokenRole();

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${getAuthToken()}`,
  }}

  async function getData() {
    try{
      const result = await axiosClientAPI.get(`product-option/${id}`, config)
      .then((response) => {
        setData(response.data.data)
        console.log(response.data.data)
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
                      <div className='font-light lg:text-[2rem] text-[1.8rem] pb-4'>View Product Option</div>
                      { getRoleToken() <= 2 &&
                        <Link 
                          href={`/admin/product-option/edit/${id}`} 
                          className=' py-3 px-8 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                            Edit
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
                      <div className='w-[20%]'>Description: </div>
                      <div className='w-[80%] font-semibold'>{data.description}</div>
                  </div>
                  {/*  */}
                  <div className='flex items-center justify-start gap-3 pb-6'>
                      <div className='w-[20%]'>Price: </div>
                      <div className='w-[80%] font-semibold'>
                          ${ data.price ? (data.price / 100).toFixed(2) : (0).toFixed(2) }</div>
                  </div>
                  {/*  */}
                  <div className='flex items-center justify-start gap-3 pb-6'>
                      <div className='w-[20%]'>Author: </div>
                      <div className='w-[80%] font-semibold'>
                          {data.user?.name ? `${data.user.name}` : 'Not added...'}
                      </div>
                  </div>
                  
              </div>       
          </div>
         
      </section>
  )
}

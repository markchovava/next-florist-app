"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { getToken } from '@/api/token';
import tokenAuth from '@/api/tokenAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'



const Profile = () => {
    const { getAuthToken } = tokenAuth();
    const router = useRouter();
    const [data, setData] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
    }};

    async function getData() {
        try{
          const result = await axiosClientAPI.get(`profile/`, config)
          .then((response) => {
            setData(response.data.data)
          })
        } catch (error) {
          console.error(`Error: ${error}`);
        }   
      } 

    async function postData() {
        setIsSubmit(false)
        try{
          const result = await axiosClientAPI.post(`profile/`, data, config)
          .then((response) => {
            setData(response.data.data)
            router.push('/admin/profile/view')
          })
        } catch (error) {
          console.error(`Error: ${error}`);
          console.error(`Error Message: ${error.message}`);
          console.error(`Error Response: ${error.response}`);
        }   
      } 
      
    useEffect(() => {
        isSubmit == true && postData();
    }, [isSubmit]);

    useEffect(() => {
        getData();
    }, []);

  return (
    <section className='w-[100%] h-auto pb-[4rem]'>
         <div className='w-[90%] mx-auto flex justify-end items-center pb-[1rem]'>
            <Link href={`/admin/profile/view`} className='py-3 px-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                View Profile</Link>
        </div>
        <div className='w-[90%] mx-auto lg:flex justify-start items-start gap-8'>
            <div className='w-[100%]'>
                {/*  */}
                <div className='font-light text-[2rem] pb-4'>Billing Details</div>
                {/*  */}
                <div className='flex flex-col lg:flex-row items-start justify-start gap-3 pb-6'>
                    <div className='lg:w-[50%] w-[100%]'>
                        <h6 className='mb-1 text-sm'>First Name:</h6>
                        <input type='text' 
                            name='first_name'
                            value={data.first_name}
                            onChange={(e) => setData({...data, first_name: e.target.value})}
                            placeholder='First Name...'
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                    </div>
                    <div className='lg:w-[50%] w-[100%]'>
                        <h6 className='mb-1 text-sm'>Last Name:</h6>
                        <input 
                            type='text' 
                            name='first_name'
                            value={data.last_name}
                            onChange={(e) => setData({...data, last_name: e.target.value})}
                            placeholder='Last Name...'
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                    </div>
                </div>
                {/*  */}
                <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Address:</h6>
                        <textarea 
                            type='text' 
                            name='address'
                            value={data.address}
                            onChange={(e) => setData({...data, address: e.target.value})}
                            placeholder='Address...'
                            className='w-[100%] h-[5rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'></textarea>
                    </div>
                </div>
                {/*  */}
                <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>City / Town:</h6>
                        <input 
                            type='text' 
                            name='city'
                            value={data.city}
                            onChange={(e) => setData({...data, city: e.target.value})}
                            placeholder='City...'
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                    </div>
                </div>
                {/*  */}
                <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Phone:</h6>
                        <input 
                            type='text' 
                            name='phone'
                            value={data.phone}
                            onChange={(e) => setData({...data, phone: e.target.value})}
                            placeholder='Phone Number...'
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                    </div>
                </div>
                {/*  */}
                <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Email:</h6>
                        <input 
                            type='email' 
                            name='email'
                            value={data.email}
                            onChange={(e) => setData({...data, email: e.target.value})}
                            placeholder='abc@email.com'
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                    </div>
                </div>
                {/*  */}
                <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Country:</h6>
                        <input 
                            type='text' 
                            name='country'
                            value={data.country}
                            onChange={(e) => setData({...data, country: e.target.value})}
                            placeholder='Country...' 
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                    </div>
                </div>
            </div>
               
        </div>
        <div className='w-[90%] mx-auto'>
            <div className='flex items-center justify-center'>
                <button onClick={ () => setIsSubmit(true) } className='px-[8rem] py-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                    Submit</button>
            </div>
        </div>
    </section>
  )
}

export default Profile
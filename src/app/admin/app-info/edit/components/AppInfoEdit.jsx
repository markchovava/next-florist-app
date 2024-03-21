"use client"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axiosClientAPI from '@/api/axiosClientAPI'
import tokenAuth from '@/api/tokenAuth'
import Loader from '@/components/Loader'




export default function AppInfoEdit() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { getAuthToken } = tokenAuth();
    const [isSubmit, setIsSubmit] = useState(false)
    const [data, setData] = useState({})
    const [image, setImage] = useState({})

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


    /* UPDATE APP-INFO */
    async function postData() {
        try{
        const result = await axiosClientAPI.post(`app-info/`, data, config)
        .then((response) => {
                router.push('/admin/app-info')
                setIsSubmit(false)
            }
        );    
        } catch (error) {
            console.error(`Error: ${error}`)
            setIsSubmit(false)
        } 
    }

    useEffect(() => {
        getData();
        setIsLoading(false)
    }, [])

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
                                value={data.name}
                                onChange={(e) => setData({...data, name: e.target.value})}
                                placeholder='Write Name here...'
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                        </div> 
                    </div>
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Description:</h6>
                            <textarea 
                                type='text' 
                                name='description'
                                value={data.description}
                                onChange={(e) => setData({...data, description: e.target.value})}
                                placeholder='Write Description here...'
                                className='w-[100%] h-[5rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'></textarea>
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
                                placeholder='Write Address here...'
                                className='w-[100%] h-[5rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'></textarea>
                        </div>
                    </div>
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Phone Number:</h6>
                            <input 
                                type='text' 
                                name='phone' 
                                value={data.phone}
                                onChange={(e) => setData({...data, phone: e.target.value})}
                                placeholder='Write Phone Number here...'
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                        </div>
                    </div>
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Email:</h6>
                            <input 
                                name='email' 
                                value={data.email}
                                onChange={(e) => setData({...data, email: e.target.value})}
                                placeholder='Write Email here...'
                                type='text' className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                        </div>
                    </div>
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Website:</h6>
                            <input 
                                name='website' 
                                value={data.website}
                                onChange={(e) => setData({...data, website: e.target.value})}
                                placeholder='Write Web Address here...'
                                type='text' className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                        </div>
                    </div>
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>WhatsApp:</h6>
                            <input 
                                name='whatsapp' 
                                value={data.whatsapp}
                                onChange={(e) => setData({...data, whatsapp: e.target.value})}
                                placeholder='Write WhatsApp here...'
                                type='text' className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                        </div>
                    </div>
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Facebook:</h6>
                            <input 
                                name='facebook' 
                                value={data.facebook}
                                onChange={(e) => setData({...data, facebook: e.target.value})}
                                placeholder='Write Facebook here...'
                                type='text' className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                        </div>
                    </div>
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Twitter:</h6>
                            <input 
                                name='twitter' 
                                value={data.twitter}
                                onChange={(e) => setData({...data, twitter: e.target.value})}
                                placeholder='Write Twitter here...'
                                type='text' className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                        </div>
                    </div>
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Instagram:</h6>
                            <input 
                                name='instagram' 
                                value={data.instagram}
                                onChange={(e) => setData({...data, instagram: e.target.value})}
                                placeholder='Write Instagram here...'
                                type='text' className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                        </div>
                    </div>
                    {/* SUBMIT */}
                    <div className='w-[100%] mx-auto'>
                        <button
                            onClick={() => setIsSubmit(true)}
                            className='w-[100%] py-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                            {isSubmit == true ? 'Processing' : 'Submit'}
                        </button>
                    </div>
                </div>
                
            </div>
        
    </section>

   
  )
}

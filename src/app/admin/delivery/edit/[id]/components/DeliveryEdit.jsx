"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosClientAPI from '@/api/axiosClientAPI'
import tokenAuth from '@/api/tokenAuth';



export default function DeliveryEdit({ id }) {
    const { getAuthToken } = tokenAuth();
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false)
    const [data, setData] = useState({})

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
    }}

    async function getData() {
        try{
          const result = await axiosClientAPI.get(`delivery/${id}`, config)
          .then((response) => {
            setData(response.data.data)
            console.log(response.data.data)
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    }    
    
    /* POST DATA */
    async function postData() {
        setIsSubmit(false)
        try{
            const result = await axiosClientAPI.post(`delivery/${id}`, data, config)
            .then((response) => {
                console.log(response.data)
                    router.push('/admin/delivery')
                }
            );    
            } catch (error) {
                console.error(`Error: ${error}`)
        }  
    }

    useEffect(() => { 
        getData();
    }, []);

    useEffect(() => { 
        isSubmit && postData();
    }, [isSubmit]);




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
                        className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                </div> 
            </div>
            {/*  */}
            <div className='pb-6'>
                <div className='w-[100%]'>
                    <h6 className='mb-1 text-sm'>Description:</h6>
                    <textarea 
                        name='price'
                        value={data.price}
                        onChange={(e) => setData({...data, price: e.target.value})}
                        className='w-[100%] h-[5rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'
                        ></textarea>
                </div>
            </div>
           
            
    
            <div className='w-[100%] mx-auto flex items-center justify-center'>
                <button
                    onClick={() => setIsSubmit(true) }
                    className='cursor-pointer px-20 py-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                    Submit</button>
            </div>
        </div>
           
    </div>
   
</section>
  )
}

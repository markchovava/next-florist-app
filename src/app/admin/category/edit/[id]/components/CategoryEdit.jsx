"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosClientAPI from '@/api/axiosClientAPI'
import tokenAuth from '@/api/tokenAuth'



export default function CategoryEdit({ id }) {
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
          const result = await axiosClientAPI.get(`category/${id}`, config)
          .then((response) => {
            setData(response.data.data)
            console.log(data)
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    }    
    
   
    /* UPDATE DATA */
    async function updateData() {
        try{
            const result = await axiosClientAPI.put(`category/${id}`, data, config)
            .then((response) => {
                router.push(`/admin/category/${id}`);
                setIsSubmit(false);
                }
            );    
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSubmit(false);
        }    
    }

    useEffect(() => { 
        getData();
    }, []);

    useEffect(() => {
        isSubmit && updateData();
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
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Slug:</h6>
                        <input type='text'
                            name='slug' 
                            value={data.slug}
                            onChange={(e) => setData({...data, slug: e.target.value})}
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                    </div> 
                </div>
                {/*  */}
                <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Priority:</h6>
                        <select
                            name='priority' 
                            onChange={(e) => setData({...data, priority: e.target.value})}
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'>
                            <option >Select Option...</option>
                            <option value='1' selected={data.priority === 1 && 'selected'}>1</option>
                            <option value='2' selected={data.priority === 2 && 'selected'}>2</option>
                            <option value='3' selected={data.priority === 3 && 'selected'}>3</option>
                            <option value='4' selected={data.priority === 4 && 'selected'}>4</option>
                            <option value='5' selected={data.priority === 5 && 'selected'}>5</option>
                            <option value='6' selected={data.priority === 6 && 'selected'}>6</option>
                            <option value='7' selected={data.priority === 7 && 'selected'}>7</option>
                            <option value='8' selected={data.priority === 8 && 'selected'}>8</option>
                            <option value='9' selected={data.priority === 9 && 'selected'}>9</option>
                            <option value='10' selected={data.priority === 10 && 'selected'}>10</option>
                        </select>
                    </div>
                </div>
                {/*  */}
                <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Description:</h6>
                        <textarea 
                            name='description'
                            onChange={(e) => setData({...data, description: e.target.value})}
                            value={data.description}
                            className='w-[100%] h-[10rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'
                            ></textarea>
                    </div>
                </div>
            
                <div className='w-[100%] mx-auto flex items-center justify-center'>
                    <button
                        onClick={() => setIsSubmit(true)}
                        className='py-5 px-12 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                            {isSubmit == true ? 'Processing' : 'Submit'}
                        </button>
                </div>
            </div>
            
        </div>
    
    </section>

  )
}

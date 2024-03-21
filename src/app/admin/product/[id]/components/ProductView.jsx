"use client"
import axiosClientAPI from '@/api/axiosClientAPI'
import { baseURL } from '@/api/baseURL'
import tokenAuth from '@/api/tokenAuth'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser';


export default function ProductView({ id }) {
    const [data, setData] = useState({});
    const [image, setImage] = useState({});
    const [thumbnail, setThumbnail] = useState({});
    const { getAuthToken } = tokenAuth();

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${getAuthToken()}`, 
        }
    }

  async function getData() {
    try{
      const result = await axiosClientAPI.get(`product/${id}`, config)
      .then((response) => {
        setData(response.data.data)
        console.log(response.data.data)
        setImage(baseURL + response.data.data?.image)
        setThumbnail(baseURL + response.data.data?.thumbnail)
      })
    } catch (error) {
        console.error(`Error: ${error}`);
        console.error(`Error Message: ${error.message}`);
        console.error(`Error Response: ${error.response}`);
    }   
  }  

  useEffect(() => {
    getData()
  }, [])

  
  return (

    <section className='w-[100%] h-auto pb-[4rem]'>      
        <div className='w-[80%] mx-auto lg:flex justify-start items-start gap-8'>
            <div className='lg:w-[100%]'>
                {/*  */}
                <div className='flex justify-between items-center pb-[1rem]'>
                    <div className='font-light text-[2rem] pb-4'>View Product</div>
                    <Link href={`/admin/product/edit/${id}`} className=' py-3 px-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                        Edit Product</Link>
                </div>
                {/*  */}
                <div className='flex flex-col lg:flex-row items-start justify-start gap-3 pb-6'>
                <div className='w-[100%] lg:w-[50%] flex flex-col items-center justify-start gap-3 pb-6'>
                    <div className='w-[100%]'>Thumbnail: </div>
                    <div className='w-[100%]'> 
                        <div className='w-[50%] aspect-[3/4] overflow-hidden bg-slate-100 rounded-xl drop-shadow-lg'>
                            { thumbnail ? 
                                <img 
                                    src={thumbnail} 
                                    name='thumbnail' 
                                    className='w-[100%] h-[100%] object-cover' />
                            : <div className=' w-[100%] h-[100%] flex items-center justify-center'>No image.</div>
                            }  
                        </div>
                    
                    </div>
                </div>
                <div className='w-[100%] lg:w-[50%] flex flex-col items-center justify-start gap-3 pb-6'>
                    <div className='w-[100%]'>Image: </div>
                    <div className='w-[100%]'> 
                        <div className='w-[90%] aspect-[5/3] overflow-hidden bg-slate-100 rounded-xl drop-shadow-lg'>
                            { image ? 
                                <img 
                                    src={image} 
                                    name='thumbnail' 
                                    className='w-[100%] h-[100%] object-cover' />
                            : <div className=' w-[100%] h-[100%] flex items-center justify-center'>No image.</div>
                            }  
                        </div>
                    </div>
                </div>
                </div>
                {/*  */}
                <div className='flex items-center justify-start gap-3 pb-6'>
                    <div className='w-[20%]'>Name: </div>
                    <div className='w-[80%] font-semibold'> {data.name} </div>
                </div>
                {/* PRIORITY */}
                <div className='flex items-center justify-start gap-3 pb-6'>
                    <div className='w-[20%]'>Priority: </div>
                    <div className='w-[80%] font-semibold'> {data.priority} </div>
                </div>
                {/*  */}
                <div className='flex items-center justify-start gap-3 pb-6'>
                    <div className='w-[20%]'>Description: </div>
                    <div className='w-[80%] font-semibold'>
                        {data.description}
                    </div>
                </div>
                {/*  */}
                {data.categories?.length > 0 &&
                    <div className='flex items-center justify-start gap-3 pb-6'>
                        <div className='w-[20%]'>Category: </div>
                        <div className='w-[80%] font-semibold'>
                            {data.categories.map(item => item.name + ', ')}
                        </div>
                    </div>
                }
                {/*  */}
                <div className='flex items-center justify-start gap-3 pb-6'>
                    <div className='w-[20%]'>Price: </div>
                    <div className='w-[80%] font-semibold'>
                        {data.price ? '$' + (data.price / 100).toFixed(2) : '$' + (0).toFixed(2)}
                    </div>
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

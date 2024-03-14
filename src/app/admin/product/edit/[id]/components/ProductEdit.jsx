"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import axiosClientAPI from '@/api/axiosClientAPI';
import tokenAuth from '@/api/tokenAuth';
import tokenRole from '@/api/tokenRole';
import { baseURL } from '@/api/baseURL';



export default function ProductEdit({ id }) {
    const { getAuthToken } = tokenAuth();
    const { getRoleToken } = tokenRole();
    const router = useRouter();
    const thumbnailFile = useRef(null)
    const imageFile = useRef(null);
    const [data, setData] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [thumbnail, setThumbnail] = useState();
    const [image, setImage] = useState();
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${getAuthToken()}`, 
        }
    }

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    async function getData() {
        try{
            const result = await axiosClientAPI.get(`product/${id}`, config)
            .then((response) => {
                setData(response.data.data)
                setThumbnail(baseURL + response.data.data.thumbnail)
                setImage(baseURL + response.data.data.image)
            })
        } catch (error) {
            console.error(`Error: ${error}`)
            console.error(`Error Message: ${error.message}`)
            console.error(`Error Response: ${error.response}`)
        }   
    }    


    /* POST PRODUCT */
    async function updateData() {
        
        try{
        const result = await axiosClientAPI.post(`product/${id}`, data, config)
        .then((response) => {
                router.push(`/admin/product/${id}`);
                setIsSubmit(false)
            }
        );    
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsSubmit(false);
        }

    }

    useEffect(() => {
        isSubmit == true && updateData();
    }, [isSubmit])

    useEffect(() => { 
        getData()
    }, []);


  return (
    <section className='w-[100%] h-auto pb-[4rem]'>
    <div className='w-[90%] lg:w-[70%] mx-auto lg:flex justify-start items-start gap-8'>
        <div className='lg:w-[100%]'>
            {/*  */}
            <div className='flex items-start justify-start gap-3 pb-6'>
                <div className='pb-6 w-[100%] flex flex-col lg:flex-row justify-start items-start gap-4'>
                    <div className='lg:w-[50%] w-[100%]'>
                        <h6 className='mb-1 text-sm'>Thumbnail:</h6>
                        <input 
                            type='file'
                            name='thumbnail' 
                            ref={thumbnailFile}
                            onChange={(e) => {
                                setData({...data, thumbnail: e.target.files[0]})
                                setThumbnail(URL.createObjectURL(e.target.files[0]))}}
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg mb-[1rem]'/>
                        <div className='relative w-[50%] aspect-[3/4] overflow-hidden bg-slate-100 rounded-xl'>
                            <div className='absolute z-[5] w-[100%] h-[100%] flex items-center justify-center text-sm'>
                                Product Thumbnail</div>
                            <img 
                                src={thumbnail} 
                                name='thumbnail' 
                                className='absolute z-10 w-[100%] h-[100%] object-cover' />
                            {/* <CiCircleRemove  
                                onClick={() => {
                                    setThumbnail('');
                                    setData({...data, thumbnail: null})
                                    thumbnailFile.current.value = '';
                                }} 
                                className='absolute top-5 right-5 z-20 text-2xl text-red-500 hover:text-red-600' /> */}
                        </div>
                    </div>
                    <div className='lg:w-[50%] w-[100%]'>
                        <h6 className='mb-1 text-sm'>Image:</h6>
                        <input 
                            type='file'
                            ref={imageFile}
                            name='image' 
                            src={image}
                            onChange={(e) => {
                                setData({...data, image: e.target.files[0]})
                                setImage(URL.createObjectURL(e.target.files[0]))}}
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg mb-[1rem]'/>
                        <div className='relative w-[80%] aspect-[4/3] overflow-hidden bg-slate-100 rounded-xl'>
                            <div className='absolute z-[5] w-[100%] h-[100%] flex items-center justify-center text-sm'>
                                Product Image</div>
                            <img 
                                src={image} 
                                name='image' 
                                className='absolute z-10 object-cover' />
                            {/* <CiCircleRemove 
                                onClick={() => {
                                    setImage(null);
                                    setData({...data, image: null});
                                    imageFile.current.value = '';
                                }} 
                                className='absolute top-5 right-5 z-20 text-2xl text-red-500 hover:text-red-600' /> */}
                        </div>
                    </div>     
                </div> 
            </div>
            {/*  */}
            <div className='flex items-start justify-start gap-3 pb-6'>
                <div className='w-[100%]'>
                    <h6 className='mb-1 text-sm'>Name:</h6>
                    <input type='text'
                        name='name' 
                        value={data.name}
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
                        value={data.description}
                        onChange={handleInput}
                        type='text' 
                        className='w-[100%] h-[8rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'></textarea>
                </div>
            </div>
            {/* PRICE */}
            <div className='pb-6'>
                <div className='w-[100%]'>
                    <h6 className='mb-1 text-sm'>Price (cents):</h6>
                    <input type='number'
                        name='price'
                        value={data.price} 
                        onChange={handleInput}
                        className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                </div>
            </div>

    
            <div className='w-[100%] mx-auto'>
                <button
                    onClick={() => {
                        setIsSubmit(true);
                    }}
                    className='w-[100%] py-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                    {isSubmit === true ? 'Processing' : 'Submit'}
                    </button>
            </div>
        </div>
           
    </div>
   
</section>
  )
}

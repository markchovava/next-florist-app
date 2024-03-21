"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosClientAPI from '@/api/axiosClientAPI';
import tokenAuth from '@/api/tokenAuth';



export default function CategoryAdd() {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false)
    const { getAuthToken } = tokenAuth();
    const [data, setData] = useState({
        name:'',
        description:'',
        level:0
    })

    const config = {
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
      }}

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
        console.log(data)
    }

    /* UPDATE APP-INFO */
  async function addCategory() {
    try{
        const result = await axiosClientAPI.post(`category/`, data, config)
        .then((response) => {
              router.replace('/admin/category');
              setIsSubmit(false);
            }
        );    
      } catch (error) {
          console.error(`Error: ${error}`);
          setIsSubmit(false);
      }    
  }

  useEffect(() => {
    isSubmit === true && addCategory();
  },[isSubmit]);



  return (
    <section className='w-[100%] h-auto pb-[4rem]'>
        
        <div className='lg:w-[70%] w-[90%] mx-auto lg:flex justify-start items-start gap-8'>
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
                <div className='flex items-start justify-start gap-3 pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Slug:</h6>
                        <input type='text'
                            name='slug' 
                            onChange={handleInput}
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                    </div> 
                </div>

                    {/*  */}
                    <div className='pb-6'>
                    <div className='w-[100%]'>
                        <h6 className='mb-1 text-sm'>Priority:</h6>
                        <select
                            name='priority' 
                            onChange={handleInput} 
                            className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'>
                            <option >Select Option...</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                        </select>
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
                            className='w-[100%] h-[10rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'></textarea>
                    </div>
                </div>
                
                
        
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

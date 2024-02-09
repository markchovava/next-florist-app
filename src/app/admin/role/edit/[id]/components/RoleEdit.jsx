"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosClientAPI from '@/api/axiosClientAPI'
import Loader from '@/components/Loader';
import tokenAuth from '@/api/tokenAuth';



export default function RoleEdit({ id }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false)
    const [data, setData] = useState({})
    const { getAuthToken } = tokenAuth();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
    }}

 
    async function getData() {
        try{
          const result = await axiosClientAPI.get(`role/${id}`, config)
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
            const result = await axiosClientAPI.post(`role/${id}`, data, config)
            .then((response) => {
                console.log(response.data)
                    router.push('/admin/role')
                }
            );    
            } catch (error) {
                console.error(`Error: ${error}`)
        }  
    }

    useEffect(() => { 
        getData();
        setIsLoading(false);
    }, []);

    useEffect(() => { 
        isSubmit && postData();
    }, [isSubmit]);




  return (
    <>
    {isLoading == true ? 
        <Loader /> :
        <section className='w-[100%] h-auto pb-[4rem]'>
            <div className='lg:w-[70%] w-[90%] mx-auto lg:flex justify-start items-start gap-8'>
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
                                name='description'
                                value={data.description}
                                onChange={(e) => setData({...data, description: e.target.value})}
                                className='w-[100%] h-[5rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'
                                ></textarea>
                        </div>
                    </div>
                    {/*  */}
                    <div className='pb-6'>
                        <div className='w-[100%]'>
                            <h6 className='mb-1 text-sm'>Level:</h6>
                            <select
                                name='level'
                                value={data.level} 
                                onChange={(e) => setData({...data, level: e.target.value})}
                                className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'>
                                <option >Select Option...</option>
                                <option value='1' selected={data.level == 1 && `selected`}>1</option>
                                <option value='2' selected={data.level == 2 && `selected`}>2</option>
                                <option value='3' selected={data.level == 3 && `selected`}>3</option>
                                <option value='4' selected={data.level == 4 && `selected`}>4</option>
                            </select>
                        </div>
                    </div>
                    
            
                    <div className='w-[100%] mx-auto'>
                        <button
                            onClick={ () => setIsSubmit(true) }
                            className='w-[100%] py-5 rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                            Submit</button>
                    </div>
                </div>
                
            </div>
        </section>
    }
    </>
  )
}

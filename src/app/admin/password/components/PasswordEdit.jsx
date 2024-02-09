"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axiosClientAPI from '@/api/axiosClientAPI'
import { CiCircleRemove } from 'react-icons/ci';
import tokenAuth from '@/api/tokenAuth';



export default function PasswordEdit() {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false)
    const [data, setData] = useState({})
    const [errorMsg, setErrorMsg] = useState('')
    const [isError, setIsError] = useState(false)
    const { getAuthToken } = tokenAuth();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
    }}

   
    

    /* POST DATA */
    async function postData() {
        setIsSubmit(false)
        console.log(data)
        if(!data.password){
            setIsError(true)
            setErrorMsg('Password is required.');
            return;
        }

        if(data.password !== data.password_confirmation){
            setIsError(true)
            setErrorMsg('Password do not match.');
            return;
        }
        try{
            const result = await axiosClientAPI.post(`password/`, data, config)
            .then((response) => {
                console.log(response.data)
                    router.push('/admin/profile/view')
                }
            );    
            } catch (error) {
                console.error(`Error: ${error}`)
        }  
    }

   
    useEffect(() => { 
        isSubmit == true && postData();
    }, [isSubmit]);




  return (
    <section className='w-[100%] h-auto pb-[4rem]'>
    <div className='w-[70%] mx-auto lg:flex justify-start items-start gap-8'>
        <div className='lg:w-[100%]'>
            {isError == true &&
                <div className='text-red-600 pb-4 flex justify-between'>
                    {errorMsg} 
                    <CiCircleRemove onClick={() => setIsError(false)} className='text-lg cursor-pointer' /> 
                </div>
            }
            {/*  */}
            <div className='flex items-start justify-start gap-3 pb-6'>
                <div className='w-[100%]'>
                    <h6 className='mb-1 text-sm'>Password:</h6>
                    <input type='password'
                        name='password' 
                        onChange={(e) => setData({...data, password: e.target.value})}
                        className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                </div> 
            </div>
            {/*  */}
            <div className='flex items-start justify-start gap-3 pb-6'>
                <div className='w-[100%]'>
                    <h6 className='mb-1 text-sm'>Confirm Password:</h6>
                    <input type='password'
                        name='password_confirmation' 
                        onChange={(e) => setData({...data, password_confirmation: e.target.value})}
                        className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
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
  )
}

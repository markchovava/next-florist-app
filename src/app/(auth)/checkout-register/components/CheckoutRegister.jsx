"use client";
import { baseURL } from '@/api/baseURL';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiCircleRemove } from "react-icons/ci";



const CheckoutRegister = () => {
    const router = useRouter();
    const [data, setData] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [isError, setIsError] = useState(false)

    const config = { headers: { "Content-Type": "application/json" } }

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    async function postData() {
        console.log(data)
        setIsSubmit(false)

        if(data.email === ''){
            setErrorMsg('Email is required.')
            setIsError(true)
            return;
        }

        if(data.password === ''){
            setErrorMsg('Password is required.')
            setIsError(true)
            return;
        }
        if(data.password_confirmation === ''){
            setErrorMsg('Password Confirmation is required.')
            setIsError(true)
            return;
        }

        if(data.password !== data.password_confirmation){
            setErrorMsg('Password do not match.')
            setIsError(true)
            return;
        }

        try{
        const result = await axios.post(`${baseURL}register/`, data, config)
        .then((response) => {
            router.push('/checkout-login');      
        
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }    
    }  

    useEffect(() => { 
        isSubmit == true && postData();     
    }, [isSubmit]);


  return (
    <section className='w-[100%] h-auto flex flex-col items-center justify-center'>
        <div className='mx-auto w-[80%] lg:w-[40%] md:w-[65%] pb-[3rem]'>
            <div className='text-4xl font-light pb-4'>Register Here.</div>
            {isError == true &&
                <div className='text-red-500 pb-4 flex justify-between'>
                    {errorMsg} 
                    <CiCircleRemove onClick={() => setIsError(false)} className='text-lg cursor-pointer' /> 
                </div>
            }
            <div className='pb-4 w-[100%]'>
                <h6 className='block font-bold pb-1'>Email</h6>
                <input 
                    type='text' 
                    name='email'
                    onChange={handleInput}
                    className='w-[100%] outline-none rounded-lg border border-slate-300 px-3 py-4' />
            </div>
            <div className='pb-4 w-[100%]'>
                <h6 className='block font-bold pb-1'>Password</h6>
                <input 
                    type='password'
                    name='password'
                    onChange={handleInput} 
                    className='w-[100%] outline-none rounded-lg border border-slate-300 px-3 py-4' />
            </div>
            <div className='pb-4 w-[100%]'>
                <h6 className='block font-bold pb-1'>Confirm Password</h6>
                <input 
                    type='password'
                    name='password_confirmation' 
                    onChange={handleInput} 
                    className='w-[100%] outline-none rounded-lg border border-slate-300 px-3 py-4' />
            </div>
            <div className='pb-4 w-[100%]'>
                <h6 className='pb-1 flex items-center gap-2'>
                    Already registered?
                    <Link href='/checkout-login' className='text-blue-600 hover:text-blue-700 hover:underline'>
                        Login here.
                    </Link>
                </h6>
            </div>
            <div className='pb-4 w-[100%] flex items-center justify-center'>
                <button 
                    onClick={() => setIsSubmit(true)}
                    className='w-[100%] rounded-lg text-white duration-150 ease-out flex items-center justify-center gap-2 py-4 bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 text-center'>
                    Submit
                </button>
            </div>
        </div>
    </section>
  )
}

export default CheckoutRegister
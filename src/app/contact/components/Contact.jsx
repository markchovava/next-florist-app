"use client"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loader from '@/components/Loader'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GoChevronRight } from 'react-icons/go'
import { IoHomeOutline } from 'react-icons/io5'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { baseURL } from '@/api/baseURL'




const Contact = () => {
  const [data, setData] = useState({});
  const [input, setInput] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleInput = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

   /* GET DATA */
   async function getData() {
      try{
      const result = await axios.get(`${baseURL}app-info/`)
      .then((response) => {
          if(!response.data.data){
              console.log(response.data)
              return;
          }
          setData(response.data.data);
          console.log(response.data.data);

      })
      } catch (error) {
      console.error(`Error: ${error}`)
      }   
    } 
   /* GET DATA */
   async function postData() {
      console.log(input)
      setIsSubmit(false)
      /* try{
      const result = await axios.get(`${baseURL}app-info/`)
      .then((response) => {
          if(!response.data.data){
              console.log(response.data)
              return;
          }
          setData(response.data.data);
          console.log(response.data.data);

      })
      } catch (error) {
      console.error(`Error: ${error}`)
      }    */
    } 

    useEffect(() => {
        getData();
        setIsLoading(false);
    }, []);

    useEffect(() => {
      isSubmit == true && postData();
    }, [isSubmit]);


  return (
    <>
      { isLoading == true ? 
        <Loader /> :
        <div>
            <Header />
            {/* Breadcrumbs */}
            <section className='w-[100%] h-auto bg-slate-50'>
                <ul className='mx-auto w-[90%] py-2 flex justify-start gap-2'>
                    <li className='flex items-center justify-start gap-1'>
                    <IoHomeOutline />
                    <Link href=''>Home</Link>
                    <GoChevronRight />
                    </li>
                    <li className='flex items-center justify-start gap-1'>
                    <Link href=''>Contact Us</Link>
                    </li>
                </ul>
            </section>
            <section className='w-[100%] h-auto flex items-center justify-center'>
                <h1 className='text-[4rem] font-black pt-[3rem] pb-[1rem]'>Contact Us </h1>
            </section>
            {/* MAIN FORM */}
            <section className={`w-[100%] h-auto pt-[4rem] pb-[4rem] bg-white`}>
                <div className='mx-auto container h-auto w-[90%] lg:flex flex-col lg:flex-row items-start justify-start gap-8 '>
                    <div className='w-[100%] lg:h-[35rem] drop-shadow-lg bg-white rounded-md px-4 py-8 mb-4'>
                        <h3 className='font-black text-4xl pb-5'>Our Contact Details</h3>
                        <ul className="pl-3">
                            <li className="flex items-center justify-start gap-2 pb-4">
                                <FaLocationDot className="text-pink-600" />
                                {data.address} 
                            </li>
                            <li className="flex items-center justify-start gap-2 pb-4">
                                <FaPhoneAlt className="text-pink-600" />
                                    {data.phone}
                            </li>
                            <li className="flex items-center justify-start gap-2 pb-4">
                                <MdEmail className="text-pink-600" /> 
                                {data.email}
                            </li>
                        </ul>
                    </div>
                    <div className='w-[100%] lg:h-[35rem] drop-shadow-lg bg-white rounded-md px-4 py-6 mb-4'>
                        <h3 className='font-black text-4xl'>Write to us</h3>
                        <form onSubmit={(e) => e.preventDefault()} className="mt-4">
                            <div className="pb-5"> 
                                <label className="text-sm">Name</label>
                                <input
                                  name='name'
                                  onChange={handleInput} 
                                  className="w-[100%] rounded-md mt-1 border border-slate-300 py-3 px-4 outline-none"  type="text" />
                            </div>
                            <div className="pb-5">
                                <label className="text-sm">Email</label>
                                <input 
                                  name='email'
                                  onChange={handleInput}
                                  className="w-[100%] rounded-md mt-1 border border-slate-300 py-3 px-4 outline-none" type="text" />
                            </div>
                            <div className="pb-5">
                                <label className="text-sm">Message</label>
                                <textarea 
                                  name='message'
                                  onChange={handleInput}
                                  className="w-[100%] rounded-md h-[8rem] mt-1 border border-slate-200 py-3 px-4 outline-none"></textarea>
                            </div>
                            <div className="">
                                <button 
                                onClick={() => setIsSubmit(true) } className="w-[100%] rounded-md py-5 flex items-center justify-center bg-gradient-to-br text-white transition-all duration-100 from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600">
                                    Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <section className='w-[100%] h-[30rem] bg-slate-300 flex items-center justify-center'>
                    Google Maps coming soon.
            </section>
            <Footer />
        </div>
      }
    </>
  )
}

export default Contact
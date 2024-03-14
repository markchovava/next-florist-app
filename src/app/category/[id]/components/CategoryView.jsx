"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import Loader from '@/components/Loader';
import { baseURL } from '@/api/baseURL';
import { GoChevronRight } from 'react-icons/go'
import { IoHomeOutline } from 'react-icons/io5'



export default function CategoryView({ id }) {
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [searchSubmit, setSearchSubmit] = useState(false);
    const [data, setData] = useState({});
    const [category, setCategory] = useState({});
    /* PAGINATION */
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()

    async function paginationHandler(url) {
        try{
           const result = await axios.get(url)
           .then((response) => {
                setData(response.data.data)
                setPrevURL(response.data.links.prev)
                setNextURL(response.data.links.next)
           })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }     
    }

    /* SEARCH */
    async function searchData() {
        if(search == ''){
            try{
                const result = await axios.get(`${baseURL}category/${id}`)
                .then((response) => {
                    setData(response.data.data)
                    setPrevURL(response.data.links.prev)
                    setNextURL(response.data.links.next)
                    setSearch(search)
                    setSearchSubmit(false)

                })
            } catch (error) {
                console.error(`Error: ${error}`);
                console.error(`Error Message: ${error.message}`);
                console.error(`Error Response: ${error.response}`);
            }  
        }
            try{
                const result = await axios.get(`${baseURL}product?search=${search}`)
                .then((response) => {
                    setData(response.data.data)
                    setPrevURL(response.data.links.prev)
                    setNextURL(response.data.links.next)
                    setSearch(search)
                    setSearchSubmit(false)
                })
            } catch (error) {
                console.error(`Error: ${error}`);
                console.error(`Error Message: ${error.message}`);
                console.error(`Error Response: ${error.response}`);
            }   
    } 
  
    async function getData() {
        try{
        const result = await axios.get(`${baseURL}category/products/${id}`)
        .then((response) => {
            setData(response.data.data)
            console.log(response.data.data)
            setPrevURL(response.data.links.prev)
            setNextURL(response.data.links.next)
        })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    }    
    async function getCategory() {
        try{
        const result = await axios.get(`${baseURL}category/${id}`)
        .then((response) => {
            setCategory(response.data.data)
        })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    }    
  
    useEffect(() => { 
        getData();
        getCategory();
    }, []);

      useEffect(() => { 
        searchSubmit == true && searchData();
    }, [searchSubmit]); 


    if(!data && category.length <= 0){
        return (
        <>
          <div className="w-[50rem] lg:w-[100%] h-[50vh] flex items-center justify-center py-4 border border-slate-200 ">
              <h6 className='animate-pulse text-2xl'>Loading...</h6>
          </div>
        </>
        )
    }


   return (
   
    <>
        {/* Breadcrumbs */}
        <section className='w-[100%] h-auto bg-slate-50'>
            <ul className='mx-auto w-[90%] py-2 flex justify-start gap-2'>
                <li className='flex items-center justify-start gap-1'>
                <IoHomeOutline />
                <Link href='/'>Home</Link>
                <GoChevronRight />
                </li>
                <li className='flex items-center justify-start gap-1'>
                <Link href={`/category/${id}`}>Category</Link>
                </li>
            </ul>
        </section>
        {/* TITLE */}
        <section className='w-[100%] h-auto flex items-center justify-center'>
            <h1 className='lg:text-[4rem] text-[3rem] leading-tight text-center font-black pt-[3rem] pb-[1rem]'>
                {category.name} 
            </h1>
        </section>
        <section className='w-[100%] h-auto pt-[5rem] pb-[5rem]'>
            <div className='mx-auto w-[80%] flex justify-start items-center gap-8'>
                <input type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder='Search by name...' 
                    className='w-[80%] rounded-lg px-4 py-4 outline-none border border-slate-300' />
                <button 
                    onClick={() => setSearchSubmit(true)}
                    className='w-[20%] bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 px-4 py-4 rounded-lg text-white'>Search</button>
            </div>
            
            {/*  */}
            <div className='mx-auto container h-auto w-[90%] flex items-center justify-between pt-[3rem] pb-[2.5rem]'>
                <h3 className='lg:text-4xl text-3xl font-black'>{category.name} Products</h3>

                <div className='flex items-center justify-end gap-4'>
                { prevURL && 
                    <button
                        onClick={() => paginationHandler(prevURL)}
                        className='group flex items-center justify-center gap-1 border rounded-lg px-4 py-2 border-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white '>
                        <BsArrowLeft className='transition ease-in-out duration-300 group-hover:-translate-x-1' />
                        Prev </button>
                }
                { nextURL &&
                    <button 
                        onClick={() => paginationHandler(nextURL)}
                        className='group flex items-center justify-center gap-1 border rounded-lg px-4 py-2 border-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white '>
                        Next 
                        <BsArrowRight className='transition ease-in-out duration-300 group-hover:translate-x-1' />
                    </button>
                }
                </div>
                

            </div>
            {/* PRODUCTS LIST */}
            <div className='mx-auto container h-auto w-[90%] grid lg:grid-cols-4 grid-cols-2 gap-8'>
                {/* COL */}
                {data.length > 0 &&
                    data.map((item, i) => (
                        <div key={i} className='w-[100%] pt-4 pb-5 px-3 bg-white drop-shadow-md'>
                            <div>
                                <h4 className='font-bold text-xl pb-2'>
                                {item.name && (item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name)}
                                </h4>
                            </div>
                            <div className='w-[100%] overflow-hidden aspect-[4/5] rounded-lg bg-white flex items-center justify-center'>
                                <img className='object-cover w-[100%] h-[100%]' src={baseURL + item.thumbnail} />
                            </div>
                            <div className='pt-4 flex'> 
                                <Link href={`/product/${item.id}`} className='group py-3 px-5 rounded-md flex items-center justify-center gap-1 text-sm bg-gradient-to-br from-pink-600 to-pink-400 text-white '>
                                    Shop Now <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                                </Link>
                            </div>
                        </div>

                    )) 
                }
                
            </div>

            {/* PAGINATION */}
            <div className='mx-auto container h-auto w-[90%] flex items-center justify-end pt-[3rem] pb-[2.5rem]'>
                
                <div className='flex items-center justify-end gap-4'>
                { prevURL &&
                    <button 
                        onClick={() => paginationHandler(prevURL)}
                        className='group flex items-center justify-center gap-1 border rounded-lg px-4 py-2 border-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white '>
                        <BsArrowLeft className='transition ease-in-out duration-300 group-hover:-translate-x-1' />
                        Prev 
                    </button>
                }
                { nextURL &&
                    <button 
                        onClick={() => paginationHandler(nextURL)} 
                    className='group flex items-center justify-center gap-1 border rounded-lg px-4 py-2 border-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white '>
                        Next 
                        <BsArrowRight className='transition ease-in-out duration-300 group-hover:translate-x-1' />
                    </button>
                }
                </div>
            </div>

        </section>
    </>
   
  )
}

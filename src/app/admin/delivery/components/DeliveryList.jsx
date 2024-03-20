"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import axiosClientAPI from '@/api/axiosClientAPI';
import tokenAuth from '@/api/tokenAuth';
import tokenRole from '@/api/tokenRole';




export default function DeliveryList() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [searchSubmit, setSearchSubmit] = useState(false);
    const [data, setData] = useState({});
    const { getAuthToken } = tokenAuth();
    const { getRoleToken } = tokenRole();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
    }}

    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
    /* PAGINATION DATA */
    async function paginationHandler(url) {
        try{
           const result = await axiosClientAPI.get(url, config)
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

    /* SEARCH DATA*/
    async function searchData() {
        if(search == ''){
            try{
                const result = await axiosClientAPI.get(`delivery/`, config)
                .then((response) => {
                    setData(response.data.data)
                    setPrevURL(response.data.links.prev)
                    setNextURL(response.data.links.next)
                    setSearch(search)
                    setSearchSubmit(false)

                })
            } catch (error) {
                console.error(`Error: ${error}`)
            }  
        }
            try{
                const result = await axiosClientAPI.get(`delivery?search=${search}`, config)
                .then((response) => {
                    setData(response.data.data)
                    setPrevURL(response.data.links.prev)
                    setNextURL(response.data.links.next)
                    setSearch(search)
                    setSearchSubmit(false)
                })
            } catch (error) {
                console.error(`Error: ${error}`)
            }   
    }

    /* GET DATA */
    async function getData() {
        try{
          const result = await axiosClientAPI.get(`delivery/`, config)
          .then((response) => {
            setData(response.data.data)
            console.log(response.data.data)
            setPrevURL(response.data.links.prev)
            setNextURL(response.data.links.next)
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    }    

    /* DELETE DATA */
    async function deleteData(id) {
        try{
          const result = await axiosClientAPI.delete(`delivery/${id}`, config )
          .then((response) => {
            getData()
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    }    
    
    useEffect(() => { 
        searchSubmit == true && searchData();  
    }, [searchSubmit]);
    
    useEffect(() => { 
        getData();
    }, []);


  return (
    <section className='mx-auto h-auto w-[100%]'>
        <div className='mx-auto w-[90%] h-auto pb-[4rem]'>
            {/*  */}
            <div className='w-[100%] flex items-center justify-between h-auto pb-[1.2rem]'>
                <div className='lg:w-[40%] w-[65%] flex items-center justify-start gap-2'>
                    <input 
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search by name...' 
                        className='w-[100%] py-3 px-3 rounded-lg outline-none border border-slate-300' 
                    />
                    <button 
                    onClick={() => setSearchSubmit(true)}
                    className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg text-white from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 px-8 py-3'>
                        Search</button>
                </div>
                { getRoleToken() <= 2 &&
                    <div>
                        <Link 
                            href='/admin/delivery/add' 
                            className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg text-white from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 px-8 py-3'>
                            Add
                        </Link>
                    </div>
                }
            </div>

            <section className="w-[100%] lg:overflow-hidden overflow-auto">
                {/* HEADER */}
                <div className="w-[50rem] lg:w-[100%] font-bold flex items-center justify-start bg-slate-100 py-3">
                    <div className="w-[30%] p-3 ">NAME</div>
                    <div className="w-[20%] p-3 border-l border-slate-500">PRICE</div>
                    <div className="w-[30%] p-3 border-l border-slate-500">AUTHOR</div>
                    <div className="w-[20%] p-3 border-l border-slate-500">ACTION</div>
                </div>
                {/* ROW */}
                { data.length > 0 ? 
                    data.map((item) => (
                    <div key={item.id} className="w-[50rem] lg:w-[100%] flex items-center justify-start border border-slate-300 py-3">
                        <div className="w-[30%] p-3 ">{item.name}</div>
                        <div className="w-[20%] p-3 border-l border-slate-300">
                            ${item.price !== '' ? (item.price / 100).toFixed(2) : 'Not added...'}
                        </div>
                        <div className="w-[30%] p-3 border-l border-slate-300">
                        { item.user ? `${item.user?.first_name} ${item.user?.last_name}` : 'Not added'}
                        </div>
                        <div className="w-[20%] p-3 border-l border-slate-300 flex justify-start items-center gap-3 text-xl">
                            <Link href={`/admin/delivery/${item.id}`}> <FaEye className='hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> </Link>
                            <Link href={`/admin/delivery/edit/${item.id}`}> <MdEdit className='hover:text-green-500 duration-150 hover:scale-110 transition-all ease-in' /> </Link>
                            <button onClick={() => {
                                deleteData(item.id)}}> 
                                <MdDeleteForever 
                                    className='hover:text-red-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                            </button>
                        </div>
                    </div>
                )) :
                    <div className="w-[50rem] lg:w-[100%] flex items-center justify-center border border-slate-300 py-3">
                        <h5 className='p-3 text-4xl font-light'>No Deliveries Available...</h5>
                    </div>
                }
            </section>

        
            {/* PAGINATION */}
            <div className="w-[100%] flex items-center justify-end gap-4 pt-[2rem]">
                {prevURL && 
                    <button 
                    onClick={() => paginationHandler(prevURL)}
                    className='group flex items-center justify-center gap-1 border rounded-lg px-4 py-2 border-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white '>
                        <BsArrowLeft className='transition ease-in-out duration-300 group-hover:-translate-x-1' />
                        Prev </button>
                }
                {nextURL &&
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
  )
}

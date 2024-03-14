"use client"

import Link from "next/link"
import { FaEye } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import React, { useEffect, useState } from 'react'
import axiosClientAPI from '@/api/axiosClientAPI'
import tokenAuth from "@/api/tokenAuth";


const OrderTrack = () => {
    const [search, setSearch] = useState('');
    const [searchSubmit, setSearchSubmit] = useState(false);
    const [data, setData] = useState({})
    const { getAuthToken } = tokenAuth();
    const config = {
      headers: {
          'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    }}
    /* PAGINATION */
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
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

    /* SEARCH */
    async function searchData() {
        if(search == ''){
            try{
                const result = await axiosClientAPI.get(`order/by-user`, config)
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
        } else{
          try{
              const result = await axiosClientAPI.get(`order/by-user?search=${search}`, config)
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
    } 
  
    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`order/by-user`, config)
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
  
       
      
    useEffect(() => { 
        getData();
    }, []);

      useEffect(() => { 
        searchSubmit == true && searchData();
    }, [searchSubmit]); 

    console.log(data);

  return (
    <>
          {/* SEARCH */}
          <section className="w-[100%] h-auto">
            <div className='mx-auto w-[80%] flex justify-start items-center gap-8 pb-[4rem]'>
                <input type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search by OrderNo.' 
                  className='w-[80%] rounded-lg px-4 py-4 outline-none border border-slate-400' />
                <button 
                  onClick={() => setSearchSubmit(true)}
                  className='w-[20%] bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 px-4 py-4 rounded-lg text-white'>Search</button>
            </div>
          </section>
          <section className="w-[100%] h-auto">
            <div className="mx-auto w-[90%] h-auto pb-[4rem]">
              {/*  */}
              <section className="w-[100%] lg:overflow-hidden overflow-auto">

                <div className="font-bold lg:w-[100%] w-[50rem] flex items-center justify-start bg-slate-100 py-3">
                    <div className="w-[30%] p-3 ">ORDER NO.</div>
                    <div className="w-[20%] p-3 border-l border-slate-500">DELIVERY</div>
                    <div className="w-[30%] p-3 border-l border-slate-500">TOTAL</div>
                    <div className="w-[20%] p-3 border-l border-slate-500">ACTION</div>
                </div>
              

              {/*  */}
              { data.length > 0 ?
                  data.map((item, i) => (
                    <div className="lg:w-[100%] w-[50rem] flex items-center justify-start py-3 border-b border-x border-slate-300">
                      <div className="w-[30%] p-3 ">{item.order_no}</div>
                      <div className="w-[20%] p-3 border-l border-slate-300">
                          <span 
                            className={`${item.delivery_status === 'Processing' && 'bg-green-600'}
                                        ${item.delivery_status === 'Dispatched' && 'bg-purple-600'}
                                        ${item.delivery_status === 'Delivered' && 'bg-blue-600'} text-white px-2 py-1 rounded-full`}>
                              {item.delivery_status} 
                            </span>
                      </div>
                      <div className="w-[30%] p-3 border-l border-slate-300">
                          {item.order_total ? '$' + (item.order_total / 100).toFixed(2) : 'Not added.'}</div>
                      <div className="w-[20%] p-3 border-l border-slate-300">
                          <Link href={`/order-track/${item.id}`}>   
                            <FaEye className="text-xl transition-all ease-out duration-150 hover:scale-110 hover:text-pink-600"/>
                          </Link>
                      </div>
                    </div>
                    )) :
                  <div className="lg:w-[100%] w-[50rem] flex items-center justify-center border border-slate-300 py-3">
                      <h5 className='p-3 text-3xl font-light'>No Products Available...</h5>
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
        </>
  )
}

export default OrderTrack
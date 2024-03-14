"use client";

import React, { useEffect, useState } from 'react'
import axiosClientAPI from "@/api/axiosClientAPI";
import { useRouter } from "next/navigation";
import tokenAuth from '@/api/tokenAuth';



export default function OrderView({ id }) {
    const router = useRouter();
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const { getAuthToken } = tokenAuth();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
      }}


    async function getOrder() {
        try{
          const result = await axiosClientAPI.get(`order/${id}`, config)
          .then((response) => {
            setOrder(response.data.data)
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } 

    async function getOrderItems() {
        try{
          const result = await axiosClientAPI.get(`order-item/by-order-id/${id}`, config)
          .then((response) => {
            setOrderItems(response.data.data)
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } 

    
    useEffect(() => {
        getOrder();
        getOrderItems();
    }, [])


    console.log(orderItems)

 


  return (
    <section className='mx-auto h-auto w-[100%]'>
        <div className='mx-auto w-[90%] h-auto pb-[4rem]'>
            {/* DETAILS */}
            <section className="mx-auto w-[100%] pb-[2rem] flex flex-col lg:flex-row justify-start items-start gap-4">
                <div className="lg:w-[50%] w-[100%]">
                    <h5 className='font-light text-[2rem] pb-4'>Billing Details</h5>
                    <ul>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Full name: 
                            <span className="font-semibold">{order.order_user?.name}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Address: 
                            <span className="font-semibold">{order.order_user?.address}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            City: 
                            <span className="font-semibold">{order.order_user?.city}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Country: 
                            <span className="font-semibold">{order.order_user?.country}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Phone:
                            <span className="font-semibold">{order.order_user?.phone}</span> 
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Email: 
                            <span className="font-semibold">{order.order_user?.email}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Message: 
                            <span className="font-semibold">
                                {order.message ? order.message : 'Not added.'}</span>
                        </li>
                    </ul>
                </div>
                <div className="lg:w-[50%] w-[100%]">
                    <h5 className='font-light text-[2rem] pb-4'>Order Details</h5>
                    <ul>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Order No.: 
                            <span className="font-semibold">
                                {order.order_no}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Order Total: 
                            <span className="font-semibold">
                                {order?.order_total && '$' + (order?.order_total / 100).toFixed(2)}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Order Quantity: 
                            <span className="font-semibold">{order?.order_quantity}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Product Total: 
                            <span className="font-semibold">
                                {order?.product_total && '$' + (order?.product_total / 100).toFixed(2)}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Product Quantity: 
                            <span className="font-semibold">
                                {order?.product_quantity && order?.product_quantity}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Extra Flowers Quantity:
                            <span className="font-semibold">
                                {order?.extra_quantity}</span> 
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Extra Flowers Total: 
                            <span className="font-semibold">
                                {order.extra_total && '$' + (order.extra_total / 100).toFixed(2)}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Delivery: 
                            <span className="font-semibold">
                                {order.delivery_name ? order.delivery_name : 'Not added.'}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Delivery Price: 
                            <span className="font-semibold">
                                ${order.delivery_price ? (order.delivery_price / 100).toFixed(2) : (0).toFixed(2)}</span>
                        </li>
                        <li className="flex justify-start items-center gap-1 pb-1">
                            Delivery Status: 
                            <span 
                                className={`${order?.delivery_status === 'Processing' && 'bg-green-600'}
                                            ${order?.delivery_status === 'Dispatched' && 'bg-purple-600'}
                                            ${order?.delivery_status === 'Delivered' && 'bg-blue-600'}
                                            font-semibold px-2 py-1 rounded-xl text-white`}>
                                {order.delivery_status}</span>
                        </li>
                    </ul>
                </div>
            
            </section>
        

        
            <section className="w-[100%] lg:overflow-hidden overflow-scroll">
                {/* HEADER */}
                <div className="font-bold lg:w-[100%] w-[50rem] flex items-center justify-start bg-slate-100 py-3">
                    <div className="w-[35%] p-3 ">NAME</div>
                    <div className="w-[35%] p-3 border-l border-slate-500">Extras</div>
                    <div className="w-[30%] p-3 border-l border-slate-500">TOTAL</div>
                </div>
                {/*  */}
                {orderItems && orderItems.map((item, i) => (
                    <div key={i} className="lg:w-[100%] w-[50rem] flex items-center justify-start py-3 border-b border-slate-300">
                        {/*  */}
                        <div className="w-[35%] p-3 ">
                            <div className='w-[100%] flex items-center justify-between'>
                                <span>{item.product_name}</span>
                                <span className='font-bold'> 
                                {item.product_price && '$' + (item.product_price /100).toFixed(2) }
                                </span>
                            </div>
                            <div className='flex justify-start gap-2'>
                                <span>Quantity:</span>
                                <span className='font-bold'>{item.product_quantity}</span>
                            </div>
                        </div>
                        {/*  */}
                        <div className="w-[35%] p-3 border-x border-slate-500">
                            <div className='w-[100%] flex items-center justify-between'>
                                <span>{item.extra_name}</span>
                            </div>
                            <div className='flex justify-start gap-2'>
                                <span>Quantity:</span>
                                <span className='font-bold'>{item.extra_quantity}</span>
                            </div>
                        </div>
                        {/*  */}
                        <div className="w-[30%] p-3">
                            <div className='w-[100%] flex items-center justify-between'>
                                <span>Product Total</span>
                                <span className='font-bold'> 
                                    {item.product_total &&'$' + (item.product_total / 100).toFixed(2) }</span>
                            </div>
                            <div className='w-[100%] flex items-center justify-between'>
                                <span>Extra Flowers Total</span>
                                <span className='font-bold'> 
                                    {item.extra_total && '$' + (item.extra_total / 100).toFixed(2) }</span>
                            </div>
                            <div className='w-[100%] font-bold flex items-center justify-between border-t border-slate-500'>
                                <span>Total</span>
                                <span className=''> 
                                    {item.orderitem_total && '$' + (item.orderitem_total / 100).toFixed(2) }</span>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </section>
    
    
            
        </div>
    </section>
  )
}

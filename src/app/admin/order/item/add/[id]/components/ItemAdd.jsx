"use client";
import React, { useEffect, useState } from 'react'
import axiosClientAPI from "@/api/axiosClientAPI";
import { getToken } from "@/api/token";
import { OrderContextState } from "@/context/admin/OrderContext";
import { CiCircleRemove } from "react-icons/ci";
import { useRouter } from "next/navigation";



export default function ItemAdd({ id }) {
    const router = useRouter();
    const {orderState, orderDispatch,} = OrderContextState();
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUser] = useState({});
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [optionData, setOptionData] = useState([]);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
      }}


    async function getUser() {
        try{
          const result = await axiosClientAPI.get(`user/${id}`, config)
          .then((response) => {
            setUser(response.data.data)
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } 
    
    /* SEARCH */
    async function getSearchData(input) {
        if(input){
            try{
                const result = await axiosClientAPI.get(`order/product?search=${input}`, config)
                .then((response) => {
                    setSearchData(response.data.data)
                })
            } catch (error) {
                console.error(`Error: ${error}`);
                console.error(`Error Message: ${error.message}`);
                console.error(`Error Response: ${error.response}`);
            }  
        } else if(!input){
            setSearchData([])
        }
    } 

    /* GET OPTION DATA */
    async function getOptionData() {
        try{
          const result = await axiosClientAPI.get(`product-option/all`, config)
          .then((response) => {
            setOptionData(response.data.data)
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    }  
    
    /* PRODUCT OPTIONS QUANTITY */
    const calculateProductOptionQuantity = () => {
        const calculateTotal = orderState.items.reduce((acc, item) => acc + item.product_option?.quantity, 0);
        return calculateTotal;
    };
    /* PRODUCTS QUANTITY */
    const calculateProductQuantity = () => {
        const calculateTotal = orderState.items.reduce((acc, item) => acc + item.quantity, 0);
        return calculateTotal;
    };
     /* PRODUCT OPTIONS TOTAL */
     const calculateProductOptionTotal = () => {
        const calculateTotal = orderState.items.reduce((acc, item) => acc + item.product_option?.total, 0);
        return calculateTotal;
    };
    /* PRODUCTS TOTAL */
    const calculateProductTotal = () => {
        const calculateTotal = orderState.items.reduce((acc, item) => acc + item.total, 0);
        return calculateTotal;
    };
    /* GRANDTOTAL */
    const calculateGrandTotal = () => {
        const calculateTotal = orderState.items.reduce((acc, item) => acc + item.grandtotal, 0);
        return calculateTotal;
    };


    async function postData() {
        setIsSubmit(false)
        let formData = { 
            user,
            items: orderState.items,
            product_option_quantity: calculateProductOptionQuantity(),
            product_quantity: calculateProductQuantity(),
            product_option_total: calculateProductOptionTotal(),
            product_total: calculateProductTotal(),
            grandtotal: calculateGrandTotal(),
        }
        console.log(formData)

        try{
            const result = await axiosClientAPI.post(`order/`, formData, config)
            .then((response) => {
                  router.push('/admin/order')
                }
            );    
          } catch (error) {
              console.error(`Error: ${error}`)
          }   
          
    }


   
    
    useEffect(() => {
        getUser();
        getOptionData();
    }, [])

    useEffect(() => {
        isSubmit == true &&  postData();
    }, [isSubmit]);


  return (
    <section className='mx-auto h-auto w-[100%]'>
    <div className='mx-auto w-[90%] h-auto pb-[4rem]'>
        {/* DETAILS */}
        <section className="mx-auto w-[100%] pb-[2rem] flex justify-start items-start gap-4">
            <div className="w-[100%]">
                <h5 className='font-light text-[2rem] pb-4'>Billing Details</h5>
                <ul>
                    <li className="flex justify-start items-center gap-1 pb-1">
                        Full name: 
                        <span className="font-semibold">{user.name}</span>
                    </li>
                    <li className="flex justify-start items-center gap-1 pb-1">
                        Address: 
                        <span className="font-semibold">{user.address}</span>
                    </li>
                    <li className="flex justify-start items-center gap-1 pb-1">
                        City: 
                        <span className="font-semibold">{user.city}</span>
                    </li>
                    <li className="flex justify-start items-center gap-1 pb-1">
                        Country: 
                        <span className="font-semibold">{user.country}</span>
                    </li>
                    <li className="flex justify-start items-center gap-1 pb-1">
                        Phone:
                        <span className="font-semibold">{user.phone}</span> 
                    </li>
                    <li className="flex justify-start items-center gap-1">
                        Email: 
                        <span className="font-semibold">{user.email}</span>
                    </li>
                </ul>
            </div>
           
        </section>
        {/* SEARCH */}
        <div className='w-[100%] flex items-center justify-center h-auto pb-[2rem]'>
            <div className='relative mx-auto w-[90%] flex items-center justify-start gap-2'>
                <div className="w-[100%]">
                    <input 
                        type='text'
                        value={search}
                        onChange={(e) => {
                            getSearchData(e.target.value);
                            setSearch(e.target.value);
                        }}    
                        placeholder='Search by Product Name...' 
                        className='w-[100%] py-4 px-5 rounded-lg outline-none border border-slate-300' 
                    />
                   {/*  <button 
                        onClick={getSearchData}
                        className='w-[15%] flex items-center justify-center text-center bg-gradient-to-br transition-all duration-150 ease-in rounded-lg text-white from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 px-8 py-5'>
                        <FaSearch />
                    </button> */}
                </div>
                {searchData.length > 0 &&
                    <div className="absolute w-[100%] top-[110%] bg-slate-50 drop-shadow-lg">
                        <ul>
                            {searchData.map((item, i) => (
                                <li 
                                    key={i}
                                    onClick={() => {
                                        orderDispatch({ type: 'ADD_ITEM', payload: {
                                            id: item.id,
                                            name: item.name,
                                            image: item.image,
                                            price: item.price,
                                            quantity: 1,
                                            total: item.price,
                                            grandtotal: item.price,
                                            product_option: {},
                                        },});
                                        setSearchData([]);
                                        setSearch('');
                                    }} 
                                    className="px-4 py-2 cursor-pointer border-b border-slate-300 hover:bg-slate-200 ">
                                    {item.name}</li>

                            ))}
                        </ul>
                    </div>
                }
               {/*  <button 
                    onClick=''
                    className='w-[10%] flex items-center justify-center text-center bg-gradient-to-br transition-all duration-150 ease-in rounded-lg text-white from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 px-8 py-5'>
                    <FaPlus />
                </button> */}
            </div>     
        </div>
        
        <section className="w-[100%] lg:overflow-hidden overflow-auto">
            {/* TOTALS */}
            <div className="lg:w-[100%] w-[50rem] flex items-center justify-start border-y border-slate-200 py-3 font-bold">
                <div className="w-[35%] p-3">
                    <div className="w-[100%] flex items-center justify-between pb-2">
                        <span className="uppercase">Products Total</span>
                        <span className=" text-pink-600">
                            ${calculateProductTotal() ? (calculateProductTotal() / 100).toFixed(2) : (0).toFixed(2) }</span>
                    </div>
                    <div className="w-[100%] flex items-center justify-between  pb-2">
                        <span className="uppercase">Products Quantity</span>
                        <span className=" text-pink-600">
                            {calculateProductQuantity() ? calculateProductQuantity() : 0 }
                        </span>
                    </div>
                </div>
                {/*  */}
                <div className="w-[35%] p-3 border-slate-500">
                    <div className="w-[100%] flex items-center justify-between pb-2">
                        <span className="uppercase">Product Option Total:</span>
                        <span className=" text-purple-600">
                            ${calculateProductOptionTotal() ? (calculateProductOptionTotal() / 100).toFixed(2) : (0).toFixed(2)}
                        </span>
                    </div>
                    <div className="w-[100%] flex items-center justify-between pb-2">
                        <span className="uppercase">Product Option Quantity:</span>
                        <span className=" text-purple-600">
                            { calculateProductOptionQuantity() ? calculateProductOptionQuantity() : 0 }
                        </span>
                    </div>
                </div>
                <div className="w-[30%] p-3 border-slate-500 flex items-center justify-between text-2xl">
                    <span>Grandtotal:</span>
                    <span className=" text-red-600">
                        ${calculateGrandTotal ? (calculateGrandTotal() / 100).toFixed(2) : (0).toFixed(2)}</span>
                </div>
            </div>
            {/* HEADER */}
            <div className="lg:w-[100%] w-[50rem] font-bold flex items-center justify-start bg-slate-100 py-3">
                <div className="w-[35%] p-3 ">NAME</div>
                <div className="w-[35%] p-3 border-l border-slate-500">OPTION</div>
                <div className="w-[30%] p-3 border-l border-slate-500">TOTAL</div>
            </div>
            {orderState.items.map((item, i) => (
                <div key={i} className="lg:w-[100%] w-[50rem] flex items-center justify-start py-3 border-b ">
                    {/*  */}
                    <div className="w-[35%] p-3 ">
                        <div className="pb-3 flex items-center justify-between">
                            <span className="flex justify-start items-center gap-2"> 
                                <CiCircleRemove  
                                    onClick={() => orderDispatch({ type: 'REMOVE_ITEM', payload: {id: item.id} }) }
                                    className='coursor-pointer text-2xl text-red-500 hover:text-red-800' />
                                {item.name} 
                            </span>
                            <span className="font-semibold text-blue-600">
                                ${(item.price / 100).toFixed(2)} </span>
                        </div>
                            <input 
                                type="number" 
                                value={item.quantity}
                                onChange={(e) => {
                                    orderDispatch({ type: 'ADD_ITEM_QUANTITY', payload: {
                                        id: item.id,
                                        quantity: e.target.value,
                                    },});
                                }}
                                min='0'
                                className="w-[100%] p-3 outline-none border rounded-lg border-slate-300" />
                    </div>
                    {/*  */}
                    <div className="w-[35%] p-3 border-x border-slate-500">
                        <select
                            onChange={(e) => {
                                orderDispatch({ type: 'ADD_ITEM_OPTION', payload: {
                                    id: item.id,
                                    product_option: e.target.value,
                                },});
                            }}
                            className="w-[100%] p-3 outline-none border rounded-lg border-slate-300 mb-3">
                                <option value={JSON.stringify({
                                        id: 0, 
                                        name: null, 
                                        price: 0,
                                        quantity: 0,
                                        total: 0,
                                    })}>Select an option.
                                </option>
                                {optionData.map((i, key) => (
                                    <option key={key} value={JSON.stringify({
                                        id: i.id, 
                                        name: i.name, 
                                        price: i.price,
                                        quantity: 1,
                                        total: i.price,
                                        })}>
                                        {`${i.name} ${'$' + (i.price / 100).toFixed(2)}`}
                                    </option>
                                ))}
                        </select>
                        <input 
                                type="number" 
                                min='0'
                                value={item.product_option.quantity}
                                placeholder="Quantity..."
                                onChange={(e) => {
                                    orderDispatch({ type: 'ADD_ITEM_OPTION_QUANTITY', payload: {
                                        id: item.id,
                                        product_option_quantity: e.target.value,
                                    },});
                                }}
                                className="w-[100%] p-3 outline-none border rounded-lg border-slate-300" />
                    </div>
                    {/*  */}
                    <div className="w-[30%] p-3 border-slate-500">
                        <div className="flex justify-between items-start">
                            <span>Product Total:</span> 
                            <span className="text-blue-700 font-semibold">
                                ${(item.total / 100).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span>Product Option Total:</span> 
                            <span className="text-blue-700 font-semibold">
                                ${item.product_option.total && (item.product_option.total / 100).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span>Final Total:</span> 
                            <span className="text-blue-700 font-semibold">
                                ${item.grandtotal && (item.grandtotal / 100).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </section>

        

        <div className='pt-[3rem] w-[100%] mx-auto flex items-center justify-center'>
            <button
                onClick={() => setIsSubmit(true) }
                className='cursor-pointer text-xl py-4 px-[4rem] rounded-lg flex justify-center items-center text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 duration-150 transition-all'>
                Submit</button>
        </div>

        
       
        
        
    </div>
</section>
  )
}

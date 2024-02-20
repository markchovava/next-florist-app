"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import { shoppingSession } from '@/api/shoppingSession';
import { getToken } from '@/api/token';
import tokenAuth from '@/api/tokenAuth';
import Loader from '@/components/Loader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs'
import { CiCircleRemove } from "react-icons/ci";



export default function CheckoutEdit() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [delivery, setDelivery] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { getAuthToken } = tokenAuth()
    const { getShoppingSession, removeShoppingSession } = shoppingSession();
    const shopping_session = getShoppingSession() ? getShoppingSession() : null;
    const [errorMsg, setErrorMsg] = useState({})

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
      }}

    /* GET DATA */
    async function getData() {
        try{
          const result = await axios.get(`${baseURL}cart/checkout?shopping_session=${shopping_session}`)
          .then((response) => {
            setData(response.data);
            console.log(response.data);
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } 
    /* GET DELIVERY */
    async function getDelivery() {
        try{
          const result = await axios.get(`${baseURL}delivery/all`)
          .then((response) => {
            setDelivery(response.data.data);
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } 
    /* GET DELIVERY */
    async function getUser() {
        try{
          const result = await axiosClientAPI.get(`profile`, config)
          .then((response) => {
            setUser(response.data.data);
            console.log(response.data.data)
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } 


    async function postData() {
        setIsSubmit(false);
        if(!user?.first_name){
            setErrorMsg({...errorMsg, first_name: 'Please enter your First name.'});
            return;
        }
        if(!user?.last_name){
            setErrorMsg({...errorMsg, last_name: 'Please enter your Last name.'});
            return;
        }
        if(!user?.address){
            setErrorMsg({...errorMsg, address: 'Please enter your Address.'});
            return;
        }
        if(!user?.phone){
            setErrorMsg({...errorMsg, phone: 'Please enter your Phone Number.'});
            return;
        }
        if(!user?.email){
            setErrorMsg({...errorMsg, email: 'Please enter your email.'});
            return;
        }  
        if(!data.delivery?.name){
            setErrorMsg({...errorMsg, delivery: 'Please select your delivery Method.'});
            return;
        }
        if(!data.cart?.payment_method){
            setErrorMsg({...errorMsg, payment_method: 'Please select your Payment Method.'});
            return;
        }
        if(!data.cart?.is_agree){
            setErrorMsg({...errorMsg, is_agree: 'You are required to tick the box below to proceed.'});
            return;
        }
        const formData = {
            user: {
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                email: user.email,
                address: user.address,
                city: user.city,
                country: user.country,
            },
            cart: {
                ...data.cart, 
                grandtotal: calculateGrandtotal(),
                message: data.cart?.message ? data.cart?.message : '',
                delivery_name: data.delivery?.name,
                delivery_price: data.delivery?.price
            },
            items: data.cart_items,
        }
        console.log('formData');
        console.log(formData); 
        try{
          const result = await axiosClientAPI.post(`order/all`, formData, config)
          .then((response) => {
            console.log(response.data.data)
            removeShoppingSession()
            router.push('/order-track');
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }  

    } 

    const calculateGrandtotal = () => {
        const delivery = data.delivery?.price ? data.delivery?.price : 0;
        const grandtotal = data.cart?.grandtotal ? data.cart?.grandtotal : 0;
        return delivery + grandtotal;
    }

    useEffect(() => { 
        getUser();
        getData();
        getDelivery();
        setIsLoading(false)
    }, []);

    useEffect(() => {
        isSubmit == true && postData();
    }, [isSubmit])


  return (
    <>
        { isLoading === true 
            ? <Loader /> 
            : <section className='w-[100%] h-auto'>
                <div className='mx-auto w-[90%] pb-[3rem] flex flex-col lg:flex-row justify-start items-start gap-6'>
                    <section className='lg:w-[60%] w-[100%]'>
                        {/*  */}
                        <div className='font-light text-[2rem] pb-4'>Billing Details</div>
                        {errorMsg.first_name &&
                            <div className='w-[100%] flex items-center justify-center gap-3 pt-3 text-red-600'>
                                <span>{errorMsg.first_name}</span>
                                <span 
                                    className='cursor-pointer' 
                                    onClick={() => setErrorMsg({...errorMsg, first_name: undefined})}>
                                        <CiCircleRemove />
                                </span>
                            </div>
                        }
                        {errorMsg.last_name &&
                            <div className='w-[100%] flex items-center justify-center gap-3 pt-3 text-red-600'>
                                <span>{errorMsg.last_name}</span>
                                <span 
                                    className='cursor-pointer' 
                                    onClick={() => setErrorMsg({...errorMsg, last_name: undefined})}>
                                        <CiCircleRemove />
                                </span>
                            </div>
                        }
                        {/*  */}
                        <div className='flex items-start justify-start gap-3 pb-6'>
                            <div className='w-[50%]'>
                                <h6 className='mb-1 text-sm'>First Name:</h6>
                                <input type='text'
                                    name='first_name'
                                    value={user.first_name} 
                                    onChange={(e) => setUser({...user, first_name: e.target.value})}
                                    className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                            </div>
                            <div className='w-[50%]'>
                                <h6 className='mb-1 text-sm'>Last Name:</h6>
                                <input type='text'
                                    name='last_name'
                                    value={user.last_name} 
                                    onChange={(e) => setUser({...user, last_name: e.target.value})} 
                                    className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg'/>
                            </div>
                        </div>
                        {errorMsg.address &&
                            <div className='w-[100%] flex items-center justify-center gap-3 pt-3 text-red-600'>
                                <span>{errorMsg.address}</span>
                                <span 
                                    className='cursor-pointer' 
                                    onClick={() => setErrorMsg({...errorMsg, address: undefined})}>
                                        <CiCircleRemove />
                                </span>
                            </div>
                        }
                        {/*  */}
                        <div className='pb-6'>
                            <div className='w-[100%]'>
                                <h6 className='mb-1 text-sm'>Address:</h6>
                                <textarea 
                                    type='text' 
                                    name='address'
                                    value={user.address} 
                                    onChange={(e) => setUser({...user, address: e.target.value})}
                                    className='w-[100%] h-[5rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'></textarea>
                            </div>
                        </div>
                        {/*  */}
                        <div className='pb-6'>
                            <div className='w-[100%]'>
                                <h6 className='mb-1 text-sm'>City:</h6>
                                <input type='text' 
                                    name='city'
                                    value={user.city} 
                                    onChange={(e) => setUser({...user, city: e.target.value})}
                                    className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                            </div>
                        </div>
                        {errorMsg.phone &&
                            <div className='w-[100%] flex items-center justify-center gap-3 pt-3 text-red-600'>
                                <span>{errorMsg.phone}</span>
                                <span 
                                    className='cursor-pointer' 
                                    onClick={() => setErrorMsg({...errorMsg, phone: undefined})}>
                                        <CiCircleRemove />
                                </span>
                            </div>
                        }
                        {/*  */}
                        <div className='pb-6'>
                            <div className='w-[100%]'>
                                <h6 className='mb-1 text-sm'>Phone:</h6>
                                <input type='text' 
                                    name='phone'
                                    value={user.phone} 
                                    onChange={(e) => setUser({...user, phone: e.target.value})}
                                    className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                            </div>
                        </div>
                        {errorMsg.email &&
                            <div className='w-[100%] flex items-center justify-center gap-3 pt-3 text-red-600'>
                                <span>{errorMsg.email}</span>
                                <span 
                                    className='cursor-pointer' 
                                    onClick={() => setErrorMsg({...errorMsg, email: undefined})}>
                                        <CiCircleRemove />
                                </span>
                            </div>
                        }
                        {/*  */}
                        <div className='pb-6'>
                            <div className='w-[100%]'>
                                <h6 className='mb-1 text-sm'>Email:</h6>
                                <input type='text'
                                    name='email'
                                    value={user.email} 
                                    onChange={(e) => setUser({...user, email: e.target.value})}   
                                    className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                            </div>
                        </div>
                        {/*  */}
                        <div className='pb-6'>
                            <div className='w-[100%]'>
                                <h6 className='mb-1 text-sm'>Country:</h6>
                                <input type='text'
                                    name='country'
                                    value={user.country} 
                                    onChange={(e) => setUser({...user, country: e.target.value})}  
                                    placeholder='Delivery Country...' className='w-[100%] outline-none border border-slate-300 px-3 py-3 rounded-lg' />
                            </div>
                        </div>
                        {/*  */}
                        <div className='pb-6'>
                            <div className='w-[100%]'>
                                <h6 className='mb-1 text-sm'>Message on the card (optional):</h6>
                                <textarea 
                                    type='text'
                                    name='message'
                                    value={data.cart?.message} 
                                    onChange={(e) => setData({...data, cart: {...data.cart, message: e.target.value}})}   
                                    placeholder='Message on delivery (optional)...'
                                    className='w-[100%] h-[5rem] outline-none border border-slate-300 px-3 py-3 rounded-lg'></textarea>
                            </div>
                        </div>
                    </section>
                    <section className='lg:w-[40%] w-[100%]'>
                        {/*  */}
                        <div className='font-light text-[2rem] pb-4'>Your Order</div>
                        {/*  */}
                        <div className='font-bold flex items-center justify-start gap-2 bg-slate-200 mb-2'>
                            <div className='w-[60%] p-3'>PRODUCT</div>
                            <div className='w-[40%] p-3 border-l border-white'>TOTAL</div>
                        </div>
                        {/*  */}
                        {data.cart_items &&
                            data.cart_items.map((item, i) => (
                            <div key={i} className='flex items-start justify-start gap-2 py-3 border-b border-slate-200'>
                                <div className='w-[60%] px-3 border-r border-slate-200'>
                                    <div className='w-[100%] flex items-start justify-between'>
                                        <span>{item.name} (x {item.quantity})</span>
                                        <span>${(item.price / 100).toFixed(2)}</span>
                                    </div>
                                    <div className='w-[100%] flex items-start justify-between'>
                                        <span>{item.cart_item_option?.name} (x {item.cart_item_option?.quantity})</span>
                                        <span>${item.cart_item_option?.price ? 
                                                (item.cart_item_option.price / 100).toFixed(2) : 
                                                (0).toFixed(2) }
                                        </span>
                                    </div>

                                </div>
                                <div className='w-[40%] px-3 '>
                                    <div className='w-[100%] flex items-start justify-end'>
                                        <span className='font-bold'>${(item.total / 100).toFixed(2)}</span>
                                    </div>
                                    <div className='w-[100%] flex items-start justify-end'>
                                        <span className='font-bold'>${(item.cart_item_option?.total / 100).toFixed(2)}</span>
                                    </div>
                                    <div className='w-[100%] flex items-start justify-end'>
                                        <span className='font-bold'>${(item.grandtotal / 100).toFixed(2)}</span>
                                    </div>

                                </div>
                            </div>

                        ))}
                        {/*  */}
                        <div className='gap-2 py-3 border-b border-slate-200'>
                            {/* PRODUCT QUANTITY */}
                            <div className='w-[100%] flex items-start justify-start mb-2'>
                                <div className='w-[60%] px-3 flex justify-end uppercase font-semibold'>Products Quantity:</div>
                                <div className='w-[40%] px-3 flex justify-end border-l border-slate-200 font-bold text-blue-600'>
                                    {data.cart?.product_quantity ? data.cart?.product_quantity : 0 }
                                </div>
                            </div>
                            {/* PRODUCT OPTION QUANTITY */}
                            <div className='w-[100%] flex items-start justify-start mb-2'>
                                <div className='w-[60%] px-3 flex justify-end uppercase font-semibold'>Products Option Quantity:</div>
                                <div className='w-[40%] px-3 flex justify-end border-l border-slate-200 font-bold text-blue-600'>
                                    {data.cart?.product_option_quantity ? data.cart?.product_option_quantity : 0 }
                                </div>
                            </div>
                            {/* PRODUCT TOTAL */}
                            <div className='w-[100%] flex items-start justify-start mb-2'>
                                <div className='w-[60%] px-3 flex justify-end uppercase font-semibold'>Products Option Total:</div>
                                <div className='w-[40%] px-3 flex justify-end border-l border-slate-200 font-bold text-red-600'>
                                    ${data.cart?.product_option_total ? (data.cart?.product_option_total / 100).toFixed(2) : (0).toFixed(2) }
                                </div>
                            </div>
                            {/* PRODUCT TOTAL */}
                            <div className='w-[100%] flex items-start justify-start mb-2'>
                                <div className='w-[60%] px-3 flex justify-end uppercase font-semibold'>Products Total:</div>
                                <div className='w-[40%] px-3 flex justify-end border-l border-slate-200 font-bold text-red-600'>
                                    ${data.cart?.product_total ? (data.cart?.product_total / 100).toFixed(2) : (0).toFixed(2) }
                                </div>
                            </div>
                            {/* PRODUCT TOTAL */}
                            <div className='w-[100%] flex items-start justify-start mb-2'>
                                <div className='w-[60%] px-3 flex justify-end uppercase font-semibold'>Grandtotal:</div>
                                <div className='w-[40%] px-3 flex justify-end border-l border-slate-200 font-bold text-red-600'>
                                    ${data.cart?.grandtotal ? (data.cart?.grandtotal / 100).toFixed(2) : (0).toFixed(2) }
                                </div>
                            </div>
                        </div>
                        
                        {/*  */}
                        {errorMsg.delivery &&
                            <div className='w-[100%] flex items-center justify-center gap-3 pt-3 text-red-600'>
                                <span>{errorMsg.delivery}</span>
                                <span 
                                    className='cursor-pointer' 
                                    onClick={() => setErrorMsg({...errorMsg, delivery: undefined})}>
                                        <CiCircleRemove />
                                </span>
                            </div>
                        }
                        <div className='flex items-start justify-start gap-2 py-3 border-b border-slate-200'>
                            <div className='w-[60%] px-3 font-bold uppercase'>Delivery</div>
                            <div className='w-[40%] px-3  border-l border-slate-200'>
                                {delivery ? 
                                    delivery.map((item, i) => (
                                    <label for='delivery' key={i} className='flex items-center justify-start gap-1  mb-2'>
                                        <input 
                                            type='radio' 
                                            name='delivery' 
                                            onChange={(e) => setData({...data, delivery: JSON.parse(e.target.value)})}
                                            value={JSON.stringify({
                                                id: item.id,
                                                name: item.name,
                                                price: item.price
                                            })} /> 
                                            {item.name}:
                                            ${item.price ? (item.price / 100).toFixed(2) : (0).toFixed(2)}
                                    </label>
                                    ))
                                  :
                                  'No available at the moment.'  
                                }
                               
                            
                            </div>
                        </div>

                        {/* FINAL TOTAL */}
                        <div className='flex items-center justify-start gap-2 py-5 bg-pink-100 mt-3'>
                            <div className='w-[60%] px-3 uppercase font-semibold'>AMOUNT DUE:</div>
                            <div className='w-[40%] px-3 flex justify-end font-bold border-l border-pink-500'>
                                ${ calculateGrandtotal() ? (calculateGrandtotal() / 100).toFixed(2) : (0).toFixed(2) }
                            </div>
                        </div>
                        
                        <div className='py-3'>
                            { errorMsg.payment_method &&
                                <div className='pb-3 w-[100%] flex items-center justify-center gap-3 pt-3 text-red-600'>
                                    <span>{errorMsg.payment_method}</span>
                                    <span 
                                        className='cursor-pointer' 
                                        onClick={() => setErrorMsg({...errorMsg, payment_method: undefined})}>
                                        <CiCircleRemove />
                                    </span>
                                </div>
                            }
                            <div className='p-3 flex items-center justify-start gap-2 bg-slate-50 mb-1'>
                                <input type='radio' 
                                    onChange={(e) => setData({...data, cart:{...data.cart, payment_method: e.target.value }})}
                                    value='Paynow' 
                                    name='payment_method' /> PayNow (MasterCard, EcoCash, Bank Transfer)
                            </div>
                            <div className='p-3 flex items-center justify-start gap-2 bg-slate-50 mb-1'>
                                <input type='radio'
                                    onChange={(e) => setData({...data, cart:{...data.cart, payment_method: e.target.value }})} 
                                    value='Payment On Delivery' 
                                    name='payment_method' /> Payment On Delivery
                            </div>
                        </div>

                        <div className='pb-3'>
                            <p className='p-3 bg-slate-50 mb-1'>
                                Your personal data will be used to process your order, support your experience throughout this website, 
                                and for other purposes described in our privacy policy.
                            </p>
                            { errorMsg.is_agree &&
                                <div className='pb-3 w-[100%] flex items-center justify-center gap-3 pt-3 text-red-600'>
                                    <span>{errorMsg.is_agree}</span>
                                    <span 
                                        className='cursor-pointer' 
                                        onClick={() => setErrorMsg({...errorMsg, is_agree: undefined})}>
                                        <CiCircleRemove />
                                    </span>
                                </div>
                            }
                            <div className='p-3 flex items-center justify-start gap-2 bg-slate-50 mb-1'>
                                <input type='checkbox' 
                                    value={1} 
                                    onChange={(e) => setData({...data, cart: {...data.cart, is_agree: Number(e.target.value)}})}
                                    name='is_agree' />
                                    I agree to the website Terms and Conditions.*
                            </div>
                            
                        </div>

                        <div className=''>
                            <button
                                onClick={() => setIsSubmit(true) } 
                            className='group flex justify-center items-center transition-all ease-in-out duration-200 gap-2 bg-gradient-to-br rounded-lg text-white from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 w-[100%] py-5'>
                                Proceed <BsArrowRight className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
                            </button>
                        </div>
                    </section>
                </div>
              </section>
        }
    </>
  )
}

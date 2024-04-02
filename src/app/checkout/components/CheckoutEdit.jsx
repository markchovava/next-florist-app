"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import tokenAuth from '@/api/tokenAuth';
import { tokenShoppingSession } from '@/api/tokenShoppingSession';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs'
import { CiCircleRemove } from "react-icons/ci";



export default function CheckoutEdit() {
    const router = useRouter();
    const [paymentLink, setPaymentLink] = useState(null);
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [delivery, setDelivery] = useState([]);
    const { getAuthToken } = tokenAuth()
    const { getShoppingSession, removeShoppingSession } = tokenShoppingSession();
    const shopping_session = getShoppingSession() ? getShoppingSession() : '';
    const [errorMsg, setErrorMsg] = useState({})

    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
      }}

    /* GET DATA */
    async function getData() {
        try{
          const result = await axiosClientAPI.get(`cart/list?shopping_session=${shopping_session}`)
          .then((response) => {
            setData(response.data);
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
          const result = await axios.get(`${baseURL}delivery`)
          .then((response) => {
            setDelivery(response.data.data);
            console.log(response.data);
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } 
    /* GET USER */
    async function getUser() {
        try{
          const result = await axiosClientAPI.get(`profile`, config)
          .then((response) => {
            setUser(response.data.data);
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }   
    } 

    async function postData() {
        if(!user?.first_name){
            setErrorMsg({...errorMsg, first_name: 'Please enter your First name.'});
            setIsSubmit(false);
            return;
        }
        if(!user?.last_name){
            setErrorMsg({...errorMsg, last_name: 'Please enter your Last name.'});
            setIsSubmit(false);
            return;
        }
        if(!user?.address){
            setErrorMsg({...errorMsg, address: 'Please enter your Address.'});
            setIsSubmit(false);
            return;
        }
        if(!user?.phone){
            setErrorMsg({...errorMsg, phone: 'Please enter your Phone Number.'});
            setIsSubmit(false);
            return;
        }
        if(!user?.email){
            setErrorMsg({...errorMsg, email: 'Please enter your email.'});
            setIsSubmit(false);
            return;
        }  
        if(!data.delivery?.name){
            setErrorMsg({...errorMsg, delivery: 'Please select your delivery Method.'});
            setIsSubmit(false);
            return;
        }
        if(!data.cart?.payment_method){
            setErrorMsg({...errorMsg, payment_method: 'Please select your Payment Method.'});
            setIsSubmit(false);
            return;
        }
        if(!data.cart?.is_agree){
            setErrorMsg({...errorMsg, is_agree: 'You are required to tick the box below to proceed.'});
            setIsSubmit(false);
            return;
        }
        if(!data.cartitems){
            setErrorMsg({...errorMsg, cartitems: 'There are no products to Checkkout. You are required to add products.'});
            setIsSubmit(false);
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
                cart_total: calculateCarttotal(),
                message: data.cart?.message ? data.cart?.message : '',
                delivery_name: data.delivery?.name,
                delivery_price: data.delivery?.price
            },
            items: data.cartitems,
        }

        try{
          const result = await axiosClientAPI.post(`order/all`, formData, config)
          .then((response) => {
            removeShoppingSession()
            console.log(response.data)
            console.log(response.data.paynow_link)
            setPaymentLink(response.data.paynow_link)
            //router.push('/order-track');
            getUser();
            getData();
            getDelivery();
            setIsSubmit(false);
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsSubmit(false);
        }

    } 

    const calculateCarttotal = () => {
        const delivery = data.delivery?.price ? data.delivery?.price : 0;
        const cart_total = data.cart?.cart_total ? data.cart?.cart_total : 0;
        return delivery + cart_total;
    }

    useEffect(() => { 
        getUser();
        getData();
        getDelivery();
    }, []);

    useEffect(() => {
        isSubmit == true && postData();
    }, [isSubmit])


  return (

    <section className='w-[100%] h-auto'>
        {/* TITLE */}
        <section className='w-[100%] h-auto flex items-center justify-center'>
            <h1 className='text-[4rem] font-black pt-[3.5rem] pb-[2rem]'>
                Checkout
            </h1>
        </section>

           
        {paymentLink !== null ?
        <>
            <section className='w-[90%] flex flex-col items-center justify-center gap-4 mx-auto py-[2rem] text-blue-600 '>
                <div>Click the Link to complete payment</div>
                <Link href={paymentLink} target="_blank" className='text-pink-600 underline hover:no-underline text-lg'>
                    {paymentLink}
                </Link>
            </section> 
             <section className='w-[90%] border-y border-slate-300 flex flex-col items-center justify-center gap-5 mx-auto py-[2rem] mb-[3rem]'>
                When you have finished the payment confirmation with PayNow you may click below to track your Order.
                <Link href='/order-track' 
                    className='w-[50%] group flex justify-center items-center transition-all ease-in-out duration-200 gap-2 bg-gradient-to-br rounded-lg text-white from-pink-500 to-pink-800 hover:from-pink-800 hover:to-pink-500 py-5'>
                    Track Order
                    <BsArrowRight className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
                </Link>
            </section>
        </>
            :
            <>
           
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
                    {data.cartitems &&
                        data.cartitems.map((item, i) => (
                        <div key={i} className='flex items-start justify-start gap-2 py-3 border-b border-slate-200'>
                            <div className='w-[60%] px-3 border-r border-slate-200'>
                                <div className='w-[100%] flex items-start justify-between'>
                                    <span>{item.product_name} (x {item.product_quantity})</span>
                                </div>
                                <div className='w-[100%] flex items-start justify-between'>
                                    <span>{item.extra_name} (x {item.extra_quantity})</span>
                                </div>

                            </div>
                            <div className='w-[40%] px-3 '>
                                <div className='w-[100%] flex items-start justify-end'>
                                    <span className='font-bold'>
                                        {item.product_total ? '$' + (item.product_total / 100).toFixed(2) : (0).toFixed(2)}
                                    </span>
                                </div>
                                <div className='w-[100%] flex items-start justify-end'>
                                    <span className='font-bold'>
                                        {item.extra_total ? '$' + (item.extra_total / 100).toFixed(2) : (0).toFixed(2)}
                                    </span>
                                </div>
                                <div className='w-[100%] flex items-start justify-end'>
                                    <span className='font-bold'>
                                        {item.cartitem_total ? '$' + (item.cartitem_total / 100).toFixed(2) : (0).toFixed(2)}
                                    </span>
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
                            <div className='w-[60%] px-3 flex justify-end uppercase font-semibold'>Products Extras Quantity:</div>
                            <div className='w-[40%] px-3 flex justify-end border-l border-slate-200 font-bold text-blue-600'>
                                {data.cart?.extra_quantity ? data.cart?.extra_quantity : 0 }
                            </div>
                        </div>
                        {/* PRODUCT TOTAL */}
                        <div className='w-[100%] flex items-start justify-start mb-2'>
                            <div className='w-[60%] px-3 flex justify-end uppercase font-semibold'>Products Total:</div>
                            <div className='w-[40%] px-3 flex justify-end border-l border-slate-200 font-bold text-red-600'>
                                {data.cart?.product_total ? '$' + (data.cart?.product_total / 100).toFixed(2) : (0).toFixed(2) }
                            </div>
                        </div>
                        {/* CART TOTAL */}
                        <div className='w-[100%] flex items-start justify-start mb-2'>
                            <div className='w-[60%] px-3 flex justify-end uppercase font-semibold'>Product Extras Total:</div>
                            <div className='w-[40%] px-3 flex justify-end border-l border-slate-200 font-bold text-red-600'>
                                {data.cart?.extra_total ? '$' + (data.cart?.extra_total / 100).toFixed(2) : (0).toFixed(2) }
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
                    <div className='flex items-center justify-start gap-2 py-5 bg-pink-500 text-white mt-3'>
                        <div className='w-[60%] px-3 uppercase font-semibold'>AMOUNT DUE:</div>
                        <div className='w-[40%] px-3 flex justify-end font-bold border-l border-pink-500'>
                            {calculateCarttotal() ? '$' + (calculateCarttotal() / 100).toFixed(2) : (0).toFixed(2) }
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
                            {isSubmit == true ? 
                            'Processing' : 
                            <>
                            Proceed 
                            <BsArrowRight className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
                            </>
                            }
                        </button>
                    </div>
                </section>
            </div>
            {/* CHECK ERROR */}
            {errorMsg.cartitems &&
                <div className='w-[90%] mx-auto flex items-center justify-center gap-3 mb-[3rem] text-lg bg-red-500 text-white'>
                    <div className='flex items-center justify-center gap-3 p-[1rem]'>
                    <span>{errorMsg.cartitems}</span>
                    <span 
                        className='cursor-pointer font-bold text-2xl' 
                        onClick={() => setErrorMsg({...errorMsg, cartitems: undefined})}>
                            <CiCircleRemove />
                    </span>
                    </div>
                </div>
            }
            </>
        }
    </section>
  
  )
}

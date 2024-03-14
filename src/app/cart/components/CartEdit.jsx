"use client"
import { baseURL } from '@/api/baseURL';
import { shoppingSession } from '@/api/shoppingSession';
import tokenAuth from '@/api/tokenAuth';
import { CartContextState } from '@/context/CartContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { CiCircleRemove } from 'react-icons/ci'
import { GoDotFill } from "react-icons/go";



export default function CartEdit() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [errorMsg, setErrorMsg] = useState('')
    const [isSubmit, setIsSubmit] = useState(false);
    const {cartState, cartDispatch} = CartContextState();
    const [options, setOptions] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const { getShoppingSession } = shoppingSession();
    const { getAuthToken } = tokenAuth();
    const shopping_session = getShoppingSession() ? getShoppingSession() : null;

     
    /* GET DATA */
    async function getData() {
        try{
          const result = await axios.get(`${baseURL}cart/list?shopping_session=${shopping_session}`)
          .then((response) => {
            console.log('shopping_session')
            console.log(response.data)
            setData(response.data)
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    } 
    
     /* DELETE DATA */
    async function deleteData(id, cart_id) {
        try{
          const result = await axios.delete(`${baseURL}cart/cart-item?id=${id}&cart_id=${cart_id}`)
          .then((response) => {
            setErrorMsg(response.data.message);
            console.log(response.data.message)
            getData();
            setIsDelete(false);
          })
        } catch (error) {
          console.error(`Error: ${error}`);
          setIsDelete(false);
        }   
    } 

   
    useEffect(() => { 
        getData();
     
    }, []);

    useEffect(() => { 
        isSubmit == true && router.push('/checkout');
    }, [isSubmit]);



  return (
    <>
        <section className='mx-auto h-auto w-[100%]'>
            <div className='mx-auto w-[90%] h-auto pb-[4rem]'>
                <section className="w-[100%] lg:overflow-hidden overflow-auto">
                 {/* TOTALS */}
                    <div className="lg:w-[100%] w-[50rem] flex items-center justify-start border-y border-slate-200 py-3 font-bold">
                        <div className="w-[35%] p-3"> 
                        </div>
                        {/*  */}
                        <div className="w-[35%] p-3 border-slate-500">
                            <div className="w-[100%] flex items-center justify-between pb-2">
                                <span className="uppercase">PRODUCTS QUANTITY:</span>
                                <span className=" text-green-600 text-lg">
                                    {data?.cart?.product_quantity}
                                </span>
                            </div>
                            <div className="w-[100%] flex items-center justify-between pb-2">
                                <span className="uppercase">PRODUCT EXTRAS QUANTITY:</span>
                                <span className=" text-blue-600 text-lg">
                                    {data?.cart?.extra_quantity}
                                </span>
                            </div>
                        </div>
                        <div className="w-[30%] p-3 border-slate-500 flex items-center justify-between text-2xl">
                            <span>Grandtotal:</span>
                            <span className=" text-pink-600">
                                {data?.cart?.cart_total ? '$' + (data?.cart?.cart_total / 100).toFixed(2) : (0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                    {/* HEADER */}
                    <div className="lg:w-[100%] w-[50rem] font-bold flex items-center justify-start border border-slate-300 bg-slate-50 py-3">
                        <div className="w-[40%] p-3 ">NAME</div>
                        <div className="w-[30%] p-3 border-l border-slate-300">EXTRAS</div>
                        <div className="w-[30%] p-3 border-l border-slate-300">TOTAL</div>
                    </div>

                    {data?.cartitems?.length > 0 && 

                        data?.cartitems.map((item, i) => (
                            <div className="lg:w-[100%] w-[50rem] flex items-center justify-start py-3 border-x border-b border-slate-300 relative">
                                <div className="w-[40%] p-3 flex justify-start items-center gap-3">
                                    <div className=''>
                                        { isDelete === true ?
                                            <GoDotFill className='text-2xl text-red-500 animate-pulse' />
                                            :
                                            <CiCircleRemove 
                                                onClick={() => {
                                                    deleteData(item.id, data?.cart?.id);
                                                    setIsDelete(true);
                                                }}
                                                className='text-2xl text-red-500' />    
                                        }
                                    </div>
                                    <div>
                                        <div className=''>
                                            <Link href={`/product/${item.product_id}`} className='underline font-semibold text-pink-600 hover:no-underline'>
                                                {item.product_name}
                                            </Link>
                                        </div>
                                        <div className='text-sm'>
                                            <span>Quantity:</span>
                                            <span className='ml-2 font-bold'>
                                                {item.product_quantity}
                                            </span>
                                        </div>
                                        <div className='text-sm'>
                                            <span>Total:</span>
                                            <span className='font-bold ml-2'>
                                                {item.product_total ? '$' + (item.product_total / 100).toFixed(2) : (0).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[30%] p-3 border-l border-slate-300">
                                    
                                    <div className='font-semibold'>{item.extra_name}</div>
                                    <div className='text-sm'>
                                        <span>Quantity:</span>
                                        <span className='ml-2 font-bold'>
                                            {item.extra_quantity}
                                        </span>
                                    </div>
                                    <div className='text-sm'>
                                        <span>Total Cost:</span>
                                        <span className='ml-2 font-bold'>
                                            {item.extra_total ? '$' + (item.extra_total / 100).toFixed(2) : (0).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-[30%] p-3 border-l border-slate-300 text-right font-bold">
                                    {item.cartitem_total ? '$' + (item.cartitem_total / 100).toFixed(2) : (0).toFixed(2)}
                                </div> 
                            </div>

                        ))
                    }

                    <div className="lg:w-[100%] w-[50rem] flex items-center justify-start pb-2 font-bold">
                        <div className="w-[35%] p-2 "></div>
                        <div className="w-[35%] p-2 text-right">PRODUCTS TOTAL</div>
                        <div className="w-[30%] p-2 border-l border-slate-300 text-right">
                            {data?.cart?.product_total ? '$' + (data?.cart?.product_total / 100).toFixed(2) : (0).toFixed(2)}
                        </div>
                    </div>
                    <div className="lg:w-[100%] w-[50rem] flex items-center justify-start pb-2 font-bold">
                        <div className="w-[35%] p-2 "></div>
                        <div className="w-[35%] p-2 text-right">PRODUCT EXTRAS TOTAL</div>
                        <div className="w-[30%] p-2 border-l border-slate-300 text-right">
                            {data?.cart?.extra_total ? '$' + (data?.cart?.extra_total / 100).toFixed(2) : (0).toFixed(2)}
                        </div>
                    </div>
                    <div className="lg:w-[100%] w-[50rem] flex items-center justify-start pb-2 font-bold">
                        <div className="w-[35%] p-2 "></div>
                        <div className="w-[35%] p-2 text-right">GRANDTOTAL</div>
                        <div className="w-[30%] p-2 text-white bg-pink-600 text-xl text-right">
                            {data?.cart?.cart_total ? '$' + (data?.cart?.cart_total / 100).toFixed(2) : (0).toFixed(2)}
                        </div>
                    </div>
                   
                </section>
                <div className='w-[100%] flex items-center justify-center py-4 mt-[2rem]'>
                    {getAuthToken() ?
                        <button
                            onClick={() => setIsSubmit(true)}
                            className='group py-4 px-20 text-lg flex items-center justify-center rounded-xl gap-1 bg-gradient-to-br from-pink-700 to-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-pink-700 text-white'>
                            {isSubmit === true ?
                                'Processing'
                                :
                                <>
                                Proceed to Checkout <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                                </>

                            }
                        </button>
                        :
                        <Link href='/checkout-login'
                            className='group py-4 px-20 text-lg flex items-center justify-center rounded-xl gap-1 bg-gradient-to-br from-pink-700 to-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-pink-700 text-white'>
                             Login to Proceed to Checkout <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />   
                        </Link>
                    }
                </div>
            </div>
        </section>
       
     
    </>
  )
}

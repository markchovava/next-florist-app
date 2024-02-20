"use client"
import { baseURL } from '@/api/baseURL';
import { shoppingSession } from '@/api/shoppingSession';
import tokenAuth from '@/api/tokenAuth';
import { CartContextState } from '@/context/CartContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { CiCircleRemove } from 'react-icons/ci'




export default function CartEdit() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [errorMsg, setErrorMsg] = useState('')
    const [isSubmit, setIsSubmit] = useState(false);
    const {cartState, cartDispatch} = CartContextState();
    const [options, setOptions] = useState([]);
    const { getShoppingSession } = shoppingSession();
    const { getAuthToken } = tokenAuth();
    const shopping_session = getShoppingSession() ? getShoppingSession() : null;

     /* GET OPTIONS */
     async function getOptions() {
        try{
          const result = await axios.get(`${baseURL}product-option/all`)
          .then((response) => {
            setOptions(response.data.data)
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    }    
    /* GET DATA */
    async function getData() {
        try{
          const result = await axios.get(`${baseURL}cart-item/by-cart-id?shopping_session=${shopping_session}`)
          .then((response) => {
            console.log(response.data.data)
            setData(response.data.data)
            cartDispatch({
                type: 'ADD_ITEMS', 
                payload: response.data.data
            });

          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    } 
    
     /* DELETE DATA */
     async function deleteData(item_id) {
        console.log(`${baseURL}cart-item/${item_id}`)
        try{
          const result = await axios.delete(`${baseURL}cart-item/${item_id}`)
          .then((response) => {
            setErrorMsg(response.data.message);
            console.log(response.data.message)
            getData();
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    } 
    
    /* PRODUCTS TOTAL */
    const calculateProductsTotal = () => {
        const result = cartState.items.reduce((acc, item) => acc + item.total, 0);
        return result;
    };
    /* PRODUCTS QUANTITY */
    const calculateProductsQuantity = () => {
        const result = cartState.items.reduce((acc, item) => acc + item.quantity, 0);
        return result;
    };
    /* PRODUCTS TOTAL */
    const calculateProductOptionsTotal = () => {
        const result = cartState.items.reduce((acc, item) => acc + item.cart_item_option.total, 0);
        return result;
    };
    /* PRODUCTS QUANTITY */
    const calculateProductOptionsQuantity = () => {
        const result = cartState.items.reduce((acc, item) => acc + item.cart_item_option.quantity, 0);
        return result;
    };
    /* GRANDTOTAL */
    const calculateGrandTotal = () => {
        const option_total = calculateProductOptionsTotal() ? calculateProductOptionsTotal() : 0;
        const product_total = calculateProductsTotal() ? calculateProductsTotal() : 0;
        const result = option_total + product_total;
        return result;
    };

    async function postData() {
        setIsSubmit(false)
        let formData = { 
            shopping_session: getShoppingSession(),
            items: cartState.items,
            product_total: calculateProductsTotal(),
            product_quantity: calculateProductsQuantity(),
            product_option_total: calculateProductOptionsTotal(),
            product_option_quantity: calculateProductOptionsQuantity(),
            grandtotal: calculateGrandTotal(),
        }
        //console.log(formData)
        try{
            const result = await axios.post(`${baseURL}cart/all`, formData)
            .then((response) => {
                  console.log(response.data.data)
                  if( getAuthToken() ){
                      router.push('/checkout');
                  } else{
                    router.push('/checkout-login')
                  }
                }
            );    
          } catch (error) {
              console.error(`Error: ${error}`)
          }  
    
    }



    useEffect(() => { 
        getData();
        getOptions();
    }, []);

    useEffect(() => { 
        isSubmit == true && postData();
    }, [isSubmit]);


    console.log(cartState.items)


  return (
    <>
        <section className='mx-auto h-auto w-[100%]'>
            <div className='mx-auto w-[90%] h-auto pb-[4rem]'>
                <section className="w-[100%] lg:overflow-hidden overflow-auto">
                 {/* TOTALS */}
                    <div className="lg:w-[100%] w-[50rem] flex items-center justify-start border-y border-slate-200 py-3 font-bold">
                        <div className="w-[35%] p-3">
                            <div className="w-[100%] flex items-center justify-between pb-2">
                                <span className="uppercase">Products Total</span>
                                <span className=" text-pink-600">
                                    ${ calculateProductsTotal() ? (calculateProductsTotal() / 100).toFixed(2) : (0).toFixed(2) }
                                </span>
                            </div>
                            <div className="w-[100%] flex items-center justify-between  pb-2">
                                <span className="uppercase">Products Quantity</span>
                                <span className=" text-pink-600">
                                    { calculateProductsQuantity() ? calculateProductsQuantity() : 0 }
                                </span>
                            </div>
                        </div>
                        {/*  */}
                        <div className="w-[35%] p-3 border-slate-500">
                            <div className="w-[100%] flex items-center justify-between pb-2">
                                <span className="uppercase">Option Total:</span>
                                <span className=" text-purple-600">
                                ${ calculateProductOptionsTotal() ? (calculateProductOptionsTotal() / 100).toFixed(2) : (0).toFixed(2) }
                                </span>
                            </div>
                            <div className="w-[100%] flex items-center justify-between pb-2">
                                <span className="uppercase">Option Quantity:</span>
                                <span className=" text-purple-600">
                                    { calculateProductOptionsQuantity() ?  calculateProductOptionsQuantity() : 0 }
                                </span>
                            </div>
                        </div>
                        <div className="w-[30%] p-3 border-slate-500 flex items-center justify-between text-2xl">
                            <span>Grandtotal:</span>
                            <span className=" text-red-600">
                                ${calculateGrandTotal() ? (calculateGrandTotal() / 100).toFixed(2) : 0} 
                            </span>
                        </div>
                    </div>
                    {/* HEADER */}
                    <div className="lg:w-[100%] w-[50rem] font-bold flex items-center justify-start bg-slate-100 py-3">
                        <div className="w-[35%] p-3 ">NAME</div>
                        <div className="w-[35%] p-3 border-l border-slate-500">OPTION</div>
                        <div className="w-[30%] p-3 border-l border-slate-500">TOTAL</div>
                    </div>
                    {/*  */}
                    {cartState.items.length > 0 &&
                        cartState.items.map((item, i) => (
                            <div key={i} className="lg:w-[100%] w-[50rem] flex items-center justify-start py-3 border-b ">
                                {/*  */}
                                <div className="w-[35%] p-3 ">
                                    <div className="pb-3 flex items-center justify-between">
                                        <span className="flex justify-start items-center gap-2"> 
                                            <CiCircleRemove  
                                                onClick={() => deleteData(item.id)}
                                                className='coursor-pointer text-2xl text-red-500 hover:text-red-800' />
                                                {item.id} {item.name}
                                        </span>
                                        <span className="font-semibold text-blue-600">
                                            ${(item.price / 100).toFixed(2)} </span>
                                    </div>
                                        <input 
                                            type="number" 
                                            min='1'
                                            value={item.quantity}
                                            onChange={(e) => cartDispatch({
                                                    type: 'ADD_ITEM_QUANTITY', 
                                                    payload: {id: item.id, quantity: e.target.value }}
                                                )}
                                            className="w-[100%] p-3 outline-none border rounded-lg border-slate-300" />
                                </div>
                                {/*  */}
                                <div className="w-[35%] p-3 border-x border-slate-500">
                                    {options.length > 0 &&
                                        <div className='w-[100%] h-auto'>
                                            <select
                                                onChange={(e) => cartDispatch({
                                                    type: 'ADD_ITEM_OPTION', 
                                                    payload: {id: item.id, cart_item_option: e.target.value} })}
                                                className="w-[100%] p-3 outline-none border rounded-lg border-slate-300 mb-3">
                                                    <option 
                                                        value={JSON.stringify({
                                                            id: 0, 
                                                            name: '', 
                                                            price: 0,
                                                            quantity: 0,
                                                            total: 0,
                                                        })}>Select an option.
                                                    </option>
                                                    {options.map((opt, a) => (
                                                        <option 
                                                            selected={opt.id == item.cart_item_option?.product_option_id && 'selected'}
                                                            key={a} 
                                                            value={JSON.stringify({
                                                                id: opt.id, 
                                                                product_option_id: opt.id,
                                                                cart_item_id: item.id,
                                                                name: opt.name, 
                                                                price: opt.price,
                                                                quantity: opt.id == item.cart_item_option?.product_option_id ? opt.quantity : 1,
                                                                total: opt.price,
                                                            })}>
                                                                {`${opt.name} $${(opt.price / 100).toFixed(2)}`}
                                                        </option>
                                                    ))}
                                                    
                                            </select>
                                            <input 
                                                type="number" 
                                                min='1'
                                                disabled={!item.cart_item_option?.id ? true : false}
                                                value={item.cart_item_option?.quantity}
                                                placeholder="Quantity..."
                                                onChange={(e) => cartDispatch({
                                                    type: 'ADD_ITEM_OPTION_QUANTITY', 
                                                    payload: {id: item.id, quantity: e.target.value}})}
                                                className="w-[100%] p-3 outline-none border rounded-lg border-slate-300" />

                                        </div>
                                    }
                                    
                                </div>
                                {/*  */}
                                <div className="w-[30%] p-3 border-slate-500">
                                    <div className="flex justify-between items-start">
                                        <span>Product Total:</span> 
                                        <span className="text-blue-700 font-semibold">
                                            ${item.total ? (item.total / 100).toFixed(2) : '0.00'}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span>Product Option Total:</span> 
                                        <span className="text-blue-700 font-semibold">
                                            ${item.cart_item_option?.total ? (item.cart_item_option.total / 100).toFixed(2) : '0.00'}</span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span>Final Total:</span> 
                                        <span className="text-blue-700 font-semibold">
                                            ${(((item.total ? item.total : 0) + 
                                                (item.cart_item_option?.total ? item.cart_item_option?.total : 0)) 
                                                / 100).toFixed(2)}
                                            </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </section>

                <div className='w-[100%] flex items-center justify-center py-4'>
                    <button
                        onClick={() => setIsSubmit(true)}
                     className='group py-4 px-20 text-lg flex items-center justify-center rounded-xl gap-1 bg-gradient-to-br from-pink-600 to-pink-400 hover:bg-gradient-to-br hover:from-pink-700 hover:to-pink-500 text-white'>
                        Proceed to Checkout <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </button>
                </div>
            </div>
        </section>
       
     
    </>
  )
}

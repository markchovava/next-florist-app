"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import tokenRole  from '@/api/tokenRole';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoChevronDown } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import Loader from './Loader';
import { baseURL } from '@/api/baseURL';
import tokenAuth from '@/api/tokenAuth';
import { tokenShoppingSession } from '@/api/tokenShoppingSession';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";



export default function NavigationResponsive(){
    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isOccasion, setIsOccasion] = useState(false);
    const [isAccount, setIsAccount] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const { getAuthToken, removeAuthToken } = tokenAuth();
    const { removeRoleToken } = tokenRole()
    const authToken = getAuthToken();
    const { getShoppingSession } = tokenShoppingSession();
    const [isOpen, setIsOpen] = useState(false);

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
      }
    };
    
    /* LOGOUT */
    async function postLogout() {
        setIsLogout(false) ;
        try{
        const result = await axiosClientAPI.get(`logout/`, config)
            .then((response) => {
                removeAuthToken();
                removeRoleToken();
                router.push(`/login`);
            })
        } catch (error) {
            console.error(`Error: ${error}`)
        } 
    } 
    /* CATEGORIES */
    async function getCategories() {
        setIsLogout(false);
        try{
        const result = await axios.get(`${baseURL}category/all`)
            .then((response) => {
               setCategories(response.data.data)
            })
        } catch (error) {
            console.error(`Error: ${error}`)
        } 
    } 
    /* CATEGORIES */
    async function getCart() {
        try{
        const result = await axios.get(`${baseURL}cart/checkout?shopping_session=${getShoppingSession()}`)
            .then((response) => {
                setCart(response.data.cart)
            })
        } catch (error) {
            console.error(`Error: ${error}`)
        } 
    } 

    useEffect(() => {
        getCategories();
        getCart();
        setIsLoading(false)
    }, []);

    useEffect(() => { 
        isLogout == true && postLogout();
    }, [isLogout]);

   

  return (
    <>
        { isLoading == true ? 
            <Loader /> :
            <>
                <div className="lg:hidden flex flex-col items-center justify-center gap-5 bg-blue-600 text-white py-5">
                    <div className="mx-auto w-[90%] flex items-center justify-end">
                        {isOpen === false ?
                            <GiHamburgerMenu
                                onClick={() => setIsOpen(true)} 
                                className='text-white text-xl' />
                            :
                            <GrClose 
                                onClick={() => setIsOpen(false)} 
                                className='text-white text-xl' />
                        }
                    </div>
                    { isOpen == true &&
                    <>
                        <ul className="flex flex-col items-center justify-center gap-5 pb-3">
                            <li> <Link href='/'>Home</Link> </li>
                            <li> <Link href='/about'>About Us</Link></li>
                            <li> <Link href='/product-all'>All Products</Link></li>
                            {categories.length > 0 &&
                                <li className="relative"> 
                                    <Link href='#' 
                                    onClick={() => {setIsOccasion(!isOccasion); setIsAccount(false); }} 
                                    className={`${isOccasion == true && 'text-yellow-100'} flex items-center justify-center gap-2`}>
                                    Categories <IoChevronDown /></Link>
                                    { isOccasion == true && 
                                        <AnimatePresence>
                                        <motion.ul
                                            initial={{ opacity:0 }}
                                            animate={{ opacity:1}}
                                            exit={{  opacity:0}}
                                            transition={{ duration: 0.6, type:'spring' }}
                                            className="py-3 top-[140%] w-[100vw] flex flex-col items-center justify-center bg-pink-700 relative">
                                            {categories.length > 0 &&
                                                categories.map((item, i) => (
                                                    <li key={i} className="w-[100%] px-[0.7rem] h-auto hover:bg-pink-600">
                                                        <Link href={`/category/${item.id}`} className="pb-3 w-[100%] flex justify-center items-center">
                                                            {item.name}</Link>
                                                    </li>
                                                ))
                                            }
                                            
                                        </motion.ul>
                                        </AnimatePresence>
                                    }
                                </li>
                            }
                            <li> <Link href='/contact'>Contact Us </Link> </li>   
                            <li className="relative"> 
                                <Link href='' 
                                onClick={() => {setIsAccount(!isAccount); setIsOccasion(false);}} 
                                className={`${isAccount == true && 'text-yellow-100' } flex items-center justify-center gap-2`}>
                                My Account <IoChevronDown /></Link>
                                {isAccount == true && 
                                    <AnimatePresence>
                                    <motion.ul
                                        initial={{ opacity:0 }}
                                        animate={{ opacity:1}}
                                        exit={{  opacity:0}}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="py-3 top-[140%] w-[100vw] flex flex-col items-center justify-center bg-pink-700 relative">
                                        <li className="w-[100%] h-auto hover:bg-pink-600">
                                            <Link href='/checkout' className="px-[0.7rem] py-2 w-[100%] flex justify-center items-center">
                                                Checkout
                                            </Link>
                                        </li>
                                        <li className="w-[100%] h-auto hover:bg-pink-600">
                                            <Link href='/order-track' className="px-[0.7rem] py-2 w-[100%] flex justify-center items-center">
                                                Track Order
                                            </Link>
                                        </li>
                                        <li className="w-[100%] h-auto hover:bg-pink-600 ">
                                            <Link href='/admin/profile' className="px-[0.7rem] py-2 w-[100%] flex justify-center items-center">
                                                Edit Profile
                                            </Link>
                                        </li>
                                        <li className="w-[100%] h-auto hover:bg-pink-600">
                                            <Link href='/admin/product' className="px-[0.7rem] py-2 w-[100%] flex justify-center items-center">
                                                Products List
                                            </Link>
                                        </li>
                                    </motion.ul>
                                    </AnimatePresence>
                                }
                            </li>
                            {authToken ? 
                                <li> <button onClick={() => setIsLogout(true)} >Logout </button> </li> : 
                                <li> <Link href='/login'>Login </Link> </li>
                            } 
                        </ul>
                        <div className="pb-6"> 
                            <Link href='/cart'
                                className="border border-white hover:bg-white hover:text-pink-600 px-4 flex items-center justify-center gap-3 py-3">
                                {cart.product_quantity ? cart.product_quantity : 0} 
                                <MdOutlineShoppingCart />
                            </Link> 
                        </div>
                    </>
                    }
                </div>
            </>
        }
    </>
  )
}

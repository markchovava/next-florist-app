"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import  tokenRole  from '@/api/tokenRole';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoChevronDown } from 'react-icons/io5';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { baseURL } from '@/api/baseURL';
import tokenAuth from '@/api/tokenAuth';
import { tokenShoppingSession } from '@/api/tokenShoppingSession';
import NavigationResponsive from './NavigationResponsive';



const Navigation = () => {
    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isOccasion, setIsOccasion] = useState(false);
    const [isAccount, setIsAccount] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const { getAuthToken, removeAuthToken } = tokenAuth();
    const { removeRoleToken } = tokenRole()
    const authToken = getAuthToken();
    const { getShoppingSession } = tokenShoppingSession()

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
      }
    };
    
    /* LOGOUT */
    async function postLogout() {
        try{
        const result = await axiosClientAPI.get(`logout/`, config)
            .then((response) => {
                removeAuthToken();
                removeRoleToken();
                router.push(`/login`);
                setIsLogout(false) ;
            })
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsLogout(false) ;
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
    /* CART */
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
        
    }, []);

    useEffect(() => { 
        isLogout == true && postLogout();
    }, [isLogout]);

   

  return (  
    <>
        <div className="hidden lg:flex items-center justify-center gap-8 bg-blue-600 text-white py-3">
            <ul className="flex items-center justify-center gap-6 py-3">
            <li> <Link href='/'>Home</Link> </li>
            <li> <Link href='/about'>About Us</Link></li>
            <li className="relative"> 
                <span 
                onClick={() => {setIsOccasion(!isOccasion); setIsAccount(false); }} 
                className={`${isOccasion == true && 'text-yellow-100' } cursor-pointer flex items-center justify-center gap-2`}>
                All Products <IoChevronDown /></span>
                { isOccasion == true && 
                    <AnimatePresence>
                    <motion.ul
                        initial={{ opacity:0 }}
                        animate={{ opacity:1}}
                        exit={{  opacity:0}}
                        transition={{ duration: 0.6, type:'spring' }}
                        className="pb-3 top-[140%] left-[-0.7rem] w-[220%] border border-white bg-pink-700 absolute z-20">
                        {categories.length > 0 &&
                            categories.map((item, i) => (
                                <li key={i} className="w-[100%] px-[0.7rem] h-auto hover:bg-pink-600">
                                    <Link href={`/category-product/${item.id}`} className="pb-3 w-[100%]">
                                        {item.name}</Link>
                                </li>
                            ))
                        }
                        
                    </motion.ul>
                    </AnimatePresence>
                }
            </li>
           
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
                        className="pb-3 top-[140%] left-[-0.7rem] w-[150%] border border-white bg-pink-700 absolute z-20">
                        <li className="w-[100%] h-auto hover:bg-pink-600">
                        <Link href='/checkout' className="px-[0.7rem] pb-2 w-[100%]">Checkout</Link></li>
                        <li className="w-[100%] h-auto hover:bg-pink-600">
                        <Link href='/order-track' className="px-[0.7rem] pb-2 w-[100%]">Track Order</Link></li>
                        <li className="w-[100%] h-auto hover:bg-pink-600">
                        <Link href='/admin/profile' className="px-[0.7rem] pb-2 w-[100%]">Edit Profile</Link></li>
                    </motion.ul>
                    </AnimatePresence>
                }
            </li>
                { typeof getAuthToken() === 'string' ? 
                    <li> 
                        <button onClick={() => setIsLogout(true)} >
                        {isLogout === true ? 'Processing' : 'Logout' } 
                        </button> 
                    </li> 
                    : 
                    <li> <Link href='/login'>Login </Link> </li>
                } 
            </ul>
            <div> 
                <Link href='/cart'
                className="border border-white hover:bg-white hover:text-pink-600 px-4 flex items-center justify-center gap-3 py-3">
            {cart?.product_quantity ? cart?.product_quantity : 0} <MdOutlineShoppingCart /></Link> </div>
        </div>
        <NavigationResponsive />
    </>
  )
}

export default Navigation
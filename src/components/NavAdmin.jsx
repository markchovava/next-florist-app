"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoChevronDownSharp } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser } from "react-icons/fa";
import axiosClientAPI from '@/api/axiosClientAPI';
import NavAdminResponsive from './NavAdminResponsive';
import tokenAuth from '@/api/tokenAuth';
import tokenRole from '@/api/tokenRole';




export default function NavAdmin() {
    const router = useRouter();
    const [isSetting, setIsSetting] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isProduct, setIsProduct] = useState(false);
    const [isCategory, setIsCategory] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isOrder, setIsOrder] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isProductOption, setIsProductOption] = useState(false);
    const { getAuthToken, removeAuthToken } = tokenAuth();
    const { removeRoleToken, getRoleToken } = tokenRole()


    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
      }}

    /* LOGOUT */
    async function postLogout() {
        setIsLogout(false) 
        try{
        const result = await axiosClientAPI.get(`logout/`, config)
            .then((response) => {
                removeAuthToken();
                removeRoleToken();
                router.push(`/login`) 
            
            })
        } catch (error) {
            console.error(`Error: ${error}`)
        } 
    } 

    useEffect(() => { 
        isLogout == true && postLogout();
    }, [isLogout]);

  return (
    <>
    <section className='hidden lg:block w-[100%] bg-slate-800 text-white text-sm'>
        <div className='mx-auto w-[90%] py-2 flex items-center justify-between '>
            <div className="w-[60%]">
                <ul className="flex items-center justify-start gap-4">
                    {/* SETTINGS */}
                    {getRoleToken() <= 3 && 
                        <li className="relative" 
                            onClick={() => {
                                setIsSetting(!isSetting);
                                setIsUser(false);
                                setIsCategory(false);
                                setIsProduct(false);
                                setIsProductOption(false)
                                
                                setIsOrder(false);
                                setIsProfile(false);
                            }}>
                            <span href='#' className="cursor-pointer flex items-center justify-start gap-1 hover:text-slate-100">
                                Settings <IoChevronDownSharp /></span>
                            {isSetting && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[125%] left-[-0.5rem] w-[160%] border border-white bg-slate-800 absolute z-10 pb-2">
                                        <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                            <Link href='/admin/app-info' className=" w-[100%]">AppInfo</Link>
                                        </li>
                                        {getRoleToken() <= 1 && 
                                            <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                <Link href='/admin/role' className=" w-[100%] h-[100%]">
                                                    Roles</Link>
                                            </li>
                                        }
                                        {getRoleToken() <= 2 && 
                                            <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                <Link href='/admin/delivery' className=" w-[100%] h-[100%]">Delivery</Link>
                                            </li>
                                        
                                        }
                                    </motion.ul>
                                </AnimatePresence> 
                            }
                        </li>
                    }
                    {/* USERS */}
                    {getRoleToken() <= 2 &&
                        <li className="relative"
                            onClick={() => {
                                setIsSetting(false);
                                setIsUser(!isUser);
                                setIsCategory(false);
                                setIsProduct(false);
                                setIsProductOption(false)
                                 
                                setIsOrder(false);
                                setIsProfile(false);
                            }} >
                            <span href='' className="cursor-pointer flex items-center justify-start gap-1 hover:text-slate-100">
                                Users <IoChevronDownSharp /></span>
                                {isUser && 
                                    <AnimatePresence>
                                        <motion.ul 
                                            initial={{ opacity:1 }}
                                            animate={{ opacity:1 }}
                                            exit={{ opacity:1 }}
                                            transition={{ duration: 0.6, type:'spring' }}
                                            className="top-[125%] left-[-0.5rem] w-[220%] border border-white bg-slate-800 absolute z-10 pb-2">
                                            <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                <Link href='/admin/user/add' className=" w-[100%]">Add User</Link></li>
                                            <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                <Link href='/admin/user' className=" w-[100%]">Users List</Link></li>
                                        </motion.ul>
                                    </AnimatePresence> 
                                }    
                        </li>
                    }
                    {/* CATEGORY */}
                    <li className="relative" 
                        onClick={() => {
                            setIsSetting(false);
                            setIsUser(false);
                            setIsCategory(!isCategory);
                            setIsProduct(false);
                            setIsProductOption(false)
                             
                            setIsOrder(false);
                            setIsProfile(false);
                        }}>
                        <span href='' className="cursor-pointer flex items-center justify-start gap-1 hover:text-slate-100">
                            Category <IoChevronDownSharp /></span>
                        {isCategory && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="top-[125%] left-[-0.5rem] w-[160%] border border-white bg-slate-800 absolute z-10 pb-2">
                                    {getRoleToken() <= 2 && 
                                        <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                            <Link href='/admin/category/add' className=" w-[100%]">Add Category</Link>
                                        </li>
                                    }
                                    <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                        <Link href='/admin/category' className=" w-[100%]">Category List</Link></li>
                                </motion.ul>
                            </AnimatePresence> 
                        }    
                    </li>
                    
                    {/* PRODUCTS */}
                    <li className="relative" 
                        onClick={() => {
                            setIsSetting(false);
                            setIsUser(false);
                            setIsCategory(false);
                            setIsProduct(!isProduct);
                            setIsProductOption(false)
                             
                            setIsOrder(false);
                            setIsProfile(false);
                        }}>
                        <span href='' className="cursor-pointer flex items-center justify-start gap-1 hover:text-slate-100">
                            Products <IoChevronDownSharp /></span>
                        {isProduct && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="top-[125%] left-[-0.5rem] w-[160%] border border-white bg-slate-800 absolute z-10 pb-2">
                                    {getRoleToken() <= 2 && 
                                        <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                            <Link href='/admin/product/add' className=" w-[100%]">Add Product</Link>
                                        </li>
                                    }
                                    <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                        <Link href='/admin/product' className=" w-[100%]">Products List</Link></li>
                                </motion.ul>
                            </AnimatePresence> 
                        }    
                    </li>

                    {/* PRODUCT OPTION */}
                    {/* <li className="relative" 
                        onClick={() => {
                            setIsSetting(false);
                            setIsUser(false);
                            setIsCategory(false);
                            setIsProduct(false);
                            setIsProductOption(!isProductOption)
                             
                            setIsOrder(false);
                            setIsProfile(false);
                        }}>
                        <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-slate-100">
                            Product Options <IoChevronDownSharp /></span>
                        {isProductOption && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="top-[125%] left-[-0.5rem] w-[160%] border border-white bg-slate-800 absolute z-10 pb-2">
                                    {getRoleToken() <= 2 && 
                                        <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                            <Link href='/admin/product-option/add' className=" w-[100%]">
                                                Add Product Option</Link>
                                        </li>
                                    }
                                    <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                        <Link href='/admin/product-option' className=" w-[100%]">
                                            Product Option List</Link></li>
                                </motion.ul>
                            </AnimatePresence> 
                        }    
                    </li> */}
                    {/* ORDER */}
                    <li className="relative"
                        onClick={() => {
                            setIsSetting(false);
                            setIsUser(false);
                            setIsCategory(false);
                            setIsProduct(false);
                            setIsProductOption(false)
                             
                            setIsOrder(!isOrder);
                            setIsProfile(false);
                        }} >
                        <span href='' className="cursor-pointer flex items-center justify-start gap-1 hover:text-slate-100">
                            Order <IoChevronDownSharp /></span>
                            {isOrder && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="top-[125%] left-[-0.5rem] w-[160%] border border-white bg-slate-800 absolute z-10 pb-2">
                                    {getRoleToken() <= 2 && 
                                        <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                            <Link href='/admin/order/add' className=" w-[100%]">Add Order</Link>
                                        </li>
                                    }
                                    <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                        <Link href='/admin/order' className=" w-[100%]">Order List</Link></li>
                                </motion.ul>
                            </AnimatePresence> 
                            }    
                    </li>
                     
                </ul>
            </div>
            <div className="flex items-center justify-end">
                <div className="relative"
                        onClick={() => {
                            setIsSetting(false);
                            setIsUser(false);
                            setIsCategory(false);
                            setIsProduct(false);
                            setIsProductOption(false)
                             
                            setIsOrder(false);
                            setIsProfile(!isProfile);
                        }} >
                        <span href='' className="cursor-pointer flex items-center justify-start gap-1 hover:text-slate-100">
                            <FaUser />
                            Profile 
                            <IoChevronDownSharp /></span>
                            {isProfile && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[125%] right-[-0.5rem] w-[180%] border border-white bg-slate-800 absolute z-10 pb-2">
                                        <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                            <Link href='/admin/profile/view' className=" w-[100%]">View Profile</Link></li>
                                        <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                            <Link href='/admin/profile' className=" w-[100%]">Edit Profile</Link></li>
                                        <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                            <Link href='/admin/password' className=" w-[100%]">Set Password</Link></li>
                                        
                                        
                                        {getAuthToken() === undefined ?
                                            <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                <Link href='/login' className=" w-[100%]">Login</Link></li>
                                            :
                                            <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                <button onClick={() => setIsLogout(true)} 
                                                    className="text-left w-[100%]">
                                                        Logout
                                                </button>
                                            </li>
                                        }
                                    </motion.ul>
                                </AnimatePresence> 
                            }            
                </div>  
            </div>
        </div>
    </section>
    <NavAdminResponsive />
    </>
  )
}

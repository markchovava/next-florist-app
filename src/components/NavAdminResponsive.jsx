"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoChevronDownSharp } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser } from "react-icons/fa";
import axiosClientAPI from '@/api/axiosClientAPI';
import tokenAuth from '@/api/tokenAuth';
import tokenRole  from '@/api/tokenRole';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";




export default function NavAdminResponsive() {
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
    const [isOpen, setIsOpen] = useState(false);


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
    <section className='w-[100%] lg:hidden bg-slate-800 text-white text-sm'>
        <div className='mx-auto w-[100%] px-3 py-2 flex flex-col items-center justify-between '>
            <div className="mx-auto w-[90%] pb-2 flex items-center justify-end">
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
            {isOpen == true &&
                <>
                    <div className="w-[100vw] pb-4">
                        <ul className="flex flex-col items-center justify-start gap-4">
                            {/* SETTINGS */}
                            <li className="relative" 
                                onClick={() => {
                                    setIsSetting(!isSetting);
                                    setIsUser(false);
                                    setIsCategory(false);
                                    setIsProduct(false);
                                    setIsProductOption(false)
                                    
                                    setIsOrder(false);
                                    setIsProfile(false);
                                }} >
                                <span href='#' className="w-[100vw] cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100">
                                    Settings <IoChevronDownSharp /></span>
                                {isSetting && 
                                    <AnimatePresence>
                                        <motion.ul 
                                            initial={{ opacity:1 }}
                                            animate={{ opacity:1 }}
                                            exit={{ opacity:1 }}
                                            transition={{ duration: 0.6, type:'spring' }}
                                            className="top-[135%] flex flex-col items-center justify-center w-[100vw] bg-slate-900 relative z-10 pb-2">
                                            {getRoleToken() <= 3 &&
                                                <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                    <Link href='/admin/app-info' className=" w-[100%]">AppInfo</Link>
                                                </li>
                                            }
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
                                    <span href='' className="w-[100vw] cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100">
                                        Users <IoChevronDownSharp /></span>
                                        {isUser && 
                                            <AnimatePresence>
                                                <motion.ul 
                                                    initial={{ opacity:1 }}
                                                    animate={{ opacity:1 }}
                                                    exit={{ opacity:1 }}
                                                    transition={{ duration: 0.6, type:'spring' }}
                                                    className="top-[135%] flex flex-col items-center justify-center w-[100vw] bg-slate-900 relative z-10 pb-2">
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
                                <span href='' className="w-[100vw] cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100">
                                    Category <IoChevronDownSharp /></span>
                                {isCategory && 
                                    <AnimatePresence>
                                        <motion.ul 
                                            initial={{ opacity:1 }}
                                            animate={{ opacity:1 }}
                                            exit={{ opacity:1 }}
                                            transition={{ duration: 0.6, type:'spring' }}
                                            className="top-[135%] flex flex-col items-center justify-center w-[100vw] bg-slate-900 relative z-10 pb-2">
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
                                <span href='' className="w-[100vw] cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100">
                                    Products <IoChevronDownSharp /></span>
                                {isProduct && 
                                    <AnimatePresence>
                                        <motion.ul 
                                            initial={{ opacity:1 }}
                                            animate={{ opacity:1 }}
                                            exit={{ opacity:1 }}
                                            transition={{ duration: 0.6, type:'spring' }}
                                            className="top-[135%] flex flex-col items-center justify-center w-[100vw] bg-slate-900 relative z-10 pb-2">
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
                            <li className="relative" 
                                onClick={() => {
                                    setIsSetting(false);
                                    setIsUser(false);
                                    setIsCategory(false);
                                    setIsProduct(false);
                                    setIsProductOption(!isProductOption)
                                    
                                    setIsOrder(false);
                                    setIsProfile(false);
                                }}>
                                <span className="w-[100vw] cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100">
                                    Product Options <IoChevronDownSharp /></span>
                                {isProductOption && 
                                    <AnimatePresence>
                                        <motion.ul 
                                            initial={{ opacity:1 }}
                                            animate={{ opacity:1 }}
                                            exit={{ opacity:1 }}
                                            transition={{ duration: 0.6, type:'spring' }}
                                            className="top-[135%] flex flex-col items-center justify-center w-[100vw] bg-slate-900 relative z-10 pb-2">
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
                            </li>
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
                                <span href='' className="w-[100vw] cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100">
                                    Order <IoChevronDownSharp /></span>
                                    {isOrder && 
                                    <AnimatePresence>
                                        <motion.ul 
                                            initial={{ opacity:1 }}
                                            animate={{ opacity:1 }}
                                            exit={{ opacity:1 }}
                                            transition={{ duration: 0.6, type:'spring' }}
                                            className="top-[135%] flex flex-col items-center justify-center w-[100vw] bg-slate-900 relative z-10 pb-2">
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
                    <div className="w-[100vw] flex items-center justify-center pb-4">
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
                                <span href='' className="w-[100vw] cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100">
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
                                                className="top-[135%] flex flex-col items-center justify-center w-[100vw] bg-slate-900 relative z-10 pb-2">
                                                <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                    <Link href='/admin/profile/view' className=" w-[100%]">View Profile</Link></li>
                                                <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                    <Link href='/admin/profile' className=" w-[100%]">Edit Profile</Link></li>
                                                <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                    <Link href='/admin/password' className=" w-[100%]">Set Password</Link></li>
                                                <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                    <button onClick={() => setIsLogout(true)} 
                                                        className="text-left w-[100%]">
                                                            Logout
                                                    </button>
                                                </li>
                                                {!getAuthToken() &&
                                                    <li className="px-[0.5rem] py-1 hover:bg-slate-900">
                                                        <Link href='/login' className=" w-[100%]">Login</Link></li>
                                                }
                                            </motion.ul>
                                        </AnimatePresence> 
                                    }            
                        </div>  
                    </div>
                </>
            }
        </div>
    </section>
  )
}

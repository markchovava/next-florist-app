import React from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'
import { GoChevronRight } from 'react-icons/go'
import { IoHomeOutline } from 'react-icons/io5'
import CheckoutEdit from './components/CheckoutEdit'




export default function page() {
  return (
    <div>
        <Header />
        {/* Breadcrumbs */}
        <section className='w-[100%] h-auto bg-slate-50'>
            <ul className='mx-auto w-[90%] py-2 flex justify-start gap-2'>
                <li className='flex items-center justify-start gap-1'>
                    <IoHomeOutline />
                    <Link href='/'>Home</Link>
                    <GoChevronRight />
                </li>
                <li className='flex items-center justify-start gap-1'>
                    <Link href='/checkout'>Checkout</Link>
                </li>
            </ul>
        </section>
        
        {/* CHECKOUT CONTENT */}
        <CheckoutEdit />

        <Footer />
    </div>
  )
}






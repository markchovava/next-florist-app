import Link from 'next/link'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { GoChevronRight } from 'react-icons/go'
import { IoHomeOutline } from 'react-icons/io5'
import OptionAdd from './components/OptionAdd'




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
                <Link href='/'>Admin</Link>
                <GoChevronRight />
                </li>
                <li className='flex items-center justify-start gap-1'>
                    <Link href='/admin/product-option'>Product Options</Link>
                    <GoChevronRight />
                </li>
                <li className='flex items-center justify-start gap-1'>
                    <Link href='/admin/product-option/add' className="font-semibold">
                        Add Product Option</Link>
                </li>
            </ul>
        </section>
        {/*  */}
        {/* Title */}
        <section className='w-[100%] h-auto flex items-center justify-center'>
            <h1 className='lg:text-[4rem] text-[3rem] font-black pt-[3rem] pb-[1rem]'>
                Add Product Option</h1>
        </section>

       <OptionAdd />

        <Footer />
    </div>
  )
}

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { IoHomeOutline } from "react-icons/io5";
import { GoChevronRight } from "react-icons/go";
import Link from 'next/link';
import ProductView from './components/ProductView';
import { getTopSellingFour } from '@/api/getCategories';



export default function page({ params: {id} }){
    const fourProducts = getTopSellingFour()
 
  return (
    <div>
        <Header />
        {/* Breadcrumbs */}
        <section className='w-[100%] h-auto bg-slate-50'>
          <ul className='mx-auto w-[90%] py-2 flex justify-start gap-2'>
            <li className='flex items-center justify-start gap-1'>
              <IoHomeOutline />
              <Link href=''>Home</Link>
              <GoChevronRight />
            </li>
            <li className='flex items-center justify-start gap-1'>
              <Link href=''>Flowers</Link>
              <GoChevronRight />
            </li>
            <li className='flex items-center justify-start gap-1'>
              Product
            </li>
          </ul>
        </section>


        {/* MAIN CONTENT */}
        <ProductView id={id} fourProducts={fourProducts} />


        <Footer />
    </div>
  )
}


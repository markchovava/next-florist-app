import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'
import { GoChevronRight } from 'react-icons/go'
import { IoHomeOutline } from 'react-icons/io5'
import ProductOptionView from './components/ProductOptionView'



export default function page({params: {id}}) {

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
              <Link href='/admin/product-option'>Product Options List</Link>
              <GoChevronRight />
              </li>
              <li className='flex items-center justify-start gap-1'>
              <Link href={`/admin/product-option/${id}`} className="font-semibold">Product Option</Link>
              </li>
          </ul>
      </section>

      {/* Title */}
      <section className='w-[100%] h-auto flex items-center justify-center'>
          <h1 className='text-[3rem] lg:text-[4rem] font-black pt-[3rem] pb-[2rem]'>Product Option</h1>
      </section>

      <ProductOptionView id={id} />

      <Footer />
  </div>
)


}

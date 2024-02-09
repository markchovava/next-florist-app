import Header from '@/components/Header'
import MainTitle from '@/components/MainTitle'
import AboutContent from './AboutContent'
import ContactForm from '@/components/ContactForm'
import Subscribe from '@/components/Subscribe'
import Footer from '@/components/Footer'
import { IoHomeOutline } from 'react-icons/io5'
import { GoChevronRight } from 'react-icons/go'
import Link from 'next/link'




const About = () => {
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
                <Link href='' className='font-semibold'>About Us</Link>
                </li>
            </ul>
        </section>
        <section className='w-[100%] h-auto flex items-center justify-center'>
            <h1 className='text-[4rem] font-black pt-[3rem] pb-[1rem]'>About Us</h1>
        </section>
        <AboutContent />
        <Subscribe />
        <ContactForm />
        <Footer />
    </div>
  )
}

export default About
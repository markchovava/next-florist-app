import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'
import { GoChevronRight } from 'react-icons/go'
import { IoHomeOutline } from 'react-icons/io5'
import CategoryView from './components/CategoryView'




export default function page({params: { id }}) {
  
  return (
    <div>
        <Header />
        {/* MAIN CONTENT */}
        <CategoryView id={id} />

        <Footer />
    </div>
  )
}


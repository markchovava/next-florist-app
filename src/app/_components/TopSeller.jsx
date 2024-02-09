"use client"
import { BsArrowRight } from 'react-icons/bs'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation} from 'swiper/modules';
import axios from 'axios';
import { useEffect } from 'react';
import { baseURL } from '@/api/baseURL';
import Link from 'next/link';
import TopSellerResponsive from './TopSellerResponsive';



export default async function TopSeller({ categoryOne }) {
    const categoryOneData = await JSON.parse(categoryOne.value);


  return (
    <>
        <section className='hidden lg:block w-[100%] bg-white h-auto pt-[4rem] pb-[3rem]'>
            <div className='mx-auto container h-auto w-[90%] flex items-center justify-start pb-8'>
                <h3 className='text-4xl font-black w-[35%]'>Top Selling Products</h3>
                <hr className='border-b border-pink-200 w-[65%]' />
            </div>
        
            <div className='mx-auto container h-auto w-[90%]'>
                <Swiper
                rewind={true}
                spaceBetween={30}
                slidesPerView={4}
                navigation
                modules={[Pagination, Navigation]}
                pagination={{clickable: true}}
                className='rounded-lg'>

                {categoryOneData.data.products.map((item, i) => (
                    <SwiperSlide key={i}>
                        {/* COL */}
                        <div className='w-[100%] pt-4 pb-5 px-3 bg-white drop-shadow-md'>
                            <div><h4 className='font-bold text-2xl pb-2'>{item.name}</h4></div>
                            <div className='w-[100%] overflow-hidden aspect-[4/5] rounded bg-white flex items-center justify-center'>
                                <img className='object-cover w-[100%] h-[100%]' src={baseURL + item.thumbnail} />
                            </div>
                            <div className='pt-4 flex'> 
                                <Link href={`/product/${item.id}`} 
                                    className='group py-3 px-6 rounded-md flex items-center justify-center gap-1 text-sm bg-gradient-to-br from-pink-600 to-pink-400 text-white '>
                                    Shop Now <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                )) }
        
                </Swiper>
            </div>
        </section>
        <TopSellerResponsive categoryOneData={categoryOneData} />
    </>
  )
}


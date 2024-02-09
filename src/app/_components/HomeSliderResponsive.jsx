"use client"
import Link from 'next/link';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion'


export default function HomeSliderResponsive() {
  
    return (
        <div className='block lg:hidden w-[100%] bg-slate-50 text-black'>
    
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                navigation
                effect
                pagination={{
                clickable: true,
                }}
                speed={1000}
                loop={true}
                autoplay={{
                delay: 5000,
                disableOnInteraction: true,
                }}
                className='z-[-100]'
                slidesPerView={1}
            /*  onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)} */ >
                <SwiperSlide>
                    <div style={{ backgroundImage: `url('/assets/img/pink_bg.jpg')`}}
                        className='w-full h-[23rem] overflow-hidden bg-no-repeat bg-cover flex flex-col items-center justify-center'>
                        <h5 className='text-center tracking-[10px] text-[#181739] leading-tight text-[1.4rem]'>
                            Welcome to the
                        </h5>
                        <div className='text-center text-[2.5rem] leading-tight text-[#181739] font-bold'>
                            Best Zimbabwean Florist
                        </div>
                        <div className='pt-[1rem]'>
                            <Link href='/product-all' className='flex justify-center items-center gap-2 drop-shadow-xl group text-white text-md bg-gradient-to-br from-pink-400 to-red-500 hover:from-pink-500 hover:to-pink-500 py-3 px-5 rounded-lg border border-white'>
                                Shop Now <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div 
                    style={{ backgroundImage: `url('/assets/img/woman_bg.jpg')`}}
                    className='w-full h-[23rem] overflow-hidden bg-cover bg-right bg-gradient-to-br from-pink-200 to-pink-500 flex flex-col items-center justify-center'>
                    <h5 className='text-center tracking-[10px] text-white leading-tight text-[1.4rem] drop-shadow-lg'>
                            We are here
                        </h5>
                        <div className='text-center text-[3rem] leading-tight text-white font-bold drop-shadow-lg'>
                            to assist you.
                        </div>
                        <div className='pt-[1rem]'>
                            <Link href='/contact' className='flex justify-center items-center gap-2 drop-shadow-xl group text-white text-md bg-gradient-to-br from-pink-400 to-red-500 hover:from-pink-500 hover:to-pink-500 py-3 px-5 rounded-lg border border-white'>
                                Shop Now <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            </Link>
                        </div>
                </div>
                </SwiperSlide>
            
            </Swiper>

        </div>
  )
}


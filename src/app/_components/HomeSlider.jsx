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
import HomeSliderResponsive from './HomeSliderResponsive';


const HomeSlider = () => {
  return (
    <>
    <div className='lg:block hidden w-[100%] bg-slate-50 text-black'>
     
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
          <div 
            style={{ backgroundImage: `url('/assets/img/pink_bg.jpg')`}}
            className='w-full h-[30rem] bg-no-repeat bg-cover flex flex-col items-center justify-center'>
            <h5 className=' tracking-[10px] text-[#181739] leading-tight text-[1.8rem]'>Welcome to the</h5>
            <div className='text-[4rem] text-[#181739] font-bold pb-{1.6rem}'>Best Zimbabwean Florist</div>
            <div>
              <Link href='/product-all' className='flex justify-center items-center gap-2 drop-shadow-xl group text-white text-lg bg-gradient-to-br from-pink-400 to-red-500 hover:from-pink-500 hover:to-pink-500 py-4 px-6 rounded-lg border border-white'>
                Shop Now <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div 
            style={{ backgroundImage: `url('/assets/img/woman_bg.jpg')`}}
            className='w-full h-[30rem] bg-cover bg-gradient-to-br from-pink-200 to-pink-500'>
            <section className='h-full flex items-center justify-start'>
              <div className='basis-[45%] flex justify-end'>
                <div className='text-right'>
                  <motion.h1
                    
                    className='text-right  mb-[2rem] text-[#181739] font-semibold lg:text-6xl text-3xl'>
                    We are here<br /> 
                    <span className='text-white lg:text-7xl text-4xl font-bold drop-shadow-lg'> 
                      to help, </span> <br /> 
                     talk to us.
                  </motion.h1>
                  <div className='flex justify-end'>
                    <Link href='/contact' className='flex justify-center items-center gap-2 drop-shadow-xl group text-white text-lg bg-gradient-to-br from-pink-400 to-red-500 hover:from-pink-500 hover:to-pink-500 py-4 px-6 rounded-lg border border-white'>
                      Contact Us <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </Link>
                  </div>
                </div>
              </div>
             
            </section>
          </div>
        </SwiperSlide>
       
      </Swiper>

    </div>
    <HomeSliderResponsive />
    </>
  )
}

export default HomeSlider
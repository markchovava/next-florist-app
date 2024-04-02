"use client";
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
import { RiWhatsappFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";


export default async function HomeSlider({ appInfo }) {
  const appInfoData = await JSON.parse(appInfo.value);


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
            className='w-full h-[32rem] bg-no-repeat bg-cover'>
              <section className='mx-auto w-[90%] flex justify-start items-center'>
                <div className='w-[50%] h-[30rem] flex flex-col items-end justify-center'>
                  <h5 className='pl-[5rem] text-right text-6xl leading-tight text-[#181739] drop-shadow-lg mb-[1.5rem]'>
                    Welcome to 
                    <span className='pl-2 font-bold'>
                      River Range Flower & <br /> Gift Shop
                    </span>
                  </h5>
                  <div className='flex gap-3'>
                    <Link href={appInfoData.data.whatsapp} target='_blank' className='group bg-white p-2 rounded-lg drop-shadow-lg'>
                      <RiWhatsappFill className='text-[2.5rem] text-green-600 group-hover:text-green-700' />
                    </Link>
                    <Link href={appInfoData.data.facebook} target='_blank' className='group bg-white p-2 rounded-lg drop-shadow-lg'>
                      <FaFacebook className='text-[2.5rem] text-blue-600 group-hover:text-blue-700' />
                    </Link>
                    <Link href={appInfoData.data.instagram} target='_blank' className='group bg-white p-2 rounded-lg drop-shadow-lg'>
                      <RiInstagramFill className='text-[2.5rem] text-pink-600 group-hover:text-pink-700' />
                    </Link>
                  </div>
                </div>
                <div className='w-[50%] pl-[3rem]'>
                  <div className='w-[70%] h-[20rem] overflow-hidden rounded-xl'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.432852325563!2d31.032515074417297!3d-17.818332476039224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a500760b2315%3A0x5c82eb6ec92acf8a!2sRiver%20Range%20Flower%20and%20Gift%20Shop!5e0!3m2!1sen!2szw!4v1711433870574!5m2!1sen!2szw" 
                      style={{border:0, width:'100%', height:'100%'}} 
                      allowfullscreen="" 
                      loading="lazy" 
                      referrerpolicy="no-referrer-when-downgrade">  
                    </iframe> 
                  </div>
                </div>
              </section>
          </div>
        </SwiperSlide>
       
        <SwiperSlide>
          <div 
            style={{ backgroundImage: `url('/assets/img/woman_bg.jpg')`}}
            className='w-full h-[32rem] bg-cover bg-gradient-to-br from-pink-200 to-pink-500'>
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
    <HomeSliderResponsive appInfoData={appInfoData} />
    </>
  )
}


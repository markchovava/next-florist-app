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
import { RiWhatsappFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";


export default function HomeSliderResponsive({ appInfoData }) {
  
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
                    <div 
                        style={{ backgroundImage: `url('/assets/img/pink_bg.jpg')`}}
                        className='w-full h-[23rem] bg-no-repeat bg-cover'>
                        <section className='mx-auto w-[90%] flex flex-col justify-start items-center'>
                            <div className='w-[100%] flex items-center justify-center gap-3 mt-[3rem]'>
                                <h5 className='w-[65%] text-2xl leading-tight font-bold text-[#181739] drop-shadow-lg'>
                                    Welcome to River Range Flower &  Gift Shop
                                </h5>
                                <div className='w-[35%] flex gap-3'>
                                    <Link href={appInfoData.data.whatsapp} target='_blank' className='group bg-white p-2 rounded-lg drop-shadow-lg'>
                                    <RiWhatsappFill className='text-[2rem] text-green-600 group-hover:text-green-700' />
                                    </Link>
                                    <Link href={appInfoData.data.facebook} target='_blank' className='group bg-white p-2 rounded-lg drop-shadow-lg'>
                                    <FaFacebook className='text-[2rem] text-blue-600 group-hover:text-blue-700' />
                                    </Link>
                                    <Link href={appInfoData.data.instagram} target='_blank' className='group bg-white p-2 rounded-lg drop-shadow-lg'>
                                    <RiInstagramFill className='text-[2rem] text-pink-600 group-hover:text-pink-700' />
                                    </Link>
                                </div>
                            </div>
                            {/* CONTACTS */}
                            <div className='w-[100%] my-[2.5rem]'>
                                <div className='mx-auto w-[80%] h-[10rem] overflow-hidden rounded-xl'>
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


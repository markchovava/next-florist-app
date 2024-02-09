import { BsArrowRight } from 'react-icons/bs'
import SubscribeResponsive from './SubscribeResponsive'



const Subscribe = () => {
  return (
    <>
        <section className='lg:w-[100%] hidden lg:block h-auto bg-gradient-to-br from-red-400 to-pink-700'>
            <div className='mx-auto w-[90%] pb-16 py-12'>
                <label className='text-2xl italic font-semibold text-white block pb-4'>
                    Write us your Email or Phone number to get our catalog.
                </label>
                <div className='w-[100%] flex justify-start items-center gap-4'>
                    <input type='text' className='w-[85%] py-4 px-3 rounded-md outline-none border border-white' />  
                    <button 
                        className='w-[12%] group flex items-center justify-center gap-1 rounded-md py-4 px-3 text-white border hover:bg-gradient-to-br  hover:from-pink-400 hover:to-red-600'>
                        Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </button>
                </div>
            </div>
        </section>
        <SubscribeResponsive />
    </>
  )
}

export default Subscribe
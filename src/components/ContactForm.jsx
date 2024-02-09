"use client"
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const ContactForm = ({ bgColor }) => {
  return (
    <section className={`w-[100%] h-auto pt-[4rem] pb-[4rem] ${ bgColor != undefined && 'bgColor' }`}>
        <div className='mx-auto container h-auto w-[90%] flex lg:flex-row flex-col items-start justify-start gap-8 '>
            <div className='lg:w-[50%] w-[100%] lg:h-[35rem] h-auto drop-shadow-lg bg-white rounded-md px-4 py-8'>
                <h3 className='font-black text-4xl pb-5'>Our Contact Details</h3>
                <ul className="pl-3">
                    <li className="flex items-center justify-start gap-2 pb-4">
                        <FaLocationDot className="text-pink-600" />
                        04 - 85 Avenue, <br />
                        Mabelreign <br />
                        Harare 
                    </li>
                    <li className="flex items-center justify-start gap-2 pb-4">
                        <FaPhoneAlt className="text-pink-600" />+263 782 210021</li>
                    <li className="flex items-center justify-start gap-2 pb-4">
                        <MdEmail className="text-pink-600" /> info@test.co.zw</li>
                </ul>
            </div>
            <div className='lg:w-[50%] w-[100%] lg:h-[35rem] h-auto drop-shadow-lg bg-white rounded-md px-4 py-6'>
                <h3 className='font-black text-4xl'>Write to us</h3>
                <form className="mt-4">
                    <div className="pb-5"> 
                        <label className="text-sm">Name</label>
                        <input className="w-[100%] rounded-md mt-1 border border-slate-300 py-3 px-4 outline-none"  type="text" />
                    </div>
                    <div className="pb-5">
                        <label className="text-sm">Email</label>
                        <input className="w-[100%] rounded-md mt-1 border border-slate-300 py-3 px-4 outline-none" type="text" />
                    </div>
                    <div className="pb-5">
                        <label className="text-sm">Message</label>
                        <textarea className="w-[100%] rounded-md h-[8rem] mt-1 border border-slate-200 py-3 px-4 outline-none"></textarea>
                    </div>
                    <div className="">
                        <button className="w-[100%] rounded-md py-5 flex items-center justify-center bg-gradient-to-br text-white transition-all duration-100 from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600">
                            Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default ContactForm
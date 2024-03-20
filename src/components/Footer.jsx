import getAppInfo from "@/api/getAppInfo";
import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Notification from "./Notification";


const Footer = async () => {
  const appInfoData = await getAppInfo();


  return (
    <section className="w-[100%] h-auto text-white bg-blue-700">
        <div className="mx-auto w-[90%] pt-[5rem] pb-[2rem] flex lg:flex-row gap-5 flex-col lg:items-start items-center lg:justify-between justify-center border-b border-blue-500">
          <div className="">
            <div>
              <h3 className="lg:text-left text-center text-4xl font-bold pb-3">{appInfoData.data.name}</h3>
              <p className="lg:text-left text-center italic">Get yours today.</p>
              <ul className="flex items-center justify-start gap-2 pt-3">
                <li><Link href='/home' className="text-sm hover:underline">Home</Link></li> /
                <li><Link href='/about' className="text-sm hover:underline">About Us</Link></li> /
                <li><Link href='contact' className="text-sm hover:underline">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <ul className=" flex items-center justify-center gap-6">
              <li><Link href={appInfoData.data.facebook}><FaFacebook className="text-3xl transition-all duration-200 ease-in  hover:text-pink-100 hover:scale-110" /></Link> </li>
              <li><Link href={appInfoData.data.instagram}><FaInstagram className="text-3xl transition-all duration-200 ease-in hover:text-pink-100 hover:scale-110" /></Link> </li>
              <li><Link href={appInfoData.data.twitter}><FaXTwitter className="text-3xl transition-all duration-200 ease-in hover:text-pink-100 hover:scale-110" /></Link> </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto w-[90%] py-2 flex items-center justify-end">
          <div className="text-sm tracking-wide">This website was developed by Freelance Designers.</div>
        </div>
        <Notification />
    </section>
  )
}

export default Footer
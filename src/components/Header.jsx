"use client"

import Navigation from "./Navigation";
import NavAdmin from "./NavAdmin";
import tokenRole  from "@/api/tokenRole";
import tokenAuth from "@/api/tokenAuth";



const Header = () => {
  const { getAuthToken } = tokenAuth();
  const { getRoleToken} = tokenRole();

  return (
    <section className="w-[100%] mx-auto h-auto">
      {/* ADMIN NAV */}
      { getAuthToken() && getRoleToken() <= 3  ? <NavAdmin /> : false }
      {/* LOGO */}
      <div 
        style={{ backgroundImage: `url('/assets/img/rose_bg.jpg')`}} 
        className="w-[100%] lg:h-[160px] h-[100px]  bg-left bg-no-repeat bg-cover flex items-end justify-center ">
        <div className="mb-4 font-semibold lg:text-[4rem] text-[2rem] leading-none text-pink-700">River Range Roses</div>
        
      </div>
      {/* NAVIGATION */}
      <Navigation />
     
    </section>
  )
}

export default Header
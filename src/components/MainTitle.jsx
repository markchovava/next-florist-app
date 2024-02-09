import React from 'react'

const MainTitle = ({ title, bgCssFrom, bgCssTo }) => {
  return (
    <section className={` ${bgCssFrom} ${bgCssTo} w-[100%] h-[250px] bg-gradient-to-br `}>
        <div className='mx-auto h-[100%] w-[90%] flex justify-center items-center'>
            <h3 className='text-[5rem] font-black text-white drop-shadow-lg'>{title}</h3>
        </div>
    </section>
  )
}

export default MainTitle
import React from 'react'

const AboutContent = () => {
  return (
    <>
    <section className='w-[100%] h-auto bg-white'>
        <div className='mx-auto w-[80%] py-[4rem] flex items-center justify-center gap-8'>
            <div className='w-[50%] flex justify-end items-center '>
                <div className='w-[100%] aspect-[4/3] border-[1rem] border-white rounded-tr-[20%] rounded-bl-[20%] bg-slate-300 drop-shadow-lg overflow-hidden'>
                    <div className='w-[100%] aspect-[4/3] rounded bg-white flex items-center justify-center'>
                        <img className='object-fit' src='/assets/img/rose.jpg' />
                    </div>
                </div>
            </div>
            <div className='w-[50%]'>
                <h3 className='text-[2.5rem] font-extrabold pb-3'>Lorem ipsum dolor sit.</h3>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum fuga natus <br />
                    possimus facilis, blanditiis exercitationem! Deserunt delectus blanditiis <br />
                    architecto, dolor debitis ipsam sed minima odio, velit dignissimos illum nam non!
                </p>
            </div>
        </div>
    </section>
    <section className='w-[100%] h-auto bg-slate-50'>
        <div className='mx-auto w-[80%] py-[4rem] flex items-center justify-center gap-8'>
            <div className='w-[50%] justify-end'>
                <h3 className='text-[2.5rem] font-extrabold pb-3'>Lorem ipsum dolor sit.</h3>
                <p className='justify-end'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum fuga natus <br />
                    possimus facilis, blanditiis exercitationem! Deserunt delectus blanditiis <br />
                    architecto, dolor debitis ipsam sed minima odio, velit dignissimos illum nam non!
                </p>
            </div>
            <div className='w-[50%] flex justify-start items-center '>
                <div className='w-[100%] aspect-[4/3] border-[1rem] border-white rounded-tr-[20%] rounded-bl-[20%] bg-slate-300 drop-shadow-lg overflow-hidden'>
                    {/*  */}
                    <div className='w-[100%] aspect-[4/3] rounded bg-white flex items-center justify-center'>
                        <img className='object-fit' src='/assets/img/rose1.jpg' />
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default AboutContent
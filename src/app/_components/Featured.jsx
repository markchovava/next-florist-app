import { baseURL } from '@/api/baseURL';
import { getFeaturedProducts } from '@/api/getCategories';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs'
import FeaturedResponsive from './FeaturedResponsive';



const Featured = async () => {
    const featuredData = await getFeaturedProducts();

  return (
    <>
        <section className='lg:block hidden w-[100%] bg-gray-50 h-auto pt-[4rem] pb-[5rem]'>
            <div className='mx-auto container h-auto w-[90%] flex items-center justify-start pb-8'>
                <h3 className='text-4xl font-black w-[35%]'>Featured Products</h3>
                <hr className='border-b border-pink-200 w-[65%]' />
            </div>
            <div className='mx-auto container h-auto w-[90%] grid grid-cols-4 gap-8'>
                
                {/* COL */}
                {featuredData.data &&
                    featuredData.data.map((item, i) => (
                    <div key={i} className='w-[100%] pt-4 pb-5 px-3 bg-white drop-shadow-md'>
                        <div>
                            <h4 className='font-bold text-xl pb-2'>
                            {item.name && (item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name)}
                            </h4>
                        </div>
                        <div className='w-[100%] overflow-hidden aspect-[4/5] rounded bg-white flex items-center justify-center'>
                            <img className='object-cover w-[100%] h-[100%]' src={baseURL + item.thumbnail} />
                        </div>
                        <div className='pt-4 flex'> 
                            <Link href={`/product/${item.id}`} 
                                className='group py-3 px-6 rounded-md flex items-center justify-center gap-1 text-sm bg-gradient-to-br from-pink-600 to-pink-400 text-white '>
                                Shop Now <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            </Link>
                        </div>
                    </div>
                ))}

            
            </div>
        </section>
        <FeaturedResponsive featuredData={featuredData} />
    </>
  )
}

export default Featured
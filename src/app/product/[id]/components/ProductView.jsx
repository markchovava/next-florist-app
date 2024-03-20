"use client"
import { useEffect, useLayoutEffect, useState } from 'react';
import { baseURL } from '@/api/baseURL';
import { BsArrowRight } from 'react-icons/bs';
import axios from 'axios';
import { ProductContextState } from '@/context/ProductContext';
import Link from 'next/link';
import { shoppingSession } from '@/api/shoppingSession';
import { useRouter } from 'next/navigation';
import { CiCircleRemove } from 'react-icons/ci';




export default function ProductView({ id, fourProducts }){
  const fourProductsData = JSON.parse(fourProducts.value);
    const router = useRouter();
    const {productDispatch, productState} = ProductContextState();
    const {setShoppingSession, getShoppingSession} = shoppingSession();
    const [product, setProduct] = useState({});
    const [data, setData] = useState({});
    const [options, setOptions] = useState([]);
    const [extra, setExtra] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMsg, setErrMsg] = useState('');

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
    
  }
    
    
    async function getProducts() {
      try{
        const result = await axios.get(`${baseURL}product/${id}`)
        .then((response) => {
          /* DISPLAYED DATA */
          setProduct(response.data.data)
          /* SUBMIT DATA */
          productDispatch({ type: 'ADD_ITEM', 
            payload:{
              id: response.data.data.id, // product id
              name: response.data.data.name,
              image: response.data.data.image,
              price: response.data.data.price,
              quantity: 0,
              total: 0,
              grandtotal: 0
            }
          });

        })
      } catch (error) {
          console.error(`Error: ${error}`);
          console.error(`Error Message: ${error.message}`);
          console.error(`Error Response: ${error.response}`);
      }   
    }  
    async function getExtra() {
      try{
        const result = await axios.get(`${baseURL}product-extra/flower`)
        .then((response) => {
          setExtra(response.data.data);
          console.log(response.data.data);
        })
      } catch (error) {
          console.error(`Error: ${error}`);
          console.error(`Error Message: ${error.message}`);
          console.error(`Error Response: ${error.response}`);
      }   
    }
    const extras = () => {
      let result = [];
      for(let i = 1; i <= 10; i++){
        result.push(i * extra.quantity);
      }
      return result;
    } 
    async function getOptions() {
      try{
        const result = await axios.get(`${baseURL}product-option`)
        .then((response) => {
          setOptions(response.data.data)
        })
      } catch (error) {
          console.error(`Error: ${error}`);
          console.error(`Error Message: ${error.message}`);
          console.error(`Error Response: ${error.response}`);
      }   
    }

    /* POST DATA */
    async function postData() {
      if(!data.product_quantity){
        setErrMsg('You are required to Quantity on product.');
        setIsSubmit(false)
        return;
      }
      console.log(data.product_quantity)
      const shopping_session = getShoppingSession() ? getShoppingSession() : null;
      const product_total = Number(product.price) * Number(data.product_quantity);
      const cartitem_extra_total = Number(extra.price) * Number(data.extra_quantity);
      const formData = {
        shopping_session: shopping_session,
        product_quantity: Number(data.product_quantity),
        product_total: product_total,
        product_id: product.id,
        product_name: product.name,
        product_quantity: Number(data.product_quantity),
        product_unit_price: Number(product.price),
        extra_quantity: Number(data.extra_quantity),
        extra_total: cartitem_extra_total,
        extra_name: extra.name,
        extra_quantity: Number(data.extra_quantity),
        extra_total: cartitem_extra_total,
      
      }
     
      try{
          const result = await axios.post(`${baseURL}cart/`, formData)
          .then((response) => {
                console.log(response.data)
                setShoppingSession(response.data.shopping_session)
                router.push('/cart')
                setIsSubmit(false)
              }
          );    
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setIsSubmit(false)
        } 
    }

    
    useLayoutEffect(() => {
      getExtra();
      getProducts()
      getOptions()
    }, []);

    useEffect(() => {
        isSubmit == true && postData();
    }, [isSubmit]);


    /* if(!product && options.length <= 0){
      return (
      <>
        <div className="w-[50rem] lg:w-[100%] h-[50vh] flex items-center justify-center py-4 border border-slate-200 ">
            <h6 className='animate-pulse text-2xl'>Loading...</h6>
        </div>
      </>
      )
  }
   */


  return (
    <>
      <section className='w-[100%] h-auto bg-white'>
      {errMsg !== '' &&
        <section className='mx-auto w-[90%] pt-[2rem] text-red-500 text-lg flex items-center justify-center gap-6'>
            <span>{errMsg}</span>
            <span 
                className='cursor-pointer' 
                onClick={() => setErrMsg('')}>
                    <CiCircleRemove className='text-2xl' />
            </span>
        </section>
      }
        <div className='mx-auto w-[90%] py-[3.5rem]'>
          
          {/*  */}
          <div className='w-[100%] h-auto pb-[4rem] lg:flex flex-col lg:flex-row gap-6 justify-start items-start'>
            {/* IMAGE */}
            <div className='lg:w-[40%] w-[100%]'>
                <div className='w-[100%] rounded-lg overflow-hidden drop-shadow-lg'>
                  <div className='w-[100%] aspect-[1/1] rounded-xl overflow-hidden bg-white flex items-center justify-center'>
                      <img className='object-cover w-[100%] h-[100%]' src={baseURL + product.image} />
                  </div>
                </div>
            </div>
            {/* PRODUCT INFO */}
            <div className='lg:w-[60%] w-[100%] pt-8 lg:mt-0'>
                <h3 className='font-light text-[2.5rem]'>{product.name}</h3>
                <h2 className='font-semibold text-[2rem] text-pink-500 mb-3'>
                    {product.price && '$' + (product.price / 100).toFixed(2)}
                </h2>
                <p className='mb-4'>
                   {product.description}
                </p>
                <section className='w-[65%] mt-6 mb-8'>
                  <h6 className='font-semibold text-sm mb-3'>
                    {extra.name} ({extra.price ? '$' + (extra.price / 100).toFixed(2) : (0).toFixed(2)} per {extra.quantity} flowers):
                  </h6>
                  <select
                    name='extra_quantity'
                    value={data.extra_quantity}
                    onChange={handleInput}
                    className='w-[100%] border text-lg border-pink-200 outline-none px-3 py-2'>
                    <option value=''>Select an option.</option>
                    {extras().map((item, i) => (
                      <option key={i} value={item}>{item}</option>
                    ))} 
                  </select>
                </section>
                
            
              
                {/*  */}
               
                  <section className='w-[80%] flex justify-start gap-4 items-start mb-4'>
                    <input 
                      type='number'
                      name='product_quantity'
                      min='0' 
                      onChange={handleInput}
                      placeholder='0' 
                      className='w-[30%] block text-black bg-slate-100 px-4 py-5 rounded-md outline-none border border-slate-300' />
                    <button
                      onClick={() => setIsSubmit(true) }
                      className='w-[50%] transition-all duration-150 ease-out bg-pink-500 hover:bg-pink-600 text-white px-4 py-5 rounded'>
                      { isSubmit === true ? 
                        'Processing' : 
                        'Add to Cart'
                      }
                    </button>
                    
                  </section>
                
            </div>
          </div>
          {/*  */}
          <div className='mx-auto container h-auto w-[100%] flex items-center justify-start pb-8'>
            <h3 className='text-4xl font-black w-[35%]'>Trending Products</h3>
            <hr className='border-b border-pink-200 w-[65%]' />
          </div>
          {/* FOUR PRODUCTS */}
          <div className='w-[100%] container grid lg:grid-cols-4 grid-cols-2 gap-8 pb-[2rem]'>    
            {/* COL */}
            {fourProductsData && fourProductsData.data.map((item, i) => (
              <div key={i} className='w-[100%] pt-4 pb-5 px-3 bg-white drop-shadow-md'>
                  <div>
                    <h4 className='font-bold text-xl pb-2'>
                    {item.name && (item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name)}
                    </h4>
                  </div>
                  <div className='w-[100%] aspect-[4/5] rounded bg-slate-300'>
                      <img className='object-cover w-[100%] h-[100%]' src={baseURL + item.thumbnail} />
                  </div>
                  <div className='pt-4 flex'> 
                      <Link href={`/product/${item.id}`} className='group py-3 px-5 rounded-md flex items-center justify-center gap-1 text-sm bg-gradient-to-br from-pink-600 to-pink-400 text-white '>
                          Shop Now <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                      </Link>
                  </div>
              </div>
            ))}   
          </div>
        </div>
      </section>
    </>
  )
}

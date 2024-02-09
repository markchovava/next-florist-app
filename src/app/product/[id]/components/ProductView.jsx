"use client"
import { useEffect, useLayoutEffect, useState } from 'react';
import { baseURL } from '@/api/baseURL';

import { BsArrowRight } from 'react-icons/bs';
import axios from 'axios';
import Loader from '@/components/Loader';
import { ProductContextState } from '@/context/ProductContext';
import Link from 'next/link';
import { shoppingSession } from '@/api/shoppingSession';
import { useRouter } from 'next/navigation';




export default function ProductView({ id, fourProducts }){
    const router = useRouter();
    const {productDispatch, productState} = ProductContextState();
    const {setShoppingSession, getShoppingSession} = shoppingSession();
    const [product, setProduct] = useState({});
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmit, setIsSubmit] = useState(false);
    const fourProductsData = JSON.parse(fourProducts.value);

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
      const shopping_session = getShoppingSession()
      setIsSubmit(false)
      const item = productState.item ? {
            id: productState.item.id,
            name: productState.item.name,
            image: productState.item.image,
            price: productState.item.price,
            quantity: productState.item.quantity,
            total: (productState.item.quantity ? Number(productState.item.quantity) : 0) * 
                  (productState.item.price ? Number(productState.item.price) : 0),
            grandtotal: (productState.item.quantity ? Number(productState.item.quantity) : 0) * 
                        (productState.item.price ? Number(productState.item.price) : 0) + 
                        ((productState.item.product_option?.price ? Number(productState.item.product_option?.price) : 0) * 
                        (productState.item.product_option?.quantity ? Number(productState.item.product_option?.quantity) : 0))
      } : null;
      const product_option = productState.item.product_option ? {
            id: productState.item.product_option.id,
            name: productState.item.product_option.name,
            price: productState.item.product_option.price,
            quantity: productState.item.product_option?.quantity,
            total: (productState.item.product_option?.price ? Number(productState.item.product_option?.price) : 0) * 
                  (productState.item.product_option?.quantity ? Number(productState.item.product_option?.quantity) : 0)
      } : null;
      const data = {
            shopping_session: shopping_session && shopping_session,
            product_total: (item.price ? item.price : 0) * 
                    (item.quantity ? item.quantity : 0),
            product_quantity: item.quantity ? item.quantity : 0,
            product_option_quantity: product_option?.quantity ? product_option.quantity : 0,
            product_option_total: product_option ? 
                    ((product_option.price ? product_option.price : 0) * 
                    (product_option.quantity ? product_option.quantity : 0)) : 0,
            grandtotal: (
                (item.price ? item.price : 0) * (item.quantity ? item.quantity : 0)) + 
                (product_option !== undefined && 
                ( (product_option?.price ? product_option.price : 0) * 
                  (product_option?.quantity ? product_option.quantity : 0)  )
            ),
            item: item ? item : null,
            product_option: product_option ? product_option : null,
      };

      console.log(data);

      try{
          const result = await axios.post(`${baseURL}cart/`, data)
          .then((response) => {
                console.log(response.data.data)
                setShoppingSession(response.data.data.shopping_session)
                router.push('/cart')
              }
          );    
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }  
    }

    
    useLayoutEffect(() => {
      getProducts()
      getOptions()
      setIsLoading(false)
    }, []);

    useEffect(() => {
        isSubmit == true && postData();
    }, [isSubmit]);
  


  return (
    <>
    {isLoading == true ?
        <Loader />
      :
      <section className='w-[100%] h-auto bg-white'>
        <div className='mx-auto w-[90%] py-[3.5rem]'>
          {/*  */}
          <div className='w-[100%] h-auto pb-[4rem] lg:flex flex-col lg:flex-row gap-6 justify-start items-start'>
            <div className='lg:w-[40%] w-[100%]'>
                <div className='w-[100%] rounded-lg overflow-hidden drop-shadow-lg'>
                  <div className='w-[100%] aspect-[1/1] rounded-xl overflow-hidden bg-white flex items-center justify-center'>
                      <img className='object-cover' src={baseURL + product.image} />
                  </div>
                </div>
            </div>
            <div className='lg:w-[60%] w-[100%] pt-8 lg:mt-0'>
                <h3 className='font-light text-[2.5rem]'>{product.name}</h3>
                <h2 className='font-semibold text-[2rem] text-pink-500 mb-3'>
                    ${product.price && (product.price / 100).toFixed(2)}</h2>
                <p className='mb-4'>
                   {product.description}
                </p>
                {/* Gifts  */}
                <section className='w-[80%] flex justify-start gap-4 items-start mb-4'>
                    <div className='w-[60%]'>
                        <h6 className='font-semibold text-sm mb-1'>Gifts</h6>
                        {options.map((item, i) => (
                            <div key={i} className='flex items-center justify-start gap-2 mb-1'>
                                <input 
                                  type='radio' 
                                  name='product_option'
                                  onChange={(e) => (productDispatch({type: 'ADD_ITEM_OPTION', payload: e.target.value }))}
                                  value={JSON.stringify({
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    quantity: 1,
                                    total: item.price,
                                  })} /> 
                                    <span>{item.name}</span> 
                                    <span className='font-semibold'>${(item.price / 100).toFixed(2)}</span>
                            </div>
                        ))}
                    
                    </div>
                    <div className='w-[40%]'>
                      { productState.item.product_option !== undefined && 
                        <>
                          <h6 className='font-semibold text-sm mb-1'>Quantity</h6>
                          <input 
                            type='number' 
                            min='0'
                            value={productState.item.product_option.quantity} 
                            onChange={(e) => productDispatch({type: 'ADD_ITEM_OPTION_QUANTITY', payload: {quantity: e.target.value} })}
                            className='block text-black bg-slate-100 w-[100%] px-3 py-2 rounded-md outline-none border border-slate-300' 
                          />
                        </> 
                      }
                        
                    </div>
                </section>
            
              
                {/*  */}
               
                  <section className='w-[80%] flex justify-start gap-4 items-start mb-4'>
                    <input 
                      type='number'
                      min='0' 
                      onChange={(e) => productDispatch({type: 'ADD_ITEM_QUANTITY', payload: {quantity: e.target.value,  }})}
                      placeholder='0' 
                      className='w-[30%] block text-black bg-slate-100 px-4 py-5 rounded-md outline-none border border-slate-300' />
                    <button
                      onClick={() => setIsSubmit(true) }
                      className='w-[50%] transition-all duration-150 ease-out bg-pink-500 hover:bg-pink-600 text-white px-4 py-5 rounded'>
                      Add to Cart</button>
                    
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
                  <div><h4 className='font-bold text-2xl pb-2'>{item.name}</h4></div>
                  <div className='w-[100%] aspect-[4/5] rounded bg-slate-300'>
                      <img className='object-fill w-[100%] h-[100%]' src={baseURL + item.thumbnail} />
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
    }
    </>
  )
}

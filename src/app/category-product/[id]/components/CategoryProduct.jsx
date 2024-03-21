"use client"
import { useEffect, useLayoutEffect, useState } from 'react';
import { baseURL } from '@/api/baseURL';
import axios from 'axios';
import { toast } from 'react-toastify';
import { shoppingSession } from '@/api/shoppingSession';
import { useRouter } from 'next/navigation';
import { CiCircleRemove } from 'react-icons/ci';
import { CategoryProductContextState } from '@/context/CategoryProductContext';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';




export default function CategoryProduct({ id }){
    const [search, setSearch] = useState('');
    const [searchSubmit, setSearchSubmit] = useState(false);
    const router = useRouter();
    const {categoryProductState, categoryProductDispatch} = CategoryProductContextState();
    const {setShoppingSession, getShoppingSession} = shoppingSession();
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState({});
    const [data, setData] = useState([]);
    const [extra, setExtra] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()

    async function paginationHandler(url) {
    try{
       const result = await axios.get(url)
       .then((response) => {
            setData(response.data.data);
            setPrevURL(response.data.links.prev);
            setNextURL(response.data.links.next);
       })
    } catch (error) {
        console.error(`Error: ${error}`);
        console.error(`Error Message: ${error.message}`);
        console.error(`Error Response: ${error.response}`);
    }     
    }
    
    /* CATEGORY */
    async function getCategory() {
      try{
        const result = await axios.get(`${baseURL}category/${id}`)
        .then((response) => {
            setCategory(response.data.data);

        })
      } catch (error) {
          console.error(`Error: ${error}`);
          console.error(`Error Message: ${error.message}`);
          console.error(`Error Response: ${error.response}`);
      }   
    }  
    /* PRODUCTS */
    async function getProducts() {
      try{
        const result = await axios.get(`${baseURL}category/products/${id}`)
        .then((response) => {
            setData(response.data.data);
            setPrevURL(response.data.links.prev);
            setNextURL(response.data.links.next);

        })
      } catch (error) {
          console.error(`Error: ${error}`);
          console.error(`Error Message: ${error.message}`);
          console.error(`Error Response: ${error.response}`);
      }   
    }  

    /* PRODUCTS */
    async function searchProducts() {
        try{
          const result = await axios.get(`${baseURL}category/products-search/${id}?search=${search}`)
          .then((response) => {
              setData(response.data.data);
              setPrevURL(response.data.links.prev);
              setNextURL(response.data.links.next);
              setSearchSubmit(false);
  
          })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
            setSearchSubmit(false);
        }   
    }  

    async function getExtra() {
      try{
        const result = await axios.get(`${baseURL}product-extra/flower`)
        .then((response) => {
          setExtra(response.data.data);
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

    /* POST DATA */
    async function postData() {
        const shopping_session = getShoppingSession() ? getShoppingSession() : null;
        const productData = categoryProductState.product;
        const formData = {...productData, shopping_session: shopping_session};
        console.log(productData);
        if(!categoryProductState.product.product_quantity){
            toast.error('You are required to add Quantity on your Product.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setIsSubmit(false)
            return;
        }
      
      try{
          const result = await axios.post(`${baseURL}cart/`, formData)
          .then((response) => {
                if(response.data.shopping_session){
                    setShoppingSession(response.data.shopping_session)
                }
                categoryProductDispatch({type: 'EMPTY_PRODUCT'})
                toast.success('Added to Cart successfully.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                setIsSubmit(false)
                window.location.reload();
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
      getProducts();
      getCategory();
    }, []);

    useEffect(() => {
        isSubmit == true && postData();
    }, [isSubmit]);

    useEffect(() => {
        searchSubmit == true && searchProducts();
    }, [searchSubmit]);



    if(!category.name){
        return (
          <>
              <div className="w-[100%] h-[50vh] flex items-center justify-center py-4 border border-slate-200 ">
                  <h6 className='animate-pulse text-2xl'>Loading...</h6>
              </div>
          </>
        )
      }

  return (
    <>
    {/* TITLE */}
    <section className='mx-auto w-[90%] h-auto pt-[2.5rem] pb-[2rem]'>
        <h1 className='text-[4rem] font-black mb-4'>{category.name}</h1>
        <p className='text-lg mb-8'>{category.description}</p>
    </section>

    <section className='mx-auto w-[80%] pb-[3rem] flex justify-start items-center gap-8'>
        <input type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
            placeholder='Search by name...' 
            className='w-[80%] rounded-lg px-4 py-4 outline-none border border-slate-300' />
        <button 
            onClick={() => setSearchSubmit(true)}
            className='w-[20%] bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 px-4 py-4 rounded-lg text-white'>
                {searchSubmit == true ? 'Processing' : 'Search' }
            </button>
    </section>

  

    <section className='w-[100%] h-auto bg-white'>     
        {/*  */}
        {data.length > 0 ?
            data.map((item, i) => (
            <div key={item.id} className='mx-auto w-[85%] h-auto bg-white lg:rounded-lg lg:drop-shadow-none drop-shadow-lg mb-[6rem] lg:flex flex-col lg:flex-row gap-6 justify-start items-start'>
                {/* IMAGE */}
                <div className='lg:w-[50%] w-[100%]'>
                    <div className='lg:px-[4rem]'>
                        <div className='w-[100%] rounded-lg overflow-hidden drop-shadow-lg'>
                            <div className='w-[100%] aspect-[5/4] rounded-xl overflow-hidden bg-white flex items-center justify-center'>
                                <img className='object-cover w-[100%] h-[100%]' src={baseURL + item.image} />
                            </div>
                        </div>

                    </div>
                </div>
                {/* PRODUCT INFO */}
                <div className='lg:w-[50%] w-[100%] flex flex-col items-start justify-center gap-2 p-4'>
                    <h3 className='font-light lg:text-[2.5rem] text-[2rem] lg:text-left'>{item.name}</h3>
                    <h2 className='font-semibold lg:text-[2rem] text-[2.5rem] text-pink-500'>
                        {item.price ? '$' + (item.price / 100).toFixed(2) : (0).toFixed(2)}
                    </h2>
                    <p className=''>
                        {item.description}
                    </p>
                    <section className='lg:w-[65%] w-[100%] mt-3 mb-4'>
                        <h6 className='font-semibold text-sm mb-3'>
                        {extra.name} ({extra.price ? '$' + (extra.price / 100).toFixed(2) : (0).toFixed(2)} for each item, a minimum of {extra.quantity} flowers):
                        </h6>
                        <select
                        name='extra_quantity'
                        value={item.extra_quantity}
                        onChange={(e) => {
                            categoryProductDispatch({
                                type: 'ADD_PRODUCT_EXTRA_QUANTITY', 
                                payload: {
                                    product_id: item.id, 
                                    extra_name: extra.name, 
                                    extra_price: extra.price, 
                                    extra_quantity: e.target.value
                                }
                            });
                        }}
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
                            onChange={(e) => {
                                categoryProductDispatch({
                                    type: 'ADD_PRODUCT_QUANTITY', 
                                    payload: {
                                        product_id: item.id,
                                        product_quantity: e.target.value
                                    }
                                });
                                
                            }}
                            placeholder='0' 
                            className='w-[30%] block text-black bg-slate-100 px-4 py-3 rounded-md outline-none border border-slate-300' />
                        <button
                            onClick={() => {
                                setIsSubmit(true)
                                categoryProductDispatch({
                                    type: 'ADD_PRODUCT', 
                                    payload: {
                                        product_id: item.id,
                                        product_name: item.name,
                                        product_unit_price: item.price
                                    }
                                });
                            }}
                            className='w-[50%] transition-all duration-150 ease-out bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded'>
                            { isSubmit === true ? 
                            'Processing' : 
                            'Add to Cart'
                            }
                        </button>
                        
                        </section>
                    
                </div>
            </div>
        ))
        :
        <div className='mx-auto w-[90%] h-auto flex items-center justify-center py-[2rem]'>
            <div className='text-2xl text-center'>No Data available at the moment.</div>
        </div>
        }

    </section>

    {/* PAGINATION */}
    <section className="w-[90%] mx-auto flex items-center justify-end gap-4 pb-[4rem]">
        {prevURL && 
            <button 
            onClick={() => paginationHandler(prevURL)}
            className='group flex items-center justify-center gap-1 border rounded-lg px-4 py-2 border-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white '>
                <BsArrowLeft className='transition ease-in-out duration-300 group-hover:-translate-x-1' />
                Prev </button>
        }
        {nextURL &&
            <button 
            onClick={() => paginationHandler(nextURL)}
            className='group flex items-center justify-center gap-1 border rounded-lg px-4 py-2 border-pink-500 hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white '>
                Next 
                <BsArrowRight className='transition ease-in-out duration-300 group-hover:translate-x-1' />
            </button>
        }
     
        
       
    </section>



    </>
  )
}

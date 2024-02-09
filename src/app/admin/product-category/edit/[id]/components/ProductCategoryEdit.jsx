"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { BsArrowRight } from "react-icons/bs";
import { FaRegPlusSquare } from "react-icons/fa";
import { CgRemoveR } from "react-icons/cg";
import axiosClientAPI from '@/api/axiosClientAPI';
import tokenAuth from '@/api/tokenAuth';



export default function ProductCategoryEdit({ id }) {
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
      }
    }
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false)
    const [product, setProduct] = useState({});
    const [productCategory, setProductCategory] = useState([]);
    const [category, setCategory] = useState({});
    const [categoryComp, setCategoryComp] = useState([{key:0}])
    const [data, setData] = useState([])

    const addCategoryComponent = () => {
        let i =  categoryComp.length;
        setCategoryComp([...categoryComp, {key:i++}])
    }
    const subtractCategoryComponent = () => {
        setCategoryComp(categoryComp.slice(0, -1))
        setData(data.slice(0, -1))
    }
    /* GET CATEGORY */
    async function getCategory() {
        try{
            const result = await axiosClientAPI.get(`category/`, config)
            .then((response) => {
                setCategory(response.data.data)  
            })
            } catch (error) {
            console.error(`Error: ${error}`)
            }   
    } 
    /* GET PROJECT */
    async function getProduct() {
        try{
            const result = await axiosClientAPI.get(`product/${id}`, config)
            .then((response) => {
                setProduct(() => response.data.data) 
            })
            } catch (error) {
            console.error(`Error: ${error}`)
            }   
    } 
     /* GET PRODUCT CATEGORY */
     async function getProductCategory() {
        try{
            const result = await axiosClientAPI.get(`product-category/${id}`, config)
            .then((response) => {
                setProductCategory(response.data.data)
                console.log(response.data.data)   
            })
            } catch (error) {
            console.error(`Error: ${error}`)
            }   
    } 
   

    /* DELETES SINGLE */
    async function deleteData(category_id){
        try{
        const result = await axiosClientAPI.delete(`product-category/${category_id}`, config)
        .then((response) => {
            getProductCategory()
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
  
    }

    /* SUBMIT DATA */
    async function postData() {
        setIsSubmit(false);
        const product_categories = {product_categories: data};
        console.log(product_categories)
        try{
        const result = await axiosClientAPI.post(`product-category/`, product_categories, config)
            .then((response) => {
            router.push(`/admin/product/${id}`);
            })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }  
    }  

    useEffect(() => { 
        getProduct();
        getCategory();
        getProductCategory();
    }, []);

    useEffect(() => { 
        isSubmit == true && postData();
    }, [isSubmit]);



  return (
    <section className='w-[100%] h-auto bg-white'>
        <div className="mx-auto w-[75%] py-[4rem]">

            {/*  */}
            <div className='flex justify-end items-center pb-[2rem] '>
                <Link
                    href={`/admin/product/${id}`}
                    className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg text-white from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600 px-8 py-3'>
                    View</Link>
            </div>

           {/* ROW */}
            <div className="w-[100%] mb-[3rem] flex items-center justify-start">
                <label className='w-[20%] gap-3'>Name:</label>
                <div className='w-[80%] font-semibold'>{product.name}</div>
            </div>

            <section className='w-[100%] h-auto flex justify-start items-start gap-3 mb-[2rem]'>
                <div className="w-[90%]">
                    {productCategory.length > 0 &&
                        productCategory.map((item, i) => (
                            <div key={i} className='w-[100%] mb-[2rem] flex justify-start items-center gap-3'>
                                <div className='w-[90%]'>
                                    Category: <b>{item.category.name}</b>
                                </div>
                                <div className='w-[10%]'>
                                    <CgRemoveR
                                        onClick={() => deleteData(item.id)}
                                        className='text-xl hover:scale-110 hover:text-red-700 transition-all duration-150 ease-in-out' />
                                </div>
                            </div>
                        ))
                    }
                    {categoryComp.map((item, i) => (
                        <div key={i} className='w-[100%] mb-[2rem] flex justify-start items-center gap-3'>
                            <select
                                type="select"
                                name='category_id'
                                onChange={(e) => setData([...data, {product_id: product.id, category_id: e.target.value}])}
                                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                                <option value=''>Select an option.</option>
                                {category.length > 0 && 
                                    category.map((item, i) => (
                                        <option key={i} value={item.id}>{item.name}</option>
                                    ))
                                }
                                
                            </select>
                        </div>
                    ))}
                </div>
                <div className="w-[10%] flex justify-center items-start gap-3 py-[1rem]">
                        <FaRegPlusSquare 
                            onClick={addCategoryComponent} 
                            className='text-2xl hover:scale-110 hover:text-green-700 transition-all duration-150 ease-in-out' />
                        <CgRemoveR 
                            onClick={subtractCategoryComponent}  
                            className='text-2xl hover:scale-110 hover:text-green-700 transition-all duration-150 ease-in-out' />
                        
                </div>
            </section>
           
            <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
                <button 
                  onClick={() => setIsSubmit(true)} 
                  className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2rem] text-white bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-500 hover:to-pink-600'>
                  Submit 
                  <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' /></button>
            </div>
        </div>
      </section>
  )
}

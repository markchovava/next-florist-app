"use client"
import { createContext, useContext, useReducer } from "react"
import { productInitialState, productReducer, productInit } from "@/reducers/ProductReducer"


export const ProductContext = createContext()


export default function ProductContextProvider({ children }) {
    const [productState, productDispatch] = useReducer(productReducer, productInitialState, productInit)

    return (
        <ProductContext.Provider value={{ 
            productState, 
            productDispatch,
        }}>
        { children }
        </ProductContext.Provider>
      )
}


export const ProductContextState = () => {
    return useContext(ProductContext)
  }
 

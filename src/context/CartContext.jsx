"use client"
import { cartInit, cartInitialState, cartReducer } from "@/reducers/CartReducer";
import { createContext, useContext, useReducer } from "react"



export const CartContext = createContext()


export default function CartContextProvider({ children }) {
    const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState, cartInit)

    return (
        <CartContext.Provider value={{ 
            cartState, 
            cartDispatch,
        }}>
        { children }
        </CartContext.Provider>
      )
}


export const CartContextState = () => {
    return useContext(CartContext)
  }


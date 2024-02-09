"use client"
import { createContext, useContext, useReducer } from "react"
import { orderInitialState, orderReducer, orderInit } from "@/reducers/admin/OrderReducer"


export const OrderContext = createContext()


export default function OrderContextProvider({ children }) {
    const [orderState, orderDispatch] = useReducer(orderReducer, orderInitialState, orderInit)

    return (
        <OrderContext.Provider value={{ 
            orderState, 
            orderDispatch,
        }}>
        { children }
        </OrderContext.Provider>
      )
}


export const OrderContextState = () => {
    return useContext(OrderContext)
  }
 

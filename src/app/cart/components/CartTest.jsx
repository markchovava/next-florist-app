"use client"

import { CartContextState } from "@/context/CartContext";
import { useEffect } from "react";

export default function CartTest() {
    const {cartState, cartDispatch} = CartContextState();

    useEffect(() => {
        cartDispatch({type: 'ADD_TEMS', payload: [1,2,3,4,5]})
    }, []);

    console.log(cartState.items)
  return (
    <div>CartTest</div>
  )
}

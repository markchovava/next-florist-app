"use client";
import { createContext, useContext, useReducer } from "react";
import { categoryProductInit, categoryProductInitialState, categoryProductReducer } from "@/reducers/CategoryProductReducer";


export const CategoryProductContext = createContext();


export default function CategoryProductContextProvider({ children }) {
    const [categoryProductState, categoryProductDispatch] = useReducer(categoryProductReducer, categoryProductInitialState, categoryProductInit);

    return (
        <CategoryProductContext.Provider value={{ 
            categoryProductState, 
            categoryProductDispatch
        }}>
        { children }
        </CategoryProductContext.Provider>
      );
}


export const CategoryProductContextState = () => {
    return useContext(CategoryProductContext);
  }
 

"use client";

export const tokenShoppingSession = () => {

    const setShoppingSession = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem('RIVER_RANGE_FLORIST_SHOPPING_SESSION', token);
        }
    }

    const getShoppingSession = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem('RIVER_RANGE_FLORIST_SHOPPING_SESSION');
            return token;
        }
    }

    const removeShoppingSession = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.removeItem('RIVER_RANGE_FLORIST_SHOPPING_SESSION');
            return token;
        }
    }

    return {
        setShoppingSession, 
        getShoppingSession,
        removeShoppingSession
    }

  }
  



"use client";

export const tokenShoppingSession = () => {

    const setShoppingSession = (token) => {
        localStorage.setItem('RIVER_RANGE_FLORIST_SHOPPING_SESSION', token);
    }

    const getShoppingSession = () => {
        const token =  localStorage.getItem('RIVER_RANGE_FLORIST_SHOPPING_SESSION');
        return token;
    }

    const removeShoppingSession = () => {
        const token =  localStorage.removeItem('RIVER_RANGE_FLORIST_SHOPPING_SESSION');
        return token;
    }

    return {
        setShoppingSession, 
        getShoppingSession,
        removeShoppingSession
    }

  }
  



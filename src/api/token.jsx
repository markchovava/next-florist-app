"use client"

export const setToken = (token) => {
    localStorage.setItem('RIVER_RANGE_FLORIST_TOKEN', token);
  }
  
export const getToken = () => {
    const token =  localStorage.getItem('RIVER_RANGE_FLORIST_TOKEN');
    return token;
  }

export const removeToken = () => {
    localStorage.removeItem('RIVER_RANGE_FLORIST_TOKEN');
  }
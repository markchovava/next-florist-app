"use client"

export default function tokenAuth() {
    
    const setAuthToken = (token) => {
        if(typeof window !== 'undefined') {
          window.localStorage.setItem('RIVER_RANGE_FLORIST_AUTH_TOKEN', token);
        }
      }
    const getAuthToken = () => {
        if(typeof window !== 'undefined') {
          const token =  window.localStorage.getItem('RIVER_RANGE_FLORIST_AUTH_TOKEN');
          return token;
        }
      }
    const removeAuthToken = () => {
        if(typeof window !== 'undefined') {
          window.localStorage.removeItem('RIVER_RANGE_FLORIST_AUTH_TOKEN');
        }
      }

  return {
    setAuthToken,
    getAuthToken,
    removeAuthToken
  }

}

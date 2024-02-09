"use client"

export default function tokenAuth() {
    
    const setAuthToken = (token) => {
        localStorage.setItem('RIVER_RANGE_FLORIST_AUTH_TOKEN', token);
      }
    const getAuthToken = () => {
        const token =  localStorage.getItem('RIVER_RANGE_FLORIST_AUTH_TOKEN');
        return token;
      }
    const removeAuthToken = () => {
        localStorage.removeItem('RIVER_RANGE_FLORIST_AUTH_TOKEN');
      }

  return {
    setAuthToken,
    getAuthToken,
    removeAuthToken
  }

}

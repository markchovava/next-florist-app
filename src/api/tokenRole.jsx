"use client"

export default function tokenRole() {

    const setRoleToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem('RIVER_RANGE_FLORIST_ROLE_TOKEN', token);
        }
    }
    const getRoleToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem('RIVER_RANGE_FLORIST_ROLE_TOKEN');
            return token;
        }
    }
    const removeRoleToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem('RIVER_RANGE_FLORIST_ROLE_TOKEN');
        }
      }

    return {
        setRoleToken, 
        getRoleToken,
        removeRoleToken,
    }

  }
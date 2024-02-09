"use client"

export default function tokenRole() {

    const setRoleToken = (token) => {
        localStorage.setItem('RIVER_RANGE_FLORIST_ROLE_TOKEN', token);
    }
    const getRoleToken = () => {
        const token =  localStorage.getItem('RIVER_RANGE_FLORIST_ROLE_TOKEN');
        return token;
    }
    const removeRoleToken = () => {
        localStorage.removeItem('RIVER_RANGE_FLORIST_ROLE_TOKEN');
      }

    return {
        setRoleToken, 
        getRoleToken,
        removeRoleToken,
    }

  }
"use client"


export const cartInit = (cartInitialState) => {
    const result = {
        ...cartInitialState, 
        items: [],
    }
    return result
}

export const cartInitialState = {
    items: [],
};

export const cartReducer = (state, action) => {
    switch(action.type){
        case 'ADD_ITEMS':
            return {
                ...state,
                items: action.payload
            }    
        case 'ADD_ITEM_QUANTITY':
            return {
                ...state,
                items: state.items.filter((item) => {
                    if(item.id === action.payload.id) {
                        item.quantity = Number(action.payload.quantity);
                        item.total = Number(item.price) * Number(action.payload.quantity)
                        return item;
                    } else{
                        return item;
                    }
                })
            } 
        case 'ADD_ITEM_OPTION':
            return {
                ...state,
                items: state.items.filter((item) => {
                    if(item.id === action.payload.id){
                        item.cart_item_option = JSON.parse(action.payload.cart_item_option);
                        return item;
                    } else {
                        return item;
                    }
                })
            }
        case 'ADD_ITEM_OPTION_QUANTITY':
            return {
                ...state,
                items: state.items.filter((item) => {
                    if(item.id === action.payload.id){
                        item.cart_item_option.quantity = Number(action.payload.quantity);
                        item.cart_item_option.total = Number(item.cart_item_option?.price) * Number(action.payload.quantity);
                        return item;
                    } else {
                        return item;
                    }
                })
            }
        
        default:
           return state;

   }
}

"use client"

export const productInit = (productInitialState) => {
    const result = {
        ...productInitialState, 
        item: {},
    }
    return result
}

export const productInitialState = {
    item: {},
};

export const productReducer = (state, action) => {
    switch(action.type){
        case 'ADD_ITEM':
            return {
                ...state,
                item: action.payload,
            }
        case 'ADD_ITEM_QUANTITY':
            return {
                ...state,
                item: {
                    ...state.item, 
                    quantity: Number(action.payload.quantity),
                }
            }
        case 'ADD_ITEM_OPTION':
            return {
                ...state,
                item: {...state.item, product_option: JSON.parse(action.payload)}
            }
        case 'ADD_ITEM_OPTION_QUANTITY':
            return {
                ...state,
                item: {
                    ...state.item, 
                    product_option: {
                        ...state.item.product_option, 
                        quantity: Number(action.payload.quantity),
                    }
                }
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                item: state.item.filter((item) => item.id !== action.payload.id),
            };
        case 'EMPTY_ITEMS_LIST':
                return {
                  ...state,
                  item: {},
                };
        default:
           return state;
   }
}

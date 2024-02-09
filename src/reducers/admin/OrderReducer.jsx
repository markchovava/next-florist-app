"use client"

export const orderInit = (orderInitialState) => {
    const result = {
        ...orderInitialState, 
        items: [],
    }
    return result
}

export const orderInitialState = {
    items: [],
};

export const orderReducer = (state, action) => {
    switch(action.type){
        case 'ADD_ITEM':
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (!existingItem || existingItem === undefined) {
                state.items.push(action.payload);
            } else if(existingItem){
                existingItem.quantity = Number(action.payload.quantity);
                existingItem.total = existingItem.quantity * existingItem.price
            }
            return {
                ...state,
                items: state.items
            }
        case 'ADD_ITEM_QUANTITY':
                return {
                    ...state,
                    items: state.items.filter((item) => {
                        if(item.id === action.payload.id) {
                            item.quantity = Number(action.payload.quantity);
                            item.total = item.quantity * item.price;
                            item.grandtotal = item.product_option.total ? Number(item.product_option.total) + Number(item.total) : Number(item.total);
                            return item
                        }else{
                            return item
                        }
                    })
                }
        case 'ADD_ITEM_OPTION':
            return {
                ...state,
                items: state.items.filter((item) => {
                    if(item.id === action.payload.id){
                        item.product_option = JSON.parse(action.payload.product_option);
                        item.grandtotal = Number(item.product_option.total) + Number(item.total);
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
                        item.product_option.quantity = Number(action.payload.product_option_quantity);
                        item.product_option.total = Number(item.product_option.price) * Number(action.payload.product_option_quantity);
                        item.grandtotal = Number(item.product_option.total) + Number(item.total);
                        return item;
                    } else {
                        return item;
                    }
                })
            }
            
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id),
            };
        case 'EMPTY_ITEMS_LIST':
                return {
                  ...state,
                  items: [],
                };
        default:
           return state;
   }
}

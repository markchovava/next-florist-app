"use client"

export const categoryProductInit = (categoryProductInitialState) => {
    const result = {
        ...categoryProductInitialState, 
        product: {},
    }
    return result;
}

export const categoryProductInitialState = {
    product: {},
};

export const categoryProductReducer = (state, action) => {
    switch(action.type){
       
        case 'ADD_PRODUCT':
            if (Object.keys(state.product).length === 0) {
                state.product.product_id = action.payload.product_id;
                state.product.product_name = action.payload.product_name;
                state.product.product_unit_price = action.payload.product_unit_price;
                state.product.product_total = Number(state.product.product_quantity) * Number(state.product.product_unit_price);
                /* TOTALS */
                state.product.cartitem_quantity = Number(state.product.product_quantity) + Number(state.product.extra_quantity);
                state.product.cartitem_total = Number(state.product.product_total) + Number(state.product.extra_total);
            } 
            else if(state.product.product_id === action.payload.product_id){
                const existingProduct = state.product;
                existingProduct.product_name = action.payload.product_name;
                existingProduct.product_unit_price = action.payload.product_unit_price;
                existingProduct.product_total = existingProduct.product_quantity * existingProduct.product_unit_price;
                /* TOTALS */
                existingProduct.cartitem_quantity = Number(existingProduct.product_quantity) + Number(existingProduct.extra_quantity ? existingProduct.extra_quantity : 0);
                existingProduct.cartitem_total = Number(existingProduct.product_total) + Number(existingProduct.extra_total ? existingProduct.extra_total : 0);
            }
            return {
                ...state,
                product: state.product

            }
        case 'ADD_PRODUCT_QUANTITY':
            if (Object.keys(state.product).length === 0) {
                state.product.product_id = action.payload.product_id;
                state.product.product_quantity = action.payload.product_quantity;
            } 
            else if(state.product.product_id === action.payload.product_id){
                state.product.product_quantity = action.payload.product_quantity;
            }
            return {
                ...state,
                product: state.product

            }
        case 'ADD_PRODUCT_EXTRA_QUANTITY':
                if (Object.keys(state.product).length === 0) {
                    state.product.product_id = action.payload.product_id;
                    state.product.extra_quantity = action.payload.extra_quantity;
                    state.product.extra_name = action.payload.extra_name;
                    state.product.extra_price = action.payload.extra_price;
                    state.product.extra_total = Number(state.product.extra_price) * Number(state.product.extra_quantity);
                } 
                else if(state.product.product_id === action.payload.product_id){
                    state.product.extra_quantity = action.payload.extra_quantity;
                    state.product.extra_name = action.payload.extra_name;
                    state.product.extra_price = action.payload.extra_price;
                }
                return {
                    ...state,
                    product: state.product
    
                }     
       
        case 'EMPTY_PRODUCT':
                return {
                  product: {},
                };
        default:
           return state;
   }
}

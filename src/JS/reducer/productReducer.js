import { ADD_PRODUCT, DELETE_PRODUCT, FAIL_PRODUCT, GET_PRODUCTS, LOAD_PRODUCT, MODIFY, NEXTPAGE, PREVIOUSPAGE, SEARCH } from "../ACTIONS/productActions"
import { toast } from "react-toastify"

const initialstate={
    product:null,
    load:false,
    error:true,
    pag:1,
    searche:" "
}


export const productReducer=(state=initialstate,{type,payload})=>{
    switch (type) {
        case ADD_PRODUCT:
            toast("product added succesfully")
            return{...state,load:false}
        case MODIFY:
            return {...state,load:false}
        case GET_PRODUCTS:
            return {...state,load:false,product:payload}
        case DELETE_PRODUCT:
            return {...state,load:false}
        case FAIL_PRODUCT:
            return{...state,load:false,error:payload}
        case LOAD_PRODUCT:
            return{...state,load:true}
        case NEXTPAGE:
            return{...state,pag:(state.pag<state.product.length/3)?+1:state.pag}
        case PREVIOUSPAGE:
            return {...state,pag:(state.pag!=1)?-1:state.pag}
        case SEARCH:
            return{...state,searche:payload}
        default:
            return state
    }
}
import { ADD_BASKET, ADD_NEWBASKET, FAIL_BASKET, GET_BASKET, LOAD_BASKET } from "../ACTIONS/basketActions";
import { toast } from "react-toastify"


const initialstate={
    newbasket:[],
    basket:null,
    load:false,
    error:null
}


export const basketReducer=(state=initialstate,{type,payload})=>{
    switch (type) {
        case ADD_BASKET:
            toast("basket Added successefully!")
            return{...state,load:false}
        case GET_BASKET:
            return {...state,load:false,basket:payload.facture}
        case LOAD_BASKET:
            return{...state,load:true}
        case FAIL_BASKET:
            toast("cannot serve right now")
            return{...state,load:false,error:true}
            case ADD_NEWBASKET:
                const index = state.newbasket.findIndex(el => el.productId === payload.productId);
                if (index !== -1) {
                const updatedBasket = [...state.newbasket];
                updatedBasket[index].quantity += parseInt(payload.quantity); 
                return { ...state, newbasket: updatedBasket };
                } else {
                return { ...state, newbasket: [...state.newbasket, {productId:payload.productId,quantity:parseInt(payload.quantity)}] };
                }
    
        default:
            return state
    }
}
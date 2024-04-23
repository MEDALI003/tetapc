import axios from "axios"
export const ADD_BASKET="add basket"
export const GET_BASKET="get basket"
export const LOAD_BASKET="load_basket"
export const FAIL_BASKET="fail basket"
export const ADD_NEWBASKET="add"


export const addbasket=(basket)=>async(dispatch)=>{
    dispatch({type:LOAD_BASKET})    
    try {
        const res=await axios.post("https://back-end-2-hqhl.onrender.com/api/basket/addbasket",basket)
        console.log(res)
        dispatch({type:ADD_BASKET , payload:res.data})
    } catch (error) {
        dispatch({type:FAIL_BASKET})
    }
}
export const getbasket=()=>async(dispatch)=>{
    dispatch({type:LOAD_BASKET})    
    try {
        const res=await axios.get("https://back-end-2-hqhl.onrender.com/api/basket/getbasket")
        dispatch({type:GET_BASKET , payload:res.data})
    } catch (error) {
        dispatch({type:FAIL_BASKET})
    }
}
export const addtobasket=(element)=>{
    return{
        type:ADD_NEWBASKET,
        payload:element
    }
}
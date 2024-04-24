import  axios  from "axios";

export const ADD_PRODUCT="addproduct"
export const GET_PRODUCTS="get product"
export const MODIFY="modify"
export const DELETE_PRODUCT="delete the product"
export const LOAD_PRODUCT="load product"
export const FAIL_PRODUCT="fail_product"
export const NEXTPAGE="next"
export const PREVIOUSPAGE='previous'
export const SEARCH="tri"
export const ADD_BASKET="addtobasket"
export const REMOVE_BASKET="remove from basket"
export const addProduct=(product)=>async(dispatch)=>{
    dispatch({type:LOAD_PRODUCT})
try {
    let result=await axios.post("https://back-end-2-txcx.onrender.com/api/product/addproduct",product)
    dispatch({type:ADD_PRODUCT})
} catch (error) {
    dispatch({type:FAIL_PRODUCT,payload:error})
}
}

export const modify=(price,_id)=>async(dispatch)=>{
dispatch({type:LOAD_PRODUCT})
try {
let result= await axios.put(`https://back-end-2-txcx.onrender.com/api/product/updateproduct/${_id}`,{price})
dispatch({type:MODIFY})
} catch (error) {
dispatch({type:FAIL_PRODUCT,payload:error})

}
}
export const get_product=()=>async(dispatch)=>{
dispatch({type:LOAD_PRODUCT})
try {
let result= await axios.get("https://back-end-2-hqhl.onrender.com/api/product/products")
dispatch({type:GET_PRODUCTS,payload:result.data})
} catch (error) {
dispatch({type:FAIL_PRODUCT,payload:error})
}
}
export const delete_product=(_id)=>async(dispatch)=>{
dispatch({type:LOAD_PRODUCT})
try {
let result= await axios.delete(`https://back-end-2-hqhl.onrender.com/api/product/deleteproduct/${_id}`)
dispatch({type:DELETE_PRODUCT,payload:result})
} catch (error) {
dispatch({type:FAIL_PRODUCT,payload:error})
}
}
export const nextp=()=>{
    return {
            type:NEXTPAGE
    }
}
export const previousp=()=>{
    return {
            type:PREVIOUSPAGE
    }
}
export const search=(tr)=>{
    return{
        type:SEARCH,
        payload:tr
    }
}

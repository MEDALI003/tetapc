import  axios  from "axios";
import { useSelector } from "react-redux";
export const SIGNUP="signup"
export const SIGNIN="signin"
export const EDIT_PASSWORD="edit password"
export const EDIT_IMAGE="edit image"
export const DELETE_USER="delete user"
export const LOAD_USER="load user"
export const FAIL_USER="fail user"
export const CURRENT="current"
export const  LOGOUT="logout"
export const GET_USER="get user"
export const signup=(newuser)=>async(dispatch)=>{
    dispatch({type:LOAD_USER})
    try {
        const res= await axios.post("https://back-end-2-hqhl.onrender.com/api/user/signup",newuser)
        dispatch({type:SIGNUP,payload:res.data})
    } catch (error) {
       dispatch({type:FAIL_USER,payload:error}) 
    }
}
export const login=(user)=>async(dispatch)=>{
    dispatch({type:LOAD_USER})
    try {
        const res=await axios.post("https://back-end-2-hqhl.onrender.com/api/user/login",user)
        dispatch({type:SIGNIN,payload:res.data})
    } catch (error) {
        dispatch({type:FAIL_USER,payload:error})
    }
}
export const editPassword=(user)=>async(dispatch)=>{
    dispatch({type:LOAD_USER})
    try {
         await axios.put(`https://back-end-2-hqhl.onrender.com/api/user/editpassword/${user._id}`,user.password)
        dispatch({type:EDIT_PASSWORD})
    } catch (error) {
        dispatch({type:FAIL_USER,payload:error})
    }
}
export const editImage=(user)=>async(dispatch)=>{
    dispatch({type:LOAD_USER})
    try {
        await axios.put(`https://back-end-2-hqhl.onrender.com/api/user/editphoto/${user._id}`,user.photo)
        dispatch({type:EDIT_PASSWORD})
    } catch (error) {
        dispatch({type:FAIL_USER,payload:error})
    }
}
export const deleteUser=(_id)=>async(dispatch)=>{
    dispatch({type:LOAD_USER})
    try {
        await axios.delete(`https://back-end-2-hqhl.onrender.com/api/user/deleteuser/${_id}`)
    } catch (error) {
        dispatch({type:FAIL_USER,payload:error})
    }
}

export const current = () => async (dispatch) => {
    
    dispatch({ type: LOAD_USER });
  
    try {
      const config = {
        headers: { authorization: localStorage.getItem('token') }
      };
  
      const res = await axios.get("https://back-end-2-hqhl.onrender.com/api/user/current", config);
  
      dispatch({ type: CURRENT, payload: res.data });
    } catch (error) {
    }
  };
  

export const logout=()=>{
    return{
        type:LOGOUT
    }
}

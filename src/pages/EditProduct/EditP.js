import { useEffect, useState } from 'react';
import './EditP.css'
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import {  } from '../../JS/ACTIONS/actions';
import { modify } from '../../JS/ACTIONS/productActions';
import { toast } from 'react-toastify';
import Navb from '../../components/Navbar/Navb';
function EditP() {
  const dispatch=useDispatch()
  const Navigate=useNavigate()
    const[product,setProduct]=useState()
    const userval=useSelector(state=>state.user.user)
    const {_id}=useParams()
    const [price,setPrice]=useState()
    useEffect(()=>{
      if ((userval && userval.prefileges !== "Admin")) {
          Navigate("/")
      }

  },[userval])

    const handlechange=(e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }
   const  handleClick=async()=>{
    
      await dispatch(modify(product.price,_id))
      toast("product updated")
      Navigate("/")
   }
   
  return (
    <div>
      <Navb />
    <div id="Container">
    
    <div className="elements-holder">
        <label>Price:</label>
        <input type="number" className="text" placeholder="enter the price en TND" name="price"  onChange={(e)=>handlechange(e)}/> 
    </div>
    
    <button onClick={handleClick}>Update</button>
</div>
</div>
  );
}

export default EditP;
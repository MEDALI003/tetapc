import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { getbasket} from '../../JS/ACTIONS/basketActions'
import Navb from "../../components/Navbar/Navb"
const FactureA = () => {
    const dispatch=useDispatch()
    const basket=useSelector(state=>state.basket.basket)
    const fix=0
    useEffect(()=>{
      const getbaskete=async()=>{
        await dispatch(getbasket())
      }
      getbaskete()
    },[fix])
  return (
    <div >
      <Navb />
      <div></div>
        <table style={{border:"1px solid grey",width:"100%",marginTop:"40px"}}>
          <tr> 
            <th>Client</th>
            <th> Nombre des elements</th>
            <th>prix</th>
          </tr>
          {basket?.map(el=><tr >
            <td>{el.userName}</td>
            <td>{el.basket.length}</td>
            <td>{el.basket.totalp}</td>
          </tr>)}
        </table>
    </div>
  )
}

export default FactureA
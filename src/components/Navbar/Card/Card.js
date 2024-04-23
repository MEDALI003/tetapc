import React, { useEffect, useState } from 'react';
import './Card.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { delete_product } from '../../../JS/ACTIONS/productActions';
import { current } from "../../../JS/ACTIONS/actions";
import { addtobasket } from '../../../JS/ACTIONS/basketActions';

const Card = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.user.user);
  const[user,setUser]=useState(users)
  const handleClick = () => {
    navigate(`/productData/${props.product._id}`);
  }
  const handleBasket=()=>{
    dispatch(addtobasket({productId:props.product._id,quantity:1}))
  }
  useEffect(() => {
    if (!users) {
      dispatch(current());
      setUser(users)
    }
  }, [dispatch, user]);

  return (
    <div className="card" style={{ margin: '50px' }}>
      <div className="card-image" onClick={handleClick}>
        <img src={props.product.photo} alt={props.product.name} />
      </div>
      <div className="card-content">
        <h2 className="card-title">{props.product.name}</h2>
        <p className="card-subtitle">Prix: {props.product.price} TND</p>
        <div>
          <div>
            <button className="card-button" style={(user && user.prefileges === "Admin") ? { display: "none" } : { display: "flex" }} onClick={()=>handleBasket()}>Add  Basket</button>
          </div>
          <div style={(user && user.prefileges === "Admin") ? { display: "flex", paddingBottom: "10px", justifyContent: "space-around", alignItems: "center" } : { display: "none" }}>
            <FontAwesomeIcon icon={faTrash} onClick={() => { dispatch(delete_product(props.product._id)) }} />
            <Link style={{ textDecoration: "none", color: "black", display: "flex" }} to={`/editproduct/${props.product._id}`}>
              <FontAwesomeIcon icon={faPen} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardContainer from '../../components/cards-container/CardContainer';
import FooterB from '../../components/Footer/Footer';
import { current } from '../../JS/ACTIONS/actions';
import { get_product } from '../../JS/ACTIONS/productActions';
import Navb from '../../components/Navbar/Navb';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const product = useSelector(state => state.product.product);
  const fix=0
 useEffect(()=>{
 const test=async()=>{ 
  if (!user) {
    await dispatch(current())
  }
  }
  test()
 },[user]) 
 useEffect(()=>{
    dispatch(get_product())
 },[fix])
  return (
    <div>
      <Navb />
      {product?<CardContainer product={product}/>:null}
      <FooterB />
    </div>
  );
};

export default Home;

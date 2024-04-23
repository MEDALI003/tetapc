import React, { useState } from 'react';
import './Add.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addProduct } from '../../JS/ACTIONS/productActions';
import axios from 'axios';
import Navb from '../../components/Navbar/Navb';

function Add() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    quantity: 0,
    category: '',
    photo: null,
    price: 0
  });

  const handlechange = (e) => {
    const { name, value, files } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleClick = async () => {
    const file = product.photo;
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'products_preset'); // Replace with your upload preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dvdx4mvqx/image/upload`, {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();


      const updatedProduct = { ...product, photo: data.secure_url };
      await dispatch(addProduct(updatedProduct));
      navigate("/");
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <Navb />
    <div id="Container">
      <div className="elements-holder">
        <label>Name:</label>
        <input type="text" className="text" placeholder="Name" name="name" onChange={handlechange} /> 
      </div>
      <div className="elements-holder">
        <label>Description</label>
        <input type="text" className="text" placeholder="Description" name="description" onChange={handlechange} /> 
      </div>
      <div className="elements-holder">
        <label>Quantity:</label>
        <input type="number" className="text" placeholder="Quantity" name="quantity" onChange={handlechange} /> 
      </div>
      <div className="elements-holder">
        <label>Category:</label>
        <select className="text" name="category" onChange={handlechange}>
          <option value="">Select category...</option>
          <option value="laptop">Laptop</option>
          <option value="desktop_pc">Desktop PC</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
      <div className="elements-holder">
        <label>Photo:</label>
        <input type="file" className="text" name="photo" onChange={handlechange} /> 
      </div>
      <div className="elements-holder">
        <label>Price:</label>
        <input type="number" className="text" placeholder="Price(TND)" name="price" onChange={handlechange} /> 
      </div>
      <button onClick={handleClick}>Complete</button>
    </div>
    </div>
  );
}

export default Add;

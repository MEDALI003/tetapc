import React, { useState, useEffect, useRef } from 'react';
import "../Test.js/Test.css";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { get_product } from "../../JS/ACTIONS/productActions";
import Spinner from "../Spinner";
import FooterB from '../Footer/Footer';
import Button from 'react-bootstrap/esm/Button';
import { addtobasket } from '../../JS/ACTIONS/basketActions';
import Navb from '../Navbar/Navb';
const Test = () => {
  const { _id } = useParams();
  const dispatch=useDispatch()
  const products = useSelector(state => state.product.product);
  const [product, setProduct] = useState(null);
  const prodDataRef = useRef(null);
  const[quant,setQuant]=useState(0)
  const fix=0
  useEffect(()=>{
    const teste=async()=>{
        dispatch(get_product())
    }
    teste()
  },[fix])
  const handleClick=()=>{
    if (quant>0) {
      dispatch(addtobasket({productId:_id,quantity:quant}))
    }
   
  }
  useEffect(() => {
    if(products){const filteredProduct = products.find(el => el._id === _id);
    setProduct(filteredProduct);}
  }, [_id, products]);

  useEffect(() => {
    if(products){if (prodDataRef.current) {
      const prodDataHeight = prodDataRef.current.clientHeight;
      setImageHeight(prodDataHeight); // Set the height of the image holder
    }}
  }, [product]);

  const [imageHeight, setImageHeight] = useState('auto'); // Initial height is set to 'auto'

  if (!product) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
        <Navb  />
    { products?   <div className="contain-all">
        <div className="image-holder" style={{ height: imageHeight }}>
            <img src={product.photo} alt={product.name} />
        </div>
        <div className="prod-data" ref={prodDataRef}>
            <h1>Name: {product.name}</h1>
            <h2>Price: {product.price} TND</h2>
            <p>Description: {product.description}</p>
            <div className="number-input">
              <input
                type="number"
                value={quant>=0?quant:0}
              id="numberInput"
              onChange={(e)=>{setQuant(e.target.value)}}
               className="input-field"
                style={{ width: '1.25cm',height: '1cm'}}
                  /> <Button className='butt' onClick={()=>handleClick()}>Add To Basket</Button>
    </div>
        </div>
        

    </div>
  :<Spinner />
}
<FooterB />
</div>
)
}

export default Test

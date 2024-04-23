import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addbasket } from '../../JS/ACTIONS/basketActions'; // Import your action creator
import './Facture.css';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';

const Facture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Rename to navigate for clarity
  const basket = useSelector(state => state.basket.newbasket);
  const product = useSelector(state => state.product.product);
  const user = useSelector(state => state.user.user);
  const [items, setItems] = useState([]);
  const [style, setStyle] = useState({ display: "flex" });

  useEffect(() => {
    if (basket.length === 0 || product.length === 0) {
      navigate("/");
    } else {
      const updatedItems = basket.map(basketItem => {
        const productItem = product.find(productItem => productItem._id === basketItem.productId);
        return {
          name: productItem.name,
          quantity: basketItem.quantity,
          price: productItem.price
        };
      });
      setItems(updatedItems);
    }
  }, [basket, product, navigate]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  const nDate = new Date().toISOString();

  const handleBasket = async () => {

  if(user!=null){
    const basketData = {
      userId: user._id,
      basket: basket,
      date: nDate
    };
    console.log(basketData)
    await dispatch(addbasket(basketData));
    handleClick();
    navigate("/");
  }
}

  const handleClick = () => {
    setStyle({ display: "none" });
    toast("Commande ajoutée avec succès");
  }

  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="invoice">
      <h2>Facture pour l'utilisateur </h2>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total">Total: {totalAmount}</div>
      <div style={style}><Button onClick={()=>handleBasket()}>Valider</Button></div>
    </div>
  );
};

export default Facture;

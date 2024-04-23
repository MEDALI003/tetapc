import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Importez useSelector et useDispatch depuis react-redux
import CardB from '../Navbar/Card/Card';
import Spinner from "../Spinner";
import './CardContainer.css'; // Import CSS file for styling
import Form from 'react-bootstrap/Form';
import { get_product } from '../../JS/ACTIONS/productActions'; // Importez votre action get_product

const CardContainer = () => {
  const product = useSelector(state => state.product.product); // Importer le produit du store
  const dispatch = useDispatch(); // Permet d'envoyer des actions au store
  const fix=0
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 9;
  const totalPages = product ? Math.ceil(product.length / itemsPerPage) : 0; // Check if product is not null
  const basket=useSelector(state=>state.basket.newbasket)
  
  useEffect(() => {
    dispatch(get_product()); // Dispatch l'action get_product lorsque le produit change
    setCurrentPage(1);
     // Reset current page when product list changes
  }, [fix]); // product est utilisé dans le tableau de dépendances

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let displayedProducts = []; // Initialize displayedProducts as an empty array

  if (product) { // Check if product is not null
    // Create a copy of the products array
    displayedProducts = [...product];

    // Sort the products based on the selected sort order
    if (sortOrder === "1") {
      displayedProducts.sort((a, b) => a.price - b.price); // Assuming each product has a 'price' property
    } else if (sortOrder === "2") {
      displayedProducts.sort((a, b) => b.price - a.price);
    }

    // Filter products based on search term
    displayedProducts = displayedProducts.filter(product => {
      const name = product.name.toUpperCase().trim();
      const description = product.description.toUpperCase().trim();
      const search = searchTerm.toUpperCase().trim();
      return name.includes(search) || description.includes(search);
    });

    // Slice the displayed products based on pagination
    displayedProducts = displayedProducts.slice(startIndex, endIndex);
  }

  return (
    <div>
      <div style={{backgroundColor:"#333",display:"flex",justifyContent:"space-around",height:"50px",alignItems:"center"}}>
        <div style={{width:"200px"}}>
          <Form.Select aria-label="Default select example" onChange={handleSortChange}>
            <option defaultValue={"0"}>Méthode de Tri</option>
            <option value="1">Tri Ascendant par prix</option>
            <option value="2">Tri Descendant par prix</option>
          </Form.Select>
        </div>
        <Form className="d-flex">
          <Form.Control
          style={{width:"280px"}}
            type="search"
            placeholder="recherche par nom ou description"
            className="me-2"
            aria-label="Search"
            onChange={handleSearch}
          />
        </Form>
      </div>
      <div className="card-container">
        {displayedProducts.length > 0 ?
          displayedProducts.map((el, index) =>  <CardB key={index} product={el} />)
          : product ? <Spinner /> : <p>No products found</p> // Show spinner if product is not null, otherwise show message
        }
      </div>
      <div className="pagination">
        {renderPagination()}
      </div>
    </div>
  );
};

export default CardContainer;

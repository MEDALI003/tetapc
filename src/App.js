import Navb from "./components/Navbar/Navb";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/register";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import Add from "./pages/Add.js/Add";
import Error from "./pages/Error";
import { useEffect, useState } from "react";
import Test from "./components/Test.js/Test";
import FooterB from "./components/Footer/Footer";
import EditP from "./pages/EditProduct/EditP";
import Facture from "./pages/Facture.js/Facture";
import FactureA from "./pages/adminF/FactureA";
import { current } from "./JS/ACTIONS/actions";
function App() {
  const user = useSelector(state => state.user.user);
 useEffect(()=>{
  const teste=async()=>{
    
  }
 })
  return (
    <div className="App">
      

    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproduct" element={<Add />} />
        <Route path="/error" element={<Error />} />
        <Route path="/productData/:_id" element={<Test />} />
        <Route path="/editproduct/:_id" element={<EditP />} />
        <Route path="/facture" element={<Facture/>} />
        {user && user.prefileges === "Admin" ?(
  <Route path="/facture/admin" element={<FactureA />} />
):null}

      </Routes>
      
        <ToastContainer
          position="top-center"
          autoClose={2000} // Set autoClose to 2000 milliseconds (2 seconds)
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme="light"
        />
     
    </div>

  );
}

export default App;

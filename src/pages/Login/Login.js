import React, { useState, useEffect } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../JS/ACTIONS/actions';
import { toast } from 'react-toastify';
import Navb from '../../components/Navbar/Navb';

function Login() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const userFromStore = useSelector(state => state.user.user);

  useEffect(() => {
    if (userFromStore) {
      toast("Logged in successfully")
      Navigate("/");
    }
  }, [userFromStore, Navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    if (user.email && user.password) {
      await dispatch(login(user));
      
    } else {
      toast.error("Please enter both email and password");
    }
  };

  return (
    <div>
      <Navb />
    <div id="Container">
      <div className="elements-holder">
        <label>Email:</label>
        <input type="email" className="text" placeholder="example@gmail.com" name="email" value={user.email} onChange={handleChange} />
      </div>
      <div className="elements-holder">
        <label>Password:</label>
        <input type="password" className="text" placeholder="password" name="password" value={user.password} onChange={handleChange} />
      </div>
      <button onClick={handleClick}>Login</button>
      <p>If you don't have an acccount you can <Link to={"/register"} style={{ textDecoration: "none" }}>Register</Link></p>
    </div>
    </div>
  );
}

export default Login;

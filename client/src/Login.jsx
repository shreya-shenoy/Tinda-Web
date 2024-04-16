import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {Modal, Button} from 'react-bootstrap';
import "./MainPage.css";

function Login() {    

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [username, setUsername] = useState(null);

    const navigate = useNavigate()
    const [loginError, setLoginError] = useState("");

  

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/login", { email, password })
        
        .then(result => {
            //console.log("Login response:", result);
            if(result.data.success){
                const{name, email} = result.data.user;
                //console.log(result.data.user);
                //setUsername(result.data.user.name);
                //navigate(`/MainPage?username=${result.data.user.name}`)
                //const { name } = result.data.user; 
                // Destructure the name from result.data
                setUsername(name);
                navigate(`/MainPage?username=${name}`);
                console.log(result.data.user.name);
            }else{
                //navigate("/register")
                //alert("You are not registered to this service")
                setLoginError("Invalid email or password");
                //setShowModal(true);
            
            }
       
        })
        .catch(err => console.log(err))
    }


  return (
    
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-300 ">
        <div className="bg-white p-3 rounded w-200">
            <h1 className="maintitle"> Tinda Swipe </h1>
            <h2><center>Login</center></h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="text" 
                    placeholder='Enter Email' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0' 
                    onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password' 
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                {loginError && <span style={{ color: "red" }}>{loginError}</span>}

                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            
        </div>
        
    </div>
 
  );
}

export default Login;
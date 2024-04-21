import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {Modal, Button} from 'react-bootstrap';
import "./MainPage.css";

function Login() {    

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState(null);

    const navigate = useNavigate()
    const [loginError, setLoginError] = useState("");

  

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/login", { email, password })
        
        .then(result => {
            //console.log("Login response:", result);
            if(result.data.isAuthenticated){
                const{name, email} = result.data.user;
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
    <div className="wrapper">
    {/* <div className="d-flex justify-content-center align-items-center bg-secondary vh-300 "> */}
        <div className="p-3 rounded w-200">
            <div className="text-color">
            <h1 className="maintitle"> Tinda Swipe </h1>
            <h2><center><b>Login</b></center></h2>
            </div>
          
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong className="text-color">Email</strong>
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
                        <strong className="text-color">Password</strong>
                    </label>
                    <input type={showPassword ? "text" : "password"}
                    placeholder='Enter Password' 
                    name='password' 
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                    <input
                type="checkbox"
                id="showPassword"
                onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="showPassword">Show Password</label>
                </div>
                {loginError && <span style={{ color: "red" }}>{loginError}</span>}

                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
                </form>           
                <div className="forget-password">
                    <Link to="/register">
                    <a href = "#">Don't have an account?</a>
                </Link>
                </div>
                
            
        </div>
        
    </div>
  
 
  );
}

export default Login;
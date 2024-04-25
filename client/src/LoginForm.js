//imports necessary libraries
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";
import "./MainPage.css";

// Login form function
function LoginForm() {
  // Replace useHistory with useNavigate
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [error, setError] = useState("");
  
    const onSubmit = async (data) => {
      try{
        const response = await axios.post("/login", data);
        console.log("RESPONSE", response);
        if(response.status == 200 && response.data.isAuthenticated){
          navigate("/MainPage");
        }
      }
      catch (err){
        // error handling
        setError("Invalid email or password");
        console.error("Login error:", err);
      }
      reset();
      
    }
    const validateForm = (data) => {
      if (!data.email || !data.password) {
        setError("Please fill out all fields");
        return false;
      }
      return true;
    }
    
  
    return (
      <>
      {/* Sign up page for new users */}
        <p className="title">Sign Up</p>
  
        <form
              className="App"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off" // Disable browser autocomplete
            >

          <label htmlFor="email">Email:</label>
          <input type="email" {...register("email", { required: true }) } autoComplete="off"/>
          {errors.email && <span style={{ color: "red" }}>*Email is mandatory</span>}
  
          <input type="password" {...register("password", { required: true })} autoComplete="off"/>
          {errors.password && <span style={{ color: "red" }}>*Password is mandatory</span>}
  
          <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
        </form>
      </>
    );
  }

  export default LoginForm;
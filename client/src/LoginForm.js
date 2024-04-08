import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import {FaUser, FaLock} from "react-icons/fa";

function LoginForm() {
    const navigate = useNavigate(); // Replace useHistory with useNavigate
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
    const onSubmit = (data) => {
      console.log(data);
      reset();
      navigate("/MainPage"); // Use navigate instead of history.push
    }
  
    return (

      <>
     
      <div className = 'New-Background'>
      <div className = 'wrapper'>
        <form className="App" action="" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className="input-box">
          <input input type="text" placeholder='Username' {...register("email", { required: true })} />
          <FaUser className='icon' />
          {errors.email && <span style={{ color: "whitee" }}>*Email is mandatory</span>}
          </div>


          <div className="input-box">
          <input type="password" placeholder='Password' {...register("password", { required: true })} />
          {errors.password && <span style={{ color: "white" }}>*Password is mandatory</span>}
          <FaLock className='icon' />
          </div>

          <button type="submit">Login</button>
        </form>
        </div>
        </div>
        
      </>
      
    );
  }

  export default LoginForm;
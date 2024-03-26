import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

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
        <p className="title">Sign Up</p>
  
        <form className="App" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email:</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span style={{ color: "red" }}>*Email is mandatory</span>}
  
          <label htmlFor="password">Password:</label>
          <input type="password" {...register("password", { required: true })} />
          {errors.password && <span style={{ color: "red" }}>*Password is mandatory</span>}
  
          <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
        </form>
      </>
    );
  }

  export default LoginForm;
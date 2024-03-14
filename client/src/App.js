// inside src/App.js
// Replace previous code with this.

/*
import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = (data) => console.log(data);

	return (
		<>
			<p className="title">Sign Up</p>

			<form className="App" onSubmit={handleSubmit((data)=>onSubmit(data))}>
				<label htmlFor = "email"> Email:</label>
				<input type="email" {...register("email", { required: true })} />
				{errors.email && <span style={{ color: "red" }}>
					*Email* is mandatory </span>}
        <label htmlFor = "email"> Password:</label>
				<input type="password" {...register("password")} />
				<input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
			</form>
		</>
	);
}
export default App;
*/

import React from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Send a POST request to the /signup endpoint with the user data
    axios.post('/signup', data)
      .then(response => {
        console.log('Signup successful:', response.data);
        // Optionally, redirect the user to a different page or show a success message
      })
      .catch(error => {
        console.error('Signup failed:', error.response.data);
        // Handle signup errors (e.g., display error messages to the user)
      });
  };

  return (
    <>
      <p className="title">Sign Up</p>

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:</label>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <span style={{ color: "red" }}>*Email* is mandatory</span>}
        <label htmlFor="password">Password:</label>
        <input type="password" {...register("password")} />
        <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}

export default App;
